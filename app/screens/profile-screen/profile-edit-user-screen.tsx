import { Button, Card, CardItem, Form, Header, Icon, Input, Item, Label, Text, Textarea, Thumbnail } from "native-base"
import React from "react"
import { Dimensions, Modal, StyleSheet, View, ViewStyle } from "react-native"
import DocumentPicker from 'react-native-document-picker'
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler"
import SectionedMultiSelect from 'react-native-sectioned-multi-select'
import Timeline from "react-native-timeline-flatlist"
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import { useState } from "reactn"
import { CardJob, Container, Screen } from "../../components"
// import { useStores } from "../../models"
import { color } from "../../theme"
const screenHeight = Dimensions.get('window').height
const items = [
	// this is the parent or 'item'
	{
		name: 'Programming Language',
		id: 0,
		// these are the children or 'sub items'
		children: [
			{
				name: 'C++',
				id: 10,
			},
			{
				name: 'C#',
				id: 11,
			},
			{
				name: 'Python',
				id: 12,
			},
			{
				name: 'Yasuo',
				id: 13,
			},
			{
				name: 'Sofm',
				id: 14,
			},
			{
				name: 'NXT',
				id: 15,
			},
		],
	},
	{
		name: 'Framework',
		id: 1,
		// these are the children or 'sub items'
		children: [
			{
				name: 'Django',
				id: 16,
			},
			{
				name: 'React',
				id: 17,
			},
			{
				name: 'Pikachu',
				id: 18,
			},
		],
	},
];

const ROOT: ViewStyle = {
	backgroundColor: color.palette.black,
	flex: 1,
}

const styles = StyleSheet.create({
	topInfo: {
		padding: 16,
	},

	avatarUser: {
		width: 120,
		height: 120,
		borderRadius: 100
	},
	userName: {
		fontSize: 30,
		fontWeight: "700",
		left: 5,

		// color: "#FFFFFF"
	},

	about: {
		fontSize: 15,
		left: 5,
	},

	profileHeader: {
		// height: 250,
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		backgroundColor: "#f6f5fb",
		// backgroundColor: color.backgroundColor, 
	},

	backIcon: {
		color: color.brandDark,
		fontSize: 24,
	},

	cardSection: {
		marginLeft: 16,
		marginRight: 16,
	},

	centeredView: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		marginTop: 22,
		//borderWidth:2
	},
	modalView: {
		marginTop: 100,
		backgroundColor: "white",
		borderTopRightRadius: 20,
		borderTopLeftRadius: 20,
		//padding: 100,
		//alignItems: "center",
		shadowColor: "#000",
		shadowOffset: {
			width: 0,
			height: 2
		},
		shadowOpacity: 0.25,
		shadowRadius: 3.84,
		elevation: 5,
		height: screenHeight
	},
	openButton: {
		backgroundColor: "#F194FF",
		borderRadius: 20,
		padding: 10,
		elevation: 2
	},
	textStyle: {
		color: "white",
		fontWeight: "bold",
		textAlign: "center"
	},
	modalText: {
		marginBottom: 15,
		textAlign: "center"
	},
	title: {
		fontSize: 16,
		fontWeight: 'bold'
	},
	descriptionContainer: {
		flexDirection: 'column',
		paddingRight: 50
	},
	textDescription: {
		marginLeft: 10,
		color: 'gray'
	}

});

async function chooseFile() {
	try {
		const res = await DocumentPicker.pick({
			type: [DocumentPicker.types.images],
		});
		console.log(
			res.uri,
			res.type, // mime type
			res.name,
			res.size
		);
	} catch (err) {
		if (DocumentPicker.isCancel(err)) {
			// User cancelled the picker, exit any dialogs or menus and move on
		} else {
			throw err;
		}
	}
}

export function ProfileEditUserScreen({ route, navigation }) {
	// Pull in one of our MST stores
	// const { someStore, anotherStore } = useStores()
	// OR
	// const rootStore = useStores()

	// Pull in navigation via hook
	//   const navigation = useNavigation()
	const { skillData, educationData, experienceData } = route.params;
	const [selectedItems, setSelectedItems] = useState([])
	const [educationModalVisible, setEducationModalVisible] = useState(false);
	const [experienceModalVisible, setExperienceModalVisible] = useState(false);
	const onSelectedItemsChange = (selectedItems) => {
		setSelectedItems(selectedItems);
	};

	const renderDetail = (rowData, sectionID, rowID) => {
		let title = <Text style={styles.title}>{rowData.title}</Text>
		var desc = null
		if(rowData.description)
		desc = (
			<View style={styles.descriptionContainer}>
				<Text style={styles.textDescription}>{rowData.description}</Text>
				<Icon name = 'trash-outline' style= {{color:'red'}}/>
			</View>
		)

		return (
			<View style={{ flex: 1 }}>
				{title}
				{desc}
			</View>
		)
	};

	return (
		<Screen style={ROOT} preset="scroll">
			<ScrollView >
				<Header noShadow transparent={true} style={styles.profileHeader}>
					<Button transparent onPress={() => navigation.goBack()}>
						<Icon style={styles.backIcon} name="close-outline" />
					</Button>
					<Button transparent>
						<Text style={{ color: color.brandPrimary }}>Save</Text>
					</Button>
				</Header>
				<Container>
					{/* <Button onPress={chooseFile}><Text>LOL</Text></Button> */}

					<View style={styles.topInfo}>

						<View style={{ flexDirection: 'row', justifyContent: 'center' }}>
							<TouchableOpacity onPress={chooseFile}>
								<Thumbnail circular large style={styles.avatarUser} source={require("./avatar.jpg")}></Thumbnail>
							</TouchableOpacity>
						</View>

						<Form>
							<Item stackedLabel>
								<Label>Name</Label>
								<Input defaultValue="Lycee" />
							</Item>

							<Item stackedLabel>
								<Label>Phone</Label>
								<Input defaultValue="(+84) 967-546-457" />
							</Item>

							<Item stackedLabel>
								<Label>Mail</Label>
								<Input defaultValue="dsjfoshdfuishdfis@gmail.com" />
							</Item>

							<Item stackedLabel style={{ alignItems: 'stretch' }}>
								<Label>About me</Label>
								<Textarea style={{ borderRadius: 10, marginTop: 16, backgroundColor: "#ffffff" }} rowSpan={5} underline={false} bordered={false} defaultValue="about.me is a personal web hosting service co-founded by Ryan Freitas, Tony Conrad and Tim Young in October 2009. Wikipedia" />
							</Item>

							<Item stackedLabel style={{ alignItems: 'stretch' }}>
								<Label>Skill</Label>
								<SectionedMultiSelect
									items={items}
									IconRenderer={MaterialIcons}
									uniqueKey="id"
									subKey="children"
									selectedText="skill"
									showDropDowns={false}
									readOnlyHeadings={true}
									onSelectedItemsChange={onSelectedItemsChange}
									selectedItems={selectedItems}
									showCancelButton={true}
								/>
							</Item>
						</Form>
					</View>
					<Card transparent style={styles.cardSection}>
						<CardItem header>
							<Text style={{ fontWeight: "700", fontSize: 20 }}>Education</Text>
							<View style={{ flexGrow: 1, flexDirection: 'row-reverse' }}>
								<Button rounded info onPress={() => { setEducationModalVisible(true) }}>
									<Icon name='add-outline' />
								</Button>
							</View>
						</CardItem>
						<CardItem>
							<Timeline
								
								data={educationData}
								renderDetail = {renderDetail}
								timeStyle={{ textAlign: 'center', backgroundColor: color.brandInfo, color: 'white', padding: 5, borderRadius: 13 }}
							></Timeline>
						</CardItem>
						<Modal
							animationType="slide"
							transparent={true}
							visible={educationModalVisible}
						//presentationStyle='formSheet'
						>
							<View style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
								<View style={styles.modalView}>
									<Form style={{ margin: 25 }}>
										<Item stackedLabel>
											<Label>Title</Label>
											<Input></Input>
										</Item>
										<Item stackedLabel>
											<Label>Time</Label>
											<Input></Input>
										</Item>
										<Item stackedLabel>
											<Label>Description</Label>
											<Input></Input>
										</Item>
									</Form>
									<View style={{ flexDirection: 'row', justifyContent: 'space-evenly' }}>
										<Button rounded >
											<Text style={styles.textStyle}>Add</Text>
										</Button>
										<Button rounded
											onPress={() => {
												setEducationModalVisible(!educationModalVisible);
											}}
										>
											<Text style={styles.textStyle}>Cancel</Text>
										</Button>
									</View>
								</View>
							</View>
						</Modal>

					</Card>
					<Card transparent style={styles.cardSection}>
						<CardItem header>
							<Text style={{ fontWeight: '700', fontSize: 20 }}>Experience</Text>
							<View style={{ flexGrow: 1, flexDirection: 'row-reverse' }}>
								<Button rounded info onPress={() => { setExperienceModalVisible(true) }}>
									<Icon name='add-outline' />
								</Button>
							</View>
						</CardItem>
						<CardItem style={{ flexDirection: 'column' }}>
							<CardJob
								minWidth={350}
								companyName="Fpt"
								position="Software Engineering"
								thumnailSource={require('./company.jpg')}
								describe="I'm CEO"
								deleteAble={true}
							>
							</CardJob>
						</CardItem>
						<Modal
							animationType="slide"
							transparent={true}
							visible={experienceModalVisible}
						//presentationStyle='formSheet'
						>
							<View style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
								<View style={styles.modalView}>
									<Form style={{ margin: 25 }}>
										<Item stackedLabel>
											<Label>Company Name</Label>
											<Input></Input>
										</Item>
										<Item stackedLabel>
											<Label>Position</Label>
											<Input></Input>
										</Item>
										<Item stackedLabel>
											<Label>Describe</Label>
											<Input></Input>
										</Item>
									</Form>
									<View style={{ flexDirection: 'row', justifyContent: 'space-evenly' }}>
										<Button rounded >
											<Text style={styles.textStyle}>Add</Text>
										</Button>
										<Button rounded
											onPress={() => {
												setExperienceModalVisible(!experienceModalVisible);
											}}
										>
											<Text style={styles.textStyle}>Cancel</Text>
										</Button>
									</View>
								</View>
							</View>
						</Modal>
					</Card>
				</Container>
			</ScrollView>
		</Screen>
	)
}
