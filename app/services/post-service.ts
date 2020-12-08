import { useNavigation } from '@react-navigation/native'
import { NativeSyntheticEvent, TextInputChangeEventData } from 'react-native'
import React from 'reactn'
import { screens } from '../config/screens'
import { showError } from '../helpers/toast'
import {
  CommentListResponse,
  commentRepository,
} from '../repositories/comment-repository'
import { PostObject } from '../repositories/feed-repository'
import {
  InterestCreateResponse,
  InterestDeleteResponse,
  interestRepository,
} from '../repositories/interest-repository'
import {
  PostListResponse,
  postRepository,
} from '../repositories/post-repository'

export const postService = {
  usePost(post: PostObject): [number, boolean, () => void, () => void] {
    const navigation = useNavigation()
    const [interestCount, setInterestCount] = React.useState<number>(0)
    const [interested, setInterested] = React.useState<boolean>(false)
    console.log(post)

    const checkInterest = React.useCallback(async () => {
      try {
        const response = await interestRepository.check(post.id)
        setInterested(response.interested)
      } catch (error) {
        console.log(error)
      }
    }, [post.id])

    const loadInterestCount = React.useCallback(async () => {
      try {
        const response = await interestRepository.count(post.id)
        setInterestCount(response.count)
      } catch (error) {
        console.log(error)
      }
    }, [post.id])

    const handleInterest = React.useCallback(async () => {
      try {
        let response: InterestCreateResponse | InterestDeleteResponse = null
        if (interested) {
          response = await interestRepository.delete(post.id)
        } else {
          response = await interestRepository.create(post.id)
        }
        setInterested(response.interested)
        if (response.interested) {
          setInterestCount(interestCount + 1)
        } else {
          setInterestCount(interestCount - 1)
        }
      } catch (error) {
        console.log(error)
      }
    }, [post.id, interested, interestCount])

    const handleCommentButton = React.useCallback(() => {
      navigation.navigate(screens.authenticated.user.comment, {
        post: post,
      })
    }, [])

    React.useEffect(() => {
      checkInterest()
      loadInterestCount()
    }, [post?.id])

    return [interestCount, interested, handleInterest, handleCommentButton]
  },

  usePostList(accountId: number): [PostListResponse] {
    const [postList, setPostList] = React.useState<PostListResponse>([])

    const handleLoadNew = React.useCallback(async () => {
      try {
        const response = await postRepository.list(accountId)
        setPostList(response)
      } catch (error) {
        showError('Error occured while loading post list')
        console.log(error)
      }
    }, [accountId])

    React.useEffect(() => {
      handleLoadNew()
    }, [handleLoadNew])

    return [postList]
  },

  usePostCount(accountId: number): [number] {
    const [postCount, setPostCount] = React.useState<number>(0)

    const handleLoadNew = React.useCallback(async () => {
      try {
        const response = await postRepository.count(accountId)
        setPostCount(response.count)
      } catch (error) {
        showError('Error occured while loading post count')
        console.log(error)
      }
    }, [accountId])

    React.useEffect(() => {
      handleLoadNew()
    }, [handleLoadNew])

    return [postCount]
  },

  usePostComment(
    postId: number,
  ): [
    CommentListResponse[],
    string,
    (event: NativeSyntheticEvent<TextInputChangeEventData>) => void,
    () => void,
  ] {
    const [commentList, setCommentList] = React.useState<CommentListResponse[]>(
      [],
    )
    const [comment, setComment] = React.useState<string>('')

    const handleCommentChange = React.useCallback(
      (event: NativeSyntheticEvent<TextInputChangeEventData>) => {
        setComment(event.nativeEvent.text)
      },
      [],
    )

    const handleLoadNew = React.useCallback(async () => {
      try {
        const response = await commentRepository.list(postId)
        setCommentList(response)
      } catch (error) {
        showError('Error occured while loading comment list')
        console.log(error)
      }
    }, [postId])

    const handlePostComment = React.useCallback(async () => {
      try {
        await commentRepository.create(postId, comment)
      } catch (error) {
        showError('Error occured while posting comment')
        console.log(error)
      }
    }, [postId])

    React.useEffect(() => {
      handleLoadNew()
    }, [])

    return [commentList, comment, handleCommentChange, handlePostComment]
  },
}
