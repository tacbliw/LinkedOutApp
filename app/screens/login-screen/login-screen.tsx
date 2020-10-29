import { observer } from "mobx-react-lite"
import React from "react"
import {
  Dimensions, Keyboard, KeyboardAvoidingView, Platform, StyleSheet,
  Text, TextInput,
  TouchableOpacity, View, ViewStyle
} from "react-native"
import { TouchableWithoutFeedback } from "react-native-gesture-handler"
import EntypoIcon from "react-native-vector-icons/Entypo"
import FontAwesomeIcon from "react-native-vector-icons/FontAwesome"
import IoniconsIcon from "react-native-vector-icons/Ionicons"
import { Button, Screen } from "../../components"
import { screens } from "../../config/screens"
import { accountService } from "../../services/account-service"
//import { useNavigation } from "@react-navigation/native"
// import { useStores } from "../../models"
import { color } from "../../theme"

const {width,height} = Dimensions.get("screen");
const ROOT: ViewStyle = {
  backgroundColor: color.brandPrimary,
  flex: 1,
}

export const LoginScreen = observer(function LoginScreen({navigation}) {
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
    
    <Screen style={ROOT} preset="scroll">
      {/* <Text preset="header" text="loginScreen" /> */}
      {/* <Input style={{backgroundColor: color.palette.orange}} value={username}
        onChange={handleUsernameChange}
        placeholder="Username"
        autoFocus />
      <Input
        value={password}
        onChange={handlePasswordChange}
        textContentType="password"
        secureTextEntry
        placeholder={"Password"}
      />
      <Button text='Log me in please!' onPress={handleLogin} /> */}

  <KeyboardAvoidingView behavior={Platform.OS == "ios" ? "padding" : "height"} style={{flex: 1}}>
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.footer}>
        <View style={styles.rect}>
          <View style={styles.iconNameRow}>
            <IoniconsIcon
              name="md-person"
              style={styles.iconName}
            ></IoniconsIcon>
            <TextInput
              value={username}
              onChange={handleUsernameChange}
              placeholder="Username"
              placeholderTextColor= {color.brandLight} //"rgba(217,188,188,1)"
              style={styles.name}
              autoFocus
            ></TextInput>
          </View>
          <View style={styles.iconPasswdRow}>
            <IoniconsIcon
              name="md-key"
              style={styles.iconPasswd}
            ></IoniconsIcon>
            <View style={styles.passwordStack}>
              <TextInput
                value={password}
                onChange={handlePasswordChange}
                textContentType="password"
                secureTextEntry
                placeholder="Password"
                placeholderTextColor={color.brandLight}
                style={styles.password}
              ></TextInput>
              <Button style={styles.forgotPassword} text='Register'  onPressOut={()=>navigation.navigate(screens.basic.register)} />
            </View>
          </View>
          <TouchableOpacity  onPress={handleLogin}  style={styles.button}>
            <Text style={styles.login4}>LOGIN</Text>
          </TouchableOpacity>
          <Text style={styles.orSignInWith}>or Sign In with</Text>
          <View style={styles.icon2Row}>
            <EntypoIcon
              name="facebook-with-circle"
              style={styles.icon2}
            ></EntypoIcon>
            <FontAwesomeIcon
              name="google-plus-official"
              style={styles.icon3}
            ></FontAwesomeIcon>
          </View>
        </View>
      </View>
      </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </Screen>
  )
});

const styles = StyleSheet.create({
  
  footer: {
    width: width,
    height: height*0.75,
    marginTop: height*0.2,
    //add shadow here
    
  },
  rect: {
    width: width,
    height: height*0.75,
    backgroundColor: color.palette.white,
    borderTopLeftRadius: 44,
    borderTopRightRadius:44,
  },
  iconName: {
    color: color.brandDark,
    fontSize: 25,
    height: 33,
    width: 22,
    
  },
  name: {
    fontFamily: "roboto-regular",
    color: "#121212",
    height: 52,
    width: 289,
    borderRadius: 22,
    textAlign: "left",
    lineHeight: 19,
    fontSize: 20,
    marginLeft: 13
  },
  iconNameRow: {
    height: 52,
    flexDirection: "row",
    marginTop: 87,
    marginLeft: 36
  },
  iconPasswd: {
    color: color.brandDark,
    fontSize: 25,
    height: 33,
    width: 25,
    marginTop: 13
  },
  password: {
    top: 0,
    left: 0,
    position: "absolute",
    fontFamily: "roboto-regular",
    color: "#121212",
    height: 52,
    width: 289,
    borderRadius: 22,
    textAlign: "left",
    lineHeight: 19,
    fontSize: 20
  },
  forgotPassword: {
    top: 50,
    left: 151,
    position: "absolute",
    fontFamily: "roboto-regular",
   // color: "rgba(229,148,148,1)"
  },
  passwordStack: {
    width: 289,
    height: 67,
    marginLeft: 15
  },
  iconPasswdRow: {
    height: 67,
    flexDirection: "row",
    marginTop: 15,
    marginLeft: 31
  },
  button: {
    width: 215,
    height: 47,
    backgroundColor: "rgba(235,103,89,1)",
    borderWidth: 2,
    borderColor: "rgba(235,103,89,1)",
    borderRadius: 33,
    shadowColor: "rgba(171,108,108,1)",
    shadowOffset: {
      width: 3,
      height: 3
    },
    elevation: 15,
    shadowOpacity: 1,
    shadowRadius: 5,
    marginTop: 37,
    marginLeft: 69
  },
  login4: {
    fontFamily: "roboto-700",
    color: "rgba(255,255,255,1)",
    fontSize: 23,
    marginTop: 10,
    marginLeft: 74
  },
  orSignInWith: {
    fontFamily: "roboto-regular",
    color: "rgba(163,141,141,1)",
    marginTop: 16,
    marginLeft: 135
  },
  icon2: {
    fontSize: 32,
    color: "rgba(78,75,208,1)",
    height: 35,
    width: 32
  },
  icon3: {
    color: "rgba(233,13,28,0.85)",
    fontSize: 35,
    height: 35,
    width: 30,
    marginLeft: 19
  },
  icon2Row: {
    height: 35,
    flexDirection: "row",
    marginTop: 13,
    marginLeft: 128,
    marginRight: 151
  }
});

