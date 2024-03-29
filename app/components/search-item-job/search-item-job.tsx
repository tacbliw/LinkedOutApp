import { Card, CardItem, Icon } from 'native-base'
import * as React from 'react'
import { TextStyle, TouchableOpacity, View, ViewStyle } from 'react-native'
import FastImage from 'react-native-fast-image'
import { Text } from '../'
import { toString } from '../../helpers/date-helper'
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

export interface SearchItemJobProps {
  /**
   * An optional style override useful for padding & margin.
   */
  style?: ViewStyle
  onPress
  title
  jobPicture
  city
  publishedDate
  employmentType
}

/**
 * Describe your component here
 */
export function SearchItemJob(props: SearchItemJobProps) {
  const { style } = props

  return (
    <TouchableOpacity onPress={props.onPress} style={style}>
      <Card transparent>
        <CardItem style={{ backgroundColor: '#f6f5fb', borderRadius: 15 }}>
          <View style={{ flexDirection: 'row' }}>
            <FastImage
              style={{ width: 100, height: 100, borderRadius: 15 }}
              source={{ uri: toBackendUrl(props.jobPicture) }}
            />
            <View
              style={{
                marginLeft: 16,
                flexDirection: 'column',
                justifyContent: 'space-between',
              }}
            >
              <View>
                <Text
                  style={{
                    color: color.brandDark,
                    fontWeight: '700',
                    fontSize: 20,
                    width: 250,
                  }}
                >
                  {props.title}
                </Text>
                <Text style={{ color: color.brandLight }}>
                  {toString(props.publishedDate)}
                </Text>
              </View>
              <View
                style={{ flexDirection: 'row', justifyContent: 'space-around' }}
              >
                <Text style={{ color: color.brandDark }}>
                  <Icon style={{ fontSize: 16 }} name='location-outline' />{' '}
                  {props.city}
                </Text>
                <Text style={{ color: color.brandDark }}>
                  <Icon style={{ fontSize: 16 }} name='person-outline' />{' '}
                  {props.employmentType}
                </Text>
              </View>
            </View>
          </View>
        </CardItem>
      </Card>
    </TouchableOpacity>
  )
}
