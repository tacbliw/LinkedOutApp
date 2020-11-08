import { observer } from "mobx-react-lite"
import { Picker, View } from "native-base"
import React, { useState } from "react"
import { Dimensions, StyleSheet, ViewStyle } from "react-native"
import { Screen, Text } from "../../components"
// import { useNavigation } from "@react-navigation/native"
// import { useStores } from "../../models"
import { color } from "../../theme"

const ROOT: ViewStyle = {
  backgroundColor: color.palette.black,
  flex: 1,
}

export const SettingsScreen = observer(function SettingsScreen() {
  // Pull in one of our MST stores
  // const { someStore, anotherStore } = useStores()
  // OR
  // const rootStore = useStores()

  // Pull in navigation via hook
  // const navigation = useNavigation()

  const [selectedValue, setSelectedValue]=useState("Light");

  return (
    <Screen style={ROOT} preset="scroll">
      
       <View style={styles.container}>
      {/* // <Text preset="header" text="settingsScreen" />  */}
         <Text style={styles.header}>Settings</Text>
         <View>
           <View style={styles.line}>
            <Text style={styles.text}> Themes: </Text>
           
              <Picker 
                      mode="dropdown"
                      selectedValue={selectedValue}
                      style={{
                        color: color.brandDark,
                        justifyContent: 'center',
                        
                       // width: width/2,
                      }}
                      placeholder="gender"
                      onValueChange={(itemValue, )=> setSelectedValue(itemValue)}
                      >
                      <Picker.Item label="Dark" value="Dark"/>
                      <Picker.Item label="Light" value="Light"/>
                </Picker>
          
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
    backgroundColor: color.background, 
  },
  header:{
    backgroundColor:color.brandDanger,
    color: color.palette.white,
    fontSize:50,
    width: width,
    height: height/6,
    justifyContent:'center',
    textAlign:'center',
    elevation: 20,
    borderRadius: 2,
  }, 
  line: {
    flexDirection:'row',
  //  backgroundColor:'#000',
    marginVertical: height*0.05,
    justifyContent:'center',
    backgroundColor:color.background,
    elevation: 50,
    borderRadius: 2,
    marginLeft:0
  },
  text:{
    color: color.brandDark,
    fontSize:25,
    alignSelf:'center',
    width: width*0.72,
  //  backgroundColor:color.brandPrimary
    
  }
  
});