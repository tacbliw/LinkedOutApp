import { DrawerContentScrollView, DrawerItemList } from "@react-navigation/drawer"
import * as React from "react"

export const Sidebar = props => {
  // remove the option to go to Home screen
  const { state, ...rest } = props
  const newState = { ...state }
  newState.routes = newState.routes.filter(item => item.name !== 'home')

  return (
    <DrawerContentScrollView {...props}>
      <DrawerItemList state={newState} {...rest} />
    </DrawerContentScrollView>
  )
}
