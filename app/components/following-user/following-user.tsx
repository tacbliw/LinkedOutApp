import * as React from 'react'
import { View, ViewStyle } from 'react-native'
import FastImage from 'react-native-fast-image'
import { Text } from '../'
import { color } from '../../theme'

export interface FollowingUserProps {
  /**
   * An optional style override useful for padding & margin.
   */
  style?: ViewStyle
  width: number
  height: number
  borderRadius: number
  avatarUri?
  textThumbnail?
  textColor?
  label: string
}

/**
 * Describe your component here
 */
export function FollowingUser(props: FollowingUserProps) {
  const { style } = props
  if (props.avatarUri) {
    return (
      <View style={{ alignItems: 'center' }}>
        <FastImage
          style={{
            width: props.width,
            height: props.height,
            borderRadius: props.borderRadius,
          }}
          source={{ uri: props.avatarUri, cache: 'web' }}
        />
        <Text style={{ color: color.brandLight, fontSize: 14 }}>
          {props.label}
        </Text>
      </View>
    )
  } else {
    return (
      <View style={{ alignItems: 'center' }}>
        <View
          style={{
            borderRadius: 10,
            borderColor: color.brandPrimary,
            width: props.width,
            height: props.height,
            borderWidth: 1,
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Text style={{ color: props.textColor }}>{props.textThumbnail}</Text>
        </View>
        <Text style={{ color: color.brandLight, fontSize: 14 }}>
          {props.label}
        </Text>
      </View>
    )
  }
}
