import { observer } from "mobx-react-lite";
import { Body, Button, Container, Content, Header, Icon, Left, List, ListItem, Right, Text, Thumbnail } from "native-base";
import React from "react";
import { StyleSheet, TextInput, View, ViewStyle } from "react-native";
// import { useNavigation } from "@react-navigation/native"
// import { useStores } from "../../models"
import { color } from "../../theme";


const ROOT: ViewStyle = {
  backgroundColor: color.palette.black,
  flex: 1,
}

const styles = StyleSheet.create({

  container: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    height:40,
    borderColor: 'gray',
    borderWidth: 2, 
    borderRadius: 20,   
    fontSize: 18,
  },
  inputStyle: {
    flex: 1,
    fontSize: 14,
    marginLeft : 5
  }
})

const megha = require("./avatar.jpg");

const datas = [
  {
    img: megha,
    name: "Siraj",
    time: "1m",
    text: "Love sightseeing"
  },
  {
    img: megha,
    name: "Siraj",
    time: "1m",
    text: "Love sightseeing"
  },
  {
    img: megha,
    name: "Siraj",
    time: "1m",
    text: "Love sightseeing"
  }
];

export const SearchScreen = observer(function SearchScreen() {
  // Pull in one of our MST stores
  // const { someStore, anotherStore } = useStores()
  // OR
  // const rootStore = useStores()

  // Pull in navigation via hook
  // const navigation = useNavigation()
  return (
    <Container>
      <Header>
        <Body>
        <View style={styles.container}>
          <TextInput
            style={styles.inputStyle}
            autoCorrect={false}
            placeholder="Search"
          />
          <Icon name='search-circle-outline' style={{fontSize: 35,color: 'red', marginRight: 2}} />
        </View>
        </Body>
      </Header>
      <Content>
      <List
            dataArray={datas}
            renderRow={data =>
              <ListItem thumbnail onPress ={() => alert(data.text)}>
                <Left>
                  <Thumbnail square source={data.img} />
                </Left>
                <Body>
                  <Text>
                    {data.name}
                  </Text>
                  <Text numberOfLines={1} note>
                    {data.text}
                  </Text>
                </Body>
                <Right>
                  <Button bordered rounded><Text>Follow</Text></Button>
                </Right>
              </ListItem>}
          />
      </Content>
    </Container>
  )
})
