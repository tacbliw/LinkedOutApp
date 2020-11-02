import { observer } from "mobx-react-lite"
import React from "react"
import {
  Dimensions, KeyboardAvoidingView, Platform, StyleSheet,
  Text, TextInput,
  TouchableOpacity, View, ViewStyle
} from "react-native"
import EntypoIcon from "react-native-vector-icons/Entypo"
import FontAwesomeIcon from "react-native-vector-icons/FontAwesome"
import IoniconsIcon from "react-native-vector-icons/Ionicons"
import { Screen } from "../../components"
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

  <KeyboardAvoidingView behavior={Platform.OS == "ios" ? "padding" : "height"} style={{flex: 1, justifyContent: 'center',
  alignItems: 'center',}}>
  
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
              placeholderTextColor= {color.placeHolder} //"rgba(217,188,188,1)"
              style={styles.textInput}
              autoFocus

              returnKeyType={"next"}
              onSubmitEditing={()=>{this.password.focus();}}
              blurOnSubmit={false}
            ></TextInput>
          </View>


          <View style={styles.iconPasswdRow}>
            <IoniconsIcon  name="md-key" style={styles.iconPasswd} ></IoniconsIcon>
            <View style={styles.passwordStack}>
              <TextInput
                value={password}
                onChange={handlePasswordChange}
                textContentType="password"
                secureTextEntry
                placeholder="Password"
                placeholderTextColor={color.placeHolder}
                style={styles.textInput}
                ref={(input)=>{this.password =input;}}
              ></TextInput>
              <TouchableOpacity style={styles.forgotPassword}  onPress={null}>
                  <Text style={ {color: color.brandWarning,} }> Forgot password?</Text> 
              </TouchableOpacity >
            </View>
          </View>
          <View style={{marginTop: width*0.15}}>
            <TouchableOpacity  onPress={handleLogin}  style={styles.button} >
              <Text style={styles.login4}>LOGIN</Text>
            </TouchableOpacity>
            <TouchableOpacity  onPress={()=>navigation.navigate(screens.basic.register)}  style={styles.button}>
              <Text style={styles.login4}>REGISTER</Text>
            </TouchableOpacity>
          </View>
          <Text style={styles.orSignInWith}>or Sign In with</Text>
          <View style={styles.icon2Row}>
            <EntypoIcon
              name="facebook-with-circle"
              style={styles.iconFB}
            ></EntypoIcon>
            <FontAwesomeIcon
              name="google-plus-official"
              style={styles.icon3}
            ></FontAwesomeIcon>
          </View>
        </View>

      </KeyboardAvoidingView>
    </Screen>
  )
});

const styles = StyleSheet.create({
  
  rect: {
    width: width,
    height: height*0.75,
    marginTop: height*0.2,
    backgroundColor: color.palette.white,

    borderTopLeftRadius: 44,
    borderTopRightRadius:44,

    elevation: 30,
    shadowOpacity: 10,
    shadowRadius: 10,
  },
  iconName: {
    color: color.brandDark,
    fontSize: 23,
    alignSelf: "center",
    
  },
  textInput: {

    justifyContent: "center",
    fontFamily: "roboto-regular",
    color: color.brandDark,
    backgroundColor: color.palette.white,
    height: height*0.08,
    width: width*0.8,
    borderBottomWidth: 2,
    borderBottomColor: color.brandPrimary,
    textAlign: "left",
    lineHeight: 20,
    fontSize: 20,
    // elevation: 10,
  },
  
  iconNameRow: {
    flexDirection: "row",
    alignSelf: 'center',
    marginTop: width*0.15,

  },
  iconPasswd: {
    color: color.brandDark,
    fontSize: 25,
    alignSelf: "center",
  },
  passwordStack: {

    width: width*0.8,
    flexDirection: 'row',
    justifyContent: "center",
   
  },
  iconPasswdRow: {
 
    flexDirection: "row",
    alignSelf: 'center',

  },
  forgotPassword: {
    position: "absolute",
    fontFamily: "roboto-regular",
    justifyContent: "space-between",
    marginTop: width*0.2,
    height: height*0.08,
    width: width*0.8,
  },
  button: {
    height: height*0.06,
    width: width*0.6,
    marginTop: width*0.05,
    backgroundColor: color.brandPrimary,
    borderRadius: 33,
  
    elevation: 15,
    shadowOpacity: 1,
    shadowRadius: 5,

    justifyContent: "center",
    alignSelf: "center",
    
  },
  login4: {
    fontFamily: "roboto-700",
    color:color.palette.white,
    fontSize: 23,
    alignSelf: "center",
    
  },
  orSignInWith: {
    fontFamily: "roboto-regular",
    color: color.brandDanger,
    marginTop: width*0.15,
    alignSelf: 'center'
  },
  iconFB: {
    fontSize: 32,
    color: color.brandInfo,//"rgba(78,75,208,1)",
    height: 35,
    width: 32,
  
  },
  icon3: {
    color: color.googleIcon,//,
    fontSize: 35,
    height: 35,
    width: 30,
    marginLeft: 19,
  },
  icon2Row: {
    height: 35,
    flexDirection: "row",
    marginTop: 13,
    alignSelf: 'center'
  }
});

