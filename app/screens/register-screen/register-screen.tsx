import { observer } from 'mobx-react-lite'
import { Picker } from 'native-base'
import React from 'react'
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View
} from 'react-native'
import FeatherIcon from 'react-native-vector-icons/Feather'
import MaterialCommunityIconsIcon from 'react-native-vector-icons/MaterialCommunityIcons'
import MaterialIconsIcon from 'react-native-vector-icons/MaterialIcons'
import { useRef } from 'reactn'
import { Text } from '../../components'
import { accountService } from '../../services/account-service'
import { color } from '../../theme'
import { styles } from './styles'

export const RegisterScreen = observer(function RegisterScreen({ navigation }) {
  const emailRef = useRef()
  const passwordRef = useRef()

  const [
    username,
    handleUsernameChange,
    email,
    handleEmailChange,
    accountType,
    handleTypeChange,
    password,
    handlePasswordChange,
    handleSignUp,
  ] = accountService.useSignUp()

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
                placeholder='Username'
                style={styles.inputText}
                value={username}
                onChange={handleUsernameChange}
                placeholderTextColor={color.placeHolder}
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
                ref={emailRef}
                style={styles.inputText}
                returnKeyType={'next'}
              ></TextInput>
            </View>
            <View style={styles.lineIcon}>
              <MaterialCommunityIconsIcon
                name='account-box-multiple'
                style={styles.icon}
              ></MaterialCommunityIconsIcon>
              <View style={{}}>
                <Picker
                  mode='dialog'
                  selectedValue={accountType}
                  style={styles.inputText}
                  onValueChange={handleTypeChange}
                >
                  <Picker.Item label='User' value='user' />
                  <Picker.Item label='Company' value='company' />
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
                ref={passwordRef}
              ></TextInput>
            </View>
          </View>
          <TouchableOpacity onPress={handleSignUp} style={styles.button}>
            <Text style={styles.register}>REGISTER</Text>
          </TouchableOpacity>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  )
})
