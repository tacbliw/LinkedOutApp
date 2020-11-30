import { Fab, Header, Icon, ListItem, Text } from 'native-base'
import React from 'react'
import {
  Dimensions,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native'
import { Post } from '../../components'
import { JobPost } from '../../components/job-post/job-post'
import { JobObject, PostObject } from '../../repositories/feed-repository'
import { feedService } from '../../services/feed-service'
import { color } from '../../theme'

const { width, height } = Dimensions.get('window')

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    // backgroundColor: color.backgroundColor,
    // borderBottomWidth: 1,
    // borderBottomColor: color.headerBottomLine
  },
  noData: {
    color: color.brandLight,
    flexDirection: 'column',
    justifyContent: 'center',
  },
})

const tweetActionSheetButton = [
  {
    text: 'Not interested in this post',
    icon: 'sad-outline',
    iconColor: color.brandLight,
  },
  { text: 'Unfollow', icon: 'analytics', iconColor: color.brandLight },
  { text: 'Report', icon: 'flag-outline', iconColor: color.brandLight },
  { text: 'Cancel', icon: 'close', iconColor: color.brandLight },
]

const renderFeedItem = ({ item }: { item: PostObject | JobObject }) => {
  if (item.type === 'post') {
    return (
      <ListItem>
        <Post post={item as PostObject} />
      </ListItem>
    )
  } else if (item.type === 'job') {
    return (
      <ListItem>
        <JobPost job={item as JobObject} />
      </ListItem>
    )
  }
  return <></>
}

export const NewsfeedScreen = function NewsfeedScreen({ navigation }) {
  const [
    onEndReachedCalledDuringMomentum,
    setOnEndReachedCalledDuringMomentum,
  ] = React.useState<boolean>(true)
  const [
    feed,
    refreshing,
    handleWriteFeed,
    handleViewPost,
    handleViewJob,
    handleLoadOld,
    handleLoadNew,
  ] = feedService.useFeed()
  return (
    <View style={styles.container}>
      <Header transparent noShadow style={styles.header}>
        <TouchableOpacity
          onPress={() => {
            navigation.openDrawer()
          }}
        >
          <Icon name='menu-outline' style={{ color: color.brandLight }}></Icon>
        </TouchableOpacity>
        <Icon
          name='settings-outline'
          style={{ color: color.brandLight }}
        ></Icon>
      </Header>
      {/* <ScrollView>
        <List>{renderListFeed(feed)}</List>
      </ScrollView> */}
      <FlatList
        data={feed}
        renderItem={renderFeedItem}
        refreshing={refreshing}
        onRefresh={handleLoadNew}
        onEndReached={handleLoadOld}
        onEndReachedThreshold={0.01}
        keyExtractor={(item, index) => String(index)}
        ListEmptyComponent={
          <ListItem style={styles.noData}>
            <Icon name='file-tray-outline'></Icon>
            <Text>No data</Text>
          </ListItem>
        }
        onMomentumScrollBegin={() => {
          setOnEndReachedCalledDuringMomentum(false)
        }}
      />
      <Fab
        style={{ backgroundColor: color.brandPrimary }}
        onPress={handleWriteFeed}
      >
        <Icon name='brush-outline'></Icon>
      </Fab>
    </View>
  )
}
