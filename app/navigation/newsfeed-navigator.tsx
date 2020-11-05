/**
 * This is the navigator you will modify to display the logged-in screens of your app.
 * You can use RootNavigator to also display an auth flow or other user flows.
 *
 * You'll likely spend most of your time in this file.
 */
import { createStackNavigator } from '@react-navigation/stack'
import React from 'react'
import { screens } from '../config/screens'
import { NewsfeedScreen, WriteFeedScreen } from '../screens'

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
const Stack = createStackNavigator()

export function NewsfeedNavigator() {
  return (
    <Stack.Navigator
      initialRouteName={screens.authenticated.user.newsfeed.main}
      headerMode="none"
    >
      <Stack.Screen
        name={screens.authenticated.user.newsfeed.main}
        component={NewsfeedScreen}
      />
      <Stack.Screen
        name={screens.authenticated.user.newsfeed.write}
        component={WriteFeedScreen}
      />
    </Stack.Navigator>
  )
}
