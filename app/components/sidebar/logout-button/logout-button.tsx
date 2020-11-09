import { Icon, Left, List, ListItem, Text } from 'native-base'
import React from 'react'
import { StyleSheet } from 'react-native'
import { color } from '../../../theme'

const styles = StyleSheet.create({
  item: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  routeIcon: {
    color: color.background,
    fontSize: 24,
    width: 26,
  },

  routeName: {
    color: color.background,
    fontSize: 16,
    width: 60,
  },
})

export function LogoutButton(props) {
  const { onPress } = props
  return (
    <List>
      <ListItem noBorder button onPress={onPress}>
        <Left style={styles.item}>
          <Icon style={styles.routeIcon} name='log-out'></Icon>
          <Text style={styles.routeName}>Log out</Text>
        </Left>
      </ListItem>
    </List>
  )
}
