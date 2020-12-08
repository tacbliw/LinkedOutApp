import { Card, CardItem, Header, Icon, Left, Text, Thumbnail, View } from 'native-base'
import { FlatList, ScrollView, TouchableOpacity, useWindowDimensions } from 'react-native'
import React from 'reactn'
import { Screen } from '../../components'
import { toBackendUrl } from '../../helpers/string-helper'
import { UserFollowedObject } from '../../repositories/follow-repository'
import { followService } from '../../services/follow-service'
import { color } from '../../theme/color'
import { styles } from './styles'

export const FollowingScreen = function FollowingScreen(navigation) {

  const following_width = useWindowDimensions().width/2 - 50;
  const following_max_height = useWindowDimensions().height/3;

  const EmptyCard = () => {
    return (
      // <Card transparent style={{width: following_width, minHeight: 400, marginLeft: 15, marginRight: 15}}>
      // <CardItem style={styles.cardBody}>
        <View style={{flexDirection: 'row', alignSelf: 'center'}}>
          <Icon name="body"></Icon>
          <Text> Wow, such empty </Text>
          <Icon name="body"></Icon>
        </View>
      // </CardItem>
    // </Card>
    )
  }

  const renderItem = ({ item } : {item: UserFollowedObject}) => {
    console.log(toBackendUrl(item.profilePicture));
    return (
      <Card transparent style={{width: following_width, maxHeight: following_max_height, marginLeft: 15, marginRight: 15}}>
        <CardItem header style={styles.cardHeader}>
          {/* <Thumbnail ></Thumbnail> */}
          {/* <FastImage source={{uri: toBackendUrl(item.profilePicture)}} style={{width: 60}}></FastImage> */}
          <Thumbnail source={{ uri: toBackendUrl(item.profilePicture) }}></Thumbnail>
        </CardItem>
        <CardItem style={styles.cardBody}>
          <View>
            <Text style={{fontWeight: 'bold'}}>{item.firstname + " " + item.lastname}</Text>
            {/* <Text>{item.description}</Text> */}
          </View>
        </CardItem>

        <CardItem style={styles.cardFooter} footer>
          <View style={{flexGrow: 1, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
            <Text>{item.followedCount} followers</Text>
            <TouchableOpacity onPress={() => { 
              deleteFollow(item.id);
              }}>
              <Icon style={{color: color['color-danger-500'] }} name="leaf"></Icon>
            </TouchableOpacity>
          </View>
        </CardItem>
      </Card>
    )
  }

  const [
    users, 
    refreshing, 
    handleLoadNew,
    handleItemPress,
    deleteFollow
  ] = followService.useUserFollowed()

  // const [users, setUsers] = React.useState<UserFollowedResponse>([])

  return (
    <Screen style={styles.container}>
      <ScrollView>
      {/* <Header transparent> */}
      {/* <Left style={{ flexGrow: 1 }}>
        <Text style={{ fontSize: 32, fontWeight: '700' }}>Notifications</Text>
      </Left>
      <Right></Right> */}
      <Header transparent>
        <Left style={{ flexGrow: 1 }}>
          <Text style={styles.header}>Following</Text>
        </Left>
      </Header>

      {/* </Header> */}
      <FlatList
        contentContainerStyle={{
          flexDirection: 'column',
          // flexWrap: 'wrap',
          // justifyContent: 'center',
          // alignItems: '',
          // alignContent: 'center',
          // alignItems: 'stretch',
          marginTop: 36,
          marginBottom: 36,
          marginLeft: 16
        }}
        numColumns={2}
        data={users}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        ListEmptyComponent={() => EmptyCard()}
      ></FlatList>
      </ScrollView>
    </Screen>
  )
}
