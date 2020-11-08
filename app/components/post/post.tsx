import { Card, CardItem, Icon, Text, Thumbnail, View } from 'native-base'
import * as React from 'react'
import {
  Dimensions,
  Image,
  ImageSourcePropType,
  StyleSheet,
  ViewStyle,
} from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
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
  style?: ViewStyle

  avatarUri?: ImageSourcePropType

  name?: string
  date?: string

  image?
  content?: string
}

const ROOT: ViewStyle = {
  backgroundColor: color.palette.black,
  flex: 1,
}

const styles = StyleSheet.create({
  post: {
    flexDirection: 'row',
  },

  postUserAvatar: {
    // marginLeft: 10,
    // marginTop: 10,
  },

  postContentContainer: {
    marginLeft: 10,
  },

  postUsername: {
    color: color.brandDark,
    fontWeight: '700',
    fontSize: 20,
  },

  postAtName: {
    color: color.brandLight,
  },

  postDate: {
    color: color.brandLight,
  },

  postContent: {
    width: 320,
    color: color.brandDark,
    fontSize: 20,
  },

  postTag: {
    color: color.brandPrimary,
  },

  postInteractionContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  postInteractionButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  reactionFontStyle: {
    color: color.brandDark,
  },

  postImage: {
    width: screenWidth * 0.8,
    height: 200,
    borderRadius: 15,
    marginTop: 16,
  },

  bottomPost: {
    justifyContent: 'space-between',
    borderBottomRightRadius: 15,
    borderBottomLeftRadius: 15,
  },

  topPost: {
    width: screenWidth * 0.9,
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    borderTopRightRadius: 15,
    borderTopLeftRadius: 15,
  },
})

/**
 * Describe your component here
 */
export function Post(props: PostProps) {
  return (
    <Card transparent style={{ borderWidth: 10 }}>
      <CardItem header style={styles.topPost}>
        <View style={{ flexDirection: 'row' }}>
          <Thumbnail style={styles.postUserAvatar} source={props.avatarUri} />
          <View style={{ marginLeft: 16 }}>
            <Text style={styles.postUsername}>{props.name}</Text>
            <Text style={styles.postDate}>{props.date}</Text>
          </View>
        </View>
        <View>
          <Icon name="ellipsis-horizontal-outline"></Icon>
        </View>
      </CardItem>
      <CardItem>
        <View>
          <Text style={styles.postContent}>{props.content}</Text>
          <Image source={props.image} style={styles.postImage}></Image>
        </View>
      </CardItem>
      <CardItem style={styles.bottomPost}>
        <TouchableOpacity>
          <Icon name="heart-outline"></Icon>
        </TouchableOpacity>
        <TouchableOpacity>
          <Icon name="chatbubble-outline"></Icon>
        </TouchableOpacity>
      </CardItem>
    </Card>
  )
}
