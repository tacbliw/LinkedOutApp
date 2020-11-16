//import { styles } from "./styles"
// import { useNavigation } from "@react-navigation/native"
// import { useStores } from "../../models"
import {
  Badge,
  Icon,
  Thumbnail,
  View
} from 'native-base'
//import { default as React, default as React } from "react"
import React from 'react'
import { FlatList, TouchableOpacity } from 'react-native'
import { Screen, Text } from "../../components"
import { color } from '../../theme'
import { styles } from './styles'

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
    type: 'company',
  },
  {
    img: sanket,
    title: 'Kumar Sanket',
    note: 'One needs courage to be happy and smiling all time . . ',
    time: '1:12 pm',
    type: 'company',
  },
  {
    img: megha,
    title: 'Megha',
    note: 'Live a life style that matchs your vision',
    time: '10:03 am',
    type: 'company',
  },
  {
    img: atul,
    title: 'Atul Ranjan',
    note: 'Failure is temporary, giving up makes it permanent',
    time: '5:47 am',
    type: 'user',
  },
  {
    img: saurabh,
    title: 'Saurabh Sahu',
    note: 'The biggest risk is a missed opportunity !!',
    time: '11:11 pm',
    type: 'user',
  },
  {
    img: varun,
    title: 'Varun Sahu',
    note: '',
    time: '8:54 pm',
    type: 'user',
  },
  {
    img: varun,
    title: 'Varun Sahu',
    note: '',
    time: '8:54 pm',
    type: 'user',
  },
  {
    img: varun,
    title: 'Varun Sahu',
    note: '',
    time: '8:54 pm',
    type: 'user',
  },
  {
    img: varun,
    title: 'Varun Sahu',
    note: '',
    time: '8:54 pm',
    type: 'user',
  },
  {
    img: varun,
    title: 'Varun Sahu',
    note: '',
    time: '8:54 pm',
    type: 'user',
  }
]

const map_icon_notification = {}
map_icon_notification['company'] = {
  name: 'heart',
  backgroundColor: color.brandDanger,
}
map_icon_notification['user'] = {
  name: 'thumbs-up',
  backgroundColor: color.brandPrimary,
}
// map_icon_notification['notification'] = {
//   name: 'notifications',
//   backgroundColor: color.brandSuccess,
// }

const map_notification_type = {}
map_notification_type['company'] = 'Company'
map_notification_type['user'] = 'User '
//map_notification_type['notification'] = 'inform you, '

const Item = ({ item, onPress, style }) => (
  <TouchableOpacity onPress={onPress} style={style}>
    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
      <View style={{ position: 'relative'}}>
        <Thumbnail source={item.img}></Thumbnail>
        <Badge
          style={{ 
            position: 'absolute',
            bottom: 0,
            right: 0,
            borderWidth: 2,
            borderColor: color.background,
            backgroundColor: map_icon_notification[item.type]['backgroundColor'],
          }}
        >
          <Icon
            name={map_icon_notification[item.type]['name']}
            style={{ fontSize: 16, color: '#ffffff' }}
          ></Icon>
        </Badge>
      </View>
      <View style={styles.info} >
          <Text style={styles.name}>{item.title}</Text>
          <Text style={styles.type}>{map_notification_type[item.type]}</Text>
      </View>
      
    </View>
  </TouchableOpacity>
)

export const FollowingScreen = function FollowingScreen(navigation) {
  // Pull in one of our MST stores
  // const { someStore, anotherStore } = useStores()
  // OR
  // const rootStore = useStores()

  // Pull in navigation via hook
  // const navigation = useNavigation()


  // const [loading, setLoading] = useState(false);
  // const [dataSource, setDataSource] = useState([]);
  // const [offset, setOffset] = useState(1);
  // const [isListEnd, setIsListEnd] = useState(false);

  //return (
    // <Screen style={styles.container} preset="scroll">
    //   {/* <Text preset="header" text="followingScreen" /> */}
    //   {/* <SafeAreaView style={{flex: 1}}>
    //   <FlatList
    //     data={dataSource}
    //     keyExtractor={(item, index) => index.toString()}
    //     renderItem={ItemView}
    //     ListFooterComponent={renderFooter}
    //     onEndReached={getData}
    //     onEndReachedThreshold={0.5}
    //   />
    // </SafeAreaView>
    //  */}
    //  <Text style={styles.header}>FOLLOWING</Text>
    //  {/* <SafeAreaView style={{flex:1,}}>

    //    <FlatList>
        
    //    </FlatList>

    //  </SafeAreaView> */}

    
    // </Screen>

const renderItem = ({ item }) => {
  return (
    <Item
      item={item}
      onPress={() => {}} //
      style={styles.line}
    ></Item>
  )
}

return (
  <Screen style={styles.container}>
    {/* <Header transparent> */}
      {/* <Left style={{ flexGrow: 1 }}>
        <Text style={{ fontSize: 32, fontWeight: '700' }}>Notifications</Text>
      </Left>
      <Right></Right> */}
      <Text style={styles.header}>FOLLOWING</Text>
    {/* </Header> */}
    <FlatList
      data={datas}
      renderItem={renderItem}
      keyExtractor={(item) => item.title}
    ></FlatList>
  </Screen>
)
};