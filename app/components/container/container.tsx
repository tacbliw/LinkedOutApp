import * as React from "react"
import { TextStyle, View, ViewStyle } from "react-native"

const CONTAINER: ViewStyle = {
  justifyContent: "center",
  backgroundColor: "#f6f5fb",
}

const TEXT: TextStyle = {
  // fontFamily: typography.primary,
  // fontSize: 14,
  // color: color.primary,
}

export interface ContainerProps {
  /**
   * An optional style override useful for padding & margin.
   */
  style?: ViewStyle,
  children?: React.ReactNode,
}

/**
 * Describe your component here
 */
export function Container(props: ContainerProps) {
  const { style } = props

  return (
    <View style={[CONTAINER, style]}>
      {props.children}
    </View>
  )
}
