import { useNavigation } from '@react-navigation/native'
import { GiftedChat } from 'react-native-gifted-chat'
import React from 'reactn'
import { GlobalState } from '../config/global'
import { toBackendUrl } from '../helpers/string-helper'
import { showError } from '../helpers/toast'
import {
  ConversationListResponse,
  messageRepository,
} from '../repositories/message-repository'
import { UserGetResponse } from '../repositories/user-repository'
import { userProfileService } from './user-profile-service'

export const messageService = {
  useConversationList(): [
    ConversationListResponse[],
    boolean,
    () => void,
    () => void,
    (id: number, name: string, profilePicture: string) => void,
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
     * Teporarily use refresh to load new conversations.
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
      (id: number, name: string, profilePicture: string) => {
        navigation.navigate('room', {
          id: id,
          name: name,
          profilePicture: profilePicture,
        })
      },
      [navigation],
    )

    React.useEffect(() => {
      handleLoadNew()
    }, [handleLoadNew])

    return [
      conversationList,
      refreshing,
      handleLoadOld,
      handleLoadNew,
      handleItemPress,
    ]
  },
  useConversation(
    otherId: number,
    otherName: string,
    otherProfilePicture: string,
  ): [
    number,
    UserGetResponse,
    any,
    boolean,
    () => void,
    () => void,
    (messages: any) => void,
  ] {
    const accountId = parseInt(React.getGlobal<GlobalState>().accountId)
    const [user] = userProfileService.useBasicInfo()
    const [messages, setMessages] = React.useState([])
    const [loading, setLoading] = React.useState<boolean>(false)

    const handleLoadOld = React.useCallback(async () => {
      console.log('handleLoadOldMessages')
      if (messages.length <= 0) return
      try {
        const r = await messageRepository.get(
          otherId,
          Math.round(messages[messages.length - 1].createdAt.getTime() / 1000),
        )
        if (r.length > 0) {
          setMessages([
            ...messages,
            ...r.map((item) => ({
              _id: item.id,
              text: item.content,
              createdAt: new Date(item.publishedDate * 1000),
              user: {
                _id: item.senderId,
                name:
                  item.senderId === accountId
                    ? user.firstname + ' ' + user.lastname
                    : otherName,
                avatar:
                  item.senderId === accountId
                    ? toBackendUrl(user.profilePicture)
                    : toBackendUrl(otherProfilePicture),
              },
            })),
          ])
        }
      } catch (error) {
        console.log(error)
        if (error.response?.data?.details) {
          console.log(error.response.data.details)
        }
      }
    }, [messages, accountId, otherId, otherName, otherProfilePicture, user])

    const handleLoadNew = React.useCallback(async () => {
      console.log(otherId)
      try {
        const r = await messageRepository.get(otherId, 0)
        if (r.length > 0) {
          setMessages(
            r.map((item) => ({
              _id: item.id,
              text: item.content,
              createdAt: new Date(item.publishedDate * 1000),
              user: {
                _id: item.senderId,
                name:
                  item.senderId === accountId
                    ? user.firstname + ' ' + user.lastname
                    : otherName,
                avatar:
                  item.senderId === accountId
                    ? toBackendUrl(user.profilePicture)
                    : toBackendUrl(otherProfilePicture),
              },
            })),
          )
        }
      } catch (error) {
        console.log(error)
        if (error.response?.data?.details) {
          console.log(error.response.data.details)
        }
      }
    }, [accountId, otherId, otherName, otherProfilePicture, user])

    const handleSend = React.useCallback(
      (messages = []) => {
        console.log(messages)
        setMessages((previousMessages) =>
          GiftedChat.append(previousMessages, messages),
        )
        try {
          messageRepository.send(otherId, 'text', messages[0].text)
        } catch (error) {
          console.log(error)
        }
      },
      [otherId],
    )

    React.useEffect(() => {
      handleLoadNew()
    }, [handleLoadNew])

    return [
      accountId,
      user,
      messages,
      loading,
      handleLoadOld,
      handleLoadNew,
      handleSend,
    ]
  },
}
