/**
 * This is the navigator you will modify to display the logged-in screens of your app.
 * You can use RootNavigator to also display an auth flow or other user flows.
 *
 * You'll likely spend most of your time in this file.
 */
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import React from "react"
import { NamedIcon } from "../components"
import { screens } from "../config/screens"
import { MessagesScreen, NewsfeedScreen, NotificationsScreen, SearchScreen } from "../screens"

/**
 * This type allows TypeScript to know what routes are defined in this navigator
 * as well as what properties (if any) they might take when navigating to them.
 *
 * If no params are allowed, pass through `undefined`. Generally speaking, we
 * recommend using your MobX-State-Tree store(s) to keep application state
 * rather than passing state through navigation params.
 *
 * For more information, see this documentation:
 *   https://reactnavigation.org/docs/params/
 *   https://reactnavigation.org/docs/typescript#type-checking-the-navigator
 */

// Documentation: https://github.com/software-mansion/react-native-screens/tree/master/native-stack
const Tabs = createBottomTabNavigator()

export function HomeNavigator() {
  return (
    <>
      <Tabs.Navigator>
        <Tabs.Screen name={screens.authenticated.user.newsfeed} component={NewsfeedScreen}
          options={{
            tabBarLabel: 'Feed',
            tabBarIcon: ({ focused, color, size }) => NamedIcon({ focused, color, size }, 'home-outline')
          }} />
        <Tabs.Screen name={screens.authenticated.user.search} component={SearchScreen}
          options={{
            tabBarLabel: 'Search',
            tabBarIcon: ({ focused, color, size }) => NamedIcon({ focused, color, size }, 'search-outline')
          }} />
        <Tabs.Screen name={screens.authenticated.user.notification} component={NotificationsScreen}
          options={{
            tabBarLabel: 'Notifications',
            tabBarIcon: ({ focused, color, size }) => NamedIcon({ focused, color, size }, 'notifications-outline')
          }} />
        <Tabs.Screen name={screens.authenticated.user.messages} component={MessagesScreen}
          options={{
            tabBarLabel: 'Messages',
            tabBarIcon: ({ focused, color, size }) => NamedIcon({ focused, color, size }, 'chatbubbles-outline')
          }} />
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
const exitRoutes = ["welcome"]
export const canExit = (routeName: string) => exitRoutes.includes(routeName)
