import { Card, CardItem, Icon, Thumbnail } from 'native-base'
import * as React from 'react'
import { Dimensions, StyleSheet, View, ViewStyle } from 'react-native'
import { Text } from '../'
import { toString } from '../../helpers/date-helper'
import { JobObject } from '../../repositories/feed-repository'
import { color } from '../../theme'

const screenWidth = Math.round(Dimensions.get('window').width)
const screenHeight = Math.round(Dimensions.get('window').height)

const styles = StyleSheet.create({
  postCompanyAvatar: {
    // marginLeft: 10,
    // marginTop: 10,
    borderRadius: 15,
    height: 100,
    width: 100,
  },
  postCompanyName: {
    color: color.brandDark,
    fontSize: 20,
    fontWeight: '700',
  },
  postDate: {
    color: color.brandLight,
  },
})

export interface JobPostProps {
  /**
   * An optional style override useful for padding & margin.
   */
  style?: ViewStyle

  job: JobObject
}

/**
 * Describe your component here
 */
export function JobPost(props: JobPostProps) {
  const { style } = props

  return (
    <Card transparent style={{ borderWidth: 10 }}>
      <CardItem
        header
        style={{
          width: screenWidth * 0.9,
          justifyContent: 'space-between',
          alignItems: 'flex-start',
          borderRadius: 15,
        }}
      >
        <View style={{ flexDirection: 'row' }}>
          <Thumbnail
            style={styles.postCompanyAvatar}
            source={{ uri: props.job.companyProfilePicture }}
          />
          <View
            style={{
              marginLeft: 16,
              flexDirection: 'column',
              justifyContent: 'space-between',
            }}
          >
            <View>
              <Text style={styles.postCompanyName}>
                {props.job.companyName}
              </Text>
              <Text style={styles.postDate}>
                {toString(props.job.publishedDate)}
              </Text>
            </View>
            <View
              style={{ flexDirection: 'row', justifyContent: 'space-between' }}
            >
              <Text style={{ color: color.brandDark }}>
                <Icon style={{ fontSize: 16 }} name='location-outline' />{' '}
                {props.job.cities[0]}
              </Text>
              <Text style={{ color: color.brandDark }}>
                <Icon style={{ fontSize: 16 }} name='person-outline' />{' '}
                {props.job.seniorityLevel}
              </Text>
              {/* <Text style={styles.postDate}>{toString(props.job.publishedDate)}</Text> */}
            </View>
          </View>
        </View>
      </CardItem>
    </Card>
  )
}
