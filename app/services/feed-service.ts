import { useNavigation } from "@react-navigation/native"
import { NativeSyntheticEvent, TextInputChangeEventData } from "react-native"
import ImagePicker, { Image, ImageOrVideo } from 'react-native-image-crop-picker'
import React from 'reactn'
import { screens } from "../config/screens"
import { showError, showInfo } from "../helpers/toast"
import { FeedGetResponse, feedRepository } from "../repositories/feed-repository"
import { postRepository } from "../repositories/post-repository"

export const feedService = {
  useWriteFeed(): [
    string,
    (event: NativeSyntheticEvent<TextInputChangeEventData>) => void,
    boolean,
    Image,
    () => void,
    () => void,
    () => void,
    () => void
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
    }, [])

    const handleSelectPhoto = React.useCallback(() => {
      ImagePicker.openPicker({
        mediaType: 'photo',
        height: 400,
        width: 600,
        cropping: true
      }).then((image: Image) => {
        setImage(image)
      }, (error) => {
        console.log(error)
      })
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
      console.log("Writing feed: " + content)
      postRepository.create(content).then(r => {
        console.log(`Created post ID: ${r}`)
        if (image) {
          postRepository.upload(r.id, image).catch(error => {
            console.log(error)
          })
        }
        showInfo("Posted!")
      }).catch(error => {
        console.log(error?.response)
        showError("Some error occured.")
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

  useViewFeed(): [
    FeedGetResponse,
    () => void,
    () => void,
    () => void,
    () => void,
    () => void,
  ] {
    const navigation = useNavigation()
    const [feed, setFeed] = React.useState<FeedGetResponse>([])

    const loadFeed = React.useCallback(async (t: number) => {
      try {
        const r = await feedRepository.get(t)
        if (r) {
          setFeed([
            ...feed,
            ...r
          ])
        } else {
          showError("Feed response empty")
        }
      } catch (error) {
        console.log(error)
      }
    }, []) // do not put `feed` in there, ignore that linting

    // React.useEffect(() => {
    //   console.log(feed)
    // }, [feed])

    const handleWriteFeed = React.useCallback(() => {
      navigation.navigate(screens.authenticated.user.newsfeed.write)
    }, [navigation])

    const handleViewPost = React.useCallback(() => {}, [])

    const handleViewJob = React.useCallback(() => {}, [])

    const handleLoadOld = React.useCallback(() => {
      loadFeed(feed[feed.length - 1].publishedDate)
    }, [feed, loadFeed])

    const handleLoadNew = React.useCallback(async () => {
      try {
        const response = await feedRepository.get(0).then()
        setFeed(response)
      } catch (error) {
        showError("Error when loading feed")
        console.log(error)
      }
    }, [])

    React.useEffect(() => {
      handleLoadNew()
    }, [handleLoadNew])

    return [
      feed,
      handleWriteFeed,
      handleViewPost,
      handleViewJob,
      handleLoadOld,
      handleLoadNew,
    ]
  },
}
