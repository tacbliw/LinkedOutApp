import { useNavigation } from '@react-navigation/native'
import React from 'reactn'
import { GlobalState } from '../config/global'
import { showError } from '../helpers/toast'
import {
  CompanyFollowedResponse,
  followRepository,
  UserFollowedResponse,
} from '../repositories/follow-repository'

export const followService = {
  useUserFollowed(): [UserFollowedResponse, boolean, () => void, () => void] {
    const navigation = useNavigation()
    const { accountId } = React.getGlobal<GlobalState>()

    const [users, setUsers] = React.useState<UserFollowedResponse>([])
    const [refreshing, setRefreshing] = React.useState<boolean>(false)

    const handleLoadNew = React.useCallback(async () => {
      setRefreshing(true)
      try {
        const response = await followRepository.userFollowed(
          parseInt(accountId),
        )
        setUsers(response)
      } catch (error) {
        showError('Error occured while loading following list')
        console.log(error)
      }
      setRefreshing(false)
    }, [accountId])

    const handleItemPress = React.useCallback(() => {}, [])

    React.useEffect(() => {
      handleLoadNew()
    }, [handleLoadNew])

    return [users, refreshing, handleLoadNew, handleItemPress]
  },

  useCompanyFollowed(accountId: number): [CompanyFollowedResponse] {
    const [companies, setCompanies] = React.useState<CompanyFollowedResponse>(
      [],
    )

    const handleLoadNew = React.useCallback(async () => {
      try {
        const response = await followRepository.companyFollowed(accountId)
        setCompanies(response)
      } catch (error) {
        showError('Error occured while loading following list')
        console.log(error)
      }
    }, [accountId])

    React.useEffect(() => {
      handleLoadNew()
    }, [handleLoadNew])

    return [companies]
  },

  useFollowerCount(accountId: number): [number] {
    const [count, setCount] = React.useState<number>(0)

    const countFollower = React.useCallback(async () => {
      try {
        const response = await followRepository.count(accountId)
        setCount(response.count)
      } catch (error) {
        showError('Error occured while loading follower count')
        console.log(error)
      }
    }, [accountId])

    React.useEffect(() => {
      countFollower()
    }, [countFollower])

    return [count]
  },

  useFollowingCount(accountId: number): [number] {
    const [count, setCount] = React.useState<number>(0)

    const countFollower = React.useCallback(async () => {
      try {
        const response = await followRepository.countFollowed(accountId)
        setCount(response.count)
      } catch (error) {
        showError('Error occured while loading following count')
        console.log(error)
      }
    }, [accountId])

    React.useEffect(() => {
      countFollower()
    }, [countFollower])

    return [count]
  },
}
