import { observer } from 'mobx-react-lite'
import React from 'react'
import {
  Dimensions,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native'
import EntypoIcon from 'react-native-vector-icons/Entypo'
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome'
import { default as IoniconsIcon } from 'react-native-vector-icons/Ionicons'
import { Screen } from '../../components'
import { screens } from '../../config/screens'
import { accountService } from '../../services/account-service'
import { color } from '../../theme'

const { width, height } = Dimensions.get('screen')
const ROOT: ViewStyle = {
  backgroundColor: color.brandPrimary,
  flex: 1,
}

export const LoginScreen = observer(function LoginScreen({ navigation }) {
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
          <View style={styles.iconNameRow}>
            <IoniconsIcon
              name='md-person'
              style={styles.iconName}
            ></IoniconsIcon>
            <TextInput
              value={username}
              onChange={handleUsernameChange}
              placeholder='Username'
              placeholderTextColor={color.placeHolder} // "rgba(217,188,188,1)"
              style={styles.textInput}
              autoFocus
              returnKeyType={'next'}
              onSubmitEditing={() => {
                this.password.focus()
              }}
              blurOnSubmit={false}
            ></TextInput>
          </View>
          <View style={styles.iconPasswdRow}>
            <IoniconsIcon
              name='md-key'
              style={styles.iconPasswd}
            ></IoniconsIcon>
            <View style={styles.passwordStack}>
              <TextInput
                value={password}
                onChange={handlePasswordChange}
                textContentType='password'
                secureTextEntry
                placeholder='Password'
                placeholderTextColor={color.placeHolder}
                style={styles.textInput}
                ref={(input) => {
                  this.password = input
                }}
              ></TextInput>
              <TouchableOpacity style={styles.forgotPassword} onPress={null}>
                <Text style={{ color: color.brandWarning }}>
                  {' '}
                  Forgot password?
                </Text>
              </TouchableOpacity>
            </View>
          </View>
          <View style={{ marginTop: width * 0.15 }}>
            <TouchableOpacity onPress={handleLogin} style={styles.button}>
              <Text style={styles.login4}>LOGIN</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => navigation.navigate(screens.basic.register.user)}
              style={styles.button}
            >
              <Text style={styles.login4}>REGISTER</Text>
            </TouchableOpacity>
          </View>
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
})

const styles = StyleSheet.create({
  button: {
    alignSelf: 'center',
    backgroundColor: color.brandPrimary,
    borderRadius: 33,
    elevation: 15,
    height: height * 0.06,
    justifyContent: 'center',
    marginTop: width * 0.05,
    shadowOpacity: 1,
    shadowRadius: 5,
    width: width * 0.6,
  },
  forgotPassword: {
    fontFamily: 'roboto-regular',
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
    color: color.brandDark,
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
    color: color.brandDark,
    fontSize: 25,
  },
  iconPasswdRow: {
    alignSelf: 'center',
    flexDirection: 'row',
  },
  login4: {
    alignSelf: 'center',
    color: color.palette.white,
    fontFamily: 'roboto-700',
    fontSize: 23,
  },
  orSignInWith: {
    alignSelf: 'center',
    color: color.brandDanger,
    fontFamily: 'roboto-regular',
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
    elevation: 30,
    height: height * 0.75,
    marginTop: height * 0.2,
    shadowOpacity: 10,
    shadowRadius: 10,
    width: width,
  },
  textInput: {
    backgroundColor: color.palette.white,
    borderBottomColor: color.brandPrimary,
    borderBottomWidth: 2,
    color: color.brandDark,
    // elevation: 10,
    fontFamily: 'roboto-regular',
    fontSize: 20,
    height: height * 0.08,
    justifyContent: 'center',
    lineHeight: 20,
    textAlign: 'left',
    width: width * 0.8,
  },
})
