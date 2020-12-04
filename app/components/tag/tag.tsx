
import { Item } from "native-base"
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
    <View style={{ flexWrap: 'wrap', alignItems: 'center', flexDirection: 'row' }}>
    <View
      style={{
        // overflow: 'hidden',
        justifyContent: 'center',
        // height: 34,
        flexDirection: 'row',
        alignItems: 'center',
        padding: 5,
        margin: 3,
        // paddingTop: 0,
        // paddingRight: 5,
        // paddingBottom: 0,
        borderRadius: 20,
        backgroundColor: color['color-primary-500'],
      }}>

      <View style={{
        // marginRight: 5,
        flexDirection:'row',
      }}>
        <Item style={{borderBottomWidth: 0}}><Text style={{color: "white"}}>{props.tagText}</Text></Item>
      </View>
    </View>
  </View>
  )
}
