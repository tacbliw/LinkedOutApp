import { Card, CardItem } from 'native-base'
import * as React from 'react'
import {
  FlatList,
  TextStyle,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native'
import FastImage from 'react-native-fast-image'
import { Text } from '../'
import { toBackendUrl } from '../../helpers/string-helper'
import { color, typography } from '../../theme'

const CONTAINER: ViewStyle = {
  justifyContent: 'center',
}

const TEXT: TextStyle = {
  fontFamily: typography.primary,
  fontSize: 14,
  color: color.primary,
}

export interface SearchItemCompanyProps {
  /**
   * An optional style override useful for padding & margin.
   */
  style?: ViewStyle
  onPress
  profilePicture
  name
  website
  description
  specialties
}

/**
 * Describe your component here
 */
export function SearchItemCompany(props: SearchItemCompanyProps) {
  const { style } = props

  return (
    <TouchableOpacity onPress={props.onPress} style={style}>
      <Card transparent>
        <CardItem
          style={{
            backgroundColor: '#f6f5fb',
            borderTopLeftRadius: 15,
            borderTopRightRadius: 15,
          }}
        >
          <View style={{ flexDirection: 'row' }}>
            <FastImage
              style={{ borderRadius: 15, width: 55, height: 55 }}
              source={{ uri: toBackendUrl(props.profilePicture), cache: 'web' }}
            />
            <View style={{ marginLeft: 16, justifyContent: 'space-between' }}>
              <Text style={{ fontSize: 20, fontWeight: 'bold', color: '#000' }}>
                {props.name}
              </Text>
              <Text style={{ color: color.brandLight }}>
                Website: {props.website}
              </Text>
            </View>
          </View>
        </CardItem>
        <CardItem
          style={{
            backgroundColor: '#f6f5fb',
            marginBottom: -20,
            borderBottomLeftRadius: 15,
            borderBottomRightRadius: 15,
          }}
        >
          <View style={{ flexDirection: 'column' }}>
            <Text style={{ color: color.brandLight }}>{props.description}</Text>
            <FlatList
              style={{ marginTop: 16 }}
              horizontal={true}
              data={props.specialties}
              renderItem={({ item }) => {
                return (
                  <Text
                    style={{
                      backgroundColor: '#ffffff',
                      marginRight: 10,
                      color: color.brandLight,
                      borderRadius: 10,
                      paddingTop: 3,
                      paddingBottom: 3,
                      paddingLeft: 10,
                      paddingRight: 10,
                    }}
                  >
                    {item}
                  </Text>
                )
              }}
              keyExtractor={(item) => item}
            ></FlatList>
          </View>
        </CardItem>
      </Card>
    </TouchableOpacity>
  )
}
