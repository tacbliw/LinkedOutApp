import * as React from "react"
import Icon from 'react-native-vector-icons/Ionicons'

const style = {
  position: "absolute",
  alignSelf: "center",
}

export interface NamedIconProps {
  focused?: boolean
  color?: string
  size?: number
}

/**
 * Describe your component here
 */
export function NamedIcon(props: NamedIconProps, name: string) {
  const { focused, color, size } = props
  return (
    <Icon color={color} size={size} name={name} />
  )
}
