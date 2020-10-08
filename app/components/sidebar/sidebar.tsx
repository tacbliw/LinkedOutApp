import { DrawerContentScrollView, DrawerItemList } from "@react-navigation/drawer"
import * as React from "react"
import { accountService } from "../../services/account-service"
import { Button } from "../button/button"

export function Sidebar(props) {
  // remove the option to go to Home screen
  const { state, ...rest } = props
  const newState = { ...state }
  newState.routes = newState.routes.filter(item => item.name !== 'home')

  // handle logout event
  const [loading, handleLogout] = accountService.useLogout()

  return (
    <DrawerContentScrollView {...props}>
      <DrawerItemList state={newState} {...rest} />
      <Button text="Logout" onPress={handleLogout} />
    </DrawerContentScrollView>
  )
}
