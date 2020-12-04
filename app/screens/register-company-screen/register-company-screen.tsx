import { Form, Icon, Input, Item, Textarea } from 'native-base'
import React, { useEffect, useState } from 'react'
import {
  FlatList,
  TouchableOpacity,
  useWindowDimensions,
  View
} from 'react-native'
import SectionedMultiSelect from 'react-native-sectioned-multi-select'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import { Screen, Text } from '../../components'
import { accountService } from '../../services/account-service'
import { tagService } from '../../services/tag-service'
import { color } from '../../theme/color'
import { styles } from './styles'

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

export const RegisterCompanyScreen = function RegisterCompanyScreen({
  route,
  navigation,
}) {
  const [
    companyName,
    handleCompanyNameChange,
    website,
    handleWebsiteChange,
    specialties,
    handleChangeSpecialities,
    description,
    handleDescriptionChange,
    handleCompanyRegister,
  ] = accountService.useRegisterCompany(route.params)

  const [selectedItems, setSelectedItems] = useState([])
  const [dataMultiSelected, setDataMultiSelected] = useState([])

  const onSelectedItemsChange = (selectedItems) => {
    setSelectedItems(selectedItems)
  }

  const [
    specialtyTag,
    getAllSpecialtyTag,
    getSpecialtyTagByQuery,
	] = tagService.useSpecialtyTag()

  React.useEffect(() => {
    console.log('RegisterCompanyScreen')
    getAllSpecialtyTag();
  }, [null])

  useEffect(() => {
		setDataMultiSelected([
			{
				name: 'Specialty', 
				id: 1,
				children: specialtyTag?specialtyTag.map((item, index) =>( {name: item, id: index} )):[]
			}
		
		])

		// specialtyTag?setSelectedItems(specialtyTag.map(item => specialtyTag.indexOf(item))):''
		
  }, [specialtyTag])
  
  return (
    <Screen style={styles.container} preset='scroll'>
      <Text style={styles.header}>Tell us more about you!</Text>
      <View style={styles.rect}>
        <Form style={{ width: useWindowDimensions().width * 0.8 }}>
          <Item style={styles.textInput}>
            <Icon style={styles.textInputIcon} name='business-outline' />
            <Input
              placeholder='Company name'
              onChange={handleCompanyNameChange}
            />
          </Item>
          <Item style={styles.textInput}>
            <Icon style={styles.textInputIcon} name='earth-outline' />
            <Input placeholder='Website' onChange={handleWebsiteChange} />
          </Item>
          <Item style={{ borderBottomColor: '#FFFFFF' }}>
            <Textarea
              style={[
                styles.textInput,
                {
                  borderRadius: 10,
                  backgroundColor: '#FFFFFF',
                  flexGrow: 1,
                },
              ]}
              rowSpan={5}
              underline={false}
              bordered={true}
              placeholder='Description'
              onChange={handleDescriptionChange}
            />
          </Item>

          <Item style={{borderBottomWidth: 0}}>
          <SectionedMultiSelect
                  styles={{}}
                  items={dataMultiSelected} 
                  IconRenderer={MaterialIcons}
                  uniqueKey='id'
                  subKey='children'
                  selectedText="Your company specialty"
                  showDropDowns={false}
                  readOnlyHeadings={true}
                  onSelectedItemsChange={onSelectedItemsChange}
                  selectedItems={selectedItems}
                  colors={{primary: color['color-primary-500']}}
                  onConfirm={() => {handleChangeSpecialities(selectedItems.map(item => specialtyTag[item]))}}
                  renderSelectText = {() => {
                
                    return <Text style={{color: color["color-gray-900"]}}>Your company specialty</Text>
                  }}
                  customChipsRenderer={(chipProperties) => {
                    return (
                              <FlatList
                              contentContainerStyle={{flexDirection: 'row', flexWrap: 'wrap'}}
                              data={chipProperties.selectedItems}
                              renderItem={({ item }) => {
                                return (
                                  <Text
                                    style={{
                                      backgroundColor: color["color-primary-400"],
                                      color: color["color-gray-100"],
                                      borderRadius: 100,
                                      paddingTop: 3,
                                      paddingBottom: 3,
                                      paddingLeft: 10,
                                      paddingRight: 10,
                                      marginRight: 5,
                                      marginBottom: 5
                                    }}
                                  >
                                    {specialtyTag[item]}
                                  </Text>
                                )
                              }}
                              keyExtractor={(item) => item.toString()}
                            ></FlatList>
                      )
                    }}
            />
          </Item>
        </Form>
        <View style={styles.submitButton}>
          <TouchableOpacity style={styles.button} onPress={handleCompanyRegister}>
            <Text style={styles.submit}>Register</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Screen>
  )
}
