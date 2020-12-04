import React from 'react'
import { Text, TouchableOpacity, View } from 'react-native'
import MaterialCommunityIconsIcon from 'react-native-vector-icons/MaterialCommunityIcons'
import { screens } from '../../config/screens'
import { styles } from './styles'

export const SplashScreen = ({navigation}) => {

  // useEffect(() => {
  //   console.log('Splash')
  //   navigation.navigate(screens.basic.introJobs)
  // }, [navigation])

  return (
    <View>
      <Text style={styles.imageLogoSplash}>AAAAAAAAAAAAAAAAAAAAAAA</Text>
    </View>
  )
}

export const IntroJob = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text>Logo Image</Text>
      </View>

      <View style={styles.middle}>
        <View style={styles.messageHeader}>
          <MaterialCommunityIconsIcon
            name='message-text'
            style={styles.iconMsg}
          ></MaterialCommunityIconsIcon>
          <Text style={styles.jobsText}>JOBS</Text>
        </View>
        <Text style={styles.text}>
          Provide a plenty of jobs to find the best one for you
        </Text>
      </View>

      <View style={styles.footer}>
        <View style={styles.leftFooter}>
          <View style={styles.rect}></View>
          <View style={styles.rect2}></View>
        </View>

        <View style={styles.rightFooter}>
          <TouchableOpacity
            style={styles.button}
            onPressOut={() => navigation.navigate(screens.basic.introCompany)}
          >
            <Text style={styles.skipText}>SKIP</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  )
}

export const IntroCompany = ({ navigation }) => {
  React.useEffect(() => {
    console.log('IntroCompany')
  }, [])
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text>Logo Image</Text>
      </View>

      <View style={styles.middle}>
        <View style={styles.messageHeader}>
          <MaterialCommunityIconsIcon
            name='message-text'
            style={styles.iconMsg}
          ></MaterialCommunityIconsIcon>
          <Text style={styles.jobsText}>CANDICATES</Text>
        </View>
        <Text style={styles.text}>
          Find the suitable candicates for your company
        </Text>
      </View>

      <View style={styles.footer}>
        <View style={styles.leftFooter}>
          <View style={styles.rect2}></View>
          <View style={styles.rect}></View>
        </View>

        <View style={styles.rightFooter}>
          <TouchableOpacity
            style={styles.button}
            onPressOut={() => navigation.navigate(screens.basic.login)}
          >
            <Text style={styles.skipText}>SKIP</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  )
}
