import { observer } from 'mobx-react-lite'
import { Picker } from 'native-base'
import React, { useState } from 'react'
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native'
import FeatherIcon from 'react-native-vector-icons/Feather'
import MaterialCommunityIconsIcon from 'react-native-vector-icons/MaterialCommunityIcons'
import MaterialIconsIcon from 'react-native-vector-icons/MaterialIcons'
import { Text } from '../../components'
import { screens } from '../../config/screens'
import { accountService } from '../../services/account-service'
import { color } from '../../theme'
import { styles } from './styles'

export const RegisterScreen = observer(function RegisterScreen({ navigation }) {
  const [
    username,
    handleUsernameChange,
    email,
    handleEmailChange,
    type,
    handleTypeChange,
    password,
    handlePasswordChange,

    //  loading,
    // handleLogin,
  ] = accountService.useSignUp()

  const [selectedValue, setSelectedValue] = useState('Choose User or Company')

  React.useEffect(() => {
    console.log('RegisterScreen')
  }, [])
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <View style={styles.header}></View>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.rect}>
          <View style={styles.input}>
            <View style={styles.lineIcon}>
              <MaterialIconsIcon
                name='person-add'
                style={styles.icon}
              ></MaterialIconsIcon>
              <TextInput
                placeholder='User Name'
                autoFocus={true}
                style={styles.inputText}
                value={username}
                onChange={handleUsernameChange}
                placeholderTextColor={color.placeHolder}
                onSubmitEditing={() => {
                  this.email.focus()
                }}
                returnKeyType={'next'}
              ></TextInput>
            </View>
            <View style={styles.lineIcon}>
              <FeatherIcon name='mail' style={styles.icon}></FeatherIcon>
              <TextInput
                placeholder='Email'
                placeholderTextColor={color.placeHolder}
                keyboardType='email-address'
                value={email}
                onChange={handleEmailChange}
                ref={(input) => {
                  this.email = input
                }}
                onSubmitEditing={() => this.password.focus()}
                style={styles.inputText}
                returnKeyType={'next'}
                //
              ></TextInput>
            </View>
            <View style={styles.lineIcon}>
              <MaterialCommunityIconsIcon
                name='account-box-multiple'
                style={styles.icon}
              ></MaterialCommunityIconsIcon>
              <View style={{}}>
                <Picker
                  mode='dropdown'
                  selectedValue={selectedValue}
                  style={styles.inputText}
                  onValueChange={(itemValue) => setSelectedValue(itemValue)}
                >
                  <Picker.Item label='User' value='User' />
                  <Picker.Item label='Company' value='Company' />
                </Picker>
              </View>
            </View>
            <View style={styles.lineIcon}>
              <MaterialCommunityIconsIcon
                name='key-plus'
                style={styles.icon}
              ></MaterialCommunityIconsIcon>
              <TextInput
                placeholder='Password'
                value={password}
                onChange={handlePasswordChange}
                placeholderTextColor={color.placeHolder}
                secureTextEntry={true}
                style={styles.inputText}
                ref={(input) => (this.password = input)}
              ></TextInput>
            </View>
          </View>
          <View style={styles.registerButton}>
            <TouchableOpacity
              onPress={() => navigation.navigate(screens.basic.register.main)} // submit form}
              style={styles.button}
            >
              <Text style={styles.register}>REGISTER</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* <View style={styles.rect}>
              <View style={styles.group2}>
                <View style={styles.group}>
                  <View style={styles.userName}>
                    <View style={styles.iconStack}>
                      <TextInput
                        placeholder="User Name"
                        autoFocus={true}
                        style={styles.username}

                        value={username}
                        onChange={handleUsernameChange}
                        placeholderTextColor={color.placeHolder}
                        onSubmitEditing={()=>{this.email.focus();}}
                        returnKeyType={"next"}
                      ></TextInput>
                      <MaterialIconsIcon name="person-add" style={styles.icon}></MaterialIconsIcon>
                    </View>
                  </View>
                  <View style={styles.email}>
                    <View style={styles.icon2Stack}>
                    <TextInput
                        placeholder="Email"
                        placeholderTextColor={color.placeHolder}
                        keyboardType="email-address"
                        value={email}
                        onChange={handleEmailChange}
                        ref={(input)=>{this.email =input;}}
                        onSubmitEditing={()=>this.password.focus()}
                        style={styles.mail}
                        returnKeyType={"next"}
                        //
                      ></TextInput>
                      <FeatherIcon name="mail" style={styles.icon2}></FeatherIcon>
                    </View>
                  </View>
                  <View style={styles.type}>
                    {/* <TextInput
                      placeholder="User or Company"
                      placeholderTextColor={color.placeHolder}
                      value={type}
                      onChange={handleTypeChange}
                      ref={(input)=>this.type =input}
                      onSubmitEditing={()=>this.password.focus()}
                      style={styles.user}
                      returnKeyType={"next"}
                    ></TextInput>
                    <Picker
                      mode="dropdown"
                      selectedValue={selectedValue}
                      style={styles.user}
                      onValueChange={(itemValue, itemIndex)=> setSelectedValue(itemValue)}
                    >
                      <Picker.Item label="Male" value="Male"/>
                      <Picker.Item label="Female" value="Female"/>
                    </Picker>
                  </View>
                  <View style={styles.gender}>
                    <View style={styles.icon3Stack}>
                      <TextInput
                        placeholder="Password"
                        value={password}
                        onChange={handlePasswordChange}
                        placeholderTextColor={color.placeHolder}
                        secureTextEntry={true}
                        style={styles.password}
                        ref={(input)=>this.password =input}
                      ></TextInput>
                      <MaterialCommunityIconsIcon name="key-plus" style={styles.icon3} ></MaterialCommunityIconsIcon>
                    </View>
                  </View>
                </View>
              </View>
              <View style={styles.email}>
                <View style={styles.icon2Stack}>
                  <TextInput
                    placeholder='Email'
                    placeholderTextColor={color.placeHolder}
                    keyboardType='email-address'
                    value={email}
                    onChange={handleEmailChange}
                    ref={(input) => {
                      this.email = input
                    }}
                    onSubmitEditing={() => this.type.focus()}
                    style={styles.mail}
                    returnKeyType={'next'}
                    //
                  ></TextInput>
                  <FeatherIcon name='mail' style={styles.icon2}></FeatherIcon>
                </View>
              </View>
            </View> */}
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  )
})
