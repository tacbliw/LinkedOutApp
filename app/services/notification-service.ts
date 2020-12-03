import { useNavigation } from '@react-navigation/native'
import React from 'reactn'
import { showError } from '../helpers/toast'
import {
  NotificationListResponse,
  notificationRepository,
} from '../repositories/notification-repository'

export const notificationService = {
  useNotification(): [
    NotificationListResponse[],
    boolean,
    () => void,
    () => void,
    () => void,
  ] {
    const navigation = useNavigation()
    const [notificationList, setNotificationList] = React.useState<
      NotificationListResponse[]
    >([])
    const [refreshing, setRefreshing] = React.useState<boolean>(false)

    const handleLoadOld = React.useCallback(async () => {
      if (notificationList.length <= 0) return
      try {
        const r = await notificationRepository.list(
          notificationList[notificationList.length - 1].publishedDate,
        )
        if (r) {
          setNotificationList([...notificationList, ...r])
        } else {
          showError('Notification response empty')
        }
      } catch (error) {
        console.log(error)
        if (error.response?.data?.details) {
          console.log(error.response.data.details)
        }
      }
    }, [notificationList])

    const handleLoadNew = React.useCallback(async () => {
      setRefreshing(true)
      try {
        const response = await notificationRepository.list(0)
        setNotificationList(response)
      } catch (error) {
        showError('Error when loading notifications')
        console.log(error)
      }
      setRefreshing(false)
    }, [])

    const handleFeedOpen = React.useCallback(() => {}, [])

    React.useEffect(() => {
      handleLoadNew()
    }, [handleLoadNew])

    return [
      notificationList,
      refreshing,
      handleLoadNew,
      handleLoadOld,
      handleFeedOpen,
    ]
  },
}
