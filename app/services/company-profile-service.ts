import React from "reactn"
import { GlobalState } from "../config/global"
import { showInfo } from "../helpers/toast"
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
  }
}
