import { observer } from 'mobx-react-lite'
import { View } from 'native-base'
import React from 'react'
import { StatusBar, TextInput, TouchableOpacity } from 'react-native'
import { Screen, Text } from '../../components'
import { color } from '../../theme'
import { styles } from './styles'
// const ROOT: ViewStyle = {
//   backgroundColor: color.palette.black,
//   flex: 1,
// }

export const RegisterUserScreen = observer(function RegisterUserScreen({
  navigation,
}) {
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
    // <View style={styles.container}>
    <Screen style={styles.container} preset="scroll">
      <StatusBar barStyle="light-content" />
      <Text style={styles.header}>Tell us more about you!</Text>
      <View style={styles.rect}>
        <View style={styles.group2}>
          <View style={styles.group}>
            <TextInput
              placeholder="First Name"
              placeholderTextColor={color.placeHolder}
              style={styles.textInput}
            ></TextInput>
            <TextInput
              placeholder="Last Name"
              placeholderTextColor={color.placeHolder}
              style={styles.textInput}
            ></TextInput>
            <TextInput
              placeholder="Date of birth"
              placeholderTextColor={color.placeHolder}
              style={styles.textInput}
              //  dataDetector="calendarEvent"
            ></TextInput>
            <TextInput
              placeholder="Gender"
              placeholderTextColor={color.placeHolder}
              style={styles.textInput}
            ></TextInput>
            <TextInput
              placeholder="Description"
              placeholderTextColor={color.placeHolder}
              style={styles.textInput}
              multiline={true}
            ></TextInput>
          </View>
          <View style={styles.submitButton}>
            <TouchableOpacity style={styles.button}>
              <Text style={styles.submit}>SUBMIT</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Screen>
  )
})
