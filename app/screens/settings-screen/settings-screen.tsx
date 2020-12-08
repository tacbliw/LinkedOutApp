import {
  Body,
  Button,
  Container,
  Header,
  Icon,
  Left,
  ListItem,
  Right,
  Text,
  View,
} from 'native-base'
import React, { useState } from 'react'
import {
  Dimensions,
  FlatList,
  StyleSheet,
  Switch,
  ViewStyle,
} from 'react-native'
import { Screen } from '../../components'
import { color } from '../../theme'

const ROOT: ViewStyle = {
  backgroundColor: color.palette.black,
  flex: 1,
}

interface SettingProps {
  iconName: string
  iconColor: string
  bodyText: string
  rightObject: React.ReactNode
}

const settingList = [
  {
    iconName: 'notifications',
    iconColor: '#ff453a',
    bodyText: 'Notification',
    rightObject: <Switch value={true} />,
  },

  {
    iconName: 'newspaper',
    iconColor: '#0a84ff',
    bodyText: 'Feed Setting',
    rightObject: <></>,
  },

  {
    iconName: 'settings',
    iconColor: '#8e8e93',
    bodyText: 'General',
    rightObject: <></>,
  },

  {
    iconName: 'shield',
    iconColor: '#8fd158',
    bodyText: 'Privacy and Terms',
    rightObject: <></>,
  },

  {
    iconName: 'warning',
    iconColor: '#ff453a',
    bodyText: 'Delete account',
    rightObject: <></>,
  },
]

export const SettingsScreen = function SettingsScreen(navigation) {
  const [selectedValue, setSelectedValue] = useState('Light')
  const [selectedLanguage, setSelectedLanguage] = useState('English')
  const [isEnabled, setIsEnabled] = useState(false)
  const toggleSwitch = () => setIsEnabled((previousState) => !previousState)
  return (
    <Screen style={ROOT} preset='scroll'>
      <View style={styles.container}>
        <Header transparent>
          <Left style={{ flexGrow: 1 }}>
            <Text style={styles.header}>Settings</Text>
          </Left>
        </Header>
        <Container style={{ marginTop: 10 }}>
          <FlatList
            data={settingList}
            renderItem={({ item }: { item: SettingProps }) => {
              return (
                <ListItem icon style={{ marginBottom: 16 }}>
                  <Left style={{ borderBottomWidth: 0 }}>
                    <Button style={{ backgroundColor: item.iconColor }}>
                      <Icon active name={item.iconName} />
                    </Button>
                  </Left>
                  <Body style={{ borderBottomWidth: 0 }}>
                    <Text>{item.bodyText}</Text>
                  </Body>
                  <Right style={{ borderBottomWidth: 0 }}>
                    {item.rightObject}
                  </Right>
                </ListItem>
              )
            }}
          ></FlatList>
        </Container>
      </View>
    </Screen>
  )
}

const { width, height } = Dimensions.get('screen')
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  header: {
    fontSize: 32,
    fontWeight: '700',
    marginLeft: 6,
  },
  section: {
    marginVertical: height * 0.03,
  },
  line: {
    flexDirection: 'row',
    borderBottomWidth: 2,
    borderColor: color.backgroundSetting,
    marginLeft: 0,
    height: height * 0.08,
    width: width,
  },
  text: {
    color: color.brandDark,
    fontSize: 20,
    alignSelf: 'center',
    width: width * 0.55,
    fontFamily: 'roboto-regular',
    marginLeft: 10,
  },

  iconName: {
    alignSelf: 'center',
    color: color.brandPrimary,
    fontSize: 23,
  },

  picker: {
    color: color.pickerOption,
    justifyContent: 'center',
  },
})
