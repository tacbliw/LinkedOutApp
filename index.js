import * as eva from '@eva-design/eva'
import AsyncStorage from '@react-native-community/async-storage'
import { ApplicationProvider } from '@ui-kitten/components'
import { Root } from 'native-base'
import { AppRegistry, StatusBar } from "react-native"
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { enableScreens } from 'react-native-screens'
import React, { Suspense } from 'reactn'
import { defaultGlobalState } from './app/config/global'
import { SplashScreen } from './app/screens'
// This is the first file that ReactNative will run when it starts up.
//
// We jump out of here immediately and into our main entry point instead.
//
// It is possible to have React Native load our main module first, but we'd have to
// change that in both AppDelegate.m and MainApplication.java.  This would have the
// side effect of breaking other tooling like mobile-center and react-native-rename.
//
// It's easier just to leave it here.

/**
 * This needs to match what's found in your app_delegate.m and MainActivity.java.
 */
const APP_NAME = "LinkedOutApp"

// Should we show storybook instead of our app?
//
// ⚠️ Leave this as `false` when checking into git.
// const SHOW_STORYBOOK = false

enableScreens()

const App = React.lazy(async () => {
  /**
   * Initial Global State
   */
  const globalState = {
    ...defaultGlobalState,
    accessToken: await AsyncStorage.getItem('accessToken'),
  }
  /**
   * Initialize global state
   */
  await React.setGlobal(globalState)
  console.log(React.getGlobal())
  /**
   * Import app entry
   */
  return import('./app/App')
})

// if (__DEV__ && SHOW_STORYBOOK) {
//   // Only include Storybook if we're in dev mode
//   const { StorybookUIRoot } = require("./storybook")
//   RootComponent = StorybookUIRoot
// }

if (__DEV__) {
  import('./ReactotronConfig').then(() => console.log('Reactotron Configured'))
}

function AppEntry() {
  return (
    <Suspense fallback={<SplashScreen />}>
      {/* <Button text="LOL" /> */}
      <Root>
        <ApplicationProvider {...eva} theme={eva.light}>
          <StatusBar
            barStyle="light-content"
            backgroundColor="#EE534D"
            networkActivityIndicatorVisible={true}
            showHideTransition="fade"
            animated={true}
          // translucent={true}
          />
          <SafeAreaProvider>
            <App />
          </SafeAreaProvider>
        </ApplicationProvider>
      </Root>
    </Suspense>
  )
}

AppRegistry.registerComponent(APP_NAME, () => AppEntry)
