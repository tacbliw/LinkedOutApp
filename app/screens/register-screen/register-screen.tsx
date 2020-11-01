import { observer } from "mobx-react-lite";
import React from "react";
import {
  Keyboard, KeyboardAvoidingView, Platform, TextInput, TouchableOpacity, View
} from "react-native";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";
import FeatherIcon from "react-native-vector-icons/Feather";
import MaterialCommunityIconsIcon from "react-native-vector-icons/MaterialCommunityIcons";
import MaterialIconsIcon from "react-native-vector-icons/MaterialIcons";
import { Text } from "../../components";
import { screens } from "../../config/screens";
import { accountService } from "../../services/account-service";
// import { useNavigation } from "@react-navigation/native"
// import { useStores } from "../../models"
import { color } from "../../theme";
import { styles } from './styles';

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
  
  const [
    username,
    handleUsernameChange,
    email,
    handleEmailChange,
    type,
    handleTypeChange,
    password,
    handlePasswordChange,
    
  //  loading,
   // handleLogin,

  ] = accountService.useSignUp()
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
                        value={username}
                        onChange={handleUsernameChange}
                        placeholderTextColor={color.placeHolder}
                        autoFocus={true}
                        style={styles.username}
                        onSubmitEditing={()=>this.email.focus()}
                      ></TextInput>
                      <MaterialIconsIcon name="person-add" style={styles.icon}></MaterialIconsIcon>
                    </View>
                  </View>
                  <View style={styles.email}>
                    <View style={styles.icon2Stack}>
                    <TextInput
                        placeholder="Email"
                        placeholderTextColor={color.placeHolder}
                        keyboardType="email-address"
                        value={email}
                        onChange={handleEmailChange}
                        ref={(input)=>this.email =input}
                        onSubmitEditing={()=>this.type.focus()}
                        style={styles.mail}
                        //
                      ></TextInput>
                      <FeatherIcon name="mail" style={styles.icon2}></FeatherIcon>
                      
                    </View>
                  </View>
                  <View style={styles.type}>
                    <TextInput
                      placeholder="User or Company"
                      placeholderTextColor={color.placeHolder}
                      value={type}
                      onChange={handleTypeChange}
                    // dataDetector="calendarEvent"
                      ref={(input)=>this.type =input}
                      onSubmitEditing={()=>this.password.focus()}
                      style={styles.user}
                    ></TextInput>
                  </View>
                  <View style={styles.gender}>
                    <View style={styles.icon3Stack}>
                      
                      <TextInput
                        placeholder="Password"
                        value={password}
                        onChange={handlePasswordChange}
                        placeholderTextColor={color.placeHolder}
                        secureTextEntry={true}
                        style={styles.password}
                        ref={(input)=>this.password =input}
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
