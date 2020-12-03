import { Form, Icon, Input, Item } from 'native-base'
import React from 'react'
import {
  Dimensions,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  useWindowDimensions, View,
  ViewStyle
} from 'react-native'
import EntypoIcon from 'react-native-vector-icons/Entypo'
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome'
import { Screen } from '../../components'
import { screens } from '../../config/screens'
import { accountService } from '../../services/account-service'
import { color } from '../../theme'

const { width, height } = Dimensions.get('screen')
const ROOT: ViewStyle = {
  backgroundColor: color['color-primary-500'],
  flex: 1,
}

export const LoginScreen = function LoginScreen({ navigation }) {
  const [
    username,
    handleUsernameChange,
    password,
    handlePasswordChange,
    loading,
    handleLogin,
  ] = accountService.useLogin()
  React.useEffect(() => {
    console.log('Login')
  }, [])

  return (
    <Screen style={ROOT} preset='scroll'>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
      >
        <View style={styles.rect}>
          <Form style={{width: useWindowDimensions().width * 0.8, marginTop: 52}}>
            <Item style={styles.textInput}>
              <Icon style={styles.textInputIcon} name='person' />
              <Input placeholder="Username" onChange={handleUsernameChange} returnKeyType="next"/>
            </Item>

            <Item style={styles.textInput}>
              <Icon style={styles.textInputIcon} name='key' />
              <Input placeholder="Password" onChange={handlePasswordChange}/>
            </Item>

            <Item style={{borderBottomColor: "#FFFFFF", marginTop: 16, alignSelf: 'flex-end'}}>
              <TouchableOpacity>
                <Text style={{ color: color['color-primary-300'] }}>
                  Forgot password?
                </Text>
              </TouchableOpacity>
            </Item>
          <View style={{marginTop: 24}}>
            <TouchableOpacity onPress={handleLogin} style={styles.buttonLogin}>
              <Text style={styles.loginTextButton}>Login</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => navigation.navigate(screens.basic.register.main)}
              style={styles.buttonRegister}
            >
              <Text style={styles.registerTextButton}>Register</Text>
            </TouchableOpacity>
          </View>
          </Form>
          <Text style={styles.orSignInWith}>or Sign In with</Text>
          <View style={styles.icon2Row}>
            <EntypoIcon
              name='facebook-with-circle'
              style={styles.iconFB}
            ></EntypoIcon>
            <FontAwesomeIcon
              name='google-plus-official'
              style={styles.icon3}
            ></FontAwesomeIcon>
          </View>
        </View>
      </KeyboardAvoidingView>
    </Screen>
  )
}

const styles = StyleSheet.create({
  buttonLogin: {
    alignSelf: 'center',
    backgroundColor: color['color-primary-500'],
    borderRadius: 33,
    // elevation: 15,
    height: height * 0.06,
    justifyContent: 'center',
    marginTop: width * 0.05,
    shadowOpacity: 1,
    shadowRadius: 5,
    width: width * 0.7,
  },

  buttonRegister: {
    alignSelf: 'center',
    borderColor: color["color-primary-500"],
    color: color["color-primary-500"],
    borderWidth: 1,
    borderRadius: 33,
    // elevation: 15,
    height: height * 0.06,
    justifyContent: 'center',
    marginTop: width * 0.05,
    shadowOpacity: 1,
    shadowRadius: 5,
    width: width * 0.7,
  },
  forgotPassword: {
    height: height * 0.08,
    justifyContent: 'space-between',
    marginTop: width * 0.2,
    position: 'absolute',
    width: width * 0.8,
  },
  icon2Row: {
    alignSelf: 'center',
    flexDirection: 'row',
    height: 35,
    marginTop: 13,
  },
  icon3: {
    color: color.googleIcon, //,
    fontSize: 35,
    height: 35,
    marginLeft: 19,
    width: 30,
  },
  iconFB: {
    color: color.brandInfo, // "rgba(78,75,208,1)",
    fontSize: 32,
    height: 35,
    width: 32,
  },
  iconName: {
    alignSelf: 'center',
    color: color['color-primary-500'],
    fontSize: 23,
  },
  iconNameRow: {
    alignSelf: 'center',
    flexDirection: 'row',
    marginBottom: width * 0.02,
    marginTop: width * 0.15,
  },
  iconPasswd: {
    alignSelf: 'center',
    color: color['color-primary-500'],
    fontSize: 25,
  },
  iconPasswdRow: {
    alignSelf: 'center',
    flexDirection: 'row',
  },
  loginTextButton: {
    alignSelf: 'center',
    color: "#FFFFFF",
    fontSize: 23,
  },
  registerTextButton: {
    alignSelf: 'center',
    color: color["color-primary-500"],
    fontSize: 23,
  },
  orSignInWith: {
    alignSelf: 'center',
    color: color['color-primary-500'],
    marginTop: width * 0.15,
  },
  passwordStack: {
    flexDirection: 'row',
    justifyContent: 'center',
    width: width * 0.8,
  },
  rect: {
    backgroundColor: color.palette.white,
    borderTopLeftRadius: 44,
    borderTopRightRadius: 44,
    height: height * 0.75,
    marginTop: height * 0.2,
    shadowOpacity: 10,
    shadowRadius: 10,
    width: width,
    alignItems: 'center',
  },
  textInput: {
    marginTop: 24,
    marginLeft: 0
  },

  textInputIcon: {
    color: color["color-primary-500"]
  }
})
