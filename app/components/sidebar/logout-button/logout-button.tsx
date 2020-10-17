import { Icon, Left, List, ListItem, Text } from "native-base"
import React from "react"
import { StyleSheet } from "react-native"
import { color } from "../../../theme"

const styles = StyleSheet.create({
  icon: {
    color: "#ffffff",
    fontSize: 25,
  },
  iconContainer: {
    alignItems: 'center',
    marginHorizontal: 16,
    paddingLeft: 3
  },
  item: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  label: {
    color: color.logout,
    fontWeight: 'bold',
    margin: 16,
  },

  logoutText: {
    color: color.brandDanger,
  },

  routeIcon: {
    fontSize: 24,
    width: 26,
    color: color.brandDanger,
  },

  routeName: {
    fontSize: 16,
    color: color.brandDanger,
    width: 60
  },
})

export function LogoutButton(props) {
  const { onPress } = props
  return (
        <List>
          <ListItem noBorder button onPress={onPress}>
            <Left style={styles.item}>
              <Icon style={styles.routeIcon} name = "log-out"></Icon>
              <Text style={styles.routeName}>Log out</Text>
            </Left>
          </ListItem>
        </List>
  )
}