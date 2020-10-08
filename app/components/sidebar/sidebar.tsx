import { DrawerContentScrollView, DrawerItemList } from "@react-navigation/drawer"
import * as React from "react"
import { StyleSheet } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import { screens } from "../../config/screens"
import { accountService } from "../../services/account-service"
import { LogoutButton } from "./logout-button/logout -button"

const style = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    paddingBottom: 5,
  }
})

export function Sidebar(props) {
  // remove the option to go to Home screen
  const { state, ...rest } = props
  const newState = { ...state }
  newState.routes = newState.routes.filter(item =>
    item.name !== screens.authenticated.user.home &&
    item.name !== screens.authenticated.company.home
  )

  // handle logout event
  const [loading, handleLogout] = accountService.useLogout()

  return (
    <DrawerContentScrollView {...props} contentContainerStyle={style.container}>
      <SafeAreaView>
        <DrawerItemList state={newState} {...rest} />
      </SafeAreaView>
      <LogoutButton onPress={handleLogout} />
    </DrawerContentScrollView>
  )
}
