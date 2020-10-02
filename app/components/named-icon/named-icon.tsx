import * as React from "react"
import Ionicons from 'react-native-vector-icons/Ionicons'

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
function NamedIcon(props: NamedIconProps, name: string) {
  const { focused, color, size } = props
  return (
    <Ionicons color={color} size={size} name={name} style={style} />
  )
}

NamedIcon.displayname = "Icon"

export default NamedIcon
