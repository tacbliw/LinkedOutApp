import { Card, CardItem, Text, View } from 'native-base'
import * as React from 'react'
import { FlatList, TouchableOpacity, ViewStyle } from 'react-native'
import FastImage from 'react-native-fast-image'
import { toBackendUrl } from '../../helpers/string-helper'
import { color } from '../../theme'

export interface SearchItemUserProps {
  /**
   * An optional style override useful for padding & margin.
   */
  style?: ViewStyle
  onPress
  profilePicture
  firstname: string
  lastname: string
  gender
  description
  skills
}

/**
 * Describe your component here
 */
export function SearchItemUser(props: SearchItemUserProps) {
  return (
    <TouchableOpacity onPress={props.onPress} style={props.style}>
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
              // square
              style={{ borderRadius: 15, width: 55, height: 55 }}
              source={{ uri: toBackendUrl(props.profilePicture), cache: 'web' }}
            />
            <View style={{ marginLeft: 16, justifyContent: 'space-between' }}>
              <Text style={{ fontSize: 20, fontWeight: 'bold' }}>
                {props.firstname + ' ' + props.lastname}
              </Text>
              <Text style={{ color: color.brandLight }}>{props.gender}</Text>
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
              data={props.skills}
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
