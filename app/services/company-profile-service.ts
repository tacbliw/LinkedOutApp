import React, { useCallback, useState } from 'reactn'
import { GlobalState } from '../config/global'
import { showError, showInfo } from '../helpers/toast'
import {
  CompanyGetResponse,
  companyRepository
} from '../repositories/company-repository'
import { JobObject } from '../repositories/feed-repository'
import { jobRepository } from '../repositories/job-repository'

export const companyProfileService = {
  useCompanyExist(): boolean {
    const [existed, setExisted] = React.useState(false)
    const [accountId, setAccountId] = React.useGlobal<GlobalState, 'accountId'>(
      'accountId',
    )

    const checkExist = React.useCallback(async () => {
      try {
        await companyRepository.get(Number(accountId))
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

  useBasicInfo(): [CompanyGetResponse] {
    const { accountId } = React.getGlobal<GlobalState>()
    const [company, setCompany] = React.useState<CompanyGetResponse>()

    React.useEffect(() => {
      try {
        companyRepository.get(parseInt(accountId)).then((r) => {
          setCompany(r)
        })
      } catch (error) {
        console.log(error)
      }
    }, [])

    return [company]
  },

  useGetCompany(
    accountId: number,
  ): [
    string,
    string,
    string,
    string[],
    string,
    Array<JobObject>,
    () => void,
    () => void,
  ] {
    const [name, setName] = useState<string>('')
    const [website, setWebsite] = useState<string>('')
    const [profilePicture, setProfilePicture] = useState<string>('')
    const [specialties, setSpecialties] = useState<string[]>()
    const [description, setDescription] = useState<string>('')
    const [job, setJob] = useState<Array<JobObject>>([])
    
    const getInfo = React.useCallback(async () => {
      try {
        const response = await companyRepository.get(Number(accountId))
        setName(response.name)
        setWebsite(response.website)
        setProfilePicture(response.profilePicture)
        setSpecialties(response.specialties)
        setDescription(response.description)
      } catch (error) {
        if (error?.response?.data?.detail) {
          showError(error.response.data.detail)
        }
      }
    }, [accountId])

    const getCompanyJob = React.useCallback(async () => {
      try {
        const response = await jobRepository.list(Number(accountId))
        if (response.length > 3) {
          setJob(response.reverse().slice(0, 3))
        } else setJob(response.reverse())
      } catch (error) {
        showError(error.response.data.detail)
      }
    }, [accountId])

    React.useEffect(() => {
      getInfo()
    }, [getInfo])

    React.useEffect(() => {
      getCompanyJob()
    }, [getCompanyJob])
    return [
      name,
      website,
      profilePicture,
      specialties,
      description,
      job,
      getInfo,
      getCompanyJob,
    ]
  },

  useUpdateCompany(): [
    string,
    (text: string) => void,
    string,
    (text: string) => void,
    string,
    (text: string) => void,
    string[],
    (text: string[]) => void,
    string,
    (text: string) => void,
    () => void,
  ] {
    const [name, setName] = useState<string>('')
    const [website, setWebsite] = useState<string>('')
    const [profilePicture, setProfilePicture] = useState<string>('')
    const [specialties, setSpecialties] = useState<string[]>()
    const [description, setDescription] = useState<string>('')
    const [accountId, setAccountId] = React.useGlobal<GlobalState, 'accountId'>(
      'accountId',
    )

    const handleCompanyNameChange = useCallback((text: string) => {
      setName(text)
    }, [])

    const handleCompanyProfilePictureChange = useCallback((text: string) => {
      console.log('companyData.profilePicture: ' + text)
      setProfilePicture(text)
    }, [])

    const handleWebsiteChange = useCallback((text: string) => {
      setWebsite(text)
    }, [])

    const handleSpecialtiesChange = useCallback((text: string[]) => {
      setSpecialties(text)
    }, [])

    const handleDescriptionChange = useCallback((text: string) => {
      setDescription(text)
    }, [])

    const handleEditProfileSubmit = React.useCallback(async () => {
      try {
        await companyRepository.update(name, website, specialties, description)
        showInfo('Saved!')
      } catch (error) {
        console.log(error)
        if (error?.response?.data?.details) {
          showError(error.response.data.details)
        }
      }
    }, [name, website, specialties, description])

    return [
      name,
      handleCompanyNameChange,
      profilePicture,
      handleCompanyProfilePictureChange,
      website,
      handleWebsiteChange,
      specialties,
      handleSpecialtiesChange,
      description,
      handleDescriptionChange,
      handleEditProfileSubmit,
    ]
  },
}
