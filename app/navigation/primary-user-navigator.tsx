/**
 * This is the navigator you will modify to display the logged-in screens of your app.
 * You can use RootNavigator to also display an auth flow or other user flows.
 *
 * You'll likely spend most of your time in this file.
 */
import { createDrawerNavigator } from '@react-navigation/drawer'
import React from 'react'
import { Sidebar } from '../components'
import { screens } from '../config/screens'
import { FollowingScreen, SettingsScreen } from '../screens'
import { ProfileUserNavigator } from './profile-user-navigator'
import { UserHomeNavigator } from './user-home-navigator'

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

const Drawer = createDrawerNavigator()

export function PrimaryUserNavigator() {
  return (
    <Drawer.Navigator
      initialRouteName={screens.authenticated.user.home}
      // https://github.com/react-navigation/react-navigation/issues/7725
      drawerContent={(props) => <Sidebar {...props} />}
      screenOptions={{
        gestureEnabled: true,
      }}
    >
      <Drawer.Screen
        name={screens.authenticated.user.profile}
        component={ProfileUserNavigator}
      />
      {/* <Drawer.Screen
        name={screens.authenticated.user.profile}
        component={ProfileEditUserScreen}
      /> */}
      <Drawer.Screen
        name={screens.authenticated.user.following}
        component={FollowingScreen}
      />
      <Drawer.Screen
        name={screens.authenticated.user.settings}
        component={SettingsScreen}
      />
      <Drawer.Screen
        name={screens.authenticated.user.home}
        component={UserHomeNavigator}
      />
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
const exitRoutes = ['welcome']
export const canExit = (routeName: string) => exitRoutes.includes(routeName)
