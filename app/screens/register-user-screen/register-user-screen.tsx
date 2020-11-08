// //import DatePicker from 'react-native-datepicker';
// import DateTimePicker from '@react-native-community/datetimepicker';
import { observer } from "mobx-react-lite";
import { Picker, View } from "native-base";
import React, { useState } from "react";
import { StatusBar, TextInput, TouchableOpacity } from "react-native";
//import { } from "react-native-gesture-handler";
import { Screen, Text } from "../../components";
import { color } from "../../theme";
import { styles } from "./styles";
// const ROOT: ViewStyle = {
//   backgroundColor: color.palette.black,
//   flex: 1,
// }


export const RegisterUserScreen = observer(function RegisterUserScreen({navigation}) {
  // Pull in one of our MST stores
  // const { someStore, anotherStore } = useStores()
  // OR
  // const rootStore = useStores()

  // Pull in navigation via hook
  // const navigation = useNavigation()

  
// const [date, setDate]=useState(new Date(1598051730000));
// const onDateChange=(date)=>{ setDate(date);}


  const [selectedValue, setSelectedValue]=useState("Choose gender");
  
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
          
              <TextInput placeholder="First Name" placeholderTextColor={color.placeHolder} style={styles.textInput} autoFocus={true}></TextInput>
              <TextInput placeholder="Last Name"  placeholderTextColor={color.placeHolder} style={styles.textInput} ></TextInput>
              <TextInput placeholder="Date of birth" placeholderTextColor={color.placeHolder} style={styles.textInput} ></TextInput>
              {/* <View style={styles.textInput}>
                <DateTimePicker
                  mode='date'
                  value={date}
                 // dateFormat='YYYY-MM-DD'
                  //confirmBtnText="Confirm"
                  //cancelBtnText="Cancel"
                  // customStyles={
                  //   {
                  //     dateIcon:{
                  //       position:'absolute',
                        
                  //     },
                  //     dateInput:{
                  //       color: color.brandDanger
                  //     }
                  //   }
                  // }
                  display='default'
                  onChange={onDateChange}
                />
              </View> */}
              {/* <TextInput placeholder="Gender" placeholderTextColor={color.placeHolder} style={styles.textInput}></TextInput> */}
              
              <View style={styles.textInput}>
                <Picker 
                    mode="dropdown"
                    selectedValue={selectedValue}
                    style={{
                      color: color.brandDark,
                      justifyContent: 'center',
            
                    }}
                    placeholder="gender"
                    onValueChange={(itemValue, )=> setSelectedValue(itemValue)}
                  >
                    <Picker.Item label="Male" value="Male"/>
                    <Picker.Item label="Female" value="Female"/>
                </Picker>
              </View>
              
              <TextInput  placeholder="Description" placeholderTextColor={color.placeHolder}  style={styles.textInput} multiline={true}></TextInput>
            
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
