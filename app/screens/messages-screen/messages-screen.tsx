import { Header, Icon, Left, Right, Text, Thumbnail, View } from "native-base";
import React, { useCallback, useEffect, useState } from "react";
import { TouchableOpacity, ViewStyle } from "react-native";
import { Avatar, Bubble, GiftedChat, InputToolbar, Send, Time } from "react-native-gifted-chat";
// import { useNavigation } from "@react-navigation/native"
// import { useStores } from "../../models"
import { color } from "../../theme";

const ROOT: ViewStyle = {
  backgroundColor: color.palette.black,
  flex: 1,
}

export const MessagesScreen = function MessagesScreen({navigation}) {
  // Pull in one of our MST stores
  // const { someStore, anotherStore } = useStores()
  // OR
  // const rootStore = useStores()

  // Pull in navigation via hook
  // const navigation = useNavigation()
  const customInputToolbar = props => {
    return (
      <InputToolbar
       {...props} 
       containerStyle={{
         borderRadius: 100,
         borderTopWidth: 0,
         marginLeft: 16,
         marginRight: 16,
       }}></InputToolbar>
    )
  }

  const customSend = props => {
    return (
      <Send {...props} containerStyle={{justifyContent: 'center'}}>
          <Icon style={{fontSize: 26, marginRight: 8, color: color.brandPrimary}} name='arrow-up-outline'></Icon>
      </Send>
    )
  }

  const customAvatar = props => {
    return (
        <Avatar {...props} imageStyle={{
          left: {
            width: 36,
            height: 36,
            borderRadius: 100
          },
        }}></Avatar>
    )
  }

  const customBubble = props => {
    return (
      <Bubble
        {...props}
        wrapperStyle={{
          left: {
            backgroundColor: '#ffffff'
          }
        }}
      >

      </Bubble>
    )
  }

  const customTime = props => {
    return (
      <Time
        {...props}
        containerStyle={{
          left: {
            flex: 1,
            justifyContent: 'flex-end',
          }
        }}
      ></Time>
    )
  }

  const [messages, setMessages] = useState([]);

  useEffect(() => {
    setMessages([{
      _id: 1,
      text: 'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa',
      createdAt: new Date(),
      user: {
        _id: 2,
        name: 'React Native',
        avatar: 'https://placeimg.com/140/140/any',
      },
    }])
  }, [])

  const onSend = useCallback((messages = []) => {
    setMessages(previousMessages => GiftedChat.append(previousMessages, messages))
  }, [])
  return (
    <>
      <Header transparent>
        <Left>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <TouchableOpacity onPress={navigation.goBack}><Icon name='chevron-back-outline'></Icon></TouchableOpacity>
            <Thumbnail style={{marginLeft: 10}} small source={require('./avatar.jpg')}></Thumbnail>
            <Text style={{marginLeft: 10, fontWeight: '700', fontSize: 20}}>Sizai</Text>
          </View>
          </Left>
        <Right></Right>
      </Header>
      <GiftedChat
      messages={messages}
      onSend={messages => onSend(messages)}
      user={{
        _id: 1
      }}
      renderInputToolbar={props => customInputToolbar(props)}
      renderSend={props => customSend(props)}
      renderAvatar={props => customAvatar(props)}
      renderBubble={props => customBubble(props)}

      renderTime={props => customTime(props)}
      alwaysShowSend
      scrollToBottom
    ></GiftedChat>
    </>
  )
}
