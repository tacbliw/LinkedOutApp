import { Picker, View } from 'native-base'
import React from 'react'
import { StatusBar, TextInput, TouchableOpacity } from 'react-native'
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
    gender,
    handleGenderChange,
    description,
    handleDescriptionChange,
    handleUserRegister,
  ] = accountService.useRegisterUser(route.params)
  return (
    <Screen style={styles.container} preset='scroll'>
      <StatusBar barStyle='light-content' />
      <Text style={styles.header}>Tell us more about you!</Text>
      <View style={styles.rect}>
        <View style={styles.group2}>
          <View style={styles.group}>
            <TextInput
              value={firstName}
              placeholder='First Name'
              placeholderTextColor={color.placeHolder}
              style={styles.textInput}
              autoFocus={true}
              onChange={handleFirstNameChange}
            />
            <TextInput
              value={lastname}
              placeholder='Last Name'
              placeholderTextColor={color.placeHolder}
              style={styles.textInput}
              onChange={handleLastNameChange}
            />
            {/* <DatePicker placeHolderText='Date of Birth' /> */}
            <TextInput
              value={dateOfBirth}
              placeholder='Date of Birth'
              placeholderTextColor={color.placeHolder}
              style={styles.textInput}
              onChangeText={handleDateOfBirthChange}
            />
            <View style={styles.textInput}>
              <Picker
                mode='dropdown'
                selectedValue={gender}
                style={{
                  color: color.brandDark,
                  justifyContent: 'center',
                }}
                placeholder='gender'
                onValueChange={handleGenderChange}
              >
                <Picker.Item label='Male' value='male' />
                <Picker.Item label='Female' value='female' />
              </Picker>
            </View>
            <TextInput
              value={description}
              placeholder='Description'
              placeholderTextColor={color.placeHolder}
              style={styles.textInput}
              multiline={true}
              onChange={handleDescriptionChange}
              onSubmitEditing={handleUserRegister}
            />
          </View>
          <View style={styles.submitButton}>
            <TouchableOpacity
              style={styles.button}
              onPress={handleUserRegister}
            >
              <Text style={styles.submit}>SUBMIT</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Screen>
  )
}
