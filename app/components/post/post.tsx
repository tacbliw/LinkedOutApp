import { Card, CardItem, Icon, Text, Thumbnail, View } from 'native-base'
import * as React from 'react'
import {
  Dimensions,
  Image,
  StyleSheet,
  TouchableOpacity,
  ViewStyle,
} from 'react-native'
import { toString } from '../../helpers/date-helper'
import { PostObject } from '../../repositories/feed-repository'
import { color } from '../../theme'

const screenWidth = Math.round(Dimensions.get('window').width)
const screenHeight = Math.round(Dimensions.get('window').height)

const postActionSheetButton = [
  {
    text: 'Not interested in this post',
    icon: 'sad-outline',
    iconColor: color.brandLight,
  },
  { text: 'Unfollow', icon: 'analytics', iconColor: color.brandLight },
  { text: 'Report', icon: 'flag-outline', iconColor: color.brandLight },
  { text: 'Cancel', icon: 'close', iconColor: color.brandLight },
]

export interface PostProps {
  /**
   * An optional style override useful for padding & margin.
   */
  post: PostObject
}

const ROOT: ViewStyle = {
  backgroundColor: color.palette.black,
  flex: 1,
}

const styles = StyleSheet.create({
  bottomPost: {
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
    justifyContent: 'space-between',
  },

  postContent: {
    color: color.brandDark,
    fontSize: 20,
    width: 320,
  },

  postDate: {
    color: color.brandLight,
  },

  postImage: {
    borderRadius: 15,
    height: 200,
    marginTop: 16,
    width: screenWidth * 0.8,
  },

  postUserAvatar: {
    // marginLeft: 10,
    // marginTop: 10,
  },

  postUsername: {
    color: color.brandDark,
    fontSize: 20,
    fontWeight: '700',
  },

  topPost: {
    alignItems: 'flex-start',
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    justifyContent: 'space-between',
    width: screenWidth * 0.9,
  },
})

export function Post(props: PostProps) {
  return (
    <Card transparent style={{ borderWidth: 10 }}>
      <CardItem header style={styles.topPost}>
        <View style={{ flexDirection: 'row' }}>
          <Thumbnail
            style={styles.postUserAvatar}
            source={{ uri: props.post.userProfilePicture }}
          />
          <View style={{ marginLeft: 16 }}>
            <Text
              style={styles.postUsername}
            >{`${props.post.userFirstname} ${props.post.userLastname}`}</Text>
            <Text style={styles.postDate}>
              {toString(props.post.publishedDate)}
            </Text>
          </View>
        </View>
        <View>
          <Icon name='ellipsis-horizontal-outline'></Icon>
        </View>
      </CardItem>
      <CardItem>
        <View>
          {props.post.content ? (
            <Text style={styles.postContent}>{props.post.content}</Text>
          ) : (
            <></>
          )}
          {props.post.postPicture ? (
            <Image
              source={{ uri: props.post.postPicture }}
              style={styles.postImage}
            ></Image>
          ) : (
            <></>
          )}
        </View>
      </CardItem>
      <CardItem style={styles.bottomPost}>
        <TouchableOpacity>
          <Icon name='heart-outline'></Icon>
        </TouchableOpacity>
        <TouchableOpacity>
          <Icon name='chatbubble-outline'></Icon>
        </TouchableOpacity>
      </CardItem>
    </Card>
  )
}
