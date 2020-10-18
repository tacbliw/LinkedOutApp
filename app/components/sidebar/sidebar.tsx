import { Container, Icon, Left, List, ListItem, Text } from "native-base"
import * as React from "react"
import { Image, StyleSheet, View } from "react-native"
import { screens } from "../../config/screens"
import { accountService } from "../../services/account-service"
import { color } from "../../theme/color"
import { LogoutButton } from "./logout-button/logout-button"

const styles = StyleSheet.create({
	container: {
		flex: 1,
		paddingBottom: 5,
		backgroundColor: color.brandPrimary,
	},

	avatar: {
		borderRadius: 100,
		width: 100,
		height: 100,
	},

	userName: {
		fontSize: 24,
		color: "#FFFFFF"
	},

	atname: {
		fontSize: 20,
		color: color.brandLight
	},

	followInfoContainer: {
		marginTop: 6,
		flexDirection: 'row',
		alignItems: "flex-end",
	},

	followingContainter: {
		flexDirection: 'row',
		justifyContent: "space-around",
	},

	following: {
		color: "#FFFFFF",
	},

	followerContainer: {
		flexDirection: 'row',
		justifyContent: "space-between",
		marginLeft: 12
	},

	follower: {
		color: "#FFFFFF",
	},

	basicInfo: {
		marginLeft: 20,
		marginTop: 16,
	},

	routeName: {
		fontSize: 16,
		color: "#FFFFFF"
	},

	routeIcon: {
		color: "#FFFFFF",
		fontSize: 24,
		width: 26
	},

	routeList: {
		marginTop: 16
	}


})

export function Sidebar({ state, descriptors, navigation }) {

	var map_icon = {}
	map_icon[screens.authenticated.user.profile] = "person"
	map_icon[screens.authenticated.user.following] = "heart"
	map_icon[screens.authenticated.user.settings] = "settings"

	var map_name = {}
	map_name[screens.authenticated.user.profile] = "Profile"
	map_name[screens.authenticated.user.following] = "Following"
	map_name[screens.authenticated.user.settings] = "Settings"

	// remove the option to go to Home screen
	// const { state, descriptors, navigation, ...rest } = props
	const newState = { ...state }

	newState.routes = newState.routes.filter(item =>
		item.name !== screens.authenticated.user.home &&
		item.name !== screens.authenticated.company.home
	)

	// handle logout event
	const [loading, handleLogout] = accountService.useLogout()

	return (
		<Container style={styles.container}>

			<View style={styles.basicInfo}>
				<Image source={require("./avatar.jpg")} style={styles.avatar} resizeMode="cover"></Image>
				<Text style={styles.userName}>Siraj</Text>
				<Text style={styles.atname}>@thesiraj</Text>
				<View style={styles.followInfoContainer}>
					<View style={styles.followingContainter}>
						<Text style={styles.following}>1 </Text>
						<Text style={{ color: color.brandLight }}>Following</Text>
					</View>
					<View style={styles.followerContainer}>
						<Text style={styles.follower}>215 </Text>
						<Text style={{ color: color.brandLight }}>Followers</Text>
					</View>
				</View>
			</View>
			<List style={styles.routeList} dataArray={newState.routes}
				renderRow={(route, index) =>
					<ListItem button noBorder onPress={() => { navigation.navigate(route.name) }}>
						<Left>
							<Icon style={styles.routeIcon} name={map_icon[route.name]}></Icon>
							<Text style={styles.routeName}> {map_name[route.name]}</Text>
						</Left>
					</ListItem>
				}
			>
			</List>
			<LogoutButton onPress={handleLogout} />
		</Container>
	)
}
