/**
 * This is the navigator you will modify to display the logged-in screens of your app.
 * You can use RootNavigator to also display an auth flow or other user flows.
 *
 * You'll likely spend most of your time in this file.
 */
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Button, Icon } from "native-base";
import React from "react";
import { View } from "react-native";
import { screens } from "../config/screens";
import { NewsfeedScreen, NotificationsScreen, PostEditScreen, SearchScreen } from "../screens";

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

function MyTabBar({ state, descriptors, navigation }) {
  const focusedOptions = descriptors[state.routes[state.index].key].options;

  var map_icon = {}
  map_icon[screens.authenticated.user.newsfeed] = "home"
  map_icon[screens.authenticated.user.search] = "search"
  map_icon[screens.authenticated.user.notification] = "notifications"
  map_icon[screens.authenticated.user.messages] = "mail"

  if (focusedOptions.tabBarVisible === false) {
    return null;
  }

  return (
    <View style={{ flexDirection: 'row' }}>
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name;

        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: 'tabLongPress',
            target: route.key,
          });
        };

        return (
            <Button full key={label} onPress={onPress} onLongPress={onLongPress} style={{flex: 1}}>
              <Icon name = {isFocused ? map_icon[label]: map_icon[label] + "-outline" }>
              </Icon>
            </Button>
        );
      })}
    </View>
  );
}

export function HomeNavigator() {
  return (
    <>
    <Tabs.Navigator tabBar={props => <MyTabBar {...props} />}>
      <Tabs.Screen name={screens.authenticated.user.newsfeed} component={NewsfeedScreen}/>
      <Tabs.Screen name={screens.authenticated.user.search} component={SearchScreen}/>
      <Tabs.Screen name={screens.authenticated.user.notification} component={NotificationsScreen}/>
      <Tabs.Screen name={screens.authenticated.user.messages} component={PostEditScreen}/>
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
