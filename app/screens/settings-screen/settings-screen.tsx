
import { observer } from "mobx-react-lite"
import { Picker, View } from "native-base"
import React, { useState } from "react"
import { Dimensions, StyleSheet, Switch, ViewStyle } from "react-native"
import { TouchableOpacity } from "react-native-gesture-handler"
import { default as IoniconsIcon } from 'react-native-vector-icons/Ionicons'
import { Screen, Text } from "../../components"
import { color } from "../../theme"


// import { useNavigation } from "@react-navigation/native"
// import { useStores } from "../../models"

const ROOT: ViewStyle = {
  backgroundColor: color.palette.black,
  flex: 1,
}

export const SettingsScreen = observer(function SettingsScreen(navigation) {
  // Pull in one of our MST stores
  // const { someStore, anotherStore } = useStores()
  // OR
  // const rootStore = useStores()

  // Pull in navigation via hook
  // const navigation = useNavigation()

  const [selectedValue, setSelectedValue]=useState("Light");
  const [selectedLanguage, setSelectedLanguage]=useState("English");
  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => setIsEnabled(previousState => !previousState);
  return (
    <Screen style={ROOT} preset="scroll">
      
       <View style={styles.container}>
      {/* // <Text preset="header" text="settingsScreen" />  */}
         <Text style={styles.header}>SETTINGS</Text>
         <View>
           <View style={styles.section}>
           
            <View style={styles.line}>
              <IoniconsIcon name='md-person' style={styles.iconName}  ></IoniconsIcon>
              <Text style={styles.text}> Themes: </Text>
              <Picker 
                      mode="dropdown"
                      selectedValue={selectedValue}
                      style={styles.picker}
                      placeholder="gender"
                      onValueChange={(itemValue, )=> setSelectedValue(itemValue)}
                      >
                      <Picker.Item label="Dark" value="Dark"/>
                      <Picker.Item label="Light" value="Light"/>
                </Picker>
          
           </View>
            <View style={styles.line}>
              <IoniconsIcon name='md-person' style={styles.iconName}  ></IoniconsIcon>  
              <Text style={styles.text}> Languages: </Text>
              <Picker 
                      mode="dropdown"
                      selectedValue={selectedLanguage}
                      style={styles.picker}
                      placeholder="Country"
                      onValueChange={(itemValue, )=> setSelectedLanguage(itemValue)}
                      >
                      <Picker.Item label="Vietnam" value="Vietnam"/>
                      <Picker.Item label="English" value="English"/>
                      <Picker.Item label="Français" value="Français"/>
                </Picker>
          
           </View>
           </View>
           <View style={styles.section} >
              <View style={styles.line}>
                <IoniconsIcon name='md-person' style={styles.iconName}  ></IoniconsIcon>  
                <Text style={styles.text}> Notification </Text>
                <Switch
                  trackColor={{ 
                    true: color.pickerOption,
                    false: color.brandLight}}
                  thumbColor={isEnabled ? color.brandPrimary : color.background}
                  onValueChange={toggleSwitch}
                  value={isEnabled}
                  />
              </View>
              <TouchableOpacity style={styles.line} onPress={null}>
                  <IoniconsIcon name='md-person' style={styles.iconName}  ></IoniconsIcon>
                  <Text style={styles.text}> Edit profile </Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.line} onPress={null}>
                  <IoniconsIcon name='md-person' style={styles.iconName}  ></IoniconsIcon>
                  <Text style={styles.text}> Update app</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.line} onPress={null}>
                  <IoniconsIcon name='md-person' style={styles.iconName}  ></IoniconsIcon>
                  <Text style={styles.text}> Introduction</Text>
              </TouchableOpacity>
           </View>

         </View>
       </View>
    </Screen>
  )
})



const {width,height}=Dimensions.get("screen");
const styles = StyleSheet.create({
  container:{
    flex:1,
    backgroundColor: color.backgroundSetting, 
  },
  header:{
    backgroundColor:color.brandPrimary,
    color: color.palette.white,
    fontSize: 40,
    width: width,
    height: height/8,
    justifyContent:'center',
    textAlign:'center',
    fontWeight: '700',
     elevation: 20,
     borderRadius: 2,

  }, 
  section:{
    // elevation: 10,
    // borderRadius: 2,
    marginVertical: height*0.03,
    backgroundColor: color.background,
    
  },
  line: {
    flexDirection:'row',
    backgroundColor:"#f9fbe7",//color.background,
    borderBottomWidth: 2,
    borderColor: color.backgroundSetting,
    marginLeft:0,
    height: height*0.08,
    width:width,
  },
  text:{
    color: color.brandDark,
    fontSize:20,
    alignSelf:'center',
    width: width*0.55,
    fontFamily: "roboto-regular",
  //  backgroundColor:color.brandPrimary,
    marginLeft:10,
  },

  iconName: {
    alignSelf: 'center',
    color: color.brandPrimary,
    fontSize: 23,
  },

  picker:{
    color: color.pickerOption,
    justifyContent: 'center',
  }
  
});
