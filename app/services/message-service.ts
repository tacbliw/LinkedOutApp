import { useNavigation } from '@react-navigation/native'
import React from 'reactn'
import { showError } from '../helpers/toast'
import {
  ConversationListResponse,
  messageRepository,
} from '../repositories/message-repository'

export const messageService = {
  useConversationList(): [
    ConversationListResponse[],
    boolean,
    () => void,
    () => void,
    (id: number) => void,
  ] {
    const navigation = useNavigation()
    const [conversationList, setConversationList] = React.useState<
      ConversationListResponse[]
    >([])
    const [refreshing, setRefreshing] = React.useState<boolean>(false)

    const handleLoadOld = React.useCallback(async () => {
      if (conversationList.length > 0) {
        try {
          const r = await messageRepository.list(
            conversationList[conversationList.length - 1].lastMessageTimestamp,
          )
          if (r) {
            setConversationList([...conversationList, ...r])
          } else {
            showError('Conversation response empty')
          }
        } catch (error) {
          console.log(error)
          if (error.response?.data?.details) {
            console.log(error.response.data.details)
          }
        }
      }
    }, [conversationList])

    /**
     * Teporarily use refresh to load new messages.
     */
    const handleLoadNew = React.useCallback(async () => {
      setRefreshing(true)
      try {
        const response = await messageRepository.list(0)
        setConversationList(response)
      } catch (error) {
        showError('Error when loading messages')
        console.log(error)
      }
      setRefreshing(false)
    }, [])

    const handleItemPress = React.useCallback(
      (id: number) => {
        navigation.navigate('room', { id: id })
      },
      [navigation],
    )

    return [
      conversationList,
      refreshing,
      handleLoadOld,
      handleLoadNew,
      handleItemPress,
    ]
  },
}
