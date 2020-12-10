import { Card, CardItem, Icon } from 'native-base'
import * as React from 'react'
import {
  Dimensions,
  StyleSheet,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native'
import FastImage from 'react-native-fast-image'
import { Text } from '../'
import { toString } from '../../helpers/date-helper'
import { toBackendUrl } from '../../helpers/string-helper'
import { JobObject } from '../../repositories/feed-repository'
import { color } from '../../theme'

const screenWidth = Math.round(Dimensions.get('window').width)
const screenHeight = Math.round(Dimensions.get('window').height)

const styles = StyleSheet.create({
  postCompanyAvatar: {
    borderRadius: 15,
    height: 100,
    resizeMode: 'center',
    width: 100,
  },
  postCompanyname: {
    color: color.brandLight,
  },
  postDate: {
    color: color.brandLight,
  },
  postTitle: {
    color: color.brandDark,
    fontSize: 20,
    fontWeight: '700',
    width: screenWidth * 0.9 - 100 - 50,
  },
})

export interface JobPostProps {
  /**
   * An optional style override useful for padding & margin.
   */
  style?: ViewStyle

  job: JobObject
  handleItemPress: (job: JobObject) => void
}

/**
 * Describe your component here
 */
export function JobPost(props: JobPostProps) {
  return (
    <Card transparent>
      <TouchableOpacity
        onPress={() => {
          props.handleItemPress(props.job)
        }}
      >
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
            <FastImage
              style={styles.postCompanyAvatar}
              source={{ uri: toBackendUrl(props.job.companyProfilePicture) }}
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
                  style={styles.postTitle}
                  ellipsizeMode='tail'
                  numberOfLines={2}
                >
                  {props.job.title}
                </Text>
                <Text style={styles.postCompanyname}>
                  {props.job.companyName}
                </Text>
                <Text style={styles.postDate}>
                  {toString(props.job.publishedDate)}
                </Text>
              </View>
              <View
                style={{ flexDirection: 'row', justifyContent: 'space-evenly' }}
              >
                <Text style={{ color: color.brandDark }}>
                  <Icon style={{ fontSize: 16 }} name='location-outline' />{' '}
                  {props.job.cities[0]}
                </Text>
                <Text style={{ color: color.brandDark, marginLeft: 10 }}>
                  <Icon style={{ fontSize: 16 }} name='person-outline' />{' '}
                  {props.job.seniorityLevel}
                </Text>
              </View>
            </View>
          </View>
        </CardItem>
      </TouchableOpacity>
    </Card>
  )
}
