
import * as React from "react"
import { TextStyle, View, ViewStyle } from "react-native"
import { Text } from "../"
import { color } from "../../theme"

const CONTAINER: ViewStyle = {
  justifyContent: "center",
}

const TEXT: TextStyle = {
  borderWidth: 1,
  borderRadius: 10,
  backgroundColor: color.brandPrimary,
  borderColor: color.brandPrimary,
  marginRight: 10,
  color: "#FFFFFF",
}

export interface TagProps {
  /**
   * An optional style override useful for padding & margin.
   */
  style?: ViewStyle,
  tagText: string,
}

/**
 * Describe your component here
 */
export function Tag(props: TagProps) {
  const { style } = props
  return (
    <View style={[CONTAINER, style]}>
      <Text style={TEXT}>  {props.tagText} </Text>
    </View>
  )
}
