import { NativeSyntheticEvent, TextInputChangeEventData } from 'react-native'
import React, { useCallback, useState } from 'reactn'
import { GlobalState } from '../config/global'
import { toPythonString } from "../helpers/date-helper"
import { showError, showInfo } from "../helpers/toast"
import { educationRepository } from '../repositories/education-repository'
import { emailRepository } from '../repositories/email-repository'
import { experienceRepository } from '../repositories/experience-repository'
import { phoneRepository } from '../repositories/phone-repository'
import { skillRepository } from '../repositories/skill-repository'
import { userRepository } from "../repositories/user-repository"

export const userProfileService = {
  useUserExist(): boolean {
    const [existed, setExisted] = React.useState(false)
    const [accountId, setAccountId] = React.useGlobal<GlobalState, 'accountId'>('accountId')

    const checkExist = React.useCallback(async () => {
      try {
        await userRepository.get(Number(accountId))
        setExisted(true)
      } catch (error) {
        if (error?.response?.data) {
          showInfo("Please fill out some information.")
        }
        setExisted(false)
      }
    }, [accountId])

    React.useEffect(() => {
      checkExist()
    }, [checkExist])

    return existed
  },
  useGetUser(): [
    string,
    string,
    string,
    string,
  ] {
    const [firstName, setFirstName] = useState<string>('');
    const [lastName, setLastName] = useState<string>('');
    const [profilePicture, setProfilePicture] = useState<string>('');
    const [description, setDescription] = useState<string>('');
    const [accountId, setAccountId] = React.useGlobal<GlobalState, 'accountId'>('accountId')
    const getInfo = React.useCallback(async () => {
      try {
        const response = await userRepository.get(Number(accountId));
        setFirstName(response.firstname);
        setLastName(response.lastname);
        setProfilePicture(response.profilePicture);
        setDescription(response.description);
        //showInfo(accountId)
      } catch (error) {
        if (error?.response?.data) {
          showInfo("error")
        }
      }
    }, [accountId])
    React.useEffect(() => {
      getInfo()
    }, [getInfo])
    return [
      firstName,
      lastName,
      profilePicture,
      description
    ]
  },

  useGetEducation(): [
    [any]
  ] {
    const [educationList, setEducationList] = useState<any>()
    const [accountId, setAccountId] = React.useGlobal<GlobalState, 'accountId'>('accountId')

    const getEducation = React.useCallback(async () => {
      try {
        const response = await educationRepository.get(Number(accountId));
        const realResponse = response.map(item => {
          return {
            id: item.educationId,
            time: item.startDate,
            title: item.schoolName,
            description: item.major,
          }
        })
        setEducationList(realResponse)
        //showInfo("got education list");
      } catch (error) {
        if (error?.response?.data) {
          showError("education error")
        }
      }
    }, [accountId])

    React.useEffect(() => {
      getEducation()
    }, [getEducation])
    return [
      educationList
    ]
  },

  useGetExperience(): [
    [any]
  ] {
    const [experienceList, setExperienceList] = useState<any>()
    const [accountId, setAccountId] = React.useGlobal<GlobalState, 'accountId'>('accountId')

    const getExperience = React.useCallback(async () => {
      try {
        const response = await experienceRepository.get(Number(accountId));
        setExperienceList(response)
        // showInfo("got experience list");
      } catch (error) {
        if (error?.response?.data) {
          showError("experience error")
        }
      }
    }, [accountId])

    React.useEffect(() => {
      getExperience()
    }, [getExperience])
    return [
      experienceList
    ]
  },

  useGetSkill(): [
    [any]
  ] {
    const [skillList, setSkillList] = useState<any>()
    const [accountId, setAccountId] = React.useGlobal<GlobalState, 'accountId'>('accountId')

    const getSkill = React.useCallback(async () => {
      try {
        const response = await skillRepository.get(Number(accountId));
        setSkillList(response.skills)
        //showInfo("got skill list");
      } catch (error) {
        if (error?.response?.data) {
          showError("skill error")
        }
      }
    }, [accountId])

    React.useEffect(() => {
      getSkill()
    }, [getSkill])
    return [
      skillList
    ]
  },

  useGetPhone(): [
    [any]
  ] {
    const [phoneList, setPhoneList] = useState<any>()
    const [accountId, setAccountId] = React.useGlobal<GlobalState, 'accountId'>('accountId')

    const getPhone = React.useCallback(async () => {
      try {
        const response = await phoneRepository.get(Number(accountId));
        setPhoneList(response.phones)
        //showInfo("got phone list");
      } catch (error) {
        if (error?.response?.data) {
          showError("phone error")
        }
      }
    }, [accountId])

    React.useEffect(() => {
      getPhone()
    }, [getPhone])
    return [
      phoneList
    ]
  },

  useUpdateUser(): [
    string,
    (event: NativeSyntheticEvent<TextInputChangeEventData>) => void,
    string,
    (event: NativeSyntheticEvent<TextInputChangeEventData>) => void,
    Date,
    (value: Date) => void,
    boolean,
    () => void,
    string,
    (event: NativeSyntheticEvent<TextInputChangeEventData>) => void,
    string,
    (event: NativeSyntheticEvent<TextInputChangeEventData>) => void,
    string,
    string,
    (event: NativeSyntheticEvent<TextInputChangeEventData>) => void,
    string,
    string,
    (event: NativeSyntheticEvent<TextInputChangeEventData>) => void,
    () => void
  ] {
    const [firstName, setFirstName] = useState<string>('');
    const [lastName, setLastName] = useState<string>('');
    const [dateOfBirth, setDateOfBirth] = useState<Date>(new Date());
    const [showDateOfBirthPicker, setShowDateOfBirthPicker] = useState<boolean>(false);
    const [gender, setGender] = useState<string>('');
    const [userDescription, setUserDescription] = useState<string>('');
    const [oldPhone, setOldPhone] = useState<string>('');
    const [newPhone, setNewPhone] = useState<string>('');
    const [oldEmail, setOldEmail] = useState<string>('');
    const [newEmail, setNewEmail] = useState<string>('');
    const [accountId, setAccountId] = React.useGlobal<GlobalState, 'accountId'>('accountId')

    const getInfo = React.useCallback(async () => {
      try {
        const response = await userRepository.get(Number(accountId));
        setFirstName(response.firstname);
        setLastName(response.lastname);
        setGender(response.gender);
        setDateOfBirth(response.dateofbirth);
        setUserDescription(response.description);
      } catch (error) {
        if (error?.response?.data) {
          showInfo("error")
        }
      }
    }, [accountId])
    React.useEffect(() => {
      getInfo()
    }, [getInfo])

    const getPhone = React.useCallback(async () => {
      try {
        const response = await phoneRepository.get(Number(accountId));
        setOldPhone(response.phones[0]);
        setNewPhone(response.phones[0]);
      } catch (error) {
        if (error?.response?.data) {
          showInfo("error")
        }
      }
    }, [accountId])
    React.useEffect(() => {
      getPhone()
    }, [getPhone])

    const getEmail = React.useCallback(async () => {
      try {
        const response = await emailRepository.get(Number(accountId));
        setOldEmail(response.emails[0]);
        setNewEmail(response.emails[0]);
      } catch (error) {
        if (error?.response?.data) {
          showInfo("error")
        }
      }
    }, [accountId])
    React.useEffect(() => {
      getEmail()
    }, [getEmail])

    const handleFirstNameChange = useCallback(
      (event: NativeSyntheticEvent<TextInputChangeEventData>) => {
        setFirstName(event.nativeEvent.text)
      },
      [],
    )

    const handleLastNameChange = useCallback(
      (event: NativeSyntheticEvent<TextInputChangeEventData>) => {
        setLastName(event.nativeEvent.text)
      },
      [],
    )

    const handleDateOfBirthChange = useCallback(
      (value: Date) => {
        setShowDateOfBirthPicker(false)
        setDateOfBirth(value)
      },
      [],
    )

    const handleDateOfBirthPickerPress = useCallback(() => {
      setShowDateOfBirthPicker(true)
    }, [])

    const handleGenderChange = useCallback(
      (event: NativeSyntheticEvent<TextInputChangeEventData>) => {
        setGender(event.nativeEvent.text)
      },
      [],
    )

    const handleUserDescriptionChange = useCallback(
      (event: NativeSyntheticEvent<TextInputChangeEventData>) => {
        setUserDescription(event.nativeEvent.text)
      },
      [],
    )

    const handlePhoneChange = useCallback(
      (event: NativeSyntheticEvent<TextInputChangeEventData>) => {
        setNewPhone(event.nativeEvent.text)
      },
      [],
    )

    const handleEmailChange = useCallback(
      (event: NativeSyntheticEvent<TextInputChangeEventData>) => {
        setNewEmail(event.nativeEvent.text)
      },
      [],
    )

    const handleEditProfileSubmit = React.useCallback(async () => {
      try {
        await userRepository.update(firstName, lastName, toPythonString(dateOfBirth), gender, userDescription)
        await phoneRepository.update(oldPhone, newPhone)
        await emailRepository.update(oldPhone, newEmail)
        showInfo("edit profile submit")
      } catch (error) {
        if (error?.response?.data?.details) {
          showError(error.response.data.details)
        }
      }
    }, [firstName, lastName, dateOfBirth, gender, userDescription, newPhone, newEmail])

    return [
      firstName,
      handleFirstNameChange,
      lastName,
      handleLastNameChange,
      dateOfBirth,
      handleDateOfBirthChange,
      showDateOfBirthPicker,
      handleDateOfBirthPickerPress,
      gender,
      handleGenderChange,
      userDescription,
      handleUserDescriptionChange,
      oldPhone,
      newPhone,
      handlePhoneChange,
      oldEmail,
      newEmail,
      handleEmailChange,
      handleEditProfileSubmit
    ]
  },

  useCreatEducation(): [
    string,
    (event: NativeSyntheticEvent<TextInputChangeEventData>) => void,
    Date,
    (value: Date) => void,
    boolean,
    () => void,
    Date,
    (value: Date) => void,
    boolean,
    () => void,
    string,
    (event: NativeSyntheticEvent<TextInputChangeEventData>) => void,
    string,
    (event: NativeSyntheticEvent<TextInputChangeEventData>) => void,
    () => void,
    [any]
  ] {
    const [schoolName, setSchoolName] = useState<string>('')
    const [startDateEducation, setStartDateEducation] = useState<Date>(new Date())
    const [endDateEducation, setEndDateEducation] = useState<Date>(new Date())
    const [major, setMajor] = useState<string>('')
    const [degree, setDegree] = useState<string>('')
    const [loading, setLoading] = useState<boolean>(false)
    const [showStartDateEducationPicker, setShowStartDateEducationPicker] = useState<boolean>(false)
    const [showEndDateEducationPicker, setShowEndDateEducationPicker] = useState<boolean>(false)
    const [educationList, setEducationList] = useState<any>()
    const [accountId, setAccountId] = React.useGlobal<GlobalState, 'accountId'>('accountId')

    const handleSchooleNameChange = useCallback(
      (event: NativeSyntheticEvent<TextInputChangeEventData>) => {
        setSchoolName(event.nativeEvent.text)
      },
      [],
    )

    const handleStartDateEducationChange = useCallback(
      (value: Date) => {
        setShowStartDateEducationPicker(false)
        setStartDateEducation(value)
      },
      [],
    )

    const handleStartDateEducationPickerPress = useCallback(() => {
      setShowStartDateEducationPicker(true)
    }, [])

    const handleEndDateEducationChange = useCallback(
      (value: Date) => {
        setShowEndDateEducationPicker(false)
        setEndDateEducation(value)
      },
      [],
    )

    const handleEndDateEducationPickerPress = useCallback(() => {
      setShowEndDateEducationPicker(true)
    }, [])

    const handleMajorChange = useCallback(
      (event: NativeSyntheticEvent<TextInputChangeEventData>) => {
        setMajor(event.nativeEvent.text)
      },
      [],
    )

    const handleDegreeChange = useCallback(
      (event: NativeSyntheticEvent<TextInputChangeEventData>) => {
        setDegree(event.nativeEvent.text)
      },
      [],
    )

    const handleCreatEducation = React.useCallback(async () => {
      try {
        const response = await educationRepository.create(schoolName, toPythonString(startDateEducation), toPythonString(endDateEducation), major, degree)
        const realResponse = response.map(item => {
          return {
            id: item.educationId,
            time: item.startDate,
            title: item.schoolName,
            description: item.major,
          }
        })
        setEducationList(realResponse)
        showInfo("education created")
      } catch (error) {
        if (error?.response?.data?.details) {
          showError(error.response.data.details)
        }
      }
    }, [schoolName, startDateEducation, endDateEducation, major, degree])

    const getEducation = React.useCallback(async () => {
      try {
        const response = await educationRepository.get(Number(accountId));
        const realResponse = response.map(item => {
          return {
            id: item.educationId,
            time: item.startDate,
            title: item.schoolName,
            description: item.major,
          }
        })
        setEducationList(realResponse)
        //showInfo("got education list");
      } catch (error) {
        if (error?.response?.data) {
          showError("education error")
        }
      }
    }, [accountId])

    React.useEffect(() => {
      getEducation()
    }, [getEducation])
    return [
      schoolName,
      handleSchooleNameChange,
      startDateEducation,
      handleStartDateEducationChange,
      showStartDateEducationPicker,
      handleStartDateEducationPickerPress,
      endDateEducation,
      handleEndDateEducationChange,
      showEndDateEducationPicker,
      handleEndDateEducationPickerPress,
      major,
      handleMajorChange,
      degree,
      handleDegreeChange,
      handleCreatEducation,
      educationList
    ]
  },

  useCreatExperience(): [
    string,
    (event: NativeSyntheticEvent<TextInputChangeEventData>) => void,
    Date,
    (value: Date) => void,
    boolean,
    () => void,
    Date,
    (value: Date) => void,
    boolean,
    () => void,
    string,
    (event: NativeSyntheticEvent<TextInputChangeEventData>) => void,
    string,
    (event: NativeSyntheticEvent<TextInputChangeEventData>) => void,
    () => void,
    (id: number) => void,
    number,
    (id: number) => void,
    [any]
  ] {
    const [companyName, setCompanyName] = useState<string>('')
    const [startDateExperience, setStartDateExperience] = useState<Date>(new Date())
    const [endDateExperience, setEndDateExperience] = useState<Date>(new Date())
    const [title, setTitle] = useState<string>('')
    const [description, setDescription] = useState<string>('')
    const [loading, setLoading] = useState<boolean>(false)
    const [showStartDateExperiencePicker, setShowStartDateExperiencePicker] = useState<boolean>(false)
    const [showEndDateExperiencePicker, setShowEndDateExperiencePicker] = useState<boolean>(false)
    const [experienceList, setExperienceList] = useState<any>()
    const [accountId, setAccountId] = React.useGlobal<GlobalState, 'accountId'>('accountId')
    const [itemId, setItemId] = useState<number>()

    const handleCompanyNameChange = useCallback(
      (event: NativeSyntheticEvent<TextInputChangeEventData>) => {
        setCompanyName(event.nativeEvent.text)
      },
      [],
    )

    const handleStartDateExperienceChange = useCallback(
      (value: Date) => {
        setShowStartDateExperiencePicker(false)
        setStartDateExperience(value)
      },
      [],
    )

    const handleStartDateExperiencePickerPress = useCallback(() => {
      setShowStartDateExperiencePicker(true)
    }, [])

    const handleEndDateExperienceChange = useCallback(
      (value: Date) => {
        setShowEndDateExperiencePicker(false)
        setEndDateExperience(value)
      },
      [],
    )

    const handleEndDateExperiencePickerPress = useCallback(() => {
      setShowEndDateExperiencePicker(true)
    }, [])

    const handleTitleChange = useCallback(
      (event: NativeSyntheticEvent<TextInputChangeEventData>) => {
        setTitle(event.nativeEvent.text)
      },
      [],
    )

    const handleDescriptionChange = useCallback(
      (event: NativeSyntheticEvent<TextInputChangeEventData>) => {
        setDescription(event.nativeEvent.text)
      },
      [],
    )

    const handleItemIdChange = (id: number) => {
      setItemId(id);
      //alert(id);
    }

    const handleCreatExperience = React.useCallback(async () => {
      try {
        const response = await experienceRepository.create(companyName, toPythonString(startDateExperience), toPythonString(endDateExperience), title, description)
        setExperienceList(response)
        showInfo("Experience created")
      } catch (error) {
        if (error?.response?.data?.details) {
          showError(error.response.data.details)
        }
      }
    }, [companyName, startDateExperience, endDateExperience, title, description])

    const handleDeleteExperience = useCallback(async () => {
      try {
        const response = await experienceRepository.delete(itemId)
        setExperienceList(response)
        showInfo("Experience deleted")
      } catch (error) {
        if (error?.response?.data?.details) {
          showError(error.response.data.details)
        }
      }
    }, [])

    const getExperience = React.useCallback(async () => {
      try {
        const response = await experienceRepository.get(Number(accountId));
        setExperienceList(response)
        // showInfo("got experience list");
      } catch (error) {
        if (error?.response?.data) {
          showError("experience error")
        }
      }
    }, [accountId])

    React.useEffect(() => {
      getExperience()
    }, [getExperience])
    return [
      companyName,
      handleCompanyNameChange,
      startDateExperience,
      handleStartDateExperienceChange,
      showStartDateExperiencePicker,
      handleStartDateExperiencePickerPress,
      endDateExperience,
      handleEndDateExperienceChange,
      showEndDateExperiencePicker,
      handleEndDateExperiencePickerPress,
      title,
      handleTitleChange,
      description,
      handleDescriptionChange,
      handleCreatExperience,
      handleDeleteExperience,
      itemId,
      handleItemIdChange,
      experienceList
    ]
  }
}