import React from 'react'
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native'
import { useRef } from 'reactn'
import { Text } from '../../components'
import { accountService } from '../../services/account-service'
import { color } from '../../theme'
import { styles } from './styles'

export function RegisterCompanyScreen({ route, navigation }) {
  const nameRef = useRef()
  const websiteRef = useRef()
  const specialtiesRef = useRef()
  const descriptionRef = useRef()
  const [
    companyName,
    handleCompanyNameChange,
    website,
    handleWebsiteChange,
    specialties,
    handleSpecialtiesChange,
    description,
    handleDescriptionChange,
    handleCompanyRegister,
  ] = accountService.useRegisterCompany(route.params)
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <Text style={styles.header}>Tell us more about you!</Text>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.rect}>
          <View style={styles.group2}>
            <View style={styles.group}>
              <TextInput
                placeholder='Company Name'
                autoFocus={true}
                style={styles.textInput}
                value={companyName}
                onChange={handleCompanyNameChange}
                placeholderTextColor={color.placeHolder}
                onSubmitEditing={() => websiteRef.current?.focus()}
                returnKeyType={'next'}
                ref={nameRef}
              ></TextInput>

              <TextInput
                placeholder='Website (optional)'
                placeholderTextColor={color.placeHolder}
                keyboardType='url'
                value={website}
                onChange={handleWebsiteChange}
                ref={websiteRef}
                onSubmitEditing={() => specialtiesRef.current?.focus()}
                style={styles.textInput}
                returnKeyType={'next'}
              ></TextInput>
              <TextInput
                placeholder='Specialties'
                placeholderTextColor={color.placeHolder}
                value={specialties}
                onChange={handleSpecialtiesChange}
                ref={specialtiesRef}
                onSubmitEditing={() => descriptionRef.current?.focus()}
                style={styles.textInput}
                returnKeyType={'next'}
              ></TextInput>
              <TextInput
                placeholder='Description'
                value={description}
                onChange={handleDescriptionChange}
                placeholderTextColor={color.placeHolder}
                secureTextEntry={true}
                style={styles.textInputDescription}
                ref={descriptionRef}
                multiline={true}
                onSubmitEditing={handleCompanyRegister}
              ></TextInput>
            </View>
            <View style={styles.submitButton}>
              <TouchableOpacity
                onPress={handleCompanyRegister}
                style={styles.button}
              >
                <Text style={styles.submit}>SUBMIT</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  )
}
