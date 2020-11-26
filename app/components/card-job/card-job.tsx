import { Card, CardItem, Icon, Right, Thumbnail } from 'native-base'
import * as React from "react"
import { TextStyle, View, ViewStyle } from "react-native"
import { TouchableOpacity } from 'react-native-gesture-handler'
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

export interface CardJobProps {
  /**
   * An optional style override useful for padding & margin.
   */
  style?: ViewStyle,
  minWidth: number,
  companyName: string,
  position: string,
  describe: string,
  thumnailSource,
  children,
  deleteAble?:boolean,
  id: number,
  onChangeId,
  onDelete
}

/**
 * Describe your component here
 */
export function CardJob(props: CardJobProps) {
  const { style } = props


   const trash = props.deleteAble ?
        <TouchableOpacity style = {{marginLeft:16}} >
          <Icon name="trash-outline" style={{color: 'red'}} onPress={()=>{
            props.onChangeId(props.id);
            props.onDelete();
          }}></Icon>
        </TouchableOpacity>
        : <></>

  return (
    <Card noShadow={true} transparent style={{ minWidth: props.minWidth }}>
      <CardItem style={{ flexDirection: 'row', alignItems: 'center', backgroundColor: "#f6f5fb", borderRadius: 10 }}>
        <Thumbnail style={{ borderRadius: 10 }} square source={props.thumnailSource}></Thumbnail>
        <View style={{ marginLeft: 16 }}>
          <View style={{ flexDirection: 'row' }}>
            <Text style={{ fontWeight: "700", color: '#091162' }}>{props.companyName}</Text>
            <Text style={{ color: '#8d91ae' }}> as {props.position}</Text>
          </View>
          <Text style={{ color: '#8d91ae' }}>{props.describe}</Text>
        </View>
        <Right>{trash}</Right>
      </CardItem>
    </Card>
  )
}