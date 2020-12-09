import { useNavigation } from '@react-navigation/native'
import React, { useCallback } from 'reactn'
import { GlobalState } from '../config/global'
import { showError, showInfo } from '../helpers/toast'
import {
  CompanyFollowedResponse,
  followRepository,
  UserFollowedResponse,
} from '../repositories/follow-repository'

export const followService = {
  useUserFollowed(): [
    UserFollowedResponse,
    boolean,
    () => void,
    () => void,
    (id: number) => void,
  ] {
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

    const deleteFollow = React.useCallback(
      async (id: number) => {
        try {
          const response = await followRepository.delete(id)
          handleLoadNew()
          showInfo('Unfollowed!')
        } catch (error) {
          showError('Error occured while delete following')
          console.log(error)
        }
      },
      [null],
    )

    const handleItemPress = React.useCallback(() => {}, [])

    React.useEffect(() => {
      handleLoadNew()
    }, [handleLoadNew])

    return [users, refreshing, handleLoadNew, handleItemPress, deleteFollow]
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

  useFollowerCount(accountId: number): [number, (num: number) => void] {
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
    const handleCountChange = useCallback(
      (num: number) => {
        setCount(count + num)
        console.log('followinggggggggggg')
      },
      [count],
    )

    React.useEffect(() => {
      countFollower()
    }, [countFollower])

    return [count, handleCountChange]
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

  useFollow(accountId: number): [boolean, () => void, () => void] {
    const [checkFollowed, setCheckFollowed] = React.useState<boolean>(true)

    const getCheckFollow = React.useCallback(async () => {
      try {
        const response = await followRepository.check(accountId)
        setCheckFollowed(response.followed)
      } catch (error) {
        showError('Error while checking follow')
        console.log(error)
      }
    }, [accountId])

    React.useEffect(() => {
      getCheckFollow()
    }, [getCheckFollow])

    const doFollow = React.useCallback(async () => {
      try {
        const response = await followRepository.create(accountId)
        setCheckFollowed(response.followed)
      } catch (error) {
        showError('Error while creating follow')
        console.log(error)
      }
    }, [accountId])

    const doUnFollow = React.useCallback(async () => {
      try {
        const response = await followRepository.delete(accountId)
        setCheckFollowed(response.followed)
      } catch (error) {
        showError('Error while deleting follow')
        console.log(error)
      }
    }, [accountId])

    return [checkFollowed, doFollow, doUnFollow]
  },
}
