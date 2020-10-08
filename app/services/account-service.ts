import { NativeSyntheticEvent, TextInputChangeEventData } from "react-native"
import React from "reactn"
import { GlobalState } from "../config/global"
import { removeCredentials, saveCredentials } from "../helpers/account-helper"
import { showError } from "../helpers/toast"
import { accountRepository } from "../repositories/account-repository"

interface LoginResponse {
  accessToken: string;
  account: {
    accountType: string;
    id: number;
    username: string;
  }
}

export const accountService = {
  useLogin(): [
    string,
    (event: NativeSyntheticEvent<TextInputChangeEventData>) => void,
    string,
    (event: NativeSyntheticEvent<TextInputChangeEventData>) => void,
    boolean,
    () => void,
  ] {
    const [username, setUsername] = React.useState<string>()
    const [password, setPassword] = React.useState<string>()
    const [loading, setLoading] = React.useState<boolean>(false)

    const handleChangeUsername = React.useCallback(
      (event: NativeSyntheticEvent<TextInputChangeEventData>) => {
        setUsername(event.nativeEvent.text)
      },
      [],
    )

    const handleChangePassword = React.useCallback(
      (event: NativeSyntheticEvent<TextInputChangeEventData>) => {
        setPassword(event.nativeEvent.text)
      },
      [],
    )

    const handleLogin = React.useCallback(async () => {
      setLoading(true)
      try {
        const response = await accountRepository.login(username, password) as LoginResponse
        console.log(typeof response)
        await saveCredentials(response.accessToken)
      } catch (error) {
        if (error?.response?.data) {
          showError('login.cannotLogin')
        }
      }
    }, [username, password])

    return [
      username,
      handleChangeUsername,
      password,
      handleChangePassword,
      loading,
      handleLogin,
    ]
  },

  useLogout(): [boolean, () => Promise<void>] {
    const [loading, setLoading] = React.useState<boolean>(false)

    const handleLogout = React.useCallback(async () => {
      if (!loading) {
        setLoading(true)
        await removeCredentials()
      }
    }, [loading])

    return [loading, handleLogout]
  },

  // do not use this yet
  useAutoLogin(): [boolean] {
    const [accessToken] = React.useGlobal<GlobalState, 'accessToken'>('accessToken')
    const [loading, setLoading] = React.useState<boolean>(false)

    React.useEffect(() => {
      if (typeof accessToken === 'string' && accessToken !== '') {
        setLoading(true)
      }
    }, [accessToken])

    return [loading]
  },
}
