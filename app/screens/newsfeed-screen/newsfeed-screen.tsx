import { Fab, Header, Icon, List, ListItem, Text } from 'native-base'
import React from 'react'
import { ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native'
import { Post } from '../../components'
import { JobPost } from '../../components/job-post/job-post'
import {
  FeedGetResponse,
  JobObject,
  PostObject,
} from '../../repositories/feed-repository'
import { feedService } from '../../services/feed-service'
import { color } from '../../theme'

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

const renderListFeed = (feed: FeedGetResponse) => {
  if (feed.length === 0) {
    console.log(feed)
    return (
      <ListItem key={0} style={styles.noData}>
        <Icon name='file-tray-outline'></Icon>
        <Text>No data</Text>
      </ListItem>
    )
  }
  return feed.map((item, index) => {
    if (item.type === 'post') {
      return (
        <ListItem key={index}>
          <Post post={item as PostObject} />
        </ListItem>
      )
    } else if (item.type === 'job') {
      return (
        <ListItem key={index}>
          <JobPost job={item as JobObject} />
        </ListItem>
      )
    }
  })
}

export const NewsfeedScreen = function NewsfeedScreen({ navigation }) {
  const [
    feed,
    handleWriteFeed,
    handleViewPost,
    handleViewJob,
    handleLoadOld,
    handleLoadNew,
  ] = feedService.useViewFeed()
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
      <ScrollView>
        <List>{renderListFeed(feed)}</List>
      </ScrollView>
      <Fab
        style={{ backgroundColor: color.brandPrimary }}
        onPress={handleWriteFeed}
      >
        <Icon name='brush-outline'></Icon>
      </Fab>
    </View>
  )
}
