import {
  Badge,
  Header,
  Icon,
  Left,
  Right,
  Text,
  Thumbnail,
  View,
} from 'native-base'
import React from 'react'
import { FlatList, TouchableOpacity } from 'react-native'
import { Screen } from '../../components'
// import { useNavigation } from "@react-navigation/native"
// import { useStores } from "../../models"
import { color } from '../../theme'

const pratik = require('./avatar.jpg')
const sanket = require('./avatar.jpg')
const megha = require('./avatar.jpg')
const atul = require('./avatar.jpg')
const saurabh = require('./avatar.jpg')
const varun = require('./avatar.jpg')

const datas = [
  {
    img: pratik,
    title: 'Kumar Pratik',
    note: 'Its time to build a difference . .',
    time: 'a minutes ago',
    type: 'like',
  },
  {
    img: sanket,
    title: 'Kumar Sanket',
    note: 'One needs courage to be happy and smiling all time . . ',
    time: '1:12 pm',
    type: 'like',
  },
  {
    img: megha,
    title: 'Megha',
    note: 'Live a life style that matchs your vision',
    time: '10:03 am',
    type: 'like',
  },
  {
    img: atul,
    title: 'Atul Ranjan',
    note: 'Failure is temporary, giving up makes it permanent',
    time: '5:47 am',
    type: 'like',
  },
  {
    img: saurabh,
    title: 'Saurabh Sahu',
    note: 'The biggest risk is a missed opportunity !!',
    time: '11:11 pm',
    type: 'notification',
  },
  {
    img: varun,
    title: 'Varun Sahu',
    note: '',
    time: '8:54 pm',
    type: 'love',
  },
]

const map_icon_notification = {}
map_icon_notification['love'] = {
  name: 'heart',
  backgroundColor: color.brandDanger,
}
map_icon_notification['like'] = {
  name: 'thumbs-up',
  backgroundColor: color.brandPrimary,
}
map_icon_notification['notification'] = {
  name: 'notifications',
  backgroundColor: color.brandSuccess,
}

const map_notification_type = {}
map_notification_type['love'] = 'love your post'
map_notification_type['like'] = 'like your post, '
map_notification_type['notification'] = 'inform you, '

const Item = ({ item, onPress, style }) => (
  <TouchableOpacity onPress={onPress} style={style}>
    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
      <View style={{ position: 'relative' }}>
        <Thumbnail source={item.img}></Thumbnail>
        <Badge
          style={{
            position: 'absolute',
            bottom: 0,
            right: 0,
            borderWidth: 2,
            borderColor: '#ffffff',
            backgroundColor:
              map_icon_notification[item.type]['backgroundColor'],
          }}
        >
          <Icon
            name={map_icon_notification[item.type]['name']}
            style={{ fontSize: 16, color: '#ffffff' }}
          ></Icon>
        </Badge>
      </View>
      <View style={{ flex: 1, justifyContent: 'space-around' }}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginLeft: 10,
          }}
        >
          <Text style={{ fontWeight: '700', fontSize: 20 }}>{item.title}</Text>
          <Text style={{ color: color.brandLight }}>{item.time}</Text>
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginLeft: 10,
          }}
        >
          <Text style={{ color: color.brandLight }}>
            <Text style={{ color: color.brandPrimary }}>
              {map_notification_type[item.type]}
            </Text>
            {item.note}
          </Text>
        </View>
      </View>
    </View>
  </TouchableOpacity>
)

export const NotificationsScreen = function NotificationsScreen(navigation) {
  // Pull in one of our MST stores
  // const { someStore, anotherStore } = useStores()
  // OR
  // const rootStore = useStores()

  // Pull in navigation via hook
  // const navigation = useNavigation()

  const renderItem = ({ item }) => {
    return (
      <Item
        item={item}
        onPress={() => {}} //
        style={{ margin: 16 }}
      ></Item>
    )
  }

  return (
    <Screen>
      <Header transparent>
        <Left style={{ flexGrow: 1 }}>
          <Text style={{ fontSize: 32, fontWeight: '700' }}>Notifications</Text>
        </Left>
        <Right></Right>
      </Header>
      <FlatList
        data={datas}
        renderItem={renderItem}
        keyExtractor={(item) => item.title}
      ></FlatList>
    </Screen>
  )
}
