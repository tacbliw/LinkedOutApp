import { observer } from "mobx-react-lite";
import { Body, Button, Container, Content, Header, Icon, Left, List, ListItem, Right, Text, Thumbnail, Title } from "native-base";
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
    title: "Kumar Pratik",
    note: "Its time to build a difference . .",
    time: "3:43 pm"
  },
  {
    img: sanket,
    title: "Kumar Sanket",
    note: "One needs courage to be happy and smiling all time . . ",
    time: "1:12 pm"
  },
  {
    img: megha,
    title: "Megha",
    note: "Live a life style that matchs your vision",
    time: "10:03 am"
  },
  {
    img: atul,
    title: "Atul Ranjan",
    note: "Failure is temporary, giving up makes it permanent",
    time: "5:47 am"
  },
  {
    img: saurabh,
    title: "Saurabh Sahu",
    note: "The biggest risk is a missed opportunity !!",
    time: "11:11 pm"
  },
  {
    img: varun,
    title: "Varun Sahu",
    note: "Wish I had a Time machine . .",
    time: "8:54 pm"
  }
];

export const NotificationsScreen = observer(function NotificationsScreen(navigation) {
  // Pull in one of our MST stores
  // const { someStore, anotherStore } = useStores()
  // OR
  // const rootStore = useStores()

  // Pull in navigation via hook
  // const navigation = useNavigation()
  return (
    <Container>
        <Header>
          <Left>
            <Button transparent onPress = {() => navigation.navigate(screens.authenticated.user.newsfeed)}>
              <Icon name='arrow-back' />
            </Button>
          </Left>
          <Body>
            <Title>Notifications</Title>
          </Body>
          <Right>
          </Right>
        </Header>
        <Content>
          <List
            dataArray={datas}
            renderRow={data =>
              <ListItem thumbnail onPress ={() => alert(data.title)}>
                <Left>
                  <Thumbnail square source={data.img} />
                </Left>
                <Body>
                  <Text>
                    {data.title}
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
  )
})
