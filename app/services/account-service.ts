import React from "react"
import { NativeSyntheticEvent, TextInputChangeEventData } from "react-native"
import { showError } from "../helpers/toast"
import { accountRepository } from "../repositories/account-repository"

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
        const response = await accountRepository.login(username, password)
        console.log(response)
        // await this.saveCredentials(user)
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
  }
}
