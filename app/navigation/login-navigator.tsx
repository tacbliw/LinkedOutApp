/**
 * This is the navigator you will modify to display the logged-in screens of your app.
 * You can use RootNavigator to also display an auth flow or other user flows.
 *
 * You'll likely spend most of your time in this file.
 */
import { createStackNavigator } from '@react-navigation/stack'
import React from 'react'
import { screens } from '../config/screens'
import {
  IntroCompany,
  IntroJob,
  LoginScreen,
  RegisterCompanyScreen,
  RegisterScreen,
  RegisterUserScreen
} from '../screens'

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

const StackStart = createStackNavigator()
const RootStackStart = () => {
  return (
    <StackStart.Navigator headerMode='none'>
      {/* <StackStart.Screen name={screens.basic.splash} component={SplashScreen} /> */}
      <StackStart.Screen name={screens.basic.introJobs} component={IntroJob} />
      <StackStart.Screen
        name={screens.basic.introCompany}
        component={IntroCompany}
      />
      <StackStart.Screen name={screens.basic.login} component={LoginScreen} />
      <StackStart.Screen
        name={screens.basic.register.main}
        component={RegisterScreen}
      />
      <StackStart.Screen
        name={screens.basic.register.company}
        component={RegisterCompanyScreen}
      />
      <StackStart.Screen
        name={screens.basic.register.user}
        component={RegisterUserScreen}
      />
    </StackStart.Navigator>
  )
}
export default RootStackStart

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
