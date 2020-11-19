import React from 'reactn'
import { GlobalState } from '../config/global'
import { showInfo } from "../helpers/toast"
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
  }
}
