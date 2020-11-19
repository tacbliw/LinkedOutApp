import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { Badge, Button, Icon, Text } from 'native-base'
import React from 'react'
import { View } from 'react-native'
import { screens } from '../config/screens'
import { color } from '../theme'
import { ChatNavigator } from './chat-navigator'
import { NewsfeedNavigator } from './newsfeed-navigator'

const Tabs = createBottomTabNavigator()

function MyTabBar({ state, descriptors, navigation }) {
  const focusedOptions = descriptors[state.routes[state.index].key].options

  const mapIcon = {}
  mapIcon[screens.authenticated.company.jobs] = 'home'
  mapIcon[screens.authenticated.company.messages] = 'mail'

  if (focusedOptions.tabBarVisible === false) {
    return null
  }

  return (
    <View style={{ flexDirection: 'row' }}>
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key]
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name

        const isFocused = state.index === index

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          })

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name)
          }
        }

        const onLongPress = () => {
          navigation.emit({
            type: 'tabLongPress',
            target: route.key,
          })
        }

        if (label === screens.authenticated.user.messages) {
          return (
            <Button
              full
              key={label}
              onPress={onPress}
              onLongPress={onLongPress}
              style={{ flex: 1, backgroundColor: color.brandPrimary }}
            >
              <Icon
                name={isFocused ? mapIcon[label] : mapIcon[label] + '-outline'}
              >
                <Badge>
                  <Text>3</Text>
                </Badge>
              </Icon>
            </Button>
          )
        } else {
          return (
            <Button
              full
              key={label}
              onPress={onPress}
              onLongPress={onLongPress}
              style={{ flex: 1, backgroundColor: color.brandPrimary }}
            >
              <Icon
                name={isFocused ? mapIcon[label] : mapIcon[label] + '-outline'}
              ></Icon>
            </Button>
          )
        }
      })}
    </View>
  )
}

export function CompanyHomeNavigator() {
  return (
    <>
      <Tabs.Navigator tabBar={(props) => <MyTabBar {...props} />}>
        <Tabs.Screen
          name={screens.authenticated.company.jobs}
          component={NewsfeedNavigator}
        />
        <Tabs.Screen
          name={screens.authenticated.company.messages}
          component={ChatNavigator}
        />
      </Tabs.Navigator>
    </>
  )
}

/**
 * A list of routes from which we're allowed to leave the app when
 * the user presses the back button on Android.
 *
 * Anything not on this list will be a standard `back` action in
 * react-navigation.
 *
 * `canExit` is used in ./app/app.tsx in the `useBackButtonHandler` hook.
 */
const exitRoutes = ['welcome']
export const canExit = (routeName: string) => exitRoutes.includes(routeName)
