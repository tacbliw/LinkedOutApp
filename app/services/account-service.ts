import { useNavigation } from "@react-navigation/native"
import { NativeSyntheticEvent, TextInputChangeEventData } from "react-native"
import React from "reactn"
import { screens } from "../config/screens"
import { isEmail, removeCredentials, saveCredentials } from "../helpers/account-helper"
import { toPythonString } from "../helpers/date-helper"
import { showError } from "../helpers/toast"
import { accountRepository, LoginResponse } from "../repositories/account-repository"
import { companyRepository } from "../repositories/company-repository"
import { userRepository } from "../repositories/user-repository"

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
      if (!username) {
        showError('Username field is blank')
        return
      } else if (!password) {
        showError('Password field is blank')
        return
      }
      try {
        const response: LoginResponse = await accountRepository.login(username, password)
        await saveCredentials(
          response.accessToken,
          response.account.id.toString(),
          response.account.accountType,
          response.account.username
        )
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

  useSignUp(): [
      string,
      (event: NativeSyntheticEvent<TextInputChangeEventData>) => void,
      string,
      (event: NativeSyntheticEvent<TextInputChangeEventData>) => void,
      string,
      (value: string) => void,
      string,
      (event: NativeSyntheticEvent<TextInputChangeEventData>) => void,
      () => void,
  ] {
    const navigation = useNavigation()
    const [username, setUsername] = React.useState<string>()
    const [email, setEmail] = React.useState<string>()
    const [accountType, setType] = React.useState<string>('user')
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
      (value: string) => {
        setType(value)
      },
      [],
    )

    const handleSignUp = React.useCallback(async () => {
      if (!username) {
        showError("Username field is blank.")
        return
      } else if (!password) {
        showError("Password field is blank.")
        return
      } else if (!isEmail(email)) {
        showError("Incorrect email format.")
        return
      }
      try {
        // Try to pass register response as props to next screen
        // as changing GlobalState at the moment is not useful and force a global reload.
        const response = await accountRepository.register(username, password, email, accountType)
        const navigationProps = {
          accessToken: response.accessToken,
          accountId: response.account.id,
          accountType: response.account.accountType,
          accountName: response.account.username
        }
        if (accountType === 'user') navigation.navigate(screens.basic.register.user, navigationProps)
        else if (accountType === 'company') navigation.navigate(screens.basic.register.company, navigationProps)
      } catch (error) {
        if (error?.response?.data?.details) {
          showError(error.response.data.details)
        }
      }
    }, [username, email, password, accountType, navigation])

    return [
      username,
      handleChangeUsername,
      email,
      handleChangeEmail,
      accountType,
      handleChangeType,
      password,
      handleChangePassword,
      handleSignUp
    ]
  },

  useRegisterCompany(props): [
    string,
    (event: NativeSyntheticEvent<TextInputChangeEventData>) => void,
    string,
    (event: NativeSyntheticEvent<TextInputChangeEventData>) => void,
    string,
    (event: NativeSyntheticEvent<TextInputChangeEventData>) => void,
    string,
    (event: NativeSyntheticEvent<TextInputChangeEventData>) => void,
    () => void
] {
  // Props || Do not do this to any screen :|
  const [accessToken, setAccessToken] = React.useState(props.accessToken)
  const [accountId, setAccountId] = React.useState(props.accountId)
  const [accountType, setAccountType] = React.useState(props.accountType)
  const [accountName, setAccountName] = React.useState(props.accountName)

  // Locals
  const [name, setName] = React.useState<string>()
  const [website, setWebsite] = React.useState<string>()
  const [specialties, setSpecialties] = React.useState<string>()
  const [description, setDescription] = React.useState<string>()
  const handleChangeCompanyName = React.useCallback(
    (event: NativeSyntheticEvent<TextInputChangeEventData>) => {
      setName(event.nativeEvent.text)
    },
    [],
  )
  const handleChangeWebsite = React.useCallback(
    (event: NativeSyntheticEvent<TextInputChangeEventData>) => {
      setWebsite(event.nativeEvent.text)
    },
    [],
  )
  const handleChangeSpecialities = React.useCallback(
    (event: NativeSyntheticEvent<TextInputChangeEventData>) => {
      setSpecialties(event.nativeEvent.text)
    },
    [],
  )
  const handleChangeDescription = React.useCallback(
    (event: NativeSyntheticEvent<TextInputChangeEventData>) => {
      setDescription(event.nativeEvent.text)
    },
    [],
  )
  const handleCompanyRegister = React.useCallback(async () => {
    try {
      await companyRepository.create(name, website, [specialties], description, accessToken)
      saveCredentials(
        accessToken,
        accountId.toString(),
        accountType,
        accountName,
      )
    } catch (error) {
      if (error?.response?.data?.details) {
        showError(error.response.data.details)
      }
    }
  }, [name, description, website, specialties, accessToken, accountId, accountType, accountName])
  return [
    name,
    handleChangeCompanyName,
    website,
    handleChangeWebsite,
    specialties,
    handleChangeSpecialities,
    description,
    handleChangeDescription,
    handleCompanyRegister
    ]
  },

  useRegisterUser(props): [
    string,
    (event: NativeSyntheticEvent<TextInputChangeEventData>) => void,
    string,
    (event: NativeSyntheticEvent<TextInputChangeEventData>) => void,
    Date,
    (value: Date) => void,
    boolean,
    () => void,
    string,
    (value: string) => void,
    string,
    (event: NativeSyntheticEvent<TextInputChangeEventData>) => void,
    () => void
  ] {
    // Props || Do not do this to any screen :|
    const [accessToken, setAccessToken] = React.useState(props.accessToken)
    const [accountId, setAccountId] = React.useState(props.accountId)
    const [accountType, setAccountType] = React.useState(props.accountType)
    const [accountName, setAccountName] = React.useState(props.accountName)

    // Locals
    const [firstName, setFirstName] = React.useState<string>('')
    const [lastname, setLastName] = React.useState<string>('')
    const [dateOfBirth, setDateOfBirth] = React.useState<Date>(new Date(1598051730000))
    const [gender, setGender] = React.useState<string>('male')
    const [description, setDescription] = React.useState<string>('')
    const [showDatePicker, setShowDatePicker] = React.useState<boolean>(false)

    const handleFirstNameChange = React.useCallback(
      (event: NativeSyntheticEvent<TextInputChangeEventData>) => {
        setFirstName(event.nativeEvent.text)
      },
      [],
    )

    const handleLastNameChange = React.useCallback(
      (event: NativeSyntheticEvent<TextInputChangeEventData>) => {
        setLastName(event.nativeEvent.text)
      },
      [],
    )

    const handleDateOfBirthChange = React.useCallback(
      (value: Date) => {
        setShowDatePicker(false)
        setDateOfBirth(value)
      },
      [],
    )

    const handleDatePickerPress = React.useCallback(() => {
      setShowDatePicker(true)
    }, [])

    const handleGenderChange = React.useCallback(
      (value: string) => {
        setGender(value)
      },
      [],
    )

    const handleDescriptionChange = React.useCallback(
      (event: NativeSyntheticEvent<TextInputChangeEventData>) => {
        setDescription(event.nativeEvent.text)
      },
      [],
    )

    const handleUserRegister = React.useCallback(async () => {
      try {
        await userRepository.create(firstName, lastname, toPythonString(dateOfBirth), gender, description, accessToken)
        saveCredentials(
          accessToken,
          accountId.toString(),
          accountType,
          accountName,
        )
      } catch (error) {
        if (error?.response?.data?.details) {
          showError(error.response.data.details)
        }
      }
    }, [firstName, lastname, dateOfBirth, gender, description, accessToken, accountId, accountName, accountType])

    return [
      firstName,
      handleFirstNameChange,
      lastname,
      handleLastNameChange,
      dateOfBirth,
      handleDateOfBirthChange,
      showDatePicker,
      handleDatePickerPress,
      gender,
      handleGenderChange,
      description,
      handleDescriptionChange,
      handleUserRegister
    ]
  }
}
