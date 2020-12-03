import { Container, Icon, Left, List, ListItem, Text } from 'native-base'
import * as React from 'react'
import { Image, StyleSheet, View } from 'react-native'
import { screens } from '../../config/screens'
import { accountService } from '../../services/account-service'
import { userProfileService } from '../../services/user-profile-service'
import { color } from '../../theme/color'
import { LogoutButton } from './logout-button/logout-button'

const styles = StyleSheet.create({
  atname: {
    color: color.brandLight,
    fontSize: 20,
  },
  avatar: {
    borderRadius: 100,
    height: 100,
    width: 100,
  },
  basicInfo: {
    marginLeft: 20,
    marginTop: 16,
  },
  container: {
    backgroundColor: color.brandPrimary,
    flex: 1,
    paddingBottom: 5,
    marginTop: 24
  },
  followInfoContainer: {
    alignItems: 'flex-end',
    flexDirection: 'row',
    marginTop: 6,
  },
  follower: {
    color: '#FFFFFF',
  },
  followerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginLeft: 12,
  },
  following: {
    color: '#FFFFFF',
  },
  followingContainter: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  routeIcon: {
    color: '#FFFFFF',
    fontSize: 24,
    width: 26,
  },
  routeList: {
    marginTop: 16,
  },
  routeName: {
    color: '#FFFFFF',
    fontSize: 16,
  },
  userName: {
    color: '#FFFFFF',
    fontSize: 24,
  },
})

export function Sidebar({ state, descriptors, navigation }) {

  const [
    firstName,
    lastName,
    gender,
    profilePicture,
    description,
  ] = userProfileService.useGetUser();

  const mapIcon = {}
  mapIcon[screens.authenticated.user.profile] = 'person'
  mapIcon[screens.authenticated.user.following] = 'heart'
  mapIcon[screens.authenticated.user.settings] = 'settings'

  const mapName = {}
  mapName[screens.authenticated.user.profile] = 'Profile'
  mapName[screens.authenticated.user.following] = 'Following'
  mapName[screens.authenticated.user.settings] = 'Settings'

  // remove the option to go to Home screen
  // const { state, descriptors, navigation, ...rest } = props
  const newState = { ...state }

  newState.routes = newState.routes.filter(
    (item) =>
      item.name !== screens.authenticated.user.home &&
      item.name !== screens.authenticated.company.home,
  )

  // handle logout event
  const [loading, handleLogout] = accountService.useLogout()

  return (
    <Container style={styles.container}>
      <View style={styles.basicInfo}>
        <Image
          source={{uri: "http://10.0.2.2:8000" + profilePicture}}
          style={styles.avatar}
          resizeMode='cover'
        ></Image>
        <Text style={styles.userName}>{firstName + " " + lastName}</Text>
        {/* <View style={styles.followInfoContainer}>
          <View style={styles.followingContainter}>
            <Text style={styles.following}>1 </Text>
            <Text style={{ color: color.brandLight }}>Following</Text>
          </View>
          <View style={styles.followerContainer}>
            <Text style={styles.follower}>215 </Text>
            <Text style={{ color: color.brandLight }}>Followers</Text>
          </View>
        </View> */}
      </View>
      <List
        style={styles.routeList}
        dataArray={newState.routes}
        renderRow={(route, index) => (
          <ListItem
            button
            noBorder
            onPress={() => {
              navigation.navigate(route.name)
            }}
          >
            <Left>
              <Icon style={styles.routeIcon} name={mapIcon[route.name]}></Icon>
              <Text style={styles.routeName}> {mapName[route.name]}</Text>
            </Left>
          </ListItem>
        )}
      ></List>
      <LogoutButton onPress={handleLogout} />
    </Container>
  )
}
