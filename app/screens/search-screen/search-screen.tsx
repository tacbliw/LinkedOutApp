import {
  Header,
  Icon,
  Input,
  Item,
  Left,
  Picker,
  Right,
  Text,
  View,
} from 'native-base'
import React, { useState } from 'react'
import { Dimensions, FlatList, StyleSheet, ViewStyle } from 'react-native'
import SectionedMultiSelect from 'react-native-sectioned-multi-select'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import {
  Screen,
  SearchItemCompany,
  SearchItemJob,
  SearchItemUser,
} from '../../components'
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
  if (item.type === 'user')
    return (
      <SearchItemUser
        style={style}
        onPress={() => {
          onPress({ type: item.type, id: item.id })
        }}
        profilePicture={item.profilePicture}
        firstname={item.firstname}
        lastname={item.lastname}
        gender={item.gender}
        description={item.description}
        skills={item.skills}
      ></SearchItemUser>
    )
  else if (item.type === 'company')
    return (
      <SearchItemCompany
        style={style}
        onPress={() => {
          onPress({ type: item.type, id: item.id })
        }}
        profilePicture={item.profilePicture}
        name={item.name}
        website={item.website}
        description={item.description}
        specialties={item.specialties}
      ></SearchItemCompany>
    )
  else if (item.type === 'job')
    return (
      <SearchItemJob
        style={style}
        onPress={() => {
          onPress({ type: item.type, id: item.accountId })
        }}
        title={item.title}
        jobPicture={item.jobPicture}
        city={item.cities[0]}
        employmentType={item.employmentType}
        publishedDate={item.publishedDate}
      ></SearchItemJob>
    )
}

const specialtyPickerItems = [
  {
    name: 'Specialty',
    id: 1,
    // these are the children or 'sub items'
    children: [
      {
        name: 'Retail Sales',
        id: 'Retail Sales',
      },
      {
        name: 'Real Estate',
        id: 'Real Estate',
      },
      {
        name: 'Internet',
        id: 'Internet',
      },
      {
        name: 'Out-source',
        id: 'Out-source',
      },
      {
        name: 'Product',
        id: 'Product',
      },
      {
        name: 'Semiconductor',
        id: 'Semiconductor',
      },
      {
        name: 'Education',
        id: 'Education',
      },
      {
        name: 'Food & Beverage',
        id: 'Food & Beverage',
      },
      {
        name: 'Gas & Oil',
        id: 'Gas & Oil',
      },
      {
        name: 'Health',
        id: 'Health',
      },
      {
        name: 'Health Services/HMOs',
        id: 'Health Services/HMOs',
      },
      {
        name: 'Manufacturing',
        id: 'Manufacturing',
      },
      {
        name: 'Phone Companies',
        id: 'Phone Companies',
      },
      {
        name: 'Sea Transport',
        id: 'Sea Transport',
      },
      {
        name: 'Waste Management',
        id: 'Waste Management',
      },
      {
        name: 'Telecom Services & Equipment',
        id: 'Telecom Services & Equipment',
      },
      {
        name: 'Savings & Loans',
        id: 'Savings & Loans',
      },
      {
        name: 'Power Utilities',
        id: 'Power Utilities',
      },
      {
        name: 'Livestock',
        id: 'Livestock',
      },
      {
        name: 'Consumer Electronics',
        id: 'Consumer Electronics',
      },
    ],
  },
]

const skillPickerItems = [
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
      {
        name: 'Golang',
        id: 'Golang',
      },
      {
        name: 'Networking',
        id: 'Networking',
      },
      {
        name: 'DevOps',
        id: 'DevOps',
      },
      {
        name: 'Java',
        id: 'Java',
      },
      {
        name: 'Javascript',
        id: 'Javascript',
      },
      {
        name: 'HTML',
        id: 'HTML',
      },
      {
        name: 'CSS',
        id: 'CSS',
      },
      {
        name: 'C',
        id: 'C',
      },
      {
        name: 'Swift',
        id: 'Swift',
      },
      {
        name: 'PHP',
        id: 'PHP',
      },
      {
        name: 'Perl',
        id: 'Perl',
      },
      {
        name: 'Ruby',
        id: 'Ruby',
      },
      {
        name: 'Shell',
        id: 'Shell',
      },
      {
        name: 'Typescript',
        id: 'Typescript',
      },
      {
        name: 'Linux',
        id: 'Linux',
      },
      {
        name: 'NodeJS',
        id: 'NodeJS',
      },
      {
        name: 'Flutter',
        id: 'Flutter',
      },
      {
        name: 'React',
        id: 'React',
      },
      {
        name: 'Angular',
        id: 'Angular',
      },
      {
        name: 'React Native',
        id: 'React Native',
      },
      {
        name: 'Machine Learning',
        id: 'Machine Learning',
      },
      {
        name: 'Microsoft Office',
        id: 'Microsoft Office',
      },
      {
        name: 'AI',
        id: 'AI',
      },
    ],
  },
]

export const SearchScreen = function SearchScreen() {
  const [
    searchData,
    handleChangeSearchData,
    searchType,
    handleChangeSearchType,
    searchResult,
    handleSearch,
    handleSkillsAndSpecialtyChange,
  ] = searchService.useSearch()

  const [handleItemPress] = searchService.useViewDetail()

  const [selectedItems, setSelectedItems] = useState([])

  const [currentPickerType, setCurrentPickerType] = useState(skillPickerItems)

  const onSelectedItemsChange = (selectedItems) => {
    setSelectedItems(selectedItems)
    // handleSkillsAndSpecialtyChange(selectedItems)
  }

  const renderItem = ({ item }) => {
    return (
      <FlatItem
        item={item}
        onPress={handleItemPress}
        style={{ margin: 16 }}
      ></FlatItem>
    )
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
            mode='dropdown'
            style={{ flexGrow: 1, width: 'auto', borderBottomWidth: 0 }}
            iosIcon={<Icon name='arrow-down' />}
            placeholderStyle={{ color: '#bfc6ea' }}
            placeholderIconColor='#007aff'
            onValueChange={(value) => {
              setSelectedItems([])
              handleChangeSearchType(value)
              handleSkillsAndSpecialtyChange([])
              setCurrentPickerType(
                value === 'user' || value === 'job'
                  ? skillPickerItems
                  : specialtyPickerItems,
              )
            }}
            selectedValue={searchType}
          >
            <Picker.Item label='👤' value='user' key='1' />
            <Picker.Item label='🏢' value='company' key='2' />
            <Picker.Item label='💼' value='job' key='3' />
          </Picker>
        </Item>
      </View>
      <View style={{ marginLeft: 16, marginRight: 16 }}>
        <SectionedMultiSelect
          items={currentPickerType}
          IconRenderer={MaterialIcons}
          uniqueKey='id'
          subKey='children'
          selectText='Skill & Specialty'
          showDropDowns={false}
          readOnlyHeadings={true}
          onSelectedItemsChange={onSelectedItemsChange}
          selectedItems={selectedItems}
          colors={{ primary: color.brandPrimary }}
          onConfirm={() => {
            handleSkillsAndSpecialtyChange(selectedItems)
          }}
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
