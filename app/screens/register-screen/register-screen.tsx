import { observer } from "mobx-react-lite";
import React from "react";
import {
  Dimensions, Keyboard, KeyboardAvoidingView, Platform, StyleSheet, TextInput, TouchableOpacity, View
} from "react-native";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";
import FeatherIcon from "react-native-vector-icons/Feather";
import MaterialCommunityIconsIcon from "react-native-vector-icons/MaterialCommunityIcons";
import MaterialIconsIcon from "react-native-vector-icons/MaterialIcons";
import { Text } from "../../components";
import { screens } from "../../config/screens";
// import { useNavigation } from "@react-navigation/native"
// import { useStores } from "../../models"
import { color } from "../../theme";

const {width,height}=Dimensions.get("screen");
// const ROOT: ViewStyle = {
//   backgroundColor: color.palette.black,
//   flex: 1,
// }

export const RegisterScreen = observer(function RegisterScreen({navigation}) {
  // Pull in one of our MST stores
  // const { someStore, anotherStore } = useStores()
  // OR
  // const rootStore = useStores()

  // Pull in navigation via hook
  // const navigation = useNavigation()

  React.useEffect(() => {
    console.log('RegisterScreen')
  }, [])
  return (
    
      <KeyboardAvoidingView behavior={Platform.OS == "ios" ? "padding" : "height"} style={styles.container} >
        
          <TouchableWithoutFeedback onPress={Keyboard.dismiss}> 
            <View style={styles.rect}>
              <View style={styles.group2}>
                <View style={styles.group}>
                  <View style={styles.userName}>
                    <View style={styles.iconStack}> 
                      <TextInput
                        placeholder="User Name"
                        placeholderTextColor={color.placeHolder}
                        autoFocus={true}
                        style={styles.username}
                      ></TextInput>
                      <MaterialIconsIcon name="person-add" style={styles.icon}></MaterialIconsIcon>
                    </View>
                  </View>
                  <View style={styles.email}>
                    <View style={styles.icon2Stack}>
                    <TextInput
                        placeholder="Email"
                        placeholderTextColor={color.placeHolder}
                        style={styles.mail}
                      ></TextInput>
                      <FeatherIcon name="mail" style={styles.icon2}></FeatherIcon>
                      
                    </View>
                  </View>
                  <View style={styles.category}>
                    <TextInput
                      placeholder="User or Company"
                      placeholderTextColor={color.placeHolder}
                    // dataDetector="calendarEvent"
                      style={styles.user}
                    ></TextInput>
                  </View>
                  <View style={styles.gender}>
                    <View style={styles.icon3Stack}>
                      
                      <TextInput
                        placeholder="Password"
                        placeholderTextColor={color.placeHolder}
                        secureTextEntry={true}
                        style={styles.password}
                      ></TextInput>
                      <MaterialCommunityIconsIcon name="key-plus" style={styles.icon3} ></MaterialCommunityIconsIcon>
                    </View>
                  </View>
                </View>
                <View style={styles.registerButton}>
                  <TouchableOpacity
                    onPress={()=> navigation.navigate(screens.basic.register_user)}//submit form}
                    style={styles.button}
                  >
                    <Text style={styles.register}>REGISTER</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
         
          </TouchableWithoutFeedback> 
    
      </KeyboardAvoidingView>
   
  );
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: color.brandPrimary,
  },

  // footer: {
  //   width: width,
  //   height: height*0.8,
  //   borderRadius: 44,
  //   marginTop:height*0.15, 
  //  backgroundColor: color.brandPrimary,
  
  // },
  rect: {
    width: width,
    height: height*0.8,
    marginTop:height*0.15, 
    backgroundColor: color.palette.white,
    borderTopLeftRadius: 44,
    borderTopRightRadius:44,
    elevation: 30,
    shadowOpacity: 10,
    shadowRadius: 10,
 
  },
  group2: {
    width: 297,
    height: 421,
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 28,
    marginLeft: 33
  },
  group: {
    width: 297,
    height: 326,
    justifyContent: "space-around",
    alignItems: "stretch"
  },
  userName: {
    width: 289,
    height: 56
  },
  icon: {
    left: 5,
    position: "absolute",
    color: "rgba(128,128,128,1)",
    fontSize: 32,
    top: 12
  },
  username: {
    position: "absolute",
    fontFamily: "roboto-regular",
    color: color.brandDark,
    backgroundColor: color.palette.white,
    height: height*0.08,
    width: width*0.8,
    borderRadius: 22,
    textAlign: "center",
    lineHeight: 20,
    fontSize: 20,
    elevation: 10,
    
    alignSelf: "center"
  },
  iconStack: {
    height: 56
  },
  email: {
    width: 289,
    height: 56
  },
  icon2: {
    top: 16,
    left: 13,
    position: "absolute",
    color: "rgba(128,128,128,1)",
    fontSize: 32
  },
  mail: {
    position: "absolute",
    fontFamily: "roboto-regular",
    color: color.brandDark,
    backgroundColor: color.palette.white,
    height: height*0.08,
    width: width*0.8,
    borderRadius: 22,
    textAlign: "center",
    lineHeight: 20,
    fontSize: 20,
    elevation: 10,
    alignSelf: "center"
  },
  icon2Stack: {
    width: 289,
    height: 56
  },
  category: {
    width: 289,
    height: 56,
    justifyContent: "center"
  },
  user: {
    fontFamily: "roboto-regular",
    color: color.brandDark,
    backgroundColor: color.palette.white,
    height: height*0.08,
    width: width*0.8,
    borderRadius: 22,
    textAlign: "center",
    lineHeight: 20,
    fontSize: 20,
    elevation: 10,
    alignSelf: "center"
  },
  gender: {
    width: 289,
    height: 56
  },
  icon3: {
    left: 5,
    position: "absolute",
    color: "rgba(128,128,128,1)",
    fontSize: 32,
    top: 11
  },
  password: {
    fontFamily: "roboto-regular",
    color: color.brandDark,
    backgroundColor: color.palette.white,
    height: height*0.08,
    width: width*0.8,
    borderRadius: 22,
    textAlign: "center",
    lineHeight: 20,
    fontSize: 20,
    elevation: 10,
    alignSelf: "center",
  },
  icon3Stack: {
    width: 289,
    height: 56
  },
  registerButton: {
    width: 213,
    height: 47
  },
  button: {
    backgroundColor: color.brandPrimary,
    borderWidth: 2,
    borderColor: color.brandPrimary,
    borderRadius: 33,
    elevation: 10,
    shadowColor: color.palette.black,
   
    justifyContent: "center",
    flex: 1,
  },
  register: {
    fontFamily: "roboto-700",
    color: color.palette.white,
    fontSize: 23,
    alignSelf: "center"
  }
});
