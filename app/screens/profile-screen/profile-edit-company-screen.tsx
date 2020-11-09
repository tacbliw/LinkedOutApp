import {
  Button,
  Form,
  Header,
  Icon,
  Input,
  Item,
  Label,
  Text,
  Textarea,
  Thumbnail,
} from 'native-base'
import React from 'react'
import {
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native'
import DocumentPicker from 'react-native-document-picker'
import { Container, Screen } from '../../components'
import { screens } from '../../config/screens'
// import { useStores } from "../../models"
import { color } from '../../theme'

const ROOT: ViewStyle = {
  backgroundColor: color.palette.black,
  flex: 1,
}

const styles = StyleSheet.create({
  topInfo: {
    padding: 16,
  },

  avatarUser: {
    width: 120,
    height: 120,
    borderRadius: 100,
  },
  userName: {
    fontSize: 30,
    fontWeight: '700',
    left: 5,

    // color: "#FFFFFF"
  },

  about: {
    fontSize: 15,
    left: 5,
  },

  profileHeader: {
    // height: 250,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#f6f5fb',
    // backgroundColor: color.backgroundColor,
  },

  backIcon: {
    color: color.brandDark,
    fontSize: 24,
  },
})

async function chooseFile() {
  try {
    const res = await DocumentPicker.pick({
      type: [DocumentPicker.types.images],
    })
    console.log(
      res.uri,
      res.type, // mime type
      res.name,
      res.size,
    )
  } catch (err) {
    if (DocumentPicker.isCancel(err)) {
      // User cancelled the picker, exit any dialogs or menus and move on
    } else {
      throw err
    }
  }
}

export function ProfileEditCompanyScreen({ navigation }) {
  // Pull in one of our MST stores
  // const { someStore, anotherStore } = useStores()
  // OR
  // const rootStore = useStores()

  // Pull in navigation via hook
  //   const navigation = useNavigation()
  return (
    <Screen style={ROOT} preset='scroll'>
      <ScrollView>
        <Header noShadow transparent={true} style={styles.profileHeader}>
          <Button
            transparent
            onPress={() =>
              navigation.navigate(screens.authenticated.user.newsfeed)
            }
          >
            <Icon style={styles.backIcon} name='close-outline' />
          </Button>
          <Button transparent>
            <Text style={{ color: color.brandPrimary }}>Save</Text>
          </Button>
        </Header>
        <Container>
          {/* <Button onPress={chooseFile}><Text>LOL</Text></Button> */}

          <View style={styles.topInfo}>
            <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
              <TouchableOpacity onPress={chooseFile}>
                <Thumbnail
                  circular
                  large
                  style={styles.avatarUser}
                  source={require('./company.jpg')}
                ></Thumbnail>
              </TouchableOpacity>
            </View>

            <Form>
              <Item stackedLabel>
                <Label>Company name</Label>
                <Input defaultValue='Lycee' />
              </Item>

              <Item stackedLabel>
                <Label>Phone</Label>
                <Input defaultValue='(+84) 967-546-457' />
              </Item>

              <Item stackedLabel>
                <Label>Mail</Label>
                <Input defaultValue='dsjfoshdfuishdfis@gmail.com' />
              </Item>

              <Item stackedLabel style={{ alignItems: 'stretch' }}>
                <Label>About we</Label>
                <Textarea
                  style={{
                    borderRadius: 10,
                    marginTop: 16,
                    backgroundColor: '#ffffff',
                  }}
                  rowSpan={5}
                  underline={false}
                  bordered={false}
                  defaultValue='about.me is a personal web hosting service co-founded by Ryan Freitas, Tony Conrad and Tim Young in October 2009. Wikipedia'
                />
              </Item>
            </Form>
          </View>
        </Container>
      </ScrollView>
    </Screen>
  )
}
