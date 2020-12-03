import { Card, CardItem, Icon, Thumbnail } from 'native-base'
import * as React from "react"
import { TextStyle, TouchableOpacity, View, ViewStyle } from "react-native"
// import { TouchableOpacity } from 'react-native-gesture-handler'
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
  children?,
  deleteAble?:boolean,
  id: number,
  onDelete?,
}

/**
 * Describe your component here
 */
export function CardJob(props: CardJobProps) {
  const { style } = props


   const trash = props.deleteAble ?
    <TouchableOpacity onPress={() => {console.log("+"); props.onDelete(props.id)}} style={{position: 'relative', left: 20, bottom: 10}}><Icon style={{color: color['brandDanger']}} name='remove-circle'></Icon></TouchableOpacity>
        : <></>

  return (
    <Card noShadow={true} transparent >
      <CardItem style={{ flexDirection: 'row', alignItems: 'center', backgroundColor: "#f6f5fb", minWidth: props.minWidth, borderRadius: 10}}>
        <Thumbnail style={{ borderRadius: 10 }} square source={props.thumnailSource}></Thumbnail>
        <View style={{ marginLeft: 16, flex: 1 }}>
          <View>
            <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
              <Text style={{ fontWeight: "700", color: '#091162'}}>{props.companyName}</Text>
              {trash}
            </View>
            <Text style={{ color: '#8d91ae' }}>{props.position}</Text>
          </View>
          <View>
            <Text style={{ color: '#8d91ae' }}>{props.describe}</Text>
          </View>
        </View>
      </CardItem>
      
    </Card>
  )
}