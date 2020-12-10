import {
  Button,
  Form,
  Header,
  Icon,
  Input,
  Item,
  Label,
  Text,
  Textarea
} from 'native-base'
import React, { useEffect, useState } from 'react'
import {
  FlatList,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
  ViewStyle
} from 'react-native'
import DocumentPicker from 'react-native-document-picker'
import FastImage from 'react-native-fast-image'
import SectionedMultiSelect from 'react-native-sectioned-multi-select'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import { Container, Screen } from '../../components'
import { toBackendUrl } from '../../helpers/string-helper'
import { companyProfileService } from '../../services/company-profile-service'
import { tagService } from '../../services/tag-service'
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

export function ProfileEditCompanyScreen({ route, navigation }) {
  const [
    name,
    handleCompanyNameChange,
    profilePicture,
    handleCompanyProfilePictureChange,
    website,
    handleWebsiteChange,
    specialties,
    handleSpecialtiesChange,
    description,
    handleDescriptionChange,
    handleEditProfileSubmit,
  ] = companyProfileService.useUpdateCompany()

  const [
    specialtyTag,
    getAllSpecialtyTag,
    getSpecialtyTagByQuery,
  ] = tagService.useSpecialtyTag()
  
  const { companyData } = route.params
  const [selectedItems, setSelectedItems] = useState([])
  const [dataMultiSelected, setDataMultiSelected] = useState([])

  const onSelectedItemsChange = (selectedItems) => {
    setSelectedItems(selectedItems)
    // selectedItems?handleSpecialtiesChange(selectedItems.map(item => specialtyTag.indexOf(item))):'';
  }

  useEffect(() => {
    getAllSpecialtyTag()
    handleCompanyNameChange(companyData.name)
    handleCompanyProfilePictureChange(companyData.profilePicture)
    handleWebsiteChange(companyData.website)
    handleSpecialtiesChange(companyData.specialties)
    handleDescriptionChange(companyData.description)
  }, [])

  useEffect(() => {
    setDataMultiSelected([
      {
        name: 'Specialty',
        id: 1,
        children: specialtyTag
          ? specialtyTag.map((item, index) => ({ name: item, id: index }))
          : [],
      },
    ])

    specialtyTag
      ? setSelectedItems(specialties.map((item) => specialtyTag.indexOf(item)))
      : ''
  }, [specialtyTag])

  return (
    <Screen style={ROOT} preset='scroll'>
      <ScrollView>
        <Header
          noShadow
          transparent={true}
          style={styles.profileHeader}
          androidStatusBarColor={color.brandPrimary}
        >
          <Button transparent onPress={() => navigation.goBack()}>
            <Icon style={styles.backIcon} name='close-outline' />
          </Button>
          <Button
            transparent
            onPress={() => {
              handleEditProfileSubmit()
              // navigation.goBack()
            }}
          >
            <Text style={{ color: color.brandPrimary }}>Save</Text>
          </Button>
        </Header>
        <Container>
          <View style={styles.topInfo}>
            <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
              <TouchableOpacity onPress={chooseFile}>
                <FastImage
                  style={styles.avatarUser}
                  source={{ uri: toBackendUrl(profilePicture) }}
                />
              </TouchableOpacity>
            </View>

            <Form>
              <Item stackedLabel>
                <Label>Company name</Label>
                <Input value={name} onChangeText={handleCompanyNameChange} />
              </Item>

              <Item stackedLabel>
                <Label>Website</Label>
                <Input value={website} onChangeText={handleWebsiteChange} />
              </Item>

              <Item stackedLabel style={{ alignItems: 'stretch' }}>
                <Label>About us</Label>
                <Textarea
                  style={{
                    borderRadius: 10,
                    marginTop: 16,
                    backgroundColor: '#ffffff',
                  }}
                  rowSpan={5}
                  underline={false}
                  bordered={false}
                  value={description}
                  onChangeText={handleDescriptionChange}
                />
              </Item>

              <Item stackedLabel style={{ alignItems: 'stretch' }}>
                <Label>Specialties</Label>
                <SectionedMultiSelect
                  items={dataMultiSelected}
                  IconRenderer={MaterialIcons}
                  uniqueKey='id'
                  subKey='children'
                  selectedText='skill'
                  showDropDowns={false}
                  readOnlyHeadings={true}
                  onSelectedItemsChange={onSelectedItemsChange}
                  selectedItems={selectedItems}
                  colors={{ primary: color['color-primary-500'] }}
                  showCancelButton={true}
                  onConfirm={() => {
                    handleSpecialtiesChange(
                      selectedItems.map((item) =>
                        specialtyTag[item].toString(),
                      ),
                    )
                  }}
                  customChipsRenderer={(chipProperties) => {
                    return (
                      <FlatList
                        // horizontal={true}
                        contentContainerStyle={{
                          flexDirection: 'column',
                          // flexWrap: 'wrap',
                        }}
                        numColumns={3}
                        data={chipProperties.selectedItems}
                        scrollEnabled={false}
                        keyExtractor={(item) => item.toString()}
                        renderItem={({ item }) => {
                          return (
                            <View
                              style={{
                                flexWrap: 'wrap',
                                alignItems: 'center',
                                flexDirection: 'row',
                              }}
                            >
                              <View
                                style={{
                                  // overflow: 'hidden',
                                  justifyContent: 'center',
                                  // height: 34,
                                  flexDirection: 'row',
                                  padding: 5,
                                  margin: 3,
                                  // paddingTop: 0,
                                  // paddingBottom: 0,
                                  borderRadius: 20,
                                  backgroundColor: color['color-primary-500'],
                                }}
                              >
                                <View
                                  style={{
                                    // marginRight: 5,
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                  }}
                                >
                                  <Item style={{ borderBottomWidth: 0 }}>
                                    <Text style={{ color: 'white' }}>
                                      {specialtyTag[item]}
                                    </Text>
                                  </Item>
                                  {/* <Item style={{ borderBottomWidth: 0 }}>
                                    <Icon
                                      onPress={() =>
                                        handleDeleteSkill(skillTag[item])
                                      }
                                      style={{
                                        color: color['color-danger-700'],
                                        marginLeft: 2,
                                      }}
                                      name='close-circle'
                                    />
                                  </Item> */}
                                </View>
                              </View>
                            </View>
                          )
                        }}
                      ></FlatList>
                    )
                  }}
                />
              </Item>
            </Form>
          </View>
        </Container>
      </ScrollView>
    </Screen>
  )
}
