import {
  Card,
  CardItem,
  Header,
  Icon,
  Input,
  Item,
  Left,
  Picker,
  Right,
  Text,
  Thumbnail,
  View,
} from 'native-base'
import React from 'react'
import {
  Dimensions,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  ViewStyle,
} from 'react-native'
import { Screen } from '../../components'
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

const megha = require('./avatar.jpg')

const datas = [
  {
    img: megha,
    name: 'LeCun',
    text:
      'Yann André LeCun is a French computer scientist working primarily in the fields of machine learning, computer vision, mobile robotics, and computational neuroscience',
    organization: 'VNU UET, Viet Nam',
    skills: ['C#', 'Python', 'LOL'],
  },
  {
    img: megha,
    name: 'Ian Goodfellow',
    text:
      'Ian J. Goodfellow is a researcher working in machine learning, currently employed at Apple Inc. as its director of machine learning in the Special Projects Group',
    organization: 'VNU UET, Viet Nam',
    skills: ['C#', 'Python', 'LOL'],
  },
  {
    img: megha,
    name: 'Yoshua Bengio',
    text:
      'Yoshua Bengio FRS OC FRSC is a Canadian computer scientist, most noted for his work on artificial neural networks and deep learning.',
    organization: 'VNU UET, Viet Nam',
    skills: ['C#', 'Python', 'LOL'],
  },
]

const FlatItem = ({ item, onPress, style }) => (
  <TouchableOpacity onPress={onPress} style={style}>
    <Card transparent>
      <CardItem
        style={{
          backgroundColor: '#f6f5fb',
          borderTopLeftRadius: 15,
          borderTopRightRadius: 15,
        }}
      >
        <View style={{ flexDirection: 'row' }}>
          <Thumbnail
            square
            style={{ borderRadius: 15, width: 55, height: 55 }}
            source={item.img}
          ></Thumbnail>
          <View style={{ marginLeft: 16, justifyContent: 'space-between' }}>
            <Text style={{ fontSize: 20, fontWeight: 'bold' }}>
              {item.name}
            </Text>
            <Text style={{ color: color.brandLight }}>{item.organization}</Text>
          </View>
        </View>
      </CardItem>
      <CardItem
        style={{
          backgroundColor: '#f6f5fb',
          marginBottom: -20,
          borderBottomLeftRadius: 15,
          borderBottomRightRadius: 15,
        }}
      >
        <View style={{ flexDirection: 'column' }}>
          <Text style={{ color: color.brandLight }}>{item.text}</Text>
          <FlatList
            style={{ marginTop: 16 }}
            horizontal={true}
            data={item.skills}
            renderItem={({ item }) => {
              return (
                <Text
                  style={{
                    backgroundColor: '#ffffff',
                    marginRight: 10,
                    color: color.brandLight,
                    borderRadius: 10,
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
            keyExtractor={(item) => item}
          ></FlatList>
        </View>
      </CardItem>
    </Card>
  </TouchableOpacity>
)

const renderItem = ({ item }) => {
  return (
    <FlatItem
      item={item}
      onPress={() => {}} //
      style={{ margin: 16 }}
    ></FlatItem>
  )
}

export const SearchScreen = function SearchScreen() {
  const [
    searchData,
    handleChangeSearchData,
    searchType,
    handleSearchTypeChange,
    searchResult,
    handleSearch,
  ] = searchService.useSearch()
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
            mode='dialog'
            style={{ flexGrow: 1, width: 'auto', borderBottomWidth: 0 }}
            iosIcon={<Icon name='arrow-down' />}
            placeholder='Select your SIM'
            placeholderStyle={{ color: '#bfc6ea' }}
            placeholderIconColor='#007aff'
            onValueChange={handleSearchTypeChange}
            selectedValue={searchType}
          >
            <Picker.Item label='Student' value='student' />
            <Picker.Item label='Company' value='company' />
            <Picker.Item label='Job' value='job' />
          </Picker>
        </Item>
      </View>

      <FlatList
        data={datas}
        renderItem={renderItem}
        keyExtractor={(item) => item.title}
      ></FlatList>
    </Screen>
  )
}
