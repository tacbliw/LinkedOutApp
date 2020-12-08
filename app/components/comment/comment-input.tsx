import React, { useState } from 'react'
import { Dimensions, Image, StyleSheet, TextInput, View } from 'react-native'
const screenWidth = Math.round(Dimensions.get('window').width)
const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
  },
  avatarContainer: {
    alignItems: 'center',
    marginLeft: 5,
    paddingTop: 10,
    width: 40,
  },
  contentContainer: {
    flex: 1,
    //borderBottomWidth: 1,
    borderColor: '#EEE',
    padding: 5,
  },
  avatar: {
    borderWidth: 1,
    borderColor: '#EEE',
    borderRadius: 13,
    width: 40,
    height: 40,
  },
  text: {
    color: '#000',
    fontFamily: 'Avenir',
    fontSize: 15,
  },
  name: {
    fontWeight: 'bold',
  },
  created: {
    color: '#BBB',
    marginBottom: 5,
  },
})
export const CommentInput = (props) => {
  const [commentContent, setCommentContent] = useState('')
  return (
    <View style={styles.container}>
      <View style={styles.avatarContainer}>
        <Image
          // resizeMode='contain'
          style={styles.avatar}
          source={props.avatar}
        />
      </View>
      <View style={styles.contentContainer}>
        <TextInput
          placeholder='add comment'
          value={commentContent}
          multiline={true}
          onChangeText={(text) => setCommentContent(text)}
          style={{ minHeight: 50, fontSize: 18 }}
        />
      </View>
    </View>
  )
}
