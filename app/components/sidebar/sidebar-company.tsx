import { Container, Icon, Left, List, ListItem, Text } from 'native-base'
import { StyleSheet, View } from 'react-native'
import FastImage from 'react-native-fast-image'
import React from 'reactn'
import { GlobalState } from '../../config/global'
import { screens } from '../../config/screens'
import { toBackendUrl } from '../../helpers/string-helper'
import { accountService } from '../../services/account-service'
import { companyProfileService } from '../../services/company-profile-service'
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
    // marginLeft: 20,
    marginTop: 16,
    alignItems: 'center',
  },
  container: {
    backgroundColor: color.brandPrimary,
    flex: 1,
    paddingBottom: 5,
    marginTop: 24,
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
    marginTop: 20,
    color: '#FFFFFF',
    fontSize: 24,
  },
})

export function SidebarCompany({ state, descriptors, navigation }) {
  const accountId = parseInt(React.getGlobal<GlobalState>().accountId)
  const [
    name,
    website,
    profilePicture,
    specialties,
    description,
    getInfo,
  ] = companyProfileService.useGetCompany(accountId)

  const mapIcon = {}
  mapIcon[screens.authenticated.company.profile] = 'person'
  mapIcon[screens.authenticated.company.settings] = 'settings'

  const mapName = {}
  mapName[screens.authenticated.company.profile] = 'Profile'
  mapName[screens.authenticated.company.settings] = 'Settings'

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
        <FastImage
          style={styles.avatar}
          resizeMode='cover'
          source={{
            uri: toBackendUrl(profilePicture) + '?' + new Date(),
            cache: 'web',
          }}
        />
        <Text style={styles.userName}>{name}</Text>
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
