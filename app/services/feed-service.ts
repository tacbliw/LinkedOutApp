import { useNavigation } from '@react-navigation/native'
import { NativeSyntheticEvent, TextInputChangeEventData } from 'react-native'
import ImagePicker, {
  Image,
  ImageOrVideo,
} from 'react-native-image-crop-picker'
import React from 'reactn'
import { screens } from '../config/screens'
import { showError, showInfo } from '../helpers/toast'
import {
  FeedGetResponse,
  feedRepository,
} from '../repositories/feed-repository'
import { postRepository } from '../repositories/post-repository'

export const feedService = {
  useWriteFeed(): [
    string,
    (event: NativeSyntheticEvent<TextInputChangeEventData>) => void,
    boolean,
    Image,
    () => void,
    () => void,
    () => void,
    () => void,
  ] {
    const navigation = useNavigation()
    const [content, setContent] = React.useState<string>('')
    const [postDisabled, setPostDisabled] = React.useState<boolean>(true)
    const [image, setImage] = React.useState<ImageOrVideo>()

    React.useEffect(() => {
      if (!content) {
        setPostDisabled(true)
      } else {
        setPostDisabled(false)
      }
    }, [content])

    const handleChangeContent = React.useCallback(
      (event: NativeSyntheticEvent<TextInputChangeEventData>) => {
        setContent(event.nativeEvent.text)
      },
      [],
    )

    const handleSelectPhoto = React.useCallback(() => {
      ImagePicker.openPicker({
        mediaType: 'photo',
        height: 400,
        width: 600,
        cropping: true,
      }).then(
        (image: Image) => {
          setImage(image)
        },
        (error) => {
          console.log(error)
        },
      )
    }, [])

    const handleDeletePhoto = React.useCallback(() => {
      setImage(null)
    }, [])

    const handleCancel = React.useCallback(() => {
      setContent('')
      setImage(null)
      navigation.goBack()
    }, [navigation])

    const handleSubmit = React.useCallback(async () => {
      postRepository
        .create(content)
        .then((r) => {
          console.log(`Created post ID: ${r}`)
          if (image) {
            postRepository.upload(r.id, image).catch((error) => {
              console.log(error)
            })
          }
          showInfo('Posted!')
        })
        .catch((error) => {
          console.log(error?.response)
          showError('Some error occured.')
        })
      setContent('')
      setImage(null)
      navigation.goBack()
    }, [content, navigation, image])

    return [
      content,
      handleChangeContent,
      postDisabled,
      image,
      handleSelectPhoto,
      handleDeletePhoto,
      handleCancel,
      handleSubmit,
    ]
  },

  useFeed(): [
    FeedGetResponse,
    boolean,
    () => void,
    () => void,
    () => void,
    () => void,
    () => void,
  ] {
    const navigation = useNavigation()
    const [feed, setFeed] = React.useState<FeedGetResponse>([])
    const [refreshing, setRefreshing] = React.useState<boolean>(false)

    const handleWriteFeed = React.useCallback(() => {
      navigation.navigate(screens.authenticated.user.newsfeed.write)
    }, [navigation])

    const handleViewPost = React.useCallback(() => {}, [])

    const handleViewJob = React.useCallback(() => {}, [])

    const handleLoadOld = React.useCallback(async () => {
      setRefreshing(true)
      if (feed.length > 0) {
        try {
          const r = await feedRepository.get(
            feed[feed.length - 1].publishedDate,
          )
          if (r) {
            setFeed([...feed, ...r])
          } else {
            showError('Feed response empty')
          }
        } catch (error) {
          console.log(error)
          if (error.response?.data?.details) {
            console.log(error.response.data.details)
          }
        }
      }
      setRefreshing(false)
    }, [feed])

    const handleLoadNew = React.useCallback(async () => {
      setRefreshing(true)
      try {
        const response = await feedRepository.get(0)
        setFeed(response)
      } catch (error) {
        showError('Error while loading feed')
        console.log(error)
      }
      setRefreshing(false)
    }, [])

    React.useEffect(() => {
      handleLoadNew()
    }, [handleLoadNew])

    return [
      feed,
      refreshing,
      handleWriteFeed,
      handleViewPost,
      handleViewJob,
      handleLoadOld,
      handleLoadNew,
    ]
  },
}
