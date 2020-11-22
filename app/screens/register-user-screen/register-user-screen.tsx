import DateTimePicker from '@react-native-community/datetimepicker'
import { Form, Icon, Input, Item, Picker, Textarea, View } from 'native-base'
import React from 'react'
import { TouchableOpacity, useWindowDimensions } from 'react-native'
import { Screen, Text } from '../../components'
import { accountService } from '../../services/account-service'
import { color } from '../../theme'
import { styles } from './styles'

export function RegisterUserScreen({ route, navigation }) {
  const [
    firstName,
    handleFirstNameChange,
    lastname,
    handleLastNameChange,
    dateOfBirth,
    handleDateOfBirthChange,
    showDatePicker,
    handleDatePickerPress,
    gender,
    handleGenderChange,
    description,
    handleDescriptionChange,
    handleUserRegister,
  ] = accountService.useRegisterUser(route.params)
  return (
    <Screen style={styles.container} preset='scroll'>
      <Text style={styles.header}>Tell us more about you!</Text>
      <View style={styles.rect}>
        <Form style={{ width: useWindowDimensions().width * 0.8 }}>
          <Item style={styles.textInput}>
            <Icon style={styles.textInputIcon} name='person-outline' />
            <Input
              placeholder='First Name'
              value={firstName}
              onChange={handleFirstNameChange}
            />
          </Item>
          <Item style={styles.textInput}>
            <Icon style={styles.textInputIcon} name='person-add-outline' />
            <Input
              placeholder='Last Name'
              value={lastname}
              onChange={handleLastNameChange}
            />
          </Item>
          <Item style={styles.textInput}>
            <Icon
              style={styles.textInputIcon}
              name='calendar-outline'
              onPress={handleDatePickerPress}
            />
            {showDatePicker && (
              <DateTimePicker
                testID='dateTimePicker'
                value={dateOfBirth}
                display='default'
                onChange={(event, date) => handleDateOfBirthChange(date)}
              />
            )}
            <Input>{dateOfBirth.toDateString()}</Input>
          </Item>
          <Item picker style={[styles.textInput, { marginLeft: 14 }]}>
            <Picker
              mode='dropdown'
              selectedValue={gender}
              style={{
                color: color.brandDark,
              }}
              placeholder='gender'
              onValueChange={handleGenderChange}
            >
              <Picker.Item label='Male' value='male' />
              <Picker.Item label='Female' value='female' />
            </Picker>
          </Item>
          <Item style={{ borderBottomColor: '#FFFFFF' }}>
            <Textarea
              style={[
                styles.textInput,
                {
                  borderRadius: 10,
                  backgroundColor: '#ffffff',
                  flexGrow: 1,
                },
              ]}
              value={description}
              onChange={handleDescriptionChange}
              rowSpan={5}
              underline={false}
              bordered={true}
              placeholder='Description'
            />
          </Item>
        </Form>
        <View style={styles.submitButton}>
          <TouchableOpacity style={styles.button} onPress={handleUserRegister}>
            <Text style={styles.submit}>Register</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Screen>
  )
}
