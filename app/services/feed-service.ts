import { useNavigation } from "@react-navigation/native"
import { NativeSyntheticEvent, TextInputChangeEventData } from "react-native"
import ImagePicker, { Image, ImageOrVideo } from 'react-native-image-crop-picker'
import React from 'reactn'
import { screens } from "../config/screens"
import { showError, showInfo } from "../helpers/toast"
import { FeedGetResponse, feedRepository } from "../repositories/feed-repository"
import { interestRepository } from "../repositories/interest-repository"
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
      }).catch(error => {
        console.log(error?.response)
      })
      showInfo("Posted!")
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
    }, []) // do not put `feed` in there

    React.useEffect(() => {
      loadFeed(0)
    }, [loadFeed])

    // React.useEffect(() => {
    //   console.log(feed)
    // }, [feed])

    const handleCommentButton = React.useCallback(() => {}, [])

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

    return [
      feed,
      handleCommentButton,
      handleWriteFeed,
      handleViewPost,
      handleViewJob,
      handleLoadOld,
      handleLoadNew,
    ]
  },

  useInterest(): [
    (id: number) => Promise<boolean>,
    (id: number) => Promise<number>,
    () => void,
  ] {
    const checkInterest = React.useCallback(async (id: number): Promise<boolean> => {
      try {
        const response = await interestRepository.check(id)
        return response.interested
      } catch (error) {
        console.log(error)
        return false
      }
    }, [])

    const loadInterestCount = React.useCallback(async (id: number): Promise<number> => {
      try {
        const response = await interestRepository.count(id)
        return response.count
      } catch (error) {
        console.log(error)
        return 0
      }
    }, [])

    const handleInterest = React.useCallback(() => {}, [])
    return [
      checkInterest,
      loadInterestCount,
      handleInterest,
    ]
  }
}
