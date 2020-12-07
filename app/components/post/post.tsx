import { Card, CardItem, Icon, Text, View } from 'native-base'
import React from 'react'
import { Dimensions, StyleSheet, TouchableOpacity } from 'react-native'
import FastImage from 'react-native-fast-image'
import { toString } from '../../helpers/date-helper'
import { toBackendUrl } from '../../helpers/string-helper'
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
    justifyContent: 'space-evenly',
  },

  commentContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },

  commentContent: {
    margin: 2,
  },

  interestContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },

  interestContent: {
    color: color.brandDanger,
    margin: 2,
  },

  intrContentLiked: {
    color: color.brandDark,
    margin: 2,
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
    aspectRatio: 1,
    borderRadius: 100,
    resizeMode: 'contain',
    width: 50,
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
    interestedCount,
    interested,
    handleInterest,
    handleComment,
  ] = postService.usePost(props.post.id)
  return (
    <Card transparent style={{ borderWidth: 10 }}>
      <CardItem header style={styles.topPost}>
        <View style={{ flexDirection: 'row' }}>
          <FastImage
            style={styles.postUserAvatar}
            source={{ uri: toBackendUrl(props.post.userProfilePicture) }}
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

          {props.post.postPicture &&
          !props.post.postPicture.includes('default') ? (
            <FastImage
              source={{ uri: toBackendUrl(props.post.postPicture) }}
              style={styles.postImage}
            ></FastImage>
          ) : (
            <></>
          )}
        </View>
      </CardItem>
      <CardItem style={styles.bottomPost}>
        <TouchableOpacity onPress={handleInterest}>
          {interested ? (
            <View style={styles.interestContainer}>
              <Icon name='heart' style={styles.interestContent} />
              {interestedCount > 0 ? (
                <Text style={styles.interestContent}>{interestedCount}</Text>
              ) : null}
            </View>
          ) : (
            <View style={styles.interestContainer}>
              <Icon name='heart-outline' style={styles.intrContentLiked} />
              {interestedCount > 0 ? (
                <Text style={styles.intrContentLiked}>{interestedCount}</Text>
              ) : null}
            </View>
          )}
        </TouchableOpacity>
        <TouchableOpacity
          onPress={handleComment}
          style={styles.commentContainer}
        >
          <Icon name='chatbubble-outline' style={styles.commentContent} />
          {props.post.commentCount > 0 ? (
            <Text style={styles.commentContent}>{props.post.commentCount}</Text>
          ) : null}
        </TouchableOpacity>
      </CardItem>
    </Card>
  )
}
