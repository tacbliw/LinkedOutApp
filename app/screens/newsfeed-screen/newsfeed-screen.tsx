import { Fab, Header, Icon, List, ListItem } from 'native-base'
import React from 'react'
import { ScrollView, StyleSheet, View, ViewStyle } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { Post } from '../../components'
import { JobPost } from '../../components/job-post/job-post'
import { screens } from '../../config/screens'
// import { useNavigation } from "@react-navigation/native"
// import { useStores } from "../../models"
import { color } from '../../theme'

const ROOT: ViewStyle = {
  backgroundColor: color.palette.black,
  flex: 1,
}

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

export const NewsfeedScreen = function NewsfeedScreen({ navigation }) {
  // Pull in one of our MST stores
  // const { someStore, anotherStore } = useStores()
  // OR
  // const rootStore = useStores()

  // Pull in navigation via hook
  // const navigation = useNavigation()
  return (
    // <Screen style={ROOT} preset="scroll">
    //   <Text preset="header" text="newsfeedScreen" />
    // </Screen>
    <View style={{ flex: 1 }}>
      <ScrollView>
        <Header transparent noShadow style={styles.header}>
          <TouchableOpacity
            onPress={() => {
              navigation.openDrawer()
            }}
          >
            <Icon
              name="menu-outline"
              style={{ color: color.brandLight }}
            ></Icon>
          </TouchableOpacity>
          <Icon
            name="settings-outline"
            style={{ color: color.brandLight }}
          ></Icon>
        </Header>
        <List>
          <ListItem noBorder>
            <Post
              avatarUri={require('./avatar1.jpg')}
              name="Siasa"
              date="30 Jul"
              content="Need 1 for ACM 😭😭😭😭😭😭😭😭😭😭"
              image={require('./avatar2.jpg')}
            ></Post>
          </ListItem>
          <ListItem noBorder>
            <JobPost
              avatarUri={require('./compass.png')}
              name="UI/UX Designer Fresher"
              date="Yesterday"
              place="Ha Noi"
              seniority_level="Fresher"
            ></JobPost>
          </ListItem>
        </List>
      </ScrollView>
      <Fab
        style={{ backgroundColor: color.brandPrimary }}
        onPress={() => {
          navigation.navigate(screens.authenticated.user.newsfeed.write)
        }}
      >
        <Icon name="brush-outline"></Icon>
      </Fab>
    </View>
  )
}
