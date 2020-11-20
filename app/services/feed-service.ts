import { useNavigation } from "@react-navigation/native"
import { NativeSyntheticEvent, TextInputChangeEventData } from "react-native"
import ImagePicker, { Image, ImageOrVideo } from 'react-native-image-crop-picker'
import React from 'reactn'
import { showInfo } from "../helpers/toast"
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
  }
}
