import { Badge, Header, Left, Right, Text, Thumbnail, View } from "native-base";
import React from "react";
import { Dimensions, FlatList, TouchableOpacity, ViewStyle } from 'react-native';
import { Screen } from "../../components";
// import { useNavigation } from "@react-navigation/native"
// import { useStores } from "../../models"
import { color } from '../../theme';

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

const ROOT: ViewStyle = {
  backgroundColor: color.palette.black,
  flex: 1,
}

const data = [
  {
    id: "1",
    name: "Belazo",
    last_message: "Imma get out",
    last_time: "5:50",
    avatarSource: "./avatar.jpg",
  },
  {
    id: "2",
    name: "Belazo",
    last_message: "Imma get out",
    last_time: "5:50",
    avatarSource: "./avatar.jpg",
  },
  {
    id: "3",
    name: "Belazo",
    last_message: "Imma get out",
    last_time: "5:50",
    avatarSource: "./avatar.jpg",
  }
]

const Item = ({ item, onPress, style }) => (
  <TouchableOpacity onPress={onPress} style={style}>
    <View style={{ flexDirection: 'row' }}>
      <Thumbnail source={require('./avatar.jpg')}></Thumbnail>
      <View style={{ flex: 1, justifyContent: 'space-around' }}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginLeft: 10 }}>
        <Text style={{ fontWeight: '700', fontSize: 20 }}>{item.name}</Text>
          <Text style={{ color: color.brandLight }}>{item.last_time}</Text>

        </View>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginLeft: 10 }}>
          <Text style={{ color: color.brandLight }}>{item.last_message}</Text>
          <Badge style={{ width: 22, height: 22, backgroundColor: color.brandPrimary }}><Text style={{ fontSize: 10 }}>5</Text></Badge>
        </View>
      </View>
    </View>
  </TouchableOpacity>
);

export const ChatScreen = function ChatScreen({ navigation }) {

  const renderItem = ({item}) => {
    return <Item 
              item={item}
              onPress={() => {navigation.navigate("room", {id: item.id})}} // pass id here
              style={{margin: 16}}
            ></Item>
  }

  return (
    <Screen>
      <Header transparent>
        <Left><Text style={{ fontSize: 32, fontWeight: '700' }}>Chats</Text></Left>
        <Right></Right>
      </Header>
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
      >
      </FlatList>
    </Screen>
  )
}
