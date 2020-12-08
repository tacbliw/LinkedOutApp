import {
  Form,
  Header,
  Icon,
  Input,
  Item,
  Picker,
  Text,
  Textarea,
  View,
} from 'native-base'
import React, { useEffect, useState } from 'react'
import {
  Dimensions,
  FlatList,
  LogBox,
  StyleSheet,
  TouchableOpacity,
  useWindowDimensions,
} from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import SectionedMultiSelect from 'react-native-sectioned-multi-select'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import { screens } from '../../config/screens'
import { jobService } from '../../services/job-service'
import { tagService } from '../../services/tag-service'
import { color } from '../../theme'

const { width, height } = Dimensions.get('window')

const styles = StyleSheet.create({
  ROOT: {
    flex: 1,
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
    marginLeft: 10,
    marginRight: 10,
  },
  headerTitle: {
    color: color.palette.black,
    fontSize: 32,
    fontWeight: 'bold',
  },

  textInput: {
    marginTop: 24,
  },

  textInputIcon: {
    color: color.brandPrimary,
  },
})

export const CreateJobScreen = function ({ navigation }) {
  LogBox.ignoreAllLogs() // holy fuck im actually using this fucking shit

  const [
    title,
    description,
    seniorityLevel,
    recruitmentUrl,
    employmentType,
    cities,
    skills,
    onTitleChange,
    onDescriptionChange,
    onSeniorityLevelChange,
    onRecruitmentUrlChange,
    onEmploymentTypeChange,
    onCityChange,
    onSkillsChange,
    handleSave,
  ] = jobService.useJob()

  const [dataMultiSelected, setDataMultiSelected] = useState([])

  const [
    skillTag,
    getAllSkillTag,
    getSkillTagByQuery,
  ] = tagService.useSkillTag()

  React.useEffect(() => {
    getAllSkillTag()
  }, [null])

  useEffect(() => {
    setDataMultiSelected([
      {
        name: 'Specialty',
        id: 1,
        children: skillTag
          ? skillTag.map((item, index) => ({ name: item, id: index }))
          : [],
      },
    ])

    // specialtyTag?setSelectedItems(specialtyTag.map(item => specialtyTag.indexOf(item))):''
  }, [skillTag])

  const [locationQuery, setLocationQuery] = useState<string>('')

  const [selectedItems, setSelectedItems] = useState([])

  const onSelectedItemsChange = (selectedItems) => {
    setSelectedItems(selectedItems)
  }

  return (
    <ScrollView style={styles.ROOT}>
      <Header transparent style={styles.header}>
        <TouchableOpacity
          onPress={() =>
            navigation.navigate(screens.authenticated.company.profile)
          }
        >
          <Icon name='close-outline' style={{ color: color.brandLight }}></Icon>
        </TouchableOpacity>
        {/* <Text style={styles.headerTitle}>Create job</Text> */}
        <TouchableOpacity onPress={handleSave}>
          <Text
            style={{ color: color['color-primary-600'], fontWeight: '700' }}
          >
            Add
          </Text>
        </TouchableOpacity>
      </Header>

      <View style={{ alignItems: 'center' }}>
        <Form style={{ width: useWindowDimensions().width * 0.8 }}>
          <Item style={styles.textInput}>
            <Icon style={styles.textInputIcon} name='document-outline' />
            <Input placeholder='Title' onChange={onTitleChange} />
          </Item>
          <Item style={styles.textInput}>
            <Icon style={styles.textInputIcon} name='cellular-outline' />
            <Input
              placeholder='Seniority Level'
              onChange={onSeniorityLevelChange}
            />
          </Item>

          <Item style={styles.textInput}>
            <Icon style={styles.textInputIcon} name='earth-outline' />
            <Input
              placeholder='Recruiment URL'
              onChange={onRecruitmentUrlChange}
            />
          </Item>

          <Item style={styles.textInput}>
            <Icon style={styles.textInputIcon} name='filter-outline' />
            <Input
              placeholder='Employment type'
              onChange={onEmploymentTypeChange}
            />
          </Item>

          <Item picker style={{ marginLeft: 16, marginTop: 24 }}>
            <Icon style={styles.textInputIcon} name='location-outline' />
            <Picker
              mode='dialog'
              placeholder='Location'
              placeholderStyle={{ color: '#bfc6ea' }}
              placeholderIconColor='#007aff'
              selectedValue={cities.length === 1 ? cities[0] : undefined}
              onValueChange={onCityChange}
            >
              <Picker.Item label='Ho Chi Minh City' value='Ho Chi Minh City' />
              <Picker.Item label='Truc Giang' value='Truc Giang' />
              <Picker.Item label='Tri Tram' value='Tri Tram' />
              <Picker.Item label='Muong Het' value='Muong Het' />
              <Picker.Item label='Lao Cai' value='Lao Cai' />
            </Picker>
          </Item>

          <Item style={{ borderBottomWidth: 0, marginTop: 24 }}>
            <SectionedMultiSelect
              items={dataMultiSelected}
              IconRenderer={MaterialIcons}
              uniqueKey='id'
              subKey='children'
              selectedText='Skill you need'
              showDropDowns={false}
              readOnlyHeadings={true}
              onSelectedItemsChange={onSelectedItemsChange}
              selectedItems={selectedItems}
              colors={{ primary: color['color-primary-500'] }}
              onConfirm={() => {
                onSkillsChange(selectedItems.map((item) => skillTag[item]))
              }}
              renderSelectText={() => {
                return <Text style={{ flexGrow: 1 }}>Skill you need</Text>
              }}
              customChipsRenderer={(chipProperties) => {
                return (
                  <FlatList
                    style={{ marginLeft: 0 }}
                    contentContainerStyle={{ flexDirection: 'column' }}
                    numColumns={3}
                    data={chipProperties.selectedItems}
                    renderItem={({ item }) => {
                      return (
                        <Text
                          style={{
                            backgroundColor: color['color-primary-400'],
                            // marginRight: 10,
                            color: color['color-gray-100'],
                            borderRadius: 100,
                            paddingTop: 3,
                            paddingBottom: 3,
                            paddingLeft: 10,
                            paddingRight: 10,
                            marginRight: 5,
                            marginBottom: 5,
                          }}
                        >
                          {skillTag[item]}
                        </Text>
                      )
                    }}
                    keyExtractor={(item) => item.toString()}
                  ></FlatList>
                )
              }}
            />
          </Item>

          <Item style={{ borderBottomColor: '#FFFFFF' }}>
            <Textarea
              style={[
                styles.textInput,
                {
                  borderRadius: 10,
                  backgroundColor: '#FFFFFF',
                  flexGrow: 1,
                  marginBottom: 24,
                },
              ]}
              rowSpan={5}
              underline={false}
              bordered={true}
              placeholder='Description'
              onChange={onDescriptionChange}
            />
          </Item>
        </Form>
      </View>
    </ScrollView>
  )
}
