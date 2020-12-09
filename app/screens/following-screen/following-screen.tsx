import { Card, CardItem, Header, Icon, Left, Text, View } from 'native-base'
import {
  FlatList,
  LogBox,
  ScrollView,
  TouchableOpacity,
  useWindowDimensions,
} from 'react-native'
import FastImage from 'react-native-fast-image'
import React from 'reactn'
import { Screen } from '../../components'
import { toBackendUrl } from '../../helpers/string-helper'
import { UserFollowedObject } from '../../repositories/follow-repository'
import { followService } from '../../services/follow-service'
import { color } from '../../theme/color'
import { styles } from './styles'

export const FollowingScreen = function FollowingScreen(navigation) {
  const followingWidth = useWindowDimensions().width / 2 - 50
  const followingMaxHeight = useWindowDimensions().height / 3

  LogBox.ignoreLogs(['VirtualizedLists should never be nested'])

  const EmptyCard = () => {
    return (
      <View style={{ flexDirection: 'row', alignSelf: 'center' }}>
        <Icon name='body'></Icon>
        <Text> Wow, such empty </Text>
        <Icon name='body'></Icon>
      </View>
    )
  }

  const renderItem = ({ item }: { item: UserFollowedObject }) => {
    return (
      <Card
        transparent
        style={{
          width: followingWidth,
          maxHeight: followingMaxHeight,
          marginLeft: 15,
          marginRight: 15,
        }}
      >
        <CardItem header style={styles.cardHeader}>
          <FastImage
            source={{ uri: toBackendUrl(item.profilePicture) }}
            style={{ width: 60, height: 60, borderRadius: 10 }}
          ></FastImage>
        </CardItem>
        <CardItem style={styles.cardBody}>
          <View>
            <Text style={{ fontWeight: 'bold' }}>
              {item.firstname + ' ' + item.lastname}
            </Text>
            {/* <Text>{item.description}</Text> */}
          </View>
        </CardItem>

        <CardItem style={styles.cardFooter} footer>
          <View
            style={{
              flexGrow: 1,
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <Text>
              {item.followedCount}{' '}
              {item.followedCount > 1 ? 'followers' : 'follower'}
            </Text>
            <TouchableOpacity
              onPress={() => {
                deleteFollow(item.id)
              }}
            >
              <Icon
                style={{ color: color['color-danger-500'] }}
                name='leaf'
              ></Icon>
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
    deleteFollow,
  ] = followService.useUserFollowed()

  // const [users, setUsers] = React.useState<UserFollowedResponse>([])

  return (
    <Screen style={styles.container}>
      <ScrollView>
        <Header transparent androidStatusBarColor={color.brandPrimary}>
          <Left style={{ flexGrow: 1 }}>
            <Text style={styles.header}>Following</Text>
          </Left>
        </Header>

        <FlatList
          contentContainerStyle={{
            flexDirection: 'column',
            marginTop: 10,
            marginBottom: 36,
            marginLeft: 16,
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
