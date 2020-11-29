import {
  Header,
  Icon,
  Input,
  Item,
  Left,
  Picker,
  Right,
  Text,

  View
} from 'native-base'
import React, { useState } from 'react'
import {
  Dimensions,
  FlatList,



  StyleSheet,

  ViewStyle
} from 'react-native'
import SectionedMultiSelect from 'react-native-sectioned-multi-select'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import { Screen, SearchItemCompany, SearchItemJob, SearchItemUser } from '../../components'
import { searchService } from '../../services/search-service'
import { color } from '../../theme'

const screenWidth = Dimensions.get('screen').width
const screenHeight = Dimensions.get('screen').height

const ROOT: ViewStyle = {
  backgroundColor: color.palette.black,
  flex: 1,
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    height: 40,
    borderColor: 'gray',
    borderWidth: 2,
    borderRadius: 20,
    fontSize: 18,
  },
  inputStyle: {
    flex: 1,
    fontSize: 14,
    marginLeft: 5,
  },
})

// const megha = require('./avatar.jpg')

const FlatItem = ({ item, onPress, style }) => {
  if (item.type === "user") return (
    <SearchItemUser 
    style={style} 
    onPress={onPress} 
    profilePicture={item.profilePicture}
    firstname={item.firstname}
    lastname={item.lastname}
    gender={item.gender}
    description={item.description}
    skills={item.skills}></SearchItemUser>
)
  else if (item.type === "company")
    return (
      <SearchItemCompany
      style={style} 
      onPress={onPress} 
      profilePicture={item.profilePicture}
      name={item.name}
      website={item.website}
      description={item.description}
      specialties={item.specialties}></SearchItemCompany>
      )
  else
    return (
      <SearchItemJob
      style={style} 
      onPress={onPress}
      title={item.title}
      jobPicture={item.jobPicture}
      city={item.cities[0]}
      employmentType={item.employmentType}
      publishedDate={item.publishedDate}
      ></SearchItemJob>
    )
          }

const renderItem = ({ item }) => {
  return (
    <FlatItem
      item={item}
      onPress={() => {}} //
      style={{ margin: 16 }}
    ></FlatItem>
  )
}

const specialty_picker_items = [
  {
    name: 'Specialty',
    id: 1,
    // these are the children or 'sub items'
    children: [
      {
        name: 'Django',
        id: 'Django',
      },
      {
        name: 'React',
        id: 'React',
      },
      {
        name: 'Pikachu',
        id: 'Pikachu',
      },
    ],
  },
]

const skill_picker_items = [
  {
    name: 'Skills',
    id: 0,
    children: [
      {
        name: 'C++',
        id: 'C++',
      },
      {
        name: 'C#',
        id: 'C#',
      },
      {
        name: 'Python',
        id: 'Python',
      },
    ],
  }
]

export const SearchScreen = function SearchScreen() {
  const [
    searchData,
    handleChangeSearchData,
    searchType,
    handleChangeSearchType,
    searchResult,
    handleSearch,
    handleSkillsAndSpecialtyChange
  ] = searchService.useSearch()

  const [selectedItems, setSelectedItems] = useState([])

  const [currentPickerType, setCurrentPickerType] = useState(skill_picker_items)

  const onSelectedItemsChange = (selectedItems) => {
    setSelectedItems(selectedItems)
    // handleSkillsAndSpecialtyChange(selectedItems)
  }

  return (
    <Screen>
      <Header transparent>
        <Left style={{ flexGrow: 1 }}>
          <Text style={{ fontSize: 32, fontWeight: '700' }}>Search</Text>
        </Left>
        <Right></Right>
      </Header>

      <View style={{ flexDirection: 'row' }}>
        <Item
          regular
          style={{
            width: screenWidth * 0.7,
            backgroundColor: '#f6f5fb',
            marginLeft: 16,
            marginRight: 16,
            borderRadius: 100,
            borderColor: '#f6f5fb',
            marginTop: 16,
          }}
        >
          <Icon active name='search-outline' />
          <Input
            placeholder='Search something useful'
            onChange={handleChangeSearchData}
            onSubmitEditing={handleSearch}
            value={searchData}
          />
        </Item>

        <Item
          picker
          style={{
            flex: 1,
            borderColor: 'transparent',
            alignContent: 'flex-end',
            alignItems: 'flex-end',
          }}
        >
          <Picker
            mode="dropdown"
            style={{ flexGrow: 1, width: 'auto', borderBottomWidth: 0 }}
            iosIcon={<Icon name='arrow-down' />}
            placeholderStyle={{ color: '#bfc6ea' }}
            placeholderIconColor='#007aff'
            onValueChange={(value) => {setSelectedItems([]); handleChangeSearchType(value); handleSkillsAndSpecialtyChange([]); setCurrentPickerType(value == "user" || value == "job" ? skill_picker_items:specialty_picker_items)}}
            selectedValue={searchType}
          >
            <Picker.Item label='👤' value='user' key="1"/>
            <Picker.Item label='🏢' value='company' key="2" />
            <Picker.Item label='💼' value='job' key="3"/>
          </Picker>
        </Item>
      </View>
      <View style={{marginLeft: 16, marginRight: 16}}>
      <SectionedMultiSelect
                  items={currentPickerType} 
                  IconRenderer={MaterialIcons}
                  uniqueKey='id'
                  subKey='children'
                  selectText="Skill & Specialty"
                  showDropDowns={false}
                  readOnlyHeadings={true}
                  onSelectedItemsChange={onSelectedItemsChange}
                  selectedItems={selectedItems}
                  colors={{primary: color.brandPrimary}}
                  onConfirm={() => {handleSkillsAndSpecialtyChange(selectedItems)}}
                  customChipsRenderer={(chipProperties) => {
                    return (
                              <FlatList
                              horizontal={true}
                              data={chipProperties.selectedItems}
                              renderItem={({ item }) => {
                                return (
                                  <Text
                                    style={{
                                      backgroundColor: color.brandPrimary,
                                      marginRight: 10,
                                      color: '#FFFFFF',
                                      borderRadius: 100,
                                      paddingTop: 3,
                                      paddingBottom: 3,
                                      paddingLeft: 10,
                                      paddingRight: 10,
                                    }}
                                  >
                                    {item}
                                  </Text>
                                )
                              }}
                              keyExtractor={(item) => item.toString()}
                            ></FlatList>
                      )
                  }}
                />
                </View>
      <FlatList
        data={searchResult}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
      ></FlatList>
    </Screen>
  )
}
