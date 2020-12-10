import { Fab, Header, Icon, ListItem, Text, Thumbnail } from 'native-base'
import React from 'react'
import { FlatList, StyleSheet, TouchableOpacity, View } from 'react-native'
import { Post } from '../../components'
import { JobPost } from '../../components/job-post/job-post'
import { screens } from '../../config/screens'
import { JobObject, PostObject } from '../../repositories/feed-repository'
import { feedService } from '../../services/feed-service'
import { color } from '../../theme'

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: {
    alignItems: 'center',
    backgroundColor: color.brandPrimary,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  logo: {
    resizeMode: 'contain',
    width: 120,
  },
  noData: {
    color: color.brandLight,
    flexDirection: 'column',
    justifyContent: 'center',
  },
})

export const NewsfeedScreen = function NewsfeedScreen({ navigation }) {
  const [
    onEndReachedCalledDuringMomentum,
    setOnEndReachedCalledDuringMomentum,
  ] = React.useState<boolean>(true)

  const [
    feed,
    refreshing,
    handleWriteFeed,
    handleJobPress,
    handleLoadOld,
    handleLoadNew,
  ] = feedService.useFeed()

  const renderFeedItem = ({ item }: { item: PostObject | JobObject }) => {
    if (item.type === 'post') {
      return (
        <ListItem style={{borderBottomWidth: 0}}>
          <Post post={item as PostObject} />
        </ListItem>
      )
    } else if (item.type === 'job') {
      return (
        <ListItem style={{borderBottomWidth: 0}}>
          <JobPost job={item as JobObject} handleItemPress={handleJobPress} />
        </ListItem>
      )
    }
    return <></>
  }

  return (
    <View style={styles.container}>
      <Header
        transparent
        noShadow
        style={styles.header}
        androidStatusBarColor={color.brandPrimary}
      >
        <TouchableOpacity
          onPress={() => {
            navigation.openDrawer()
          }}
        >
          <Icon
            name='menu-outline'
            style={{ color: color.palette.white }}
          ></Icon>
        </TouchableOpacity>
        <Thumbnail source={require('./logo-white.png')} style={styles.logo} />
        <Icon
          name='settings-outline'
          style={{ color: color.palette.white }}
          onPress={() => {
            navigation.navigate(screens.authenticated.user.settings)
          }}
        ></Icon>
      </Header>
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
