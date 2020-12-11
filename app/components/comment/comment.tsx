import React from 'react'
import { Dimensions, StyleSheet, Text, View } from 'react-native'
import FastImage from 'react-native-fast-image'
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
export const Comment = (props) => {
  return (
    <View style={styles.container}>
      <View style={styles.avatarContainer}>
        <FastImage style={styles.avatar} source={props.avatar} />
      </View>
      <View style={styles.contentContainer}>
        <Text>
          <Text style={[styles.text, styles.name]}>{props.name}</Text>{' '}
          <Text style={styles.text}>{props.content}</Text>
        </Text>
        <Text style={[styles.text, styles.created]}>{props.time}</Text>
      </View>
    </View>
  )
}
