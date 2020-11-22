import { Card, CardItem, Icon, Text, Thumbnail, View } from 'native-base'
import React from 'react'
import { Dimensions, StyleSheet, TouchableOpacity } from 'react-native'
import FastImage from 'react-native-fast-image'
import { toString } from '../../helpers/date-helper'
import { PostObject } from '../../repositories/feed-repository'
import { postService } from '../../services/post-service'
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

const styles = StyleSheet.create({
  bottomPost: {
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
    flexDirection: 'row',
    // justifyContent: 'space-between',
  },

  heartInterested: {
    color: color.brandDanger,
  },

  heartNotInterested: {
    color: color.brandDark,
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
    aspectRatio: 1.5,
    borderRadius: 20,
    justifyContent: 'flex-start',
    marginTop: 10,
    resizeMode: 'cover',
    width: screenWidth - 80,
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
  React.useEffect(() => {
    console.log(props)
  }, [])

  const [
    interestCount,
    interested,
    handleInterest,
    handleComment,
  ] = postService.usePost(props.post.id)
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
            <FastImage
              source={{ uri: props.post.postPicture }}
              style={styles.postImage}
            ></FastImage>
          ) : (
            <></>
          )}
        </View>
      </CardItem>
      <CardItem style={styles.bottomPost}>
        <TouchableOpacity onPress={handleInterest} style={{}}>
          {interested ? (
            <Icon name='heart' style={styles.heartInterested} />
          ) : (
            <Icon name='heart-outline' style={styles.heartNotInterested} />
          )}
        </TouchableOpacity>
        <TouchableOpacity onPress={handleComment}>
          <Icon name='chatbubble-outline' />
        </TouchableOpacity>
      </CardItem>
    </Card>
  )
}
