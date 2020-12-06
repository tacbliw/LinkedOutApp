import { Card, CardItem } from "native-base"
import * as React from "react"
import { ImageBackground, TextStyle, View, ViewStyle } from "react-native"
import LinearGradient from "react-native-linear-gradient"
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

export interface CardTopJobProps {
  /**
   * An optional style override useful for padding & margin.
   */
  style?: ViewStyle,
  width,
  height,
  backgroundImage: string,
  label,
  description,
  maxTitleLength: number,
  maxDescriptionLength: number
}

/**
 * Describe your component here
 */
export function CardTopJob(props: CardTopJobProps) {
  const { style } = props
  
  var label_reduce = props.label.length > props.maxTitleLength?props.label.slice(0, props.maxTitleLength) + '..':props.label;
  var description_reduce = props.description.length > props.maxDescriptionLength?props.description.slice(0, props.maxDescriptionLength) + '..':props.description;

  return (
    <Card transparent>
    <CardItem>									
      <ImageBackground style={{width: props.width, height: props.height}} imageStyle={{borderRadius: 10}} source={{uri: props.backgroundImage}}>
      <LinearGradient colors={["transparent", "black"]} style={{position: 'absolute', borderRadius: 10}}>
          <View style={{width: props.width, height: 20, marginTop: (props.height - 20)}}>
            <Text style={{position: 'relative', top: -50, left: 10, fontSize: 30, fontWeight: '700', color: 'white'}}>{label_reduce}</Text>
            <Text style={{position: 'relative', top: -50, left: 10, fontSize: 15, color: color.brandLight}}>{description_reduce}</Text>
          </View>
      </LinearGradient>
      </ImageBackground>
    </CardItem>
  </Card>
  )
}
