import { Button, Icon, Tab, Tabs, Text } from "native-base"
import React from "react"
import { Image, ImageBackground, StyleSheet, View, ViewStyle } from "react-native"
import { Screen } from "../../components"
import { screens } from "../../config/screens"
// import { useStores } from "../../models"
import { color } from "../../theme"

const ROOT: ViewStyle = {
  backgroundColor: color.palette.black,
  flex: 1,
}

const styles = StyleSheet.create({

	container: {
		backgroundColor: "#FFFFFF",
	},


	topBarIcon: {
		justifyContent: "space-between",
		flexDirection: 'row',
		flex: 1,
		marginTop: 24,
	},
	
	backIcon: {
		color: color.brandInfo,
		fontSize: 30,
	},

	menuIcon: {
		color: color.brandInfo,
		fontSize: 30,
	},

	imageBackground: {
		width: 'auto',
		height: 200,
		position: 'absolute',
		top: 0,
		left: 0,
		right: 0,
		flexDirection: 'row'
	},

	profileHeader: {
		height: 250,
	},

	avatarCompany: {
		borderRadius: 100,
		width: 100,
		height: 100,
		top: 150,
		left: 16
	},

	editButton: {
		top: 205,
		right: 10,
        height: 40,
	},

	messageButton: {
		top: 205,
		right: 20,
		height: 40
	},

	userName: {
		fontSize: 30,
        fontWeight: "700",
        left: 5,
        
		// color: "#FFFFFF"
	  },
	
	atname: {
        fontSize: 20,
        left:5,
		color: color.brandLight
	},

	about: {
        fontSize: 20,
        left: 5,
	},

	followingContainter: {
        flexDirection: 'row', 
        left: 5
	  },
	
	  following: {
		fontWeight: "700",
	  },
	
	  followerContainer: {
		flexDirection: 'row', 
		marginLeft: 16
	  },
	
	  follower: {
		fontWeight: "700",
	  },

	  basicInfo: {
		marginTop: 16,
	  },

	  locationAndLink: {
		  flexDirection: 'row',
		  justifyContent: 'flex-start'
	  },

	  location: {
		flexDirection: 'row',
		alignItems: 'center'
	  },

	  link: {
		flexDirection: 'row',
		marginLeft: 16,
		alignItems: 'center',
	  },

	  joinTime: {
        fontSize:20,
        left: 5,
		flexDirection: 'row',
		alignItems: 'center',
	  },

	  infoIcon: {
		  fontSize: 24,
	  },

	  socialStatistic: {
		marginTop: 16,
		flexDirection: 'row',
	  },
	
	  topInfo: {
		marginLeft: 16
	  },

	  checkmark: {
		  color: color.brandPrimary,
		  fontSize: 24,
	  }


})

export function ProfileUserScreen({navigation}) {
  // Pull in one of our MST stores
  // const { someStore, anotherStore } = useStores()
  // OR
  // const rootStore = useStores()

  // Pull in navigation via hook
//   const navigation = useNavigation()
  return (
    <Screen style={ROOT} preset="scroll">
      <View style={styles.container}>
			<View style={styles.profileHeader}>
				<ImageBackground source={require("./cover.jpg")} resizeMode="cover" style={styles.imageBackground}>
					<View style={styles.topBarIcon}>
						<Button transparent onPress={() => navigation.navigate(screens.authenticated.user.newsfeed)}>
							<Icon style={styles.backIcon} name="arrow-back-circle" />
						</Button>
						<Button transparent>
							<Icon style={styles.menuIcon} name="ellipsis-vertical-outline" />
						</Button>
					</View>
				</ImageBackground>
			
				<View style={{justifyContent: 'space-between', flexDirection: 'row', flex: 1}}>
					<Image source={require('./avatar.jpg')} style={styles.avatarCompany}></Image>
					<View style={{ flexDirection: 'row'}}>
						<Button bordered rounded style={styles.editButton}><Text>Edit</Text></Button>
					</View>
				</View>
			</View>
			<View style={styles.topInfo}>
				<Text style={styles.userName}>Siraj</Text>
				<Text style={styles.atname}>@thesiraj</Text>
				<Text style={styles.about}>Love sightseeing</Text>
				<View style={styles.basicInfo}>
					<View style={styles.joinTime}>
						<Icon name="calendar-outline" style={styles.infoIcon}></Icon>
						<Text> Join in February 2005</Text>
					</View>

					<View style={styles.socialStatistic}>
						<View style={styles.followingContainter}>
							<Text style={styles.following}>1 </Text>
							<Text style={{color: color.brandLight}}>Following</Text>
						</View>
						<View style={styles.followerContainer}>
							<Text style={styles.follower}>215 </Text>
							<Text style={{color: color.brandLight}}>Followers</Text>
						</View>
					</View>
				</View>
			</View>

			<View>
				<Tabs page={0} tabBarUnderlineStyle={{borderBottomWidth: 4, borderColor: color.brandPrimary}}>
					<Tab heading="Status" activeTabStyle={{backgroundColor: "#FFFFFF"}} activeTextStyle={{color: color.brandPrimary, fontWeight: "700"}} tabStyle={{backgroundColor: "#FFFFFF"}} textStyle={{color: color.brandLight, fontWeight: "700"}}></Tab>
					<Tab heading="Education" activeTabStyle={{backgroundColor: "#FFFFFF"}} activeTextStyle={{color: color.brandPrimary, fontWeight: "700"}} tabStyle={{backgroundColor: "#FFFFFF"}} textStyle={{color: color.brandLight, fontWeight: "700"}}></Tab>
					<Tab heading="Experience" activeTabStyle={{backgroundColor: "#FFFFFF"}} activeTextStyle={{color: color.brandPrimary, fontWeight: "700"}} tabStyle={{backgroundColor: "#FFFFFF"}} textStyle={{color: color.brandLight, fontWeight: "700"}}></Tab>
                    <Tab heading="Follow" activeTabStyle={{backgroundColor: "#FFFFFF"}} activeTextStyle={{color: color.brandPrimary, fontWeight: "700"}} tabStyle={{backgroundColor: "#FFFFFF"}} textStyle={{color: color.brandLight, fontWeight: "700"}}></Tab>
				</Tabs>
			</View>
      </View>
    </Screen>
  )
}
