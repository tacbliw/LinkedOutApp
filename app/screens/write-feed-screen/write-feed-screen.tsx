import { useNavigation } from '@react-navigation/native'
import { Header, Icon, Input, Text, Thumbnail, View } from 'native-base'
import React from 'react'
import { StyleSheet, TouchableOpacity } from 'react-native'
// import { useNavigation } from "@react-navigation/native"
// import { useStores } from "../../models"
import { color } from '../../theme'

const styles = StyleSheet.create({
  ROOT: {
    flex: 1,
  },
  body: {
    flexDirection: 'row',
    paddingLeft: 20,
    paddingRight: 100,
    // borderWidth: 1,
  },
  header: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  headerTitle: {
    color: color.palette.black,
    fontSize: 17,
    fontWeight: 'bold',
  },
  inputArea: {
    fontSize: 16,
    minHeight: 200,
    textAlignVertical: 'top',
  },
  inputView: {
    // borderWidth: 1,
    // borderColor: 'green',
    marginLeft: 16,
    paddingTop: 6,
  },
  postButtonActive: {
    color: color.brandPrimary,
    fontWeight: 'bold',
  },
  postButtonDeactive: {
    color: color.brandLight,
    fontWeight: 'bold',
  },
})

export const WriteFeedScreen = function WriteFeedScreen() {
  const navigation = useNavigation()

  const postDisabled = false
  return (
    <View style={styles.ROOT}>
      <Header transparent style={styles.header}>
        <TouchableOpacity
          onPress={() => {
            navigation.goBack()
          }}
        >
          <Icon name="close-outline" style={{ color: color.brandLight }}></Icon>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Create Post</Text>
        <TouchableOpacity onPress={() => {}} disabled={postDisabled}>
          <Text
            style={
              postDisabled ? styles.postButtonDeactive : styles.postButtonActive
            }
          >
            Post
          </Text>
        </TouchableOpacity>
      </Header>
      <View style={styles.body}>
        <Thumbnail source={require('../newsfeed-screen/avatar1.jpg')} />
        <View style={styles.inputView}>
          <Input
            style={styles.inputArea}
            placeholder="What's on your mind?"
            multiline
          />
        </View>
      </View>
    </View>
  )
}
