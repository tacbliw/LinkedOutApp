import { observer } from "mobx-react-lite"
import { Header, Icon, List, ListItem, Thumbnail, View } from "native-base"
import React from "react"
import { ScrollView, StyleSheet, ViewStyle } from "react-native"
import { TouchableOpacity } from "react-native-gesture-handler"
import { Post } from "../../components"
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
    backgroundColor: color.backgroundColor, 
    borderBottomWidth: 1, 
    borderBottomColor: color.headerBottomLine
  }
})

const tweetActionSheetButton = [
  { text: "Not interested in this post", icon: "sad-outline", iconColor: color.brandLight},
  { text: "Unfollow", icon: "analytics", iconColor: color.brandLight  },
  { text: "Report", icon: "flag-outline", iconColor: color.brandLight  },
  { text: "Cancel", icon: "close", iconColor: color.brandLight  }
]


export const NewsfeedScreen = observer(function NewsfeedScreen() {
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

    <View style={styles.container}>
      <Header noShadow style={styles.header}>
        <TouchableOpacity>
          <Thumbnail small source={require("./avatar1.jpg")} />
        </TouchableOpacity>
          <Thumbnail small source={require("./compass.png")}></Thumbnail>
          <TouchableOpacity>
            <Icon name="build-outline" style={{color: color.brandPrimary}}></Icon>
          </TouchableOpacity>
      </Header>
      <ScrollView style={{backgroundColor: color.backgroundColor}}>
        {/* Loop here. I'm lazy enough to copy paste this 3 times */}
        <List>
          <ListItem style={{marginLeft: 0}}>
            <Post
             avatarUri={require("./avatar1.jpg")}
             tag={["#ha"]}
             reaction={["1K", "1K", "1K", '1K']}
             name="Siasa"
             atname="LUL"
             date="30 Jul"
             content="Omeeaead"
             ></Post>
          </ListItem>
          <ListItem style={{marginLeft: 0}}>
            <Post
             avatarUri={require("./avatar2.jpg")}
             tag={["#ha"]}
             reaction={["1K", "1K", "1K", '1K']}
             name="Sama"
             atname="LUL"
             date="30 Jul"
             content="Omeeaead"
             ></Post>
          </ListItem>
          <ListItem style={{marginLeft: 0}}>
            <Post
             avatarUri={require("./avatar1.jpg")}
             tag={["#ha"]}
             reaction={["1K", "1K", "1K", '1K']}
             name="Siasa"
             atname="LUL"
             date="30 Jul"
             content="Omeeaead"
             ></Post>
          </ListItem>
        </List>
        </ScrollView>
    </View>
  )


})
