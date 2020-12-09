import { createDrawerNavigator } from '@react-navigation/drawer'
import React from 'reactn'
import { SidebarCompany } from '../components/sidebar/sidebar-company'
import { screens } from '../config/screens'
import { SettingsScreen } from '../screens'
import { CompanyHomeNavigator } from './company-home-navigator'
import { ProfileCompanyNavigator } from './profile-company-navigator'

const Drawer = createDrawerNavigator()

export function PrimaryCompanyNavigator() {
  return (
    <Drawer.Navigator
      initialRouteName={screens.authenticated.company.home}
      // https://github.com/react-navigation/react-navigation/issues/7725
      drawerContent={(props) => <SidebarCompany {...props} />}
      screenOptions={{
        gestureEnabled: true,
      }}
    >
      <Drawer.Screen
        name={screens.authenticated.company.profile}
        component={ProfileCompanyNavigator}
      />
      <Drawer.Screen
        name={screens.authenticated.company.settings}
        component={SettingsScreen}
      />
      <Drawer.Screen
        name={screens.authenticated.company.home}
        component={CompanyHomeNavigator}
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
