import { useNavigation } from '@react-navigation/native'
import React from 'reactn'
import { InterestCreateResponse, InterestDeleteResponse, interestRepository } from '../repositories/interest-repository'

export const postService = {
  usePost(id: number): [
    number,
    boolean,
    () => void,
    () => void,
  ] {
    const navigation = useNavigation()
    const [interestCount, setInterestCount] = React.useState<number>(0)
    const [interested, setInterested] = React.useState<boolean>(false)

    const checkInterest = React.useCallback(async () => {
      try {
        const response = await interestRepository.check(id)
        setInterested(response.interested)
      } catch (error) {
        console.log(error)
      }
    }, [id])

    const loadInterestCount = React.useCallback(async () => {
      try {
        const response = await interestRepository.count(id)
        setInterestCount(response.count)
      } catch (error) {
        console.log(error)
      }
    }, [id])

    const handleInterest = React.useCallback(async () => {
      try {
        let response: InterestCreateResponse | InterestDeleteResponse = null
        if (interested) {
          response = await interestRepository.delete(id)
        } else {
          response = await interestRepository.create(id)
        }
        setInterested(response.interested)
        if (response.interested) {
          setInterestCount(interestCount + 1)
        } else {
          setInterestCount(interestCount - 1)
        }
      } catch (error) {
        console.log(error)
      }
    }, [id, interested, interestCount])

    const handleCommentButton = React.useCallback(() => {
      // move to post details screen
    }, [])

    React.useEffect(() => {
      checkInterest()
      loadInterestCount()
    }, [id])

    return [
      interestCount,
      interested,
      handleInterest,
      handleCommentButton,
    ]
  },
}
