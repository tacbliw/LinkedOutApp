import { NativeSyntheticEvent, TextInputChangeEventData } from "react-native"
import React from "reactn"
import { GlobalState } from "../config/global"
import { removeCredentials, saveCredentials } from "../helpers/account-helper"
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
        console.log('Logging Out')
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

  useSignUp(): [
      string,
      (event: NativeSyntheticEvent<TextInputChangeEventData>) => void,
      string,
      (event: NativeSyntheticEvent<TextInputChangeEventData>) => void,
      string,
      (event: NativeSyntheticEvent<TextInputChangeEventData>) => void,
      string,
      (event: NativeSyntheticEvent<TextInputChangeEventData>) => void,

  ] {
    const [username, setUsername] = React.useState<string>()
    const [email, setEmail] = React.useState<string>()
    const [type, setType] = React.useState<string>()
    const [password, setPassword] = React.useState<string>()
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
    const handleChangeEmail = React.useCallback(
      (event: NativeSyntheticEvent<TextInputChangeEventData>) => {
        setEmail(event.nativeEvent.text)
      },
      [],
    )

    const handleChangeType = React.useCallback(
      (event: NativeSyntheticEvent<TextInputChangeEventData>) => {
        setType(event.nativeEvent.text)
      },
      [],
    )
    return [
      username,
      handleChangeUsername,
      email,
      handleChangeEmail,
      type,
      handleChangeType,
      password,
      handleChangePassword]
  },

  useRegisterCompany(): [
    string,
    (event: NativeSyntheticEvent<TextInputChangeEventData>) => void,
    string,
    (event: NativeSyntheticEvent<TextInputChangeEventData>) => void,
    string,
    (event: NativeSyntheticEvent<TextInputChangeEventData>) => void,
    string,
    (event: NativeSyntheticEvent<TextInputChangeEventData>) => void,

] {
  const [companyName, setCompanyName] = React.useState<string>()
  const [website, setWebsite] = React.useState<string>()
  const [specialities, setSpecialities] = React.useState<string>()
  const [description, setDescription] = React.useState<string>()
  const handleCompanyNameChange = React.useCallback(
    (event: NativeSyntheticEvent<TextInputChangeEventData>) => {
      setCompanyName(event.nativeEvent.text)
    },
    [],
  )

  const handleWebsiteChange = React.useCallback(
    (event: NativeSyntheticEvent<TextInputChangeEventData>) => {
      setWebsite(event.nativeEvent.text)
    },
    [],
  )
  const handleSpecialitiesChange = React.useCallback(
    (event: NativeSyntheticEvent<TextInputChangeEventData>) => {
      setSpecialities(event.nativeEvent.text)
    },
    [],
  )

  const handleDescriptionChange = React.useCallback(
    (event: NativeSyntheticEvent<TextInputChangeEventData>) => {
      setDescription(event.nativeEvent.text)
    },
    [],
  )
  return [companyName,
    handleCompanyNameChange,
    website,
    handleWebsiteChange,
    specialities,
    handleSpecialitiesChange,
    description,
    handleDescriptionChange,
    ]
},
}
