import { useNavigation } from '@react-navigation/native'
import { NativeSyntheticEvent, TextInputChangeEventData } from 'react-native'
import React from 'reactn'
import { showError, showInfo } from '../helpers/toast'
import { JobListResponse, jobRepository } from '../repositories/job-repository'

export const jobService = {
  useJob(): [
    string,
    string,
    string,
    string,
    string,
    string[],
    string[],
    (event: NativeSyntheticEvent<TextInputChangeEventData>) => void,
    (event: NativeSyntheticEvent<TextInputChangeEventData>) => void,
    (event: NativeSyntheticEvent<TextInputChangeEventData>) => void,
    (event: NativeSyntheticEvent<TextInputChangeEventData>) => void,
    (event: NativeSyntheticEvent<TextInputChangeEventData>) => void,
    (city: string) => void,
    (skill: string[]) => void,
    () => void,
  ] {
    const navigation = useNavigation()

    const [title, setTitle] = React.useState<string>('')
    const [description, setDescription] = React.useState<string>('')
    const [seniorityLevel, setSeniorityLevel] = React.useState<string>('')
    const [recruitmentUrl, setRecruitmentUrl] = React.useState<string>('')
    const [employmentType, setEmploymentType] = React.useState<string>('')

    const [cities, setCities] = React.useState<string[]>([])
    const [skills, setSkills] = React.useState<string[]>([])

    const onTitleChange = React.useCallback(
      (event: NativeSyntheticEvent<TextInputChangeEventData>) => {
        setTitle(event.nativeEvent.text)
        console.log(event.nativeEvent.text)
      },
      [],
    )

    const onDescriptionChange = React.useCallback(
      (event: NativeSyntheticEvent<TextInputChangeEventData>) => {
        setDescription(event.nativeEvent.text)
      },
      [],
    )

    const onSeniorityLevelChange = React.useCallback(
      (event: NativeSyntheticEvent<TextInputChangeEventData>) => {
        setSeniorityLevel(event.nativeEvent.text)
      },
      [],
    )

    const onRecruitmentUrlChange = React.useCallback(
      (event: NativeSyntheticEvent<TextInputChangeEventData>) => {
        setRecruitmentUrl(event.nativeEvent.text)
      },
      [],
    )

    const onEmploymentTypeChange = React.useCallback(
      (event: NativeSyntheticEvent<TextInputChangeEventData>) => {
        setEmploymentType(event.nativeEvent.text)
      },
      [],
    )

    const onCityChange = React.useCallback((cities: string) => {
      setCities([cities])
    }, [])

    const onSkillsChange = React.useCallback((skills: string[]) => {
      setSkills(skills)
    }, [])

    const handleSave = React.useCallback(async () => {
      try {
        const response = await jobRepository
          .create(
            title,
            description,
            seniorityLevel,
            employmentType,
            recruitmentUrl,
            cities,
            skills,
          )
          .then(() => showInfo('job created'))
      } catch (error) {
        console.log(error)
      }
    }, [
      title,
      description,
      seniorityLevel,
      employmentType,
      recruitmentUrl,
      cities,
      skills,
    ])

    return [
      title,
      description,
      seniorityLevel,
      recruitmentUrl,
      employmentType,
      cities,
      skills,
      onTitleChange,
      onDescriptionChange,
      onSeniorityLevelChange,
      onRecruitmentUrlChange,
      onEmploymentTypeChange,
      onCityChange,
      onSkillsChange,
      handleSave,
    ]
  },

  useJobList(accountId: number): [JobListResponse] {
    const [jobList, setJobList] = React.useState<JobListResponse>([])

    const handleLoadNew = React.useCallback(async () => {
      try {
        const response = await jobRepository.list(accountId)
        setJobList(response)
      } catch (error) {
        showError('Error occured while loading job list')
        console.log(error)
      }
    }, [accountId])

    React.useEffect(() => {
      handleLoadNew()
    }, [handleLoadNew])

    return [jobList]
  },
}
