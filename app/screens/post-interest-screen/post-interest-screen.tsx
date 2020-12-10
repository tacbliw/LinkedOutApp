import moment from 'moment'
import {
  CardItem,
  Container,
  Content,
  Input,
  Item,
  Spinner,
  Text,
  Thumbnail,
  View
} from 'native-base'
import { Dimensions, FlatList, Image, ScrollView, TouchableOpacity } from 'react-native'
import React, { getGlobal, useEffect, useState } from 'reactn'
import { GlobalState } from '../../config/global'
import { toBackendUrl } from '../../helpers/string-helper'
import { CommentListResponse } from '../../repositories/comment-repository'
import { postService } from '../../services/post-service'
import { userProfileService } from '../../services/user-profile-service'
import { color } from '../../theme/color'

const screenWidth = Math.round(Dimensions.get('window').width)
const screenHeight = Math.round(Dimensions.get('window').height)

export const PostInterestScreen = function PostInterestScreen({
  route,
  navigation,
}) {

  const renderComment = ({ item }: { item: CommentListResponse }) => {
    return (
      <View style={{ flexDirection: 'row', marginBottom: 16 }}>
        <Thumbnail small source={{ uri: toBackendUrl(item.userProfilePicture) }} />
        <View style={{ marginLeft: 16 }}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Text style={{ fontWeight: 'bold' }}>{item.userFirstname + " " + item.userLastname}</Text>
            <Text note style={{ marginLeft: 5 }}>{moment.unix(item.publishedDate).fromNow()}</Text>
          </View>
          <View style={{ maxWidth: screenWidth * 0.7 }}>
            <Text>{item.content}</Text>
          </View>
        </View>

      </View>
    )
  }

  const { postId } = route.params;
  const [
    commentList,
    comment,
    handleCommentChange,
    handlePostComment
  ] = postService.usePostComment(postId)

  const [post, getPostById, setPostByCache] = postService.usePostObjectOnly()

  const accountId = parseInt(getGlobal<GlobalState>().accountId)

  const [loading, setLoading] = useState<Boolean>(true)

  const [
    firstName,
    lastName,
    gender,
    dateOfBirth,
    profilePicture,
    description,
    getInfo,
  ] = userProfileService.useGetUser(accountId)

  useEffect(() => {
    setLoading(true);
    if (route.params.post) {
      setPostByCache(route.params.post);
    }
    else {
      getPostById(postId);
    }
    setLoading(false);
  }, [postId])


  if (post == null) {
    return (
      <Container>
        <Content>
          <Spinner style={{ marginTop: 64 }} color={color['color-primary-500']} />
        </Content>
      </Container>
    )
  }
  else {
    return (
      <ScrollView style={{ backgroundColor: '#FFFFFF' }}>
        <CardItem style={{ justifyContent: 'center' }}>
          <Image
            source={{ uri: toBackendUrl(post.postPicture) }}
            style={{
              height: 200,
              width: screenWidth,
              // borderRadius: 15,
            }}
          />
        </CardItem>
        <CardItem
          style={{ flexDirection: 'column', alignItems: 'flex-start' }}
        >
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Thumbnail style={{ borderWidth: 3, borderColor: color["color-primary-500"] }} source={{ uri: toBackendUrl(post.userProfilePicture) }} />
            <View style={{ marginLeft: 16 }}>
              <Text style={{ fontWeight: 'bold' }}>{post.userFirstname + " " + post.userLastname}</Text>
              <Text note>{moment.unix(post.publishedDate).fromNow()}</Text>
            </View>
          </View>
        </CardItem>
        <CardItem>
          <Text>
            {post.content}
          </Text>
        </CardItem>
        <CardItem bordered>
        </CardItem>
        <CardItem style={{ flexDirection: 'column', alignItems: 'flex-start' }}>
          <FlatList
            inverted
            data={commentList}
            renderItem={renderComment}
            keyExtractor={(item) => item.id.toString()}>
          </FlatList>
        </CardItem>
        <CardItem footer>
          <View style={{ flexDirection: 'row', justifyContent: 'center', alignContent: 'center', alignItems: 'center' }}>
            <Thumbnail small style={{ borderWidth: 3, borderColor: color["color-info-500"] }} source={{ uri: toBackendUrl(profilePicture) }} />
            <Item
              regular
              style={{
                width: screenWidth * 0.7,
                backgroundColor: '#f6f5fb',
                marginLeft: 16,
                marginRight: 16,
                borderRadius: 100,
                borderColor: '#f6f5fb',
              }}
            >
              <Input
                placeholder='Say something'
                onChange={handleCommentChange}
                onSubmitEditing={handlePostComment}
                value={comment}
              />
            </Item>
            <TouchableOpacity onPress={handlePostComment}><Text style={{ fontWeight: 'bold', color: color['color-info-500'] }}>Send</Text></TouchableOpacity>
          </View>
        </CardItem>
      </ScrollView>
    )
  }
}
