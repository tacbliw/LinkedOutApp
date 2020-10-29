import { observer } from "mobx-react-lite";
import { View } from "native-base";
import React from "react";
import { Dimensions, StatusBar, StyleSheet, TextInput, TouchableOpacity } from "react-native";
//import { } from "react-native-gesture-handler";
import { Screen, Text } from "../../components";
import { color } from "../../theme";
// const ROOT: ViewStyle = {
//   backgroundColor: color.palette.black,
//   flex: 1,
// }
const {width,height}= Dimensions.get("screen");

export const RegisterUserScreen = observer(function RegisterUserScreen({navigation}) {
  // Pull in one of our MST stores
  // const { someStore, anotherStore } = useStores()
  // OR
  // const rootStore = useStores()

  // Pull in navigation via hook
  // const navigation = useNavigation()
  React.useEffect(() => {
    console.log('RegisterUserScreen')
  }, [])
  return (
    // 
    //   <Text preset="header" text="registerUserScreen" />
    // </Screen>
  //<View style={styles.container}>
  <Screen style={styles.container} preset="scroll">
    <StatusBar barStyle="light-content" />
      <Text style={styles.header}>Tell us more about you!</Text>
      <View style={styles.rect}>
        <View style={styles.group2}>
          <View style={styles.group}>
          
              <TextInput placeholder="First Name" placeholderTextColor={color.placeHolder} style={styles.textInput} ></TextInput>
              <TextInput placeholder="Last Name"  placeholderTextColor={color.placeHolder} style={styles.textInput} ></TextInput>
              <TextInput placeholder="Date of birth" placeholderTextColor={color.placeHolder} style={styles.textInput}
              //  dataDetector="calendarEvent"
              ></TextInput>
              <TextInput placeholder="Gender" placeholderTextColor={color.placeHolder} style={styles.textInput}></TextInput>
              <TextInput  placeholder="Description" placeholderTextColor={color.placeHolder}  style={styles.textInput}></TextInput>
            
          </View>
          <View style={styles.submitButton}>
            <TouchableOpacity style={styles.button}> 
              <Text style={styles.submit}>SUBMIT</Text>
            </TouchableOpacity>
        </View>
      </View>
    </View>
    
  </Screen>
);
});

const styles = StyleSheet.create({
container: {
  flex: 1,
  backgroundColor: color.brandPrimary,
  justifyContent: 'center',
  alignItems: 'center',
},
header: {
  fontFamily: "roboto-700",
  color: color.palette.white,
  fontSize: 30,
  textAlign: "center",
  marginTop: height/15,
  height: height/15,
  alignSelf: "center",
},
footer: {
  width: width,
  height: height,
  borderRadius: 44,
  marginTop: height/15,
  marginLeft: -3
},
rect: {
  width: width,
  height: height*0.8,
  borderTopLeftRadius: 44,
  borderTopRightRadius:44,
  backgroundColor: color.palette.white,//"#E6E6E6",
  marginTop: height/15,
  elevation: 30,
  shadowOpacity: 10,
  shadowRadius: 10,

},
group2: {
  width: 297,
  height: 421,
  justifyContent: "space-around",
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
textInput: {
  justifyContent: "center",
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

submitButton: {
  width: 213,
  height: 47
},
button: {
  backgroundColor: color.brandPrimary,
  borderRadius: 33,
  elevation: 15,
  shadowOpacity: 1,
  shadowRadius: 5,
  justifyContent: "center",
  flex: 1
},
submit: {
  fontFamily: "roboto-700",
  color:color.palette.white,
  fontSize: 23,
  alignSelf: "center"
},

});
