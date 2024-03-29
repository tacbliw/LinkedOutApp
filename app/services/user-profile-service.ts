import { NativeSyntheticEvent, TextInputChangeEventData } from 'react-native'
import React, { useCallback, useState } from 'reactn'
import { GlobalState } from '../config/global'
import { toPythonString } from '../helpers/date-helper'
import { showInfo } from '../helpers/toast'
import {
  EducationListRespond,
  educationRepository
} from '../repositories/education-repository'
import { emailRepository } from '../repositories/email-repository'
import { experienceRepository } from '../repositories/experience-repository'
import { phoneRepository } from '../repositories/phone-repository'
import { skillRepository } from '../repositories/skill-repository'
import {
  UserGetResponse,
  userRepository
} from '../repositories/user-repository'

export const userProfileService = {
  useUserExist(): boolean {
    const [existed, setExisted] = React.useState(false)
    const [accountId, setAccountId] = React.useGlobal<GlobalState, 'accountId'>(
      'accountId',
    )

    const checkExist = React.useCallback(async () => {
      try {
        await userRepository.get(Number(accountId))
        setExisted(true)
      } catch (error) {
        if (error?.response?.data) {
          showInfo('Please fill out some information.')
        }
        setExisted(false)
      }
    }, [accountId])

    React.useEffect(() => {
      checkExist()
    }, [checkExist])

    return existed
  },

  useBasicInfo(): [UserGetResponse] {
    const { accountId } = React.getGlobal<GlobalState>()
    const [user, setUser] = React.useState<UserGetResponse>()

    React.useEffect(() => {
      try {
        userRepository.get(parseInt(accountId)).then((r) => {
          setUser(r)
        })
      } catch (error) {
        console.log(error)
      }
    }, [])

    return [user]
  },

  useGetUser(
    accountId: number,
  ): [string, string, string, string, string, string, () => void] {
    const [firstName, setFirstName] = useState<string>('')
    const [lastName, setLastName] = useState<string>('')
    const [gender, setGender] = useState<string>('')
    const [dateOfBirth, setDateOfBirth] = useState<string>('')
    const [profilePicture, setProfilePicture] = useState<string>('')
    const [description, setDescription] = useState<string>('')

    const getInfo = React.useCallback(async () => {
      try {
        const response = await userRepository.get(accountId)
        setFirstName(response.firstname)
        setLastName(response.lastname)
        setGender(response.gender)
        setDateOfBirth(response.dateofbirth)
        setProfilePicture(response.profilePicture)
        setDescription(response.description)
      } catch (error) {
        console.log(error)
      }
    }, [accountId])

    React.useEffect(() => {
      getInfo()
    }, [getInfo])

    return [
      firstName,
      lastName,
      gender,
      dateOfBirth,
      profilePicture,
      description,
      getInfo,
    ]
  },

  useGetEducation(accountId: number): [EducationListRespond, () => void] {
    const [educationList, setEducationList] = useState<EducationListRespond>()

    const getEducation = React.useCallback(async () => {
      try {
        const response = await educationRepository.get(accountId)
        setEducationList(response)
      } catch (error) {
        console.log(error)
      }
    }, [accountId])

    return [educationList, getEducation]
  },

  useGetExperience(accountId: number): [[any], () => void] {
    const [experienceList, setExperienceList] = useState<any>()

    const getExperience = React.useCallback(async () => {
      try {
        const response = await experienceRepository.get(accountId)
        setExperienceList(response)
      } catch (error) {
        console.log(error)
      }
    }, [accountId])

    return [experienceList, getExperience]
  },

  useGetSkill(accountId: number): [[any], () => void] {
    const [skillList, setSkillList] = useState<any>()

    const getSkill = React.useCallback(async () => {
      try {
        const response = await skillRepository.get(accountId)
        setSkillList(response.skills)
      } catch (error) {
        console.log(error)
      }
    }, [accountId])

    return [skillList, getSkill]
  },

  useGetPhone(accountId: number): [[any], () => void] {
    const [phoneList, setPhoneList] = useState<any>()

    const getPhone = React.useCallback(async () => {
      try {
        const response = await phoneRepository.get(accountId)
        setPhoneList(response.phones)
      } catch (error) {
        console.log(error)
      }
    }, [accountId])

    return [phoneList, getPhone]
  },

  useGetMail(accountId: number): [[any], () => void] {
    const [emailList, setPhoneList] = useState<any>()

    const getMail = React.useCallback(async () => {
      try {
        const response = await emailRepository.get(accountId)
        setPhoneList(response.emails)
      } catch (error) {
        console.log(error)
      }
    }, [accountId])

    return [emailList, getMail]
  },

  useUpdateUser(): [
    string,
    (text: string) => void,
    string,
    (text: string) => void,
    string,
    (date: string) => void,
    boolean,
    () => void,
    string,
    (text: string) => void,
    string,
    (text: string) => void,
    string,
    (text: string) => void,
    string,
    (text: string) => void,
    string,
    (text: string) => void,
    string,
    (text: string) => void,
    () => void,
  ] {
    const [firstName, setFirstName] = useState<string>('')
    const [lastName, setLastName] = useState<string>('')
    const [dateOfBirth, setDateOfBirth] = useState<string>('')
    const [showDateOfBirthPicker, setShowDateOfBirthPicker] = useState<boolean>(
      false,
    )
    const [gender, setGender] = useState<string>('')
    const [userDescription, setUserDescription] = useState<string>('')
    const [oldPhone, setOldPhone] = useState<string>('')
    const [newPhone, setNewPhone] = useState<string>('')
    const [oldEmail, setOldEmail] = useState<string>('')
    const [newEmail, setNewEmail] = useState<string>('')
    const [accountId, setAccountId] = React.useGlobal<GlobalState, 'accountId'>(
      'accountId',
    )

    const getInfo = React.useCallback(async () => {
      try {
        const response = await userRepository.get(Number(accountId))
        setFirstName(response.firstname)
        setLastName(response.lastname)
        setGender(response.gender)
        setDateOfBirth(response.dateofbirth)
        setUserDescription(response.description)
      } catch (error) {
        console.log(error)
      }
    }, [accountId])

    const getPhone = React.useCallback(async () => {
      try {
        const response = await phoneRepository.get(Number(accountId))
        setOldPhone(response.phones[0])
        setNewPhone(response.phones[0])
      } catch (error) {
        console.log(error)
      }
    }, [accountId])

    const getEmail = React.useCallback(async () => {
      try {
        const response = await emailRepository.get(Number(accountId))
        setOldEmail(response.emails[0])
        setNewEmail(response.emails[0])
      } catch (error) {
        console.log(error)
      }
    }, [accountId])

    const handleFirstNameChange = useCallback((text: string) => {
      setFirstName(text)
    }, [])

    const handleLastNameChange = useCallback((text: string) => {
      setLastName(text)
    }, [])

    const handleDateOfBirthChange = useCallback((date: string) => {
      setShowDateOfBirthPicker(false)
      setDateOfBirth(date)
    }, [])

    const handleDateOfBirthPickerPress = useCallback(() => {
      setShowDateOfBirthPicker(true)
    }, [])

    const handleGenderChange = useCallback((text: string) => {
      setGender(text)
    }, [])

    const handleUserDescriptionChange = useCallback((text: string) => {
      setUserDescription(text)
    }, [])

    const handleOldPhoneChange = useCallback((text: string) => {
      setOldPhone(text)
    }, [])

    const handlePhoneChange = useCallback((text: string) => {
      setNewPhone(text)
    }, [])

    const handleOldEmailChange = useCallback((text: string) => {
      setOldEmail(text)
    }, [])

    const handleEmailChange = useCallback((text: string) => {
      setNewEmail(text)
    }, [])

    const handleEditProfileSubmit = React.useCallback(async () => {
      try {
        await userRepository.update(
          firstName,
          lastName,
          dateOfBirth,
          gender,
          userDescription,
        )
        if (oldPhone !== newPhone) {
          if (oldPhone === undefined) await phoneRepository.create(newPhone)
          else await phoneRepository.update(oldPhone, newPhone)
          setOldPhone(newPhone)
        }
        if (oldEmail !== newEmail) {
          await emailRepository.update(oldEmail, newEmail)
          setOldEmail(newEmail)
        }
        showInfo('Saved!')
      } catch (error) {
        console.log(error)
      }
    }, [
      firstName,
      lastName,
      dateOfBirth,
      gender,
      userDescription,
      newPhone,
      newEmail,
      oldEmail,
      oldPhone,
    ])

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
      handleOldPhoneChange,
      newPhone,
      handlePhoneChange,
      oldEmail,
      handleOldEmailChange,
      newEmail,
      handleEmailChange,
      handleEditProfileSubmit,
    ]
  },

  useCreateSkill(): [
    string,
    string[],
    (event: NativeSyntheticEvent<TextInputChangeEventData>) => void,
    () => void,
    (skill: string) => void,
    (t_skillList: string[]) => void,
  ] {
    const [skillText, setSkillText] = useState<string>('')
    const [skillList, setSkillList] = useState<string[]>()
    const [accountId, setAccountId] = React.useGlobal<GlobalState, 'accountId'>(
      'accountId',
    )

    const handleSkillTextChange = useCallback(
      (event: NativeSyntheticEvent<TextInputChangeEventData>) => {
        setSkillText(event.nativeEvent.text)
      },
      [],
    )

    const getSkill = React.useCallback(async () => {
      try {
        const response = await skillRepository.get(Number(accountId))
        setSkillList(response.skills)
      } catch (error) {
        console.log(error)
      }
    }, [accountId])

    const handleCreateSkills = React.useCallback(async () => {
      try {
        await skillRepository.create(skillList)
        showInfo('Skill updated!')
      } catch (error) {
        console.log(error)
      }
    }, [skillList])

    const handleDeleteSkill = useCallback(async (skill: string) => {
      try {
        const response = await skillRepository.delete(skill)
        setSkillList(response.skills)
        showInfo('Skill deleted!')
      } catch (error) {
        console.log(error)
      }
    }, [])

    const handleSkillListChange = React.useCallback((t_skillList: string[]) => {
      setSkillList(t_skillList)
    }, [])

    return [
      skillText,
      skillList,
      handleSkillTextChange,
      handleCreateSkills,
      handleDeleteSkill,
      handleSkillListChange,
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
    () => any,
    [any],
    (t_educationList: []) => void,
    (id: number) => void,
  ] {
    const [schoolName, setSchoolName] = useState<string>('')
    const [startDateEducation, setStartDateEducation] = useState<Date>(
      new Date(),
    )
    const [endDateEducation, setEndDateEducation] = useState<Date>(new Date())
    const [major, setMajor] = useState<string>('')
    const [degree, setDegree] = useState<string>('')
    const [loading, setLoading] = useState<boolean>(false)
    const [
      showStartDateEducationPicker,
      setShowStartDateEducationPicker,
    ] = useState<boolean>(false)
    const [
      showEndDateEducationPicker,
      setShowEndDateEducationPicker,
    ] = useState<boolean>(false)
    const [educationList, setEducationList] = useState<any>()
    const [accountId, setAccountId] = React.useGlobal<GlobalState, 'accountId'>(
      'accountId',
    )

    const handleSchooleNameChange = useCallback(
      (event: NativeSyntheticEvent<TextInputChangeEventData>) => {
        setSchoolName(event.nativeEvent.text)
      },
      [],
    )

    const handleStartDateEducationChange = useCallback((value: Date) => {
      setShowStartDateEducationPicker(false)
      setStartDateEducation(value)
    }, [])

    const handleStartDateEducationPickerPress = useCallback(() => {
      setShowStartDateEducationPicker(true)
    }, [])

    const handleEndDateEducationChange = useCallback((value: Date) => {
      setShowEndDateEducationPicker(false)
      setEndDateEducation(value)
    }, [])

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
        const response = await educationRepository.create(
          schoolName,
          toPythonString(startDateEducation),
          toPythonString(endDateEducation),
          major,
          degree,
        )

        setEducationList(response)
        showInfo('Created!')
        setSchoolName('')
        setStartDateEducation(new Date())
        setEndDateEducation(new Date())
        setMajor('')
        setDegree('')
      } catch (error) {
        console.log(error)
      }
    }, [schoolName, startDateEducation, endDateEducation, major, degree])

    const getEducation = React.useCallback(async () => {
      try {
        const response = await educationRepository.get(Number(accountId))
        setEducationList(response)
      } catch (error) {
        console.log(error)
      }
    }, [accountId])

    const handleEducationChange = React.useCallback(
      async (t_educationList: []) => {
        setEducationList(t_educationList)
      },
      [],
    )

    const handleDeleteEducation = useCallback(async (id: number) => {
      try {
        const response = await educationRepository.delete(id)
        setEducationList(response)
        showInfo('Deleted!')
      } catch (error) {
        console.log(error)
      }
    }, [])

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
      educationList,
      handleEducationChange,
      handleDeleteEducation,
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
    [any],
    ([]) => void,
  ] {
    const [companyName, setCompanyName] = useState<string>('')
    const [startDateExperience, setStartDateExperience] = useState<Date>(
      new Date(),
    )
    const [endDateExperience, setEndDateExperience] = useState<Date>(new Date())
    const [title, setTitle] = useState<string>('')
    const [description, setDescription] = useState<string>('')
    const [loading, setLoading] = useState<boolean>(false)
    const [
      showStartDateExperiencePicker,
      setShowStartDateExperiencePicker,
    ] = useState<boolean>(false)
    const [
      showEndDateExperiencePicker,
      setShowEndDateExperiencePicker,
    ] = useState<boolean>(false)
    const [experienceList, setExperienceList] = useState<any>()
    const [accountId, setAccountId] = React.useGlobal<GlobalState, 'accountId'>(
      'accountId',
    )
    const [itemId, setItemId] = useState<number>()

    const handleCompanyNameChange = useCallback(
      (event: NativeSyntheticEvent<TextInputChangeEventData>) => {
        setCompanyName(event.nativeEvent.text)
      },
      [],
    )

    const handleStartDateExperienceChange = useCallback((value: Date) => {
      setShowStartDateExperiencePicker(false)
      setStartDateExperience(value)
    }, [])

    const handleStartDateExperiencePickerPress = useCallback(() => {
      setShowStartDateExperiencePicker(true)
    }, [])

    const handleEndDateExperienceChange = useCallback((value: Date) => {
      setShowEndDateExperiencePicker(false)
      setEndDateExperience(value)
    }, [])

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
      setItemId(id)
    }

    const handleCreatExperience = React.useCallback(async () => {
      try {
        const response = await experienceRepository.create(
          companyName,
          toPythonString(startDateExperience),
          toPythonString(endDateExperience),
          title,
          description,
        )
        setExperienceList(response)
        setCompanyName('')
        setStartDateExperience(new Date())
        setEndDateExperience(new Date())
        setTitle('')
        setDescription('')
        showInfo('Created!')
      } catch (error) {
        console.log(error)
      }
    }, [
      companyName,
      startDateExperience,
      endDateExperience,
      title,
      description,
    ])

    const handleDeleteExperience = useCallback(async (id: number) => {
      try {
        const response = await experienceRepository.delete(id)
        setExperienceList(response)
        showInfo('Deleted!')
      } catch (error) {
        console.log(error)
      }
    }, [])

    const getExperience = React.useCallback(async () => {
      try {
        const response = await experienceRepository.get(Number(accountId))
        setExperienceList(response)
      } catch (error) {
        console.log(error)
      }
    }, [accountId])

    const handleExperienceChange = React.useCallback(
      async (t_experienceList) => {
        setExperienceList(t_experienceList)
      },
      [],
    )

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
      experienceList,
      handleExperienceChange,
    ]
  },
}
