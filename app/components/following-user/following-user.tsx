import { Thumbnail } from "native-base"
import * as React from "react"
import { TextStyle, View, ViewStyle } from "react-native"
import { Text } from "../"
import { color, typography } from "../../theme"

const CONTAINER: ViewStyle = {
  justifyContent: "center",
}

const TEXT: TextStyle = {
  fontFamily: typography.primary,
  fontSize: 14,
  color: color.primary,
}

export interface FollowingUserProps {
  /**
   * An optional style override useful for padding & margin.
   */
  style?: ViewStyle
  width: number,
  height: number,
  borderRadius: number,
  thumbnailSource?,
  textThumbnail?,
  textColor?,
  label: string
}

/**
 * Describe your component here
 */
export function FollowingUser(props: FollowingUserProps) {
  const { style } = props
  if (props.thumbnailSource)
    return (
      <View style={{ alignItems: 'center' }}>
        <Thumbnail style={{ width: props.width, height: props.height, borderRadius: props.borderRadius }} source={props.thumbnailSource}></Thumbnail>
        <Text style={{ color: color.brandLight, fontSize: 14 }}>{props.label}</Text>
      </View>
    )
  else {
    return (
      <View style={{ alignItems: 'center' }}>
        <View style={{ borderRadius: 100, borderColor: color.brandPrimary, width: props.width, height: props.height,  borderWidth: 1,  alignItems: 'center', justifyContent: 'center' }}><Text style={{color: props.textColor}}>{props.textThumbnail}</Text></View>
        <Text style={{ color: color.brandLight, fontSize: 14 }}>{props.label}</Text>
      </View>
    )
  }
}
