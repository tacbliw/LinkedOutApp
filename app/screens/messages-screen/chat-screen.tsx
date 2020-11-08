import { observer } from 'mobx-react-lite';
import { Body, Button, Container, Content, Header, Icon, Left, Right, Title } from 'native-base';
import React from "react";
import { FlatList, ImageBackground, Text, TextInput, TouchableOpacity, View, ViewStyle } from 'react-native';
import { useState } from 'reactn';
import { BubbleChat } from '../../components';
import { screens } from '../../config/screens';
// import { useNavigation } from "@react-navigation/native"
// import { useStores } from "../../models"
import { color } from '../../theme';



const ROOT: ViewStyle = {
  backgroundColor: color.palette.black,
  flex: 1,
}

const datas = [
  {
    username: "admin",
    chatContent: "one"
  },
  {
    username: "user",
    chatContent: "two"
  },
  {
    username: "admin",
    chatContent: "three"
  },
  {
    username: "admin",
    chatContent: "four"
  },
  {
    username: "user",
    chatContent: "five"
  },
  {
    username: "admin",
    chatContent: "six"
  }
];

export const ChatScreen = observer(function ChatScreen({ navigation }) {
  // Pull in one of our MST stores
  // const { someStore, anotherStore } = useStores()
  // OR
  // const rootStore = useStores()

  // Pull in navigation via hook
  // const navigation = useNavigation()
  const [username, setUsername] = useState("admin");
  const [chatInputContent, setChatInputContent] = useState('');

  const renderChatLine = (item) => {
    if (item.username === username) {
      return (
        <View style={{ alignItems: 'flex-end' }} >
          <BubbleChat sender="YOU" chatContent={item.chatContent} />
        </View>
      );
    }
    return (
      <BubbleChat sender={item.userName} chatContent={item.chatContent} />
    );
  }

  const sendMessage = () => {
    return (
      <View style={{ alignItems: 'flex-end' }} >
        <BubbleChat sender="YOU" chatContent={chatInputContent} />
      </View>
    );
    setChatInputContent('');
  }

  return (
    // <Screen style={ROOT} preset="scroll">
    <Container>
      <Header>
        <Left>
          <Button transparent onPress={() => navigation.navigate(screens.authenticated.user.messages)}>
            <Icon name='arrow-back' />
          </Button>
        </Left>
        <Body>
          <Title>Admin</Title>
        </Body>
        <Right>
        </Right>
      </Header>
      <Content>
        <View style={{ flex: 1, flexDirection: 'column', justifyContent: 'flex-end'}}>
          <ImageBackground
            imageStyle={{ opacity: 0.4 }}
            source={require('./avatar.jpg')}
            style={{
              flex: 9 / 10,
              backgroundColor: '#A5A5A5',
              flexDirection: 'column',
              justifyContent: 'flex-end',
            }}
          >
            <FlatList
              data={datas}
              renderItem={({ item }, index) => renderChatLine(item)}
            />
          </ImageBackground>
          <View style={{ flex: 1 / 10 }}>
            <View
              style={{
                flexDirection: 'row',
                backgroundColor: '#FFF',
                width: '100%',
                height: '100%',
                justifyContent: 'space-around',
                alignItems: 'center',
                marginLeft: 2,
              }}
            >
              <View style={{ flex: 9 / 10}}>
                <TextInput
                  placeholder="Nhập nội dung chat"
                  value={chatInputContent}
                  multiline={true}
                  onChangeText={(text) => setChatInputContent(text)}
                  style={{ minHeight:50, fontSize: 18}}
                />
              </View>
              <View style={{ flex: 1 / 10}}>
                <TouchableOpacity onPress={() => sendMessage()}>
                  <Text style={{ color: '#0099ff', fontSize: 14, marginRight: 15 }}>
                    Gửi
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
        </Content>
    </Container>
    // </Screen>
  )
})
