import { Header, Icon, List, ListItem } from "native-base"
import React from "react"
import { ScrollView, StyleSheet, ViewStyle } from "react-native"
import { TouchableOpacity } from "react-native-gesture-handler"
import { Post } from "../../components"
import { JobPost } from "../../components/job-post/job-post"
// import { useNavigation } from "@react-navigation/native"
// import { useStores } from "../../models"
import { color } from "../../theme"

const ROOT: ViewStyle = {
  backgroundColor: color.palette.black,
  flex: 1,
}

const styles = StyleSheet.create({
  headerContainer: {

  },

  container: {

  },

  header: {
    flexDirection: "row", 
    justifyContent: "space-between", 
    alignItems: "center", 
    // backgroundColor: color.backgroundColor, 
    // borderBottomWidth: 1, 
    // borderBottomColor: color.headerBottomLine
  }
})

const tweetActionSheetButton = [
  { text: "Not interested in this post", icon: "sad-outline", iconColor: color.brandLight},
  { text: "Unfollow", icon: "analytics", iconColor: color.brandLight  },
  { text: "Report", icon: "flag-outline", iconColor: color.brandLight  },
  { text: "Cancel", icon: "close", iconColor: color.brandLight  }
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

    <ScrollView>
      <Header transparent noShadow style={styles.header}>
        <TouchableOpacity onPress={() => {navigation.openDrawer();}}><Icon name="menu-outline" style={{color: color.brandLight}}></Icon></TouchableOpacity>
        <Icon name="settings-outline" style={{color: color.brandLight}}></Icon>
      </Header>
        <List>
          <ListItem noBorder>
            <Post
             avatarUri={require("./avatar1.jpg")}
             name="Siasa"
             date="30 Jul"
             content="Need 1 for ACM 😭😭😭😭😭😭😭😭😭😭"
             image={require('./avatar2.jpg')}
             ></Post>
          </ListItem>
          <ListItem noBorder>
            <JobPost
              avatarUri={require("./compass.png")}
              name="UI/UX Designer Fresher"
              date="Yesterday"
              place = "Ha Noi"
              seniority_level = "Fresher"
              ></JobPost>
          </ListItem>
        </List>
        </ScrollView>
    // </View>
  )


}
