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
import { StyleSheet, View, ViewStyle } from 'react-native'
import DocumentPicker from 'react-native-document-picker'
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler'
import SectionedMultiSelect from 'react-native-sectioned-multi-select'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import { useState } from 'reactn'
import { Container, Screen } from '../../components'
import { screens } from '../../config/screens'
// import { useStores } from "../../models"
import { color } from '../../theme'
const items = [
  // this is the parent or 'item'
  {
    name: 'Programming Language',
    id: 0,
    // these are the children or 'sub items'
    children: [
      {
        name: 'C++',
        id: 10,
      },
      {
        name: 'C#',
        id: 11,
      },
      {
        name: 'Python',
        id: 12,
      },
      {
        name: 'Yasuo',
        id: 13,
      },
      {
        name: 'Sofm',
        id: 14,
      },
      {
        name: 'NXT',
        id: 15,
      },
    ],
  },
  {
    name: 'Framework',
    id: 1,
    // these are the children or 'sub items'
    children: [
      {
        name: 'Django',
        id: 16,
      },
      {
        name: 'React',
        id: 17,
      },
      {
        name: 'Pikachu',
        id: 18,
      },
    ],
  },
]

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

export function ProfileEditUserScreen({ navigation }) {
  // Pull in one of our MST stores
  // const { someStore, anotherStore } = useStores()
  // OR
  // const rootStore = useStores()

  // Pull in navigation via hook
  //   const navigation = useNavigation()
  const [selectedItems, setSelectedItems] = useState([])

  const onSelectedItemsChange = (selectedItems) => {
    setSelectedItems(selectedItems)
  }

  return (
    <Screen style={ROOT} preset='scroll'>
      <ScrollView>
        <Header noShadow transparent={true} style={styles.profileHeader}>
          <Button
            transparent
            onPress={() =>
              navigation.navigate(screens.authenticated.user.newsfeed.navigator)
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
                  source={require('./avatar.jpg')}
                ></Thumbnail>
              </TouchableOpacity>
            </View>

            <Form>
              <Item stackedLabel>
                <Label>Name</Label>
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
                <Label>About me</Label>
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

              <Item stackedLabel style={{ alignItems: 'stretch' }}>
                <Label>Skill</Label>
                <SectionedMultiSelect
                  items={items}
                  IconRenderer={MaterialIcons}
                  uniqueKey='id'
                  subKey='children'
                  selectedText='skill'
                  showDropDowns={false}
                  readOnlyHeadings={true}
                  onSelectedItemsChange={onSelectedItemsChange}
                  selectedItems={selectedItems}
                  showCancelButton={true}
                />
              </Item>
            </Form>
          </View>
        </Container>
      </ScrollView>
    </Screen>
  )
}
