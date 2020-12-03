import { Badge, Icon } from 'native-base'
import React from 'react'
import { StyleSheet, TouchableOpacity, View } from 'react-native'
import FastImage from 'react-native-fast-image'
import { Text } from '../'
import { toTimeSince } from '../../helpers/date-helper'
import { toBackendUrl } from '../../helpers/string-helper'
import { NotificationListResponse } from '../../repositories/notification-repository'
import { color } from '../../theme'

const styles = StyleSheet.create({
  avatar: {
    aspectRatio: 1,
    borderRadius: 60,
    resizeMode: 'contain',
    width: 50,
  },
  avatarView: {
    position: 'relative',
  },
  container: {
    margin: 16,
  },
  containerView: {
    alignItems: 'center',
    flexDirection: 'row',
  },
})

const mapIconNotification = {
  interest: {
    name: 'heart',
    backgroundColor: color.brandPrimary,
  },
  post: {
    name: 'notifications',
    backgroundColor: color.brandSuccess,
  },
  job: {
    name: 'briefcase',
    backgroundColor: color.brandInfo,
  },
  comment: {
    name: 'chatbubbles',
    backgroundColor: color.brandInfo,
  },
  follow: {
    name: 'notifications',
    backgroundColor: color.brandSuccess,
  },
}

export interface NotificationItemProps {
  onPress: () => void
  item: NotificationListResponse
}

export function NotificationItem(props: NotificationItemProps) {
  React.useEffect(() => {
    console.log(props.item.authorName)
  }, [])
  return (
    <TouchableOpacity onPress={props.onPress} style={styles.container}>
      <View style={styles.containerView}>
        <View style={styles.avatarView}>
          <FastImage
            source={{ uri: toBackendUrl(props.item.profilePicture) }}
            style={styles.avatar}
          />
          <Badge
            style={{
              position: 'absolute',
              bottom: 0,
              right: 0,
              borderWidth: 2,
              borderColor: '#ffffff',
              backgroundColor:
                mapIconNotification[props.item.type].backgroundColor,
            }}
          >
            <Icon
              name={mapIconNotification[props.item.type].name}
              style={{ fontSize: 16, color: '#ffffff' }}
            ></Icon>
          </Badge>
        </View>
        <View style={{ flex: 1, justifyContent: 'space-around' }}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginLeft: 10,
            }}
          >
            <Text
              style={{
                fontWeight: '700',
                fontSize: 20,
                color: 'black',
              }}
            >
              {props.item.authorName}
            </Text>
            <Text style={{ color: color.brandLight }}>
              {toTimeSince(props.item.publishedDate)}
            </Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginLeft: 10,
            }}
          >
            <Text
              style={{ color: color.brandLight }}
              ellipsizeMode='tail'
              numberOfLines={2}
            >
              <Text
                style={{ color: color.brandPrimary }}
                ellipsizeMode='tail'
                numberOfLines={1}
              >
                {props.item.action}
              </Text>
              {props.item.content ? ': "' + props.item.content + '"' : ''}
            </Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  )
}
