import { Header, Icon, Text, View } from 'native-base'
import React from 'react'
import { StyleSheet, TouchableOpacity } from 'react-native'
import FastImage from 'react-native-fast-image'
import {
  Avatar,
  Bubble,
  GiftedChat,
  InputToolbar,
  Send,
  Time,
} from 'react-native-gifted-chat'
import { toBackendUrl } from '../../helpers/string-helper'
import { messageService } from '../../services/message-service'
import { color } from '../../theme'

const styles = StyleSheet.create({
  avatar: {
    aspectRatio: 1,
    borderRadius: 60,
    marginLeft: 10,
    resizeMode: 'contain',
    width: 50,
  },
})

export const MessagesScreen = function MessagesScreen({ route, navigation }) {
  const customInputToolbar = (props) => {
    return (
      <InputToolbar
        {...props}
        containerStyle={{
          borderRadius: 100,
          borderTopWidth: 0,
          marginLeft: 16,
          marginRight: 16,
        }}
      ></InputToolbar>
    )
  }

  const customSend = (props) => {
    return (
      <Send {...props} containerStyle={{ justifyContent: 'center' }}>
        <Icon
          style={{ fontSize: 26, marginRight: 8, color: color.brandPrimary }}
          name='arrow-up-outline'
        ></Icon>
      </Send>
    )
  }

  const customAvatar = (props) => {
    return (
      <Avatar
        {...props}
        imageStyle={{
          left: {
            width: 29,
            height: 29,
            borderRadius: 100,
            resizeMode: 'contain',
          },
        }}
      ></Avatar>
    )
  }

  const customBubble = (props) => {
    return (
      <Bubble
        {...props}
        wrapperStyle={{
          left: {
            backgroundColor: '#ffffff',
            minWidth: 60,
          },
        }}
      ></Bubble>
    )
  }

  const customTime = (props) => {
    return (
      <Time
        {...props}
        containerStyle={{
          left: {
            flex: 1,
            justifyContent: 'flex-end',
          },
        }}
      />
    )
  }

  // const [messages, setMessages] = useState([])

  // useEffect(() => {
  //   setMessages([
  //     {
  //       _id: 1,
  //       text:
  //         'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa',
  //       createdAt: new Date(123 * 1000),
  //       user: {
  //         _id: 2,
  //         name: 'React Native',
  //         avatar: 'https://placeimg.com/140/140/any',
  //       },
  //     },
  //     {
  //       _id: 0,
  //       text: 'Lam ho bai tạp mobile voi',
  //       createdAt: new Date(12 * 1000),
  //       user: {
  //         _id: 2,
  //         name: 'React Native',
  //         avatar: 'https://placeimg.com/140/140/any',
  //       },
  //     },
  //     {
  //       _id: 2,
  //       text: 'bbbbb',
  //       createdAt: new Date(456 * 1000),
  //       user: {
  //         _id: 2,
  //         name: 'React Native',
  //         avatar: 'https://placeimg.com/140/140/any',
  //       },
  //     },
  //   ])
  // }, [])
  const [
    accountId,
    user,
    messages,
    loading,
    handleLoadOld,
    handleLoadNew,
    handleSend,
  ] = messageService.useConversation(
    route.params.id,
    route.params.name,
    route.params.profilePicture,
  )
  return (
    <>
      <Header
        transparent
        style={{
          borderBottomWidth: 1,
          borderBottomColor: color.palette.offWhite,
          marginTop: 5,
          paddingBottom: 5,
        }}
      >
        <View
          style={{
            flexDirection: 'row',
            flex: 1,
            alignItems: 'center',
          }}
        >
          <TouchableOpacity onPress={navigation.goBack}>
            <Icon name='chevron-back-outline'></Icon>
          </TouchableOpacity>
          <FastImage
            style={styles.avatar}
            source={{ uri: toBackendUrl(route.params.profilePicture) }}
          />
          <Text
            style={{ marginLeft: 10, fontWeight: '700', fontSize: 20 }}
            ellipsizeMode='tail'
            numberOfLines={1}
          >
            {route.params.name}
          </Text>
        </View>
      </Header>
      <GiftedChat
        messages={messages}
        onSend={(messages) => handleSend(messages)}
        user={{
          _id: accountId,
        }}
        renderInputToolbar={(props) => customInputToolbar(props)}
        renderSend={(props) => customSend(props)}
        renderAvatar={(props) => customAvatar(props)}
        renderBubble={(props) => customBubble(props)}
        renderTime={(props) => customTime(props)}
        onLoadEarlier={handleLoadOld}
        isLoadingEarlier={loading}
        loadEarlier
        infiniteScroll
        alwaysShowSend
        scrollToBottom
      ></GiftedChat>
    </>
  )
}
