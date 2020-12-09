import { Header, Icon, Left, ListItem, Right, Text } from 'native-base'
import React from 'react'
import { FlatList, StyleSheet } from 'react-native'
import { NotificationItem, Screen } from '../../components'
import { NotificationListResponse } from '../../repositories/notification-repository'
import { notificationService } from '../../services/notification-service'
import { color } from '../../theme'

const styles = StyleSheet.create({
  noData: {
    color: color.brandLight,
    flexDirection: 'column',
    justifyContent: 'center',
  },
})

export const NotificationsScreen = function NotificationsScreen({
  navigation,
}) {
  const [
    onEndReachedCalledDuringMomentum,
    setOnEndReachedCalledDuringMomentum,
  ] = React.useState<boolean>(true)

  const [
    notificationList,
    refreshing,
    handleLoadNew,
    handleLoadOld,
    handleLoadNewWithoutEffect,
    handleFeedOpen,
  ] = notificationService.useNotification()

  React.useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      handleLoadNewWithoutEffect()
    })
    return unsubscribe
  }, [handleLoadNewWithoutEffect, navigation])

  const renderNotifItem = ({ item }: { item: NotificationListResponse }) => {
    return <NotificationItem item={item} onPress={handleFeedOpen} />
  }

  return (
    <Screen>
      <Header transparent androidStatusBarColor={color.brandPrimary}>
        <Left style={{ flexGrow: 1 }}>
          <Text style={{ fontSize: 32, fontWeight: '700' }}>Notifications</Text>
        </Left>
        <Right></Right>
      </Header>
      <FlatList
        data={notificationList}
        renderItem={renderNotifItem}
        refreshing={refreshing}
        onRefresh={handleLoadNew}
        onEndReached={handleLoadOld}
        onEndReachedThreshold={0.01}
        keyExtractor={(item, index) => String(index)}
        ListEmptyComponent={
          <ListItem style={styles.noData}>
            <Icon name='file-tray-outline'></Icon>
            <Text>No notification</Text>
          </ListItem>
        }
        onMomentumScrollBegin={() => {
          setOnEndReachedCalledDuringMomentum(false)
        }}
      ></FlatList>
    </Screen>
  )
}
