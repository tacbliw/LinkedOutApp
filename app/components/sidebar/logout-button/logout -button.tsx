import React from "react"
import { StyleSheet, Text, TouchableOpacity, View } from "react-native"
import Icon from "react-native-vector-icons/Ionicons"
import { color } from "../../../theme"

const styles = StyleSheet.create({
  icon: {
    color: color.logout,
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
})

export function LogoutButton(props) {
  const { onPress } = props
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={styles.item}>
        <View style={styles.iconContainer}>
          <Icon name='log-out-outline' style={styles.icon} />
        </View>
        <Text style={styles.label}>Logout</Text>
      </View>
    </TouchableOpacity>
  )
}
