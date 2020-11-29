// //import DatePicker from 'react-native-datepicker';
import DateTimePicker from "@react-native-community/datetimepicker";
import { Form, Icon, Input, Item, Picker, Textarea, View } from 'native-base';
import React, { useState } from 'react';
import { TouchableOpacity, useWindowDimensions } from 'react-native';
import { Screen, Text } from '../../components';
import { accountService } from "../../services/account-service";
import { color } from '../../theme';
import { styles } from './styles';


export const RegisterUserScreen = function RegisterUserScreen({
  route,
  navigation,
}) {
  const [
    firstName,
    handleFirstNameChange,
    lastname,
    handleLastNameChange,
    dateOfBirth,
    handleDateOfBirthChange,
    showDatePicker,
    handleDatePickerPress,
    gender,
    handleGenderChange,
    description,
    handleDescriptionChange,
    handleUserRegister,
  ] = accountService.useRegisterUser(route.params)
  // Pull in one of our MST stores
  // const { someStore, anotherStore } = useStores()
  // OR
  // const rootStore = useStores()

  // Pull in navigation via hook
  // const navigation = useNavigation()

  
  const [date, setDate] = useState(new Date(1598051730000));
  const [show, setShow] = useState(false);

  const showDatepicker = () => {
    setShow(true);
  };

  const onChangeDate = (event, selectedDate) => {
      setShow(false);
      const currentDate = selectedDate || date;
      setDate(currentDate);
  };

  const [selectedValue, setSelectedValue] = useState('Choose gender')
  
  return (
    <Screen style={styles.container} preset='scroll'>
      <Text style={styles.header}>Tell us more about you!</Text>
      <View style={styles.rect}>
          <Form style={{width: useWindowDimensions().width * 0.8}}>
            <Item style={styles.textInput}>
              <Icon style={styles.textInputIcon} name='person-outline' />
              <Input placeholder="First Name" onChange={handleFirstNameChange}/>
            </Item>
            <Item style={styles.textInput}>
              <Icon style={styles.textInputIcon} name='person-add-outline' />
              <Input placeholder="Last Name" onChange={handleLastNameChange}/>
            </Item>
            <Item style={styles.textInput}>
              <Icon style={styles.textInputIcon} name='calendar-outline' onPress={showDatepicker}/>
              {show && (<DateTimePicker
                testID="dateTimePicker"
                value={date}
                display="default"
                // handleDateOfBirthChange(date)
                onChange={onChangeDate}
                />)}
              {/* <TouchableOpacity onPress={showDatepicker}> */}
                <Input>{date.toDateString()}</Input>
              {/* </TouchableOpacity> */}
            </Item>
            <Item picker style={[styles.textInput, {marginLeft: 14}]} >
              <Picker
                mode='dropdown'
                selectedValue={selectedValue}
                style={{
                  color: color.brandDark,
                }}
                placeholder='gender'
                // handleGenderChange
                onValueChange={(itemValue) => setSelectedValue(itemValue)}
              >
                <Picker.Item label='Male' value='Male' />
                <Picker.Item label='Female' value='Female' />
              </Picker>
            </Item>
            <Item style={{borderBottomColor: '#FFFFFF'}}>
            <Textarea
                  style={[styles.textInput, {
                    borderRadius: 10,
                    backgroundColor: '#ffffff',
                    flexGrow: 1
                  }]}
                  rowSpan={5}
                  underline={false}
                  bordered={true}
                  placeholder="Description"
                  onChange={handleDescriptionChange}
                />
            </Item>
          </Form>
          <View style={styles.submitButton}>
            <TouchableOpacity style={styles.button}>
              <Text style={styles.submit}>Register</Text>
            </TouchableOpacity>
          </View>
        </View>
    </Screen>
  )
}
