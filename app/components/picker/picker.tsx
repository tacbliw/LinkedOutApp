import * as React from "react"
import { TextStyle, View, ViewStyle } from "react-native"
import { color, typography } from "../../theme"
import { Text } from "../"

const CONTAINER: ViewStyle = {
  justifyContent: "center",
}

const TEXT: TextStyle = {
  fontFamily: typography.primary,
  fontSize: 14,
  color: color.primary,
}

export interface PickerProps {
  /**
   * An optional style override useful for padding & margin.
   */
  style?: ViewStyle
}

/**
 * Describe your component here
 */
export function Picker(props: PickerProps) {
  const { style } = props

  return (
    <View style={[CONTAINER, style]}>
      <Text style={TEXT}>Hello</Text>
    </View>
  )
}
