/**
 * The root navigator is used to switch between major navigation flows of your app.
 * Generally speaking, it will contain an auth flow (registration, login, forgot password)
 * and a "main" flow (which is contained in your PrimaryNavigator) which the user
 * will use once logged in.
 */
import {
  NavigationContainer,
  NavigationContainerRef
} from '@react-navigation/native'
import { createNativeStackNavigator } from 'react-native-screens/native-stack'
import React from 'reactn'
import { GlobalState } from '../config/global'
import { screens } from '../config/screens'
import { MessagesScreen, ProfileEditCompanyScreen, ProfileEditUserScreen, WriteFeedScreen } from '../screens'
import RootStackStart from './login-navigator'
import { PrimaryCompanyNavigator } from './primary-company-navigator'
import { PrimaryUserNavigator } from './primary-user-navigator'

/**
 * This type allows TypeScript to know what routes are defined in this navigator
 * as well as what properties (if any) they might take when navigating to them.
 *
 * We recommend using MobX-State-Tree store(s) to handle state rather than navigation params.
 *
 * For more information, see this documentation:
 *   https://reactnavigation.org/docs/params/
 *   https://reactnavigation.org/docs/typescript#type-checking-the-navigator
 */

const Stack = createNativeStackNavigator()

const RootStack = () => {
  const [loggedIn, setLoggedIn] = React.useGlobal<GlobalState, 'accessToken'>(
    'accessToken',
  )
  const [accountType, setAccountType] = React.useGlobal<
    GlobalState,
    'accountType'
  >('accountType')

  if (typeof loggedIn === 'string' && loggedIn !== '') {
    if (accountType === 'user') {
      return (
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
            gestureEnabled: true,
            stackPresentation: 'modal',
          }}
        >
          <Stack.Screen
            name={screens.authenticated.user.navigator}
            component={PrimaryUserNavigator}
            options={{ headerShown: false }}
          />

        <Stack.Screen
          name={screens.authenticated.user.editprofile}
          component={ProfileEditUserScreen}
          options={{ headerShown: false }}
        />
          
          {/* deo co bottom tab de het duoi nay */}
          <Stack.Screen
            name='room' // <- cai deo gi day ? :)
            component={MessagesScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name={screens.authenticated.user.newsfeed.write}
            component={WriteFeedScreen}
            options={{ headerShown: false }}
          />
        </Stack.Navigator>
      )
    } else if (accountType === 'company') {
      return (
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
            gestureEnabled: true,
            stackPresentation: 'modal',
          }}
        >
          <Stack.Screen
            name={screens.authenticated.company.navigator}
            component={PrimaryCompanyNavigator}
            options={{ headerShown: false }}
          />
          <Stack.Screen
          name={screens.authenticated.company.editprofile}
          component={ProfileEditCompanyScreen}
          options={{ headerShown: false }}
        />
          {/* deo co bottom tab de het duoi nay */}
          <Stack.Screen
            name='room' // <- cai deo gi day ? :)
            component={MessagesScreen}
            options={{ headerShown: false }}
          />
          {/* <Stack.Screen
            name={screens.authenticated.user.newsfeed.write}
            component={WriteFeedScreen}
            options={{ headerShown: false }}
          /> */}
        </Stack.Navigator>
      )
    }
  } else {
    return (
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
          gestureEnabled: true,
          stackPresentation: 'modal',
        }}
      >
        <Stack.Screen
          name={screens.basic.navigator}
          component={RootStackStart}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
      
    )
  }
}

export const RootNavigator = React.forwardRef<
  NavigationContainerRef,
  Partial<React.ComponentProps<typeof NavigationContainer>>
>((props, ref) => {
  return (
    <NavigationContainer {...props} ref={ref}>
      <RootStack />
    </NavigationContainer>
  )
})

RootNavigator.displayName = 'RootNavigator'
