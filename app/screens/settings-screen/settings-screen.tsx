import { observer } from 'mobx-react-lite'
import { Picker, View } from 'native-base'
import React, { useState } from 'react'
import { Dimensions, StyleSheet, ViewStyle } from 'react-native'
import { Screen, Text } from '../../components'
import { color } from '../../theme'

const ROOT: ViewStyle = {
  backgroundColor: color.palette.black,
  flex: 1,
}

export const SettingsScreen = observer(function SettingsScreen() {
  const [selectedValue, setSelectedValue] = useState('Light')

  return (
    <Screen style={ROOT} preset='scroll'>
      <View style={styles.container}>
        {/* // <Text preset="header" text="settingsScreen" />  */}
        <Text style={styles.header}>Settings</Text>
        <View>
          <View style={styles.line}>
            <Text style={styles.text}> Themes: </Text>

            <Picker
              mode='dropdown'
              selectedValue={selectedValue}
              style={{
                color: color.brandDark,
                justifyContent: 'center',
                // width: width/2,
              }}
              placeholder='gender'
              onValueChange={(itemValue) => setSelectedValue(itemValue)}
            >
              <Picker.Item label='Dark' value='Dark' />
              <Picker.Item label='Light' value='Light' />
            </Picker>
          </View>
        </View>
      </View>
    </Screen>
  )
})

const { width, height } = Dimensions.get('screen')
const styles = StyleSheet.create({
  container: {
    backgroundColor: color.background,
    flex: 1,
  },
  header: {
    backgroundColor: color.brandDanger,
    borderRadius: 2,
    color: color.palette.white,
    elevation: 20,
    fontSize: 50,
    height: height / 6,
    justifyContent: 'center',
    textAlign: 'center',
    width: width,
  },
  line: {
    backgroundColor: color.background,
    //  backgroundColor:'#000',
    borderRadius: 2,
    elevation: 50,
    flexDirection: 'row',
    justifyContent: 'center',
    marginLeft: 0,
    marginVertical: height * 0.05,
  },
  text: {
    alignSelf: 'center',
    color: color.brandDark,
    fontSize: 25,
    width: width * 0.72,
    //  backgroundColor:color.brandPrimary
  },
})
