import {
  ActionSheet,
  Button,
  Header,
  Icon,
  Text,
  Thumbnail,
  View,
} from 'native-base'
import React from 'react'
import {
  Dimensions,
  Image,
  KeyboardAvoidingView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from 'react-native'
import { feedService } from '../../services/feed-service'
import { color } from '../../theme'

const { width, height } = Dimensions.get('window')

const styles = StyleSheet.create({
  ROOT: {
    flex: 1,
  },
  accountView: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    marginTop: 20,
  },
  body: {
    // borderWidth: 1,
    flexDirection: 'column',
    paddingHorizontal: 20,
  },
  header: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  headerTitle: {
    color: color.palette.black,
    fontSize: 17,
    fontWeight: 'bold',
  },
  inputArea: {
    fontSize: 16,
    minHeight: 60,
    textAlignVertical: 'top',
  },
  inputView: {
    paddingTop: 10,
  },
  name: {
    fontWeight: 'bold',
    margin: 20,
  },
  postButtonActive: {
    color: color.brandPrimary,
    fontWeight: 'bold',
  },
  postButtonDeactive: {
    color: color.brandLight,
    fontWeight: 'bold',
  },
  selectPictureButton: {
    alignContent: 'center',
    borderColor: color.brandPrimary,
    borderRadius: 10,
    borderStyle: 'dashed',
    borderWidth: 3,
    height: 60,
    justifyContent: 'center',
    margin: 25,
    width: width - 40,
  },
  selectPictureIcon: {
    color: color.brandPrimary,
  },
  selectedPicture: {
    aspectRatio: 1.5,
    borderRadius: 20,
    justifyContent: 'flex-start',
    marginTop: 0,
    resizeMode: 'stretch',
    width: width - 40,
  },
  selectedPictureView: {
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
})

export const WriteFeedScreen = function WriteFeedScreen() {
  const [
    content,
    handleChangeContent,
    postDisabled,
    image,
    handleSelectPhoto,
    handleDeletePhoto,
    handleCancel,
    handleSubmitFeed,
  ] = feedService.useWriteFeed()

  const handleActionSheet = (buttonIndex: number) => {
    switch (buttonIndex) {
      case 0:
        handleDeletePhoto()
        break

      default:
        break
    }
  }

  return (
    <View style={styles.ROOT}>
      <Header transparent style={styles.header}>
        <TouchableOpacity onPress={handleCancel}>
          <Icon name='close-outline' style={{ color: color.brandLight }}></Icon>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Create Post</Text>
        <TouchableOpacity onPress={handleSubmitFeed} disabled={postDisabled}>
          <Text
            style={
              postDisabled ? styles.postButtonDeactive : styles.postButtonActive
            }
          >
            Post
          </Text>
        </TouchableOpacity>
      </Header>
      <View style={styles.body}>
        <View style={styles.accountView}>
          <Thumbnail source={require('../newsfeed-screen/avatar1.jpg')} />
          <Text style={styles.name}>Hai Tung</Text>
        </View>
        <KeyboardAvoidingView style={styles.inputView}>
          <TextInput
            style={styles.inputArea}
            placeholder="What's on your mind?"
            value={content}
            onChange={handleChangeContent}
            multiline
          />
        </KeyboardAvoidingView>
      </View>
      <View style={styles.selectedPictureView}>
        {image ? (
          <TouchableOpacity
            onPress={() => {
              ActionSheet.show(
                {
                  options: [
                    {
                      text: 'Delete',
                      icon: 'trash',
                      iconColor: color.brandDanger,
                    },
                    {
                      text: 'Cancel',
                      icon: 'close',
                      iconColor: color.palette.black,
                    },
                  ],
                  cancelButtonIndex: 1,
                  destructiveButtonIndex: 0,
                  title: 'Post image',
                },
                handleActionSheet,
              )
            }}
          >
            <Image
              source={{ uri: image.path }}
              style={styles.selectedPicture}
            />
          </TouchableOpacity>
        ) : (
          <Button
            style={styles.selectPictureButton}
            onPress={handleSelectPhoto}
            transparent
          >
            <Icon name='image' style={styles.selectPictureIcon} />
          </Button>
        )}
      </View>
    </View>
  )
}
