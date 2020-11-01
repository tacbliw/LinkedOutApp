import { observer } from "mobx-react-lite";
import { Body, Button, Container, Content, Header, Icon, Left, List, ListItem, Right, Text, Thumbnail, Title } from 'native-base';
import React from "react";
import { ViewStyle } from "react-native";
import { screens } from "../../config/screens";
// import { useNavigation } from "@react-navigation/native"
// import { useStores } from "../../models"
import { color } from "../../theme";

const ROOT: ViewStyle = {
  backgroundColor: color.palette.black,
  flex: 1,
}

const pratik = require("./avatar.jpg");
const sanket = require("./avatar.jpg");
const megha = require("./avatar.jpg");
const atul = require("./avatar.jpg");
const saurabh = require("./avatar.jpg");
const varun = require("./avatar.jpg");

const datas = [
  {
    img: pratik,
    text: "Kumar Pratik",
    note: "Its time to build a difference . .",
    time: "3:43 pm"
  },
  {
    img: sanket,
    text: "Kumar Sanket",
    note: "One needs courage to be happy and smiling all time . . ",
    time: "1:12 pm"
  },
  {
    img: megha,
    text: "Megha",
    note: "Live a life style that matchs your vision",
    time: "10:03 am"
  },
  {
    img: atul,
    text: "Atul Ranjan",
    note: "Failure is temporary, giving up makes it permanent",
    time: "5:47 am"
  },
  {
    img: saurabh,
    text: "Saurabh Sahu",
    note: "The biggest risk is a missed opportunity !!",
    time: "11:11 pm"
  },
  {
    img: varun,
    text: "Varun Sahu",
    note: "Wish I had a Time machine . .",
    time: "8:54 pm"
  }
];
export const MessagesScreen = observer(function MessagesScreen({navigation}) {
  // Pull in one of our MST stores
  // const { someStore, anotherStore } = useStores()
  // OR
  // const rootStore = useStores()

  // Pull in navigation via hook
  // const navigation = useNavigation()
  return (
   // <Screen style={ROOT} preset="scroll">
      <Container>
        <Header>
          <Left>
            <Button transparent onPress = {() => navigation.navigate(screens.authenticated.user.newsfeed)}>
              <Icon name='arrow-back' />
            </Button>
          </Left>
          <Body>
            <Title>Messages</Title>
          </Body>
          <Right>
          </Right>
        </Header>
        <Content>
          <List
            dataArray={datas}
            renderRow={data =>
              <ListItem avatar onPress ={() => alert(data.text)}>
                <Left>
                  <Thumbnail small source={data.img} />
                </Left>
                <Body>
                  <Text>
                    {data.text}
                  </Text>
                  <Text numberOfLines={1} note>
                    {data.note}
                  </Text>
                </Body>
                <Right>
                  <Text note>
                    {data.time}
                  </Text>
                </Right>
              </ListItem>}
          />
        </Content>
      </Container>
   // </Screen>
  )
})
