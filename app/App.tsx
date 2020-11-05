/**
 * Welcome to the main entry point of the app. In this file, we'll
 * be kicking off our app or storybook.
 *
 * Most of this file is boilerplate and you shouldn't need to modify
 * it very often. But take some time to look through and understand
 * what is going on here.
 *
 * The app navigation resides in ./app/navigation, so head over there
 * if you're interested in adding screens and navigators.
 */
import { NavigationContainerRef } from '@react-navigation/native'
import React, { useEffect, useRef, useState } from 'react'
import {
  initialWindowSafeAreaInsets,
  SafeAreaProvider,
} from 'react-native-safe-area-context'
import './i18n'
import { RootStore, RootStoreProvider, setupRootStore } from './models'
import {
  canExit,
  RootNavigator,
  setRootNavigation,
  useBackButtonHandler,
  useNavigationPersistence,
} from './navigation'
import './utils/ignore-warnings'
import * as storage from './utils/storage'

// This puts screens in a native ViewController or Activity. If you want fully native
// stack navigation, use `createNativeStackNavigator` in place of `createStackNavigator`:
// https://github.com/kmagiera/react-native-screens#using-native-stack-navigator

export const NAVIGATION_PERSISTENCE_KEY = 'NAVIGATION_STATE'

/**
 * This is the root component of our app.
 */
function App() {
  const navigationRef = useRef<NavigationContainerRef>()
  const [rootStore, setRootStore] = useState<RootStore | undefined>(undefined)

  setRootNavigation(navigationRef)
  useBackButtonHandler(navigationRef, canExit)
  const {
    initialNavigationState,
    onNavigationStateChange,
  } = useNavigationPersistence(storage, NAVIGATION_PERSISTENCE_KEY)

  // Kick off initial async loading actions, like loading fonts and RootStore
  useEffect(() => {
    ;(async () => {
      setupRootStore().then(setRootStore)
    })()
  }, [])

  // Before we show the app, we have to wait for our state to be ready.
  // In the meantime, don't render anything. This will be the background
  // color set in native by rootView's background color. You can replace
  // with your own loading component if you wish.
  if (!rootStore) return null

  // Process some business logic and render the app

  return (
    <RootStoreProvider value={rootStore}>
      <SafeAreaProvider initialSafeAreaInsets={initialWindowSafeAreaInsets}>
        <RootNavigator
          ref={navigationRef}
          initialState={initialNavigationState}
          onStateChange={onNavigationStateChange}
        />
      </SafeAreaProvider>
    </RootStoreProvider>
  )
}

export default App
