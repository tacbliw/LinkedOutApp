import { Body, Button, Card, CardItem, Col, Grid, Header, Icon, Text, Thumbnail } from "native-base"
import React from "react"
import { StyleSheet, View, ViewStyle } from "react-native"
import { ScrollView } from "react-native-gesture-handler"
import Timeline from 'react-native-timeline-flatlist'
import { CardJob, Container, FollowingUser, Screen, Tag } from "../../components"
import { screens } from "../../config/screens"
// import { useStores } from "../../models"
import { color } from "../../theme"

const ROOT: ViewStyle = {
	backgroundColor: color.palette.black,
	flex: 1,
}

const data = [
	{ time: '2006', title: 'Asociación Escuelas Lincoln', description: 'Student' },
	{ time: '2011', title: 'Banksia Park International High School', description: 'Assoc professor' },
	{ time: '2016', title: 'American Cooperative School La Paz', description: 'Trash' },
	{ time: '2020', title: 'University of Engineering and Technology', description: 'Trash (1)' }
]
const skillData = [
]
const experienceData = [
	
]

const styles = StyleSheet.create({

	container: {
		backgroundColor: "#f6f5fb",
	},


	topBarIcon: {
		justifyContent: "space-between",
		flexDirection: 'row',
		flex: 1,
		marginTop: 24,
	},

	backIcon: {
		color: color.brandDark,
		fontSize: 24,
	},

	menuIcon: {
		color: color.brandDark,
		fontSize: 24,
	},

	profileHeader: {
		// height: 250,
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		backgroundColor: "#f6f5fb",
		// backgroundColor: color.backgroundColor, 
	},

	avatarUser: {
		// width: 90, 
		// height: 90, 
		borderRadius: 10
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
		left: 5,
		color: color.brandLight
	},

	about: {
		fontSize: 15,
		left: 5,
	},

	socialStatisticContainter: {
		alignItems: "center",
		justifyContent: 'center',
		height: 70,
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

	link: {
		flexDirection: 'row',
		marginLeft: 16,
		alignItems: 'center',
	},

	blockInfo: {
		fontSize: 20,
		left: 5,
		flexDirection: 'row',
		alignItems: 'center',
		marginTop: 5
	},

	infoIcon: {
		fontSize: 24,
		color: color.brandLight,
	},

	infoText: {
		color: color.brandLight,
		marginLeft: 10
	},

	socialStatistic: {
		marginTop: 0,
		flexDirection: 'row',
		// justifyContent: "space-evenly",
	},

	topInfo: {
		// marginLeft: 16
		padding: 16,
		marginLeft: 16
	},

	followingContainer: {
		flexDirection: 'row',
		justifyContent: "space-around"
	},

	cardSection: {
		marginLeft: 16,
		marginRight: 16,
	}


})

export function ProfileUserScreen({ navigation }) {
	// Pull in one of our MST stores
	// const { someStore, anotherStore } = useStores()
	// OR
	// const rootStore = useStores()

	// Pull in navigation via hook
	//   const navigation = useNavigation()
	return (
		<Screen style={ROOT} preset="scroll">
			<ScrollView >
				<Header noShadow transparent={true} style={styles.profileHeader}>
					<Button transparent onPress={() => navigation.navigate(screens.authenticated.user.newsfeed)}>
						<Icon style={styles.backIcon} name="arrow-back-outline" />
					</Button>
					<Button transparent onPress={() => navigation.navigate(screens.authenticated.user.editprofile, {
						skillData: skillData,
						educationData: data,
						experienceData: experienceData
					})}>
						<Icon style={styles.menuIcon} name="create-outline" />
					</Button>
				</Header>
				<Container>
					<View style={styles.topInfo}>

						<View style={{ flexDirection: 'row' }}>
							<Thumbnail square={true} large style={styles.avatarUser} source={require("./avatar.jpg")}></Thumbnail>
							<View style={{ marginLeft: 25, justifyContent: 'center' }}>
								<Text style={styles.userName}>Siraj</Text>
								<Text style={styles.about}><Icon name="location-outline" style={{ fontSize: 16 }}></Icon>Student at UET</Text>
							</View>
						</View>

					</View>

					<Grid>
						<Col style={styles.socialStatisticContainter}>
							<Text style={styles.following}>1 </Text>
							<Text style={{ color: color.brandLight }}>Following</Text>
						</Col>
						<Col style={styles.socialStatisticContainter}>
							<Text style={styles.follower}>215 </Text>
							<Text style={{ color: color.brandLight }}>Followers</Text>
						</Col>
						<Col style={styles.socialStatisticContainter}>
							<Text style={styles.follower}>15 </Text>
							<Text style={{ color: color.brandLight }}>Posts</Text>
						</Col>
					</Grid>


					<Card transparent style={styles.cardSection}>
						<CardItem header>
							<Text style={{ fontWeight: "700", fontSize: 20 }}>About me</Text>
						</CardItem>
						<CardItem>
							<Body>
								<Text>about.me is a personal web hosting service co-founded by Ryan Freitas, Tony Conrad and Tim Young in October 2009. Wikipedia</Text>
								<View style={{ flexDirection: 'row', marginTop: 16 }}>
									<Tag tagText="C++"></Tag>
									<Tag tagText="C++"></Tag>
									<Tag tagText="C++"></Tag>
								</View>
							</Body>
						</CardItem>
					</Card>

					<Card transparent style={styles.cardSection}>
						<CardItem header>
							<Text style={{ fontWeight: "700", fontSize: 20 }}>Education</Text>
						</CardItem>
						<CardItem>
							<Timeline
								data={data}
								timeStyle={{ textAlign: 'center', backgroundColor: color.brandInfo, color: 'white', padding: 5, borderRadius: 13 }}
							></Timeline>
						</CardItem>
					</Card>

					<Card transparent style={styles.cardSection}>
						<CardItem header>
							<Text style={{ fontWeight: '700', fontSize: 20 }}>Experience</Text>
						</CardItem>
						<CardItem style={{ flexDirection: 'column' }}>
							<CardJob
								minWidth={350}
								companyName="Fpt"
								position="Software Engineering"
								thumnailSource={require('./company.jpg')}
								describe="I'm CEO"
								deleteAble={false}
							>
							</CardJob>

						</CardItem>
					</Card>

					<Card transparent style={styles.cardSection}>
						<CardItem header>
							<Text style={{ fontWeight: '700', fontSize: 20 }}>Following</Text>
						</CardItem>
						<CardItem style={styles.followingContainer}>
							<FollowingUser
								width={40}
								height={40}
								borderRadius={100}
								label={"Facebook"}
								thumbnailSource={require('./company.jpg')}></FollowingUser>
							<FollowingUser
								width={40}
								height={40}
								borderRadius={100}
								label={"More"}
								textThumbnail="+5"
								textColor={color.brandPrimary}></FollowingUser>
						</CardItem>
					</Card>
				</Container>
			</ScrollView>
		</Screen>
	)
}
