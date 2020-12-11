import DateTimePicker from '@react-native-community/datetimepicker'
import moment from 'moment'
import {
  Button,
  Card,
  CardItem,
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
import React, { useEffect } from 'react'
import {
  Dimensions,
  FlatList,
  KeyboardAvoidingView,
  Modal,
  StyleSheet,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import ImagePicker, { Image } from 'react-native-image-crop-picker'
import SectionedMultiSelect from 'react-native-sectioned-multi-select'
import Timeline from 'react-native-timeline-flatlist'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import { useState } from 'reactn'
import { CardJob, Container, Screen } from '../../components'
import { toBackendUrl } from '../../helpers/string-helper'
import { ExperienceObject } from '../../repositories/experience-repository'
import { userRepository } from '../../repositories/user-repository'
import { tagService } from '../../services/tag-service'
import { userProfileService } from '../../services/user-profile-service'
import { color } from '../../theme'

const screenHeight = Dimensions.get('window').height
const screenWidth = Dimensions.get('window').width

const ROOT: ViewStyle = {
  backgroundColor: color.palette.black,
  flex: 1,
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: color.brandPrimary,
  },

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

  cardSection: {
    marginLeft: 16,
    marginRight: 16,
  },

  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
    //borderWidth:2
  },
  modalView: {
    marginTop: 100,
    backgroundColor: 'white',
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    //padding: 100,
    //alignItems: "center",
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    height: screenHeight,
  },
  openButton: {
    backgroundColor: '#F194FF',
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  descriptionContainer: {
    flexDirection: 'column',
    paddingRight: 50,
  },
  textDescription: {
    color: 'gray',
  },
  textInputIcon: {
    color: color.brandPrimary,
  },
})

export function ProfileEditUserScreen({ route, navigation }) {
  const [
    firstName,
    handleFirstNameChange,
    lastName,
    handleLastNameChange,
    dateOfBirth,
    handleDateOfBirthChange,
    showDateOfBirthPicker,
    handleDateOfBirthPickerPress,
    gender,
    handleGenderChange,
    userDescription,
    handleUserDescriptionChange,
    oldPhone,
    handleOldPhoneChange,
    newPhone,
    handlePhoneChange,
    oldEmail,
    handleOldEmailChange,
    newEmail,
    handleEmailChange,
    handleEditProfileSubmit,
  ] = userProfileService.useUpdateUser()

  const [
    schoolName,
    handleSchooleNameChange,
    startDateEducation,
    handleStartDateEducationChange,
    showStartDateEducationPicker,
    handleStartDateEducationPickerPress,
    endDateEducation,
    handleEndDateEducationChange,
    showEndDateEducationPicker,
    handleEndDateEducationPickerPress,
    major,
    handleMajorChange,
    degree,
    handleDegreeChange,
    handleCreatEducation,
    educationList,
    handleEducationChange,
    handleDeleteEducation,
  ] = userProfileService.useCreatEducation()

  const [
    companyName,
    handleCompanyNameChange,
    startDateExperience,
    handleStartDateExperienceChange,
    showStartDateExperiencePicker,
    handleStartDateExperiencePickerPress,
    endDateExperience,
    handleEndDateExperienceChange,
    showEndDateExperiencePicker,
    handleEndDateExperiencePickerPress,
    title,
    handleTitleChange,
    description,
    handleDescriptionChange,
    handleCreatExperience,
    handleDeleteExperience,
    itemId,
    handleItemIdChange,
    experienceList,
    handleExperienceChange,
  ] = userProfileService.useCreatExperience()

  const [
    skillText,
    skillList,
    handleSkillTextChange,
    handleCreateSkills,
    handleDeleteSkill,
    handleSkillListChange,
  ] = userProfileService.useCreateSkill()

  const [
    skillTag,
    getAllSkillTag,
    getSkillTagByQuery,
  ] = tagService.useSkillTag()

  const [, forceUpdate] = React.useReducer((x) => x + 1, 0)
  const handleSelectPhoto = React.useCallback(() => {
    ImagePicker.openPicker({
      mediaType: 'photo',
      height: 300,
      width: 300,
      cropping: true,
    }).then(
      (image: Image) => {
        if (image) {
          userRepository
            .upload(image)
            .catch((error) => {
              console.log(error)
            })
            .then(() => {
              forceUpdate()
            })
        }
      },
      (error) => {
        console.log(error)
      },
    )
  }, [])

  const { userData, skillData, educationData, experienceData } = route.params
  const [selectedItems, setSelectedItems] = useState<[]>()
  const [educationModalVisible, setEducationModalVisible] = useState(false)
  const [experienceModalVisible, setExperienceModalVisible] = useState(false)
  const [dataMultiSelected, setDataMultiSelected] = useState([])
  const [educationListRender, setEducationListRender] = useState([])

  const onSelectedItemsChange = (selectedItems) => {
    setSelectedItems(selectedItems)
    // handleSkillListChange(selectedItems)
  }

  const renderExperienceItem = ({ item }: { item: ExperienceObject }) => {
    return (
      <CardJob
        id={item.id}
        minWidth={screenWidth * 0.8}
        companyName={item.companyName}
        position={item.title}
        avatarUri={toBackendUrl(item.profilePicture)}
        describe={item.description}
        deleteAble={true}
        onDelete={handleDeleteExperience}
      ></CardJob>
    )
  }

  useEffect(() => {
    getAllSkillTag()
    handleEducationChange(
      educationData.map((item) => {
        return {
          //   id: item.educationId,
          time: moment(item.startDate, 'YYYY-MM-DD')
            .format('MMM YYYY')
            .toString(),
          title: item.schoolName,
          description: (
            <View>
              <Text style={styles.textDescription}>{item.major}</Text>
              <TouchableOpacity onPress={() => handleDeleteEducation(item.id)}>
                <Icon
                  name='remove-circle'
                  style={{ color: color.brandDanger }}
                />
              </TouchableOpacity>
            </View>
          ),
        }
      }),
    )
    handleExperienceChange(experienceData)
    handleSkillListChange(skillData)
    handleFirstNameChange(userData.firstName)
    handleLastNameChange(userData.lastName)
    handleGenderChange(userData.gender)
    handleDateOfBirthChange(userData.dateOfBirth)
    handleUserDescriptionChange(userData.description)
    handlePhoneChange(userData.phoneList[0])
    handleOldPhoneChange(userData.phoneList[0])
    handleEmailChange(userData.emailList[0])
    handleOldEmailChange(userData.emailList[0])
  }, [
    educationData,
    experienceData,
    getAllSkillTag,
    handleDateOfBirthChange,
    handleDeleteEducation,
    handleEducationChange,
    handleEmailChange,
    handleExperienceChange,
    handleFirstNameChange,
    handleGenderChange,
    handleLastNameChange,
    handleOldEmailChange,
    handleOldPhoneChange,
    handlePhoneChange,
    handleSkillListChange,
    handleUserDescriptionChange,
    skillData,
    userData.dateOfBirth,
    userData.description,
    userData.emailList,
    userData.firstName,
    userData.gender,
    userData.lastName,
    userData.phoneList,
  ])

  useEffect(() => {
    if (educationList && educationList.length > 0) {
      setEducationListRender(
        educationList.map((item) => {
          return {
            id: item.educationId,
            time: moment(item.startDate, 'YYYY-MM-DD')
              .format('MMM YYYY')
              .toString(),
            title: item.schoolName,
            description: (
              <View>
                <Text style={styles.textDescription}>{item.major}</Text>
                <TouchableOpacity
                  onPress={() => handleDeleteEducation(item.id)}
                >
                  <Icon
                    name='remove-circle'
                    style={{ color: color.brandDanger }}
                  />
                </TouchableOpacity>
              </View>
            ),
          }
        }),
      )
    }
  }, [educationList, handleDeleteEducation])

  useEffect(() => {
    setDataMultiSelected([
      {
        name: 'Skill',
        id: 1,
        children: skillTag
          ? skillTag.map((item, index) => ({ name: item, id: index }))
          : [],
      },
    ])

    if (skillTag && skillData) {
      setSelectedItems(skillData.map((item) => skillTag.indexOf(item)))
    }
  }, [skillTag, skillData])

  useEffect(() => {
    if (skillTag && skillList) {
      setSelectedItems(skillList.map((item) => skillTag.indexOf(item)))
    }
  }, [skillList, skillTag])

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
              handleCreateSkills()
              // navigation.goBack()
            }}
          >
            <Text style={{ color: color.brandPrimary }}>Save</Text>
          </Button>
        </Header>
        <Container>
          <View style={styles.topInfo}>
            <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
              <TouchableOpacity onPress={handleSelectPhoto}>
                <Thumbnail
                  circular
                  large
                  style={styles.avatarUser}
                  source={{
                    uri:
                      toBackendUrl(userData.profilePicture) + '?' + new Date(),
                  }}
                ></Thumbnail>
              </TouchableOpacity>
            </View>

            <Form>
              <Item stackedLabel>
                <Label>First name</Label>
                <Input
                  value={firstName}
                  onChangeText={(text) => handleFirstNameChange(text)}
                />
              </Item>

              <Item stackedLabel>
                <Label>Last name</Label>
                <Input
                  value={lastName}
                  onChangeText={(text) => handleLastNameChange(text)}
                />
              </Item>

              <Item stackedLabel>
                <Label>Gender</Label>
                <Input
                  value={gender}
                  onChangeText={(text) => handleGenderChange(text)}
                />
              </Item>
              <Item stackedLabel>
                <Label>Date of birth</Label>
                <Item>
                  <Icon
                    style={styles.textInputIcon}
                    name='calendar'
                    onPress={handleDateOfBirthPickerPress}
                  />

                  {showDateOfBirthPicker && (
                    <DateTimePicker
                      testID='dobPicker'
                      value={moment(dateOfBirth, 'YYYY-MM-DD').toDate()}
                      display='default'
                      onChange={(event, date) =>
                        handleDateOfBirthChange(
                          moment(date).format('YYYY-MM-DD').toString(),
                        )
                      }
                    />
                  )}
                  <Input>{dateOfBirth}</Input>
                </Item>
              </Item>

              <Item stackedLabel>
                <Label>Phone</Label>
                <Input
                  value={newPhone}
                  onChangeText={(text) => handlePhoneChange(text)}
                />
              </Item>

              <Item stackedLabel>
                <Label>Email</Label>
                <Input
                  value={newEmail}
                  onChangeText={(text) => handleEmailChange(text)}
                />
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
                  value={userDescription}
                  onChangeText={(text) => handleUserDescriptionChange(text)}
                />
              </Item>

              <Item
                stackedLabel
                style={{ alignItems: 'stretch', borderBottomWidth: 0 }}
              >
                <Label>Skill</Label>
                <SectionedMultiSelect
                  // hideSelect={true}
                  items={dataMultiSelected}
                  IconRenderer={MaterialIcons}
                  uniqueKey='id'
                  subKey='children'
                  selectedText='skill'
                  showDropDowns={false}
                  readOnlyHeadings={true}
                  onSelectedItemsChange={onSelectedItemsChange}
                  selectedItems={selectedItems}
                  colors={{ primary: color.brandPrimary }}
                  showCancelButton={true}
                  onConfirm={() => {
                    handleSkillListChange(
                      selectedItems.map((item) => skillTag[item].toString()),
                    )
                  }}
                  renderSelectText={() => {
                    return <Text>Your skill here</Text>
                  }}
                  customChipsRenderer={(chipProperties) => {
                    return (
                      <FlatList
                        contentContainerStyle={{
                          flexDirection: 'column',
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
                                  justifyContent: 'center',
                                  flexDirection: 'row',
                                  padding: 5,
                                  margin: 3,
                                  borderRadius: 20,
                                  backgroundColor: color.brandPrimary,
                                }}
                              >
                                <View
                                  style={{
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                  }}
                                >
                                  <Item style={{ borderBottomWidth: 0 }}>
                                    <Text style={{ color: 'white' }}>
                                      {skillTag[item]}
                                    </Text>
                                  </Item>
                                  <Item style={{ borderBottomWidth: 0 }}>
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
                                  </Item>
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
          <Card transparent style={styles.cardSection}>
            <CardItem header>
              <Text style={{ fontWeight: '700', fontSize: 20 }}>Education</Text>
              <View style={{ flexGrow: 1, flexDirection: 'row-reverse' }}>
                <TouchableOpacity
                  onPress={() => {
                    setEducationModalVisible(true)
                  }}
                >
                  <Text
                    style={{
                      color: color['color-info-500'],
                      fontWeight: 'bold',
                    }}
                  >
                    Add
                  </Text>
                </TouchableOpacity>
              </View>
            </CardItem>
            <CardItem>
              <Timeline
                renderCircle={(rowData, sectionID, rowID) => {}}
                data={educationListRender}
                timeStyle={{
                  backgroundColor: color['color-info-500'],
                  color: 'white',
                  padding: 5,
                  borderRadius: 13,
                  marginTop: 16,
                  marginLeft: 16,
                }}
              ></Timeline>
            </CardItem>

            <Modal
              animationType='slide'
              transparent={true}
              visible={educationModalVisible}
            >
              <KeyboardAvoidingView behavior='position' enabled>
                <ScrollView
                  scrollEnabled={false}
                  keyboardShouldPersistTaps='handled'
                >
                  <View style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
                    <View style={styles.modalView}>
                      <Form style={{ margin: 25 }}>
                        <Item stackedLabel>
                          <Label>School Name</Label>
                          <Input
                            value={schoolName}
                            onChange={handleSchooleNameChange}
                          />
                        </Item>
                        <Item stackedLabel>
                          <Label>Start Date</Label>
                          <Item>
                            <Icon
                              style={styles.textInputIcon}
                              name='calendar-outline'
                              onPress={handleStartDateEducationPickerPress}
                            />
                            {showStartDateEducationPicker && (
                              <DateTimePicker
                                testID='startDateTimePicker'
                                value={startDateEducation}
                                display='default'
                                onChange={(event, date) =>
                                  handleStartDateEducationChange(date)
                                }
                              />
                            )}
                            <Input>{startDateEducation.toDateString()}</Input>
                          </Item>
                        </Item>
                        <Item stackedLabel>
                          <Label>End Date</Label>
                          <Item>
                            <Icon
                              style={styles.textInputIcon}
                              name='calendar-outline'
                              onPress={handleEndDateEducationPickerPress}
                            />
                            {showEndDateEducationPicker && (
                              <DateTimePicker
                                testID='endDateTimePicker'
                                value={endDateEducation}
                                display='default'
                                onChange={(event, date) =>
                                  handleEndDateEducationChange(date)
                                }
                              />
                            )}
                            <Input>{endDateEducation.toDateString()}</Input>
                          </Item>
                        </Item>
                        <Item stackedLabel>
                          <Label>Major</Label>
                          <Input value={major} onChange={handleMajorChange} />
                        </Item>
                        <Item stackedLabel>
                          <Label>Degree</Label>
                          <Input value={degree} onChange={handleDegreeChange} />
                        </Item>
                      </Form>

                      <View
                        style={{
                          flexDirection: 'row',
                          justifyContent: 'space-evenly',
                        }}
                      >
                        <Button
                          rounded
                          onPress={() => {
                            handleCreatEducation()
                            setEducationModalVisible(!educationModalVisible)
                          }}
                        >
                          <Text style={styles.textStyle}>Add</Text>
                        </Button>
                        <Button
                          rounded
                          onPress={() => {
                            setEducationModalVisible(!educationModalVisible)
                          }}
                        >
                          <Text style={styles.textStyle}>Cancel</Text>
                        </Button>
                      </View>
                    </View>
                  </View>
                </ScrollView>
              </KeyboardAvoidingView>
            </Modal>
          </Card>
          <Card transparent style={styles.cardSection}>
            <CardItem header>
              <Text style={{ fontWeight: '700', fontSize: 20 }}>
                Experience
              </Text>
              <View style={{ flexGrow: 1, flexDirection: 'row-reverse' }}>
                <TouchableOpacity
                  onPress={() => {
                    setExperienceModalVisible(true)
                  }}
                >
                  <Text
                    style={{
                      color: color['color-info-500'],
                      fontWeight: 'bold',
                    }}
                  >
                    Add
                  </Text>
                </TouchableOpacity>
              </View>
            </CardItem>
            <CardItem style={{ flexDirection: 'column' }}>
              <FlatList
                data={experienceList}
                renderItem={renderExperienceItem}
                keyExtractor={(item) => String(item.id)}
              ></FlatList>
            </CardItem>
            <Modal
              animationType='slide'
              transparent={true}
              visible={experienceModalVisible}
            >
              <KeyboardAvoidingView behavior='position' enabled>
                <ScrollView
                  scrollEnabled={false}
                  keyboardShouldPersistTaps='handled'
                >
                  <View style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
                    <View style={styles.modalView}>
                      <Form style={{ margin: 25 }}>
                        <Item stackedLabel>
                          <Label>Company Name</Label>
                          <Input
                            value={companyName}
                            onChange={handleCompanyNameChange}
                          />
                        </Item>
                        <Item stackedLabel>
                          <Label>Start Date</Label>
                          <Item>
                            <Icon
                              style={styles.textInputIcon}
                              name='calendar-outline'
                              onPress={handleStartDateExperiencePickerPress}
                            />
                            {showStartDateExperiencePicker && (
                              <DateTimePicker
                                testID='startDateTimePicker'
                                value={startDateExperience}
                                display='default'
                                onChange={(event, date) =>
                                  handleStartDateExperienceChange(date)
                                }
                              />
                            )}
                            <Input>{startDateExperience.toDateString()}</Input>
                          </Item>
                        </Item>
                        <Item stackedLabel>
                          <Label>End Date</Label>
                          <Item>
                            <Icon
                              style={styles.textInputIcon}
                              name='calendar-outline'
                              onPress={handleEndDateExperiencePickerPress}
                            />
                            {showEndDateExperiencePicker && (
                              <DateTimePicker
                                testID='endDateTimePicker'
                                value={endDateExperience}
                                display='default'
                                onChange={(event, date) =>
                                  handleEndDateExperienceChange(date)
                                }
                              />
                            )}
                            <Input>{endDateExperience.toDateString()}</Input>
                          </Item>
                        </Item>
                        <Item stackedLabel>
                          <Label>Position</Label>
                          <Input value={title} onChange={handleTitleChange} />
                        </Item>
                        <Item stackedLabel>
                          <Label>Describe</Label>
                          <Input
                            value={description}
                            onChange={handleDescriptionChange}
                          />
                        </Item>
                      </Form>
                      <View
                        style={{
                          flexDirection: 'row',
                          justifyContent: 'space-evenly',
                        }}
                      >
                        <Button
                          rounded
                          onPress={() => {
                            handleCreatExperience()
                            setExperienceModalVisible(!experienceModalVisible)
                          }}
                        >
                          <Text style={styles.textStyle}>Add</Text>
                        </Button>
                        <Button
                          rounded
                          onPress={() => {
                            setExperienceModalVisible(!experienceModalVisible)
                          }}
                        >
                          <Text style={styles.textStyle}>Cancel</Text>
                        </Button>
                      </View>
                    </View>
                  </View>
                </ScrollView>
              </KeyboardAvoidingView>
            </Modal>
          </Card>
        </Container>
      </ScrollView>
    </Screen>
  )
}
