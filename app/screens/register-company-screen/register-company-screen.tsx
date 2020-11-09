import { observer } from 'mobx-react-lite'
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
import { Text } from '../../components'
import { screens } from '../../config/screens'
import { accountService } from '../../services/account-service'
import { color } from '../../theme'
import { styles } from './styles'

export const RegisterCompanyScreen = observer(function RegisterCompanyScreen({
  navigation,
}) {
  const [
    companyName,
    handleCompanyNameChange,
    website,
    handleWebsiteChange,
    specialities,
    handleSpecialitiesChange,
    description,
    handleDescriptionChange,
  ] = accountService.useRegisterCompany()
  React.useEffect(() => {
    console.log('RegisterCompanyScreen')
  }, [])
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        {/* <Text style={{color:"#000"}}>Tell us more about your company!</Text>
            <View style={styles.rect}>
              <View style={styles.group2}>
                <View style={styles.group}>
                  <View style={styles.userName}>
                    <View style={styles.iconStack}>
                      <TextInput
                        placeholder="Company Name"
                        autoFocus={true}
                        style={styles.username}

                        value={companyName}
                        onChange={handleCompanyNameChange}
                        placeholderTextColor={color.placeHolder}
                        onSubmitEditing={()=>{this.website.focus();}}
                        returnKeyType={"next"}
                      ></TextInput>
                      <MaterialIconsIcon name="person-add" style={styles.icon}></MaterialIconsIcon>
                    </View>
                  </View>
                  <View style={styles.email}>
                    <View style={styles.icon2Stack}>
                    <TextInput
                        placeholder="Website"
                        placeholderTextColor={color.placeHolder}
                        keyboardType="email-address"
                        value={website}
                        onChange={handleWebsiteChange}
                        ref={(input)=>{this.website =input;}}
                        onSubmitEditing={()=>this.specialities.focus()}
                        style={styles.mail}
                        returnKeyType={"next"}
                        //
                      ></TextInput>
                      <FeatherIcon name="mail" style={styles.icon2}></FeatherIcon>
                    </View>
                  </View>
                  <View style={styles.type}>
                    <TextInput
                      placeholder="Specialities"
                      placeholderTextColor={color.placeHolder}
                      value={specialities}
                      onChange={handleSpecialitiesChange}
                    // dataDetector="calendarEvent"
                     ref={(input)=>this.specialities =input}
                     onSubmitEditing={()=>this.description.focus()}
                      style={styles.user}
                      returnKeyType={"next"}
                    ></TextInput>
                  </View>
                  <View style={styles.gender}>
                    <View style={styles.icon3Stack}>
                      <TextInput
                        placeholder="Description"
                        value={description}
                        onChange={handleDescriptionChange}
                        placeholderTextColor={color.placeHolder}
                        secureTextEntry={true}
                        style={styles.password}
                        ref={(input)=>this.description =input}
                      ></TextInput>
                      <MaterialCommunityIconsIcon name="key-plus" style={styles.icon3} ></MaterialCommunityIconsIcon>
                    </View>
                  </View>
                </View>
              </View>
              <View style={styles.email}>
                <View style={styles.icon2Stack}>
                  <TextInput
                    placeholder='Website'
                    placeholderTextColor={color.placeHolder}
                    keyboardType='email-address'
                    value={website}
                    onChange={handleWebsiteChange}
                    ref={(input) => {
                      this.website = input
                    }}
                    onSubmitEditing={() => this.specialities.focus()}
                    style={styles.mail}
                    returnKeyType={'next'}
                    //
                  ></TextInput>
                  <FeatherIcon name='mail' style={styles.icon2}></FeatherIcon>
                </View>
              </View>
              <View style={styles.type}>
                <TextInput
                  placeholder='Specialities'
                  placeholderTextColor={color.placeHolder}
                  value={specialities}
                  onChange={handleSpecialitiesChange}
                  // dataDetector="calendarEvent"
                  ref={(input) => (this.specialities = input)}
                  onSubmitEditing={() => this.description.focus()}
                  style={styles.user}
                  returnKeyType={'next'}
                ></TextInput>
              </View>
              <View style={styles.gender}>
                <View style={styles.icon3Stack}>
                  <TextInput
                    placeholder='Description'
                    value={description}
                    onChange={handleDescriptionChange}
                    placeholderTextColor={color.placeHolder}
                    secureTextEntry={true}
                    style={styles.password}
                    ref={(input) => (this.description = input)}
                  ></TextInput>
                  <MaterialCommunityIconsIcon
                    name='key-plus'
                    style={styles.icon3}
                  ></MaterialCommunityIconsIcon>
                </View>
              </View>
            </View>
          */}

        <Text style={styles.header}>Tell us more about you!</Text>
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
                onSubmitEditing={() => {
                  this.website.focus()
                }}
                returnKeyType={'next'}
              ></TextInput>

              <TextInput
                placeholder='Website'
                placeholderTextColor={color.placeHolder}
                keyboardType='email-address'
                value={website}
                onChange={handleWebsiteChange}
                ref={(input) => {
                  this.website = input
                }}
                onSubmitEditing={() => this.specialities.focus()}
                style={styles.textInput}
                returnKeyType={'next'}
                //
              ></TextInput>
              <TextInput
                placeholder='Specialities'
                placeholderTextColor={color.placeHolder}
                value={specialities}
                onChange={handleSpecialitiesChange}
                ref={(input) => (this.specialities = input)}
                onSubmitEditing={() => this.description.focus()}
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
                ref={(input) => (this.description = input)}
                multiline={true}
              ></TextInput>
            </View>
            <View style={styles.submitButton}>
              <TouchableOpacity
                onPress={() => navigation.navigate(screens.basic.register.user)}
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
})
