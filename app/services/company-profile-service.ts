import React, { useCallback, useState } from "reactn"
import { GlobalState } from "../config/global"
import { showError, showInfo } from "../helpers/toast"
import { companyRepository } from "../repositories/company-repository"

export const companyProfileService = {
  useCompanyExist(): boolean {
    const [existed, setExisted] = React.useState(false)
    const [accountId, setAccountId] = React.useGlobal<GlobalState, 'accountId'>('accountId')

    const checkExist = React.useCallback(async () => {
      try {
        await companyRepository.get(Number(accountId))
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

  useGetCompany(): [
    string,
    string,
    string,
    string[],
    string,
    () => void
  ] {
    const [name, setName] = useState<string>('');
    const [website , setWebsite] = useState<string>('');
    const [profilePicture, setProfilePicture] = useState<string>('');
    const [specialties, setSpecialties] = useState<string[]>();
    const [description, setDescription] = useState<string>('');
    const [accountId, setAccountId] = React.useGlobal<GlobalState, 'accountId'>('accountId')
    const getInfo = React.useCallback(async () => {
      try {
        const response = await companyRepository.get(Number(accountId));
        setName(response.name);
        setWebsite(response.website);
        setProfilePicture(response.profilePicture);
        setSpecialties(response.specialties);
        setDescription(response.description);
      } catch (error) {
        if (error?.response?.data?.detail) {
          showError(error.response.data.detail)
        }
      }
    }, [accountId])
    React.useEffect(() => {
      getInfo()
    }, [getInfo])
    return [
      name,
      website,
      profilePicture,
      specialties,
      description,
      getInfo
    ]
  },

  useUpdateCompany(): [
    string,
    (text : string) => void,
    string,
    (text : string) => void,
    string[],
    (text: string[]) => void, 
    string,
    (text: string) => void,
    () => void
  ] {
    const [name, setName] = useState<string>('');
    const [website , setWebsite] = useState<string>('');
    const [specialties, setSpecialties] = useState<string[]>();
    const [description, setDescription] = useState<string>('');
    const [accountId, setAccountId] = React.useGlobal<GlobalState, 'accountId'>('accountId')
    
    const handleCompanyNameChange = useCallback(
      (text: string) => {
        setName(text)
      },
      [],
    )
    
    const handleWebsiteChange = useCallback(
      (text: string) => {
        setWebsite(text)
      },
      [],
    )

    const handleSpecialtiesChange = useCallback(
      (text: string[]) => {
        setSpecialties(text)
      },
      [],
    )

    const handleDescriptionChange = useCallback(
      (text: string) => {
        setDescription(text)
      },
      [],
    )

    const handleEditProfileSubmit = React.useCallback(async () => {
      try {
        await companyRepository.update(name, website, specialties, description)
        showInfo("edit profile submit")
      } catch (error) {
        if (error?.response?.data?.details) {
          showError(error.response.data.details)
        }
      }
    }, [name, website, specialties, description])

    return [
      name,
      handleCompanyNameChange,
      website,
      handleWebsiteChange,
      specialties,
      handleSpecialtiesChange,
      description,
      handleDescriptionChange,
      handleEditProfileSubmit
    ]
  }
}
