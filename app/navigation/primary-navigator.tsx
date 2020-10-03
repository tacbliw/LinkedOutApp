/**
 * This is the navigator you will modify to display the logged-in screens of your app.
 * You can use RootNavigator to also display an auth flow or other user flows.
 *
 * You'll likely spend most of your time in this file.
 */
import { createDrawerNavigator } from '@react-navigation/drawer'
import React from "react"
import { NamedIcon, Sidebar } from "../components"
import { FollowingScreen, ProfileScreen, SettingsScreen } from "../screens"
import { HomeNavigator } from "./home-navigator"

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
export type PrimaryParamList = {
  home: undefined
  profile: undefined
  following: undefined
  settings: undefined
}

const Drawer = createDrawerNavigator<PrimaryParamList>()

export function PrimaryNavigator() {
  return (
    <Drawer.Navigator
      initialRouteName="home"
      drawerContent={Sidebar}
      screenOptions={{
        gestureEnabled: true,
      }}
    >
      <Drawer.Screen name="profile" component={ProfileScreen}
        options={{
          drawerLabel: 'Profile',
          drawerIcon: ({ focused, color, size }) => NamedIcon({ focused, color, size }, 'person-outline')
        }} />
      <Drawer.Screen name="following" component={FollowingScreen}
        options={{
          drawerLabel: 'Following',
          drawerIcon: ({ focused, color, size }) => NamedIcon({ focused, color, size }, 'people-outline')
        }} />
      <Drawer.Screen name="settings" component={SettingsScreen}
        options={{
          drawerLabel: 'Settings',
          drawerIcon: ({ focused, color, size }) => NamedIcon({ focused, color, size }, 'settings-outline'),
        }} />
      <Drawer.Screen name="home" component={HomeNavigator} />
    </Drawer.Navigator>
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
