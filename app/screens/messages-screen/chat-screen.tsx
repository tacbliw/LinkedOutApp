import { Header, Icon, Left, ListItem, Right, Text, View } from 'native-base'
import React from 'react'
import {
  Dimensions,
  FlatList,
  StyleSheet,
  TouchableOpacity,
} from 'react-native'
import FastImage from 'react-native-fast-image'
import { Screen } from '../../components'
import { toTimeSince } from '../../helpers/date-helper'
import { toBackendUrl } from '../../helpers/string-helper'
import { ConversationListResponse } from '../../repositories/message-repository'
import { messageService } from '../../services/message-service'
import { color } from '../../theme'

const screenWidth = Dimensions.get('window').width
const screenHeight = Dimensions.get('window').height

const styles = StyleSheet.create({
  avatar: {
    aspectRatio: 1,
    borderRadius: 60,
    resizeMode: 'contain',
    width: 50,
  },
  noData: {
    color: color.brandLight,
    flexDirection: 'column',
    justifyContent: 'center',
  },
})

const Item = ({
  item,
  onPress,
  style,
}: {
  item: ConversationListResponse
  onPress: (id: number, name: string, profilePicture: string) => void
  style: any
}) => (
  <TouchableOpacity
    onPress={() => onPress(item.id, item.name, item.profilePicture)}
    style={style}
  >
    <View style={{ flexDirection: 'row' }}>
      <FastImage
        source={{ uri: toBackendUrl(item.profilePicture), cache: 'web' }}
        style={styles.avatar}
      />
      <View style={{ flex: 1, justifyContent: 'space-around' }}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginLeft: 10,
          }}
        >
          <Text style={{ fontWeight: '700', fontSize: 20 }}>{item.name}</Text>
          <Text style={{ color: color.brandLight }}>
            {toTimeSince(item.lastMessageTimestamp)}
          </Text>
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginLeft: 10,
          }}
        >
          <Text style={{ color: color.brandLight }}>
            {(item.outgoing ? 'You: ' : '') + item.lastMessageContent}
          </Text>
          {/* <Badge
            style={{
              width: 22,
              height: 22,
              backgroundColor: color.brandPrimary,
            }}
          >
            <Text style={{ fontSize: 10 }}>5</Text>
          </Badge> */}
        </View>
      </View>
    </View>
  </TouchableOpacity>
)

export const ChatScreen = function ChatScreen({ navigation }) {
  const [
    onEndReachedCalledDuringMomentum,
    setOnEndReachedCalledDuringMomentum,
  ] = React.useState<boolean>(true)

  const [
    conversationList,
    refreshing,
    handleLoadOld,
    handleLoadNew,
    handleLoadNewWithoutEffect,
    handleItemPress,
  ] = messageService.useConversationList()

  React.useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      handleLoadNewWithoutEffect()
    })
    return unsubscribe
  }, [handleLoadNewWithoutEffect, navigation])

  const renderItem = ({ item }: { item: ConversationListResponse }) => {
    return <Item item={item} onPress={handleItemPress} style={{ margin: 16 }} />
  }

  return (
    <Screen>
      <Header transparent androidStatusBarColor={color.brandPrimary}>
        <Left>
          <Text style={{ fontSize: 32, fontWeight: '700' }}>Chats</Text>
        </Left>
        <Right></Right>
      </Header>
      <FlatList
        data={conversationList}
        renderItem={renderItem}
        refreshing={refreshing}
        onRefresh={handleLoadNew}
        onEndReached={handleLoadOld}
        onEndReachedThreshold={0.01}
        keyExtractor={(item, index) => String(index)}
        ListEmptyComponent={
          <ListItem style={styles.noData}>
            <Icon name='file-tray-outline'></Icon>
            <Text>No conversation</Text>
          </ListItem>
        }
        onMomentumScrollBegin={() => {
          setOnEndReachedCalledDuringMomentum(false)
        }}
      ></FlatList>
    </Screen>
  )
}
