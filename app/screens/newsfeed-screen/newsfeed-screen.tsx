import { Fab, Header, Icon, List, ListItem } from 'native-base'
import React from 'react'
import { ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native'
import { Post } from '../../components'
import { JobPost } from '../../components/job-post/job-post'
import { JobObject, PostObject } from '../../repositories/feed-repository'
import { feedService } from '../../services/feed-service'
import { color } from '../../theme'

const styles = StyleSheet.create({
  container: {},
  header: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    // backgroundColor: color.backgroundColor,
    // borderBottomWidth: 1,
    // borderBottomColor: color.headerBottomLine
  },
  headerContainer: {},
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
    handleCommentButton,
    handleWriteFeed,
    handleViewPost,
    handleViewJob,
    handleLoadOld,
    handleLoadNew,
  ] = feedService.useViewFeed()
  return (
    <View style={{ flex: 1 }}>
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
