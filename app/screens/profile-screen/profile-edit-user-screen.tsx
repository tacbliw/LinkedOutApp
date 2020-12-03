import DateTimePicker from '@react-native-community/datetimepicker'
import moment from 'moment'
import { Button, Card, CardItem, Form, Header, Icon, Input, Item, Label, Text, Textarea, Thumbnail } from "native-base"
import React, { useEffect } from "react"
import { Dimensions, FlatList, KeyboardAvoidingView, Modal, StyleSheet, TouchableOpacity, View, ViewStyle } from "react-native"
import DocumentPicker from 'react-native-document-picker'
import { ScrollView } from "react-native-gesture-handler"
import SectionedMultiSelect from 'react-native-sectioned-multi-select'
import Timeline from 'react-native-timeline-flatlist'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import { useState } from "reactn"
import { CardJob, Container, Screen } from "../../components"
import { tagService } from '../../services/tag-service'
import { userProfileService } from "../../services/user-profile-service"
// import { useStores } from "../../models"
import { color } from "../../theme"

const screenHeight = Dimensions.get('window').height
const screenWidth = Dimensions.get('window').width

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
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: color.brandPrimary,
	},

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
		height: screenHeight,
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
		color: 'gray'
	},
	textInputIcon: {
		color: color.brandPrimary,
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

	const [
		firstName,
		handleFirstNameChange,
		lastName,
		handleLastNameChange,
		dateOfBirth,
		handleDateOfBirthChange,
		showDateOfBirthPicker,
		handleDateOfBirthPickerPress,
		gender,
		handleGenderChange,
		userDescription,
		handleUserDescriptionChange,
		oldPhone,
		newPhone,
		handlePhoneChange,
		oldEmail,
		newEmail,
		handleEmailChange,
		handleEditProfileSubmit
	] = userProfileService.useUpdateUser();

	const [
		schoolName,
		handleSchooleNameChange,
		startDateEducation,
		handleStartDateEducationChange,
		showStartDateEducationPicker,
		handleStartDateEducationPickerPress,
		endDateEducation,
		handleEndDateEducationChange,
		showEndDateEducationPicker,
		handleEndDateEducationPickerPress,
		major,
		handleMajorChange,
		degree,
		handleDegreeChange,
		handleCreatEducation,
		educationList,
		handleEducationChange,
		handleDeleteEducation
	] = userProfileService.useCreatEducation();

	const [
		companyName,
		handleCompanyNameChange,
		startDateExperience,
		handleStartDateExperienceChange,
		showStartDateExperiencePicker,
		handleStartDateExperiencePickerPress,
		endDateExperience,
		handleEndDateExperienceChange,
		showEndDateExperiencePicker,
		handleEndDateExperiencePickerPress,
		title,
		handleTitleChange,
		description,
		handleDescriptionChange,
		handleCreatExperience,
		handleDeleteExperience,
		itemId,
		handleItemIdChange,
		experienceList,
		handleExperienceChange
	] = userProfileService.useCreatExperience();

	const [
		skillList
	  ] = userProfileService.useGetSkill();

	const [
		skillTag,
		getAllSkillTag,
		getSkillTagByQuery,
	] = tagService.useSkillTag()

	// Pull in one of our MST stores
	// const { someStore, anotherStore } = useStores()
	// OR
	// const rootStore = useStores()

	// Pull in navigation via hook
	//   const navigation = useNavigation()
	const { userData, skillData, educationData, experienceData } = route.params;
	const [selectedItems, setSelectedItems] = useState([]);
	const [educationModalVisible, setEducationModalVisible] = useState(false);
	const [experienceModalVisible, setExperienceModalVisible] = useState(false);
	const [dataMultiSelected, setDataMultiSelected] = useState([])
	const [educationListRender, setEducationListRender] = useState([])

	const onSelectedItemsChange = (selectedItems) => {
		setSelectedItems(selectedItems);
	};

	const renderDetail = (rowData, sectionID, rowID) => {
		let title = <Text style={styles.title}>{rowData.title}</Text>

		return (
			<View style={{ flex: 1 }}>
				{title}
				{rowData.description}
			</View>
		)
	};

	const renderExperienceItem = ({ item }) => {
		return (
			<CardJob
				id={item.id}
				minWidth={screenWidth*0.8}
				companyName={item.companyName}
				position={item.title}
				thumnailSource={require('./company.jpg')}
				describe={item.description}
				deleteAble={true}
				onDelete={handleDeleteExperience}
			></CardJob>
		)
	}

	useEffect(() => {
		getAllSkillTag();
		handleEducationChange(educationData.map(item => {
			return {
			//   id: item.educationId,
			  time: moment(item.startDate, 'YYYY-MM-DD').fromNow(),
			  title: item.schoolName,
			  description: (
				<View>
					<Text style={styles.textDescription}>{item.major}</Text>
					<TouchableOpacity onPress={() => handleDeleteEducation(item.id)}><Icon name='remove-circle' style={{ color: color.brandDanger }} /></TouchableOpacity>
				</View>
				),
			}
		  }));
		handleExperienceChange(experienceData)
	}, [null])

	useEffect(() => {
		educationList?setEducationListRender(educationList.map(item => {
			return {
			  id: item.educationId,
			  time: moment(item.startDate, 'YYYY-MM-DD').fromNow(),
			  title: item.schoolName,
			  description: (
				<View>
					<Text style={styles.textDescription}>{item.major}</Text>
					<TouchableOpacity onPress={() => handleDeleteEducation(item.id)}><Icon name='remove-circle' style={{ color: color.brandDanger }} /></TouchableOpacity>
				</View>
				),
			}
		  })):''
	}, [educationList])
	
	useEffect(() => {
		setDataMultiSelected([
			{
				name: 'Skill', 
				id: 1,
				children: skillTag?skillTag.map((item, index) =>( {name: item, id: index} )):[]
			}
		
		])

		skillTag?setSelectedItems(skillData.map(item => skillTag.indexOf(item))):''
		
	}, [skillTag])

	return (
		<Screen style={ROOT} preset="scroll">
			<ScrollView >
				<Header noShadow transparent={true} style={styles.profileHeader}>
					<Button transparent onPress={() => navigation.goBack()}>
						<Icon style={styles.backIcon} name="close-outline" />
					</Button>
					<Button transparent onPress={() => {
						//handleEditProfileSubmit();
						navigation.goBack();
					}}>
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
								<Label>First name</Label>
								<Input value={userData.firstName} onChange={handleFirstNameChange} />
							</Item>

							<Item stackedLabel>
								<Label>Last name</Label>
								<Input value={userData.lastName} onChange={handleLastNameChange} />
							</Item>

							<Item stackedLabel>
								<Label>Gender</Label>
								<Input value={userData.gender} onChange={handleGenderChange} />
							</Item>
							{/* <Item stackedLabel>
								<Label>DoB</Label>
								<Item>

									<Icon
										style={styles.textInputIcon}
										name='calendar-outline'
										onPress={handleDateOfBirthPickerPress}
									/>

									{showDateOfBirthPicker && (
										<DateTimePicker
											testID='dobPicker'
											value={dateOfBirth}
											display='default'
											onChange={(event, date) => handleDateOfBirthChange(date)}
										/>
									)}
									<Input>{dateOfBirth.toDateString()}</Input>
								</Item>
							</Item> */}

							<Item stackedLabel>
								<Label>Phone</Label>
								<Input value={userData.phoneList[0]} onChange={handlePhoneChange} />
							</Item>

							<Item stackedLabel>
								<Label>Email</Label>
								<Input value={userData.emailList[0]} onChange={handleEmailChange} />
							</Item>

							<Item stackedLabel style={{ alignItems: 'stretch' }}>
								<Label>About me</Label>
								<Textarea
									style={{ borderRadius: 10, marginTop: 16, backgroundColor: "#ffffff" }} rowSpan={5} underline={false} bordered={false}
									value={userData.description} onChange={handleUserDescriptionChange}
								/>
							</Item>

							<Item stackedLabel style={{ alignItems: 'stretch' }}>
								<Label>Skill</Label>
								<SectionedMultiSelect
									items={dataMultiSelected}
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
								// circleSize={35}
								// timeContainerStyle={{minWidth:52, marginTop: -5}}
								renderCircle={(rowData, sectionID, rowID) => {
								}}
								data={educationListRender}
								renderDetail={renderDetail}
								// columnFormat='single-column-right'
								timeStyle={{ textAlign: 'center', backgroundColor: color.brandInfo, color: 'white', padding: 5, borderRadius: 13 }}
							></Timeline>
							{/* <Mytimeline></Mytimeline> */}
						</CardItem>

						<Modal
							animationType="slide"
							transparent={true}
							visible={educationModalVisible}
						//presentationStyle='formSheet'
						>
							<KeyboardAvoidingView behavior="position" enabled>
								<ScrollView scrollEnabled={false} keyboardShouldPersistTaps='handled'>

									<View style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
										<View style={styles.modalView}>

											<Form style={{ margin: 25 }}>
												<Item stackedLabel>
													<Label>School Name</Label>
													<Input value={schoolName} onChange={handleSchooleNameChange} />
												</Item>
												<Item stackedLabel>
													<Label>Start Date</Label>
													<Item>
														<Icon
															style={styles.textInputIcon}
															name='calendar-outline'
															onPress={handleStartDateEducationPickerPress}
														/>
														{showStartDateEducationPicker && (
															<DateTimePicker
																testID='startDateTimePicker'
																value={startDateEducation}
																display='default'
																onChange={(event, date) => handleStartDateEducationChange(date)}
															/>
														)}
														<Input>{startDateEducation.toDateString()}</Input>
													</Item>
												</Item>
												<Item stackedLabel>
													<Label>End Date</Label>
													<Item>
														<Icon
															style={styles.textInputIcon}
															name='calendar-outline'
															onPress={handleEndDateEducationPickerPress}
														/>
														{showEndDateEducationPicker && (
															<DateTimePicker
																testID='endDateTimePicker'
																value={endDateEducation}
																display='default'
																onChange={(event, date) => handleEndDateEducationChange(date)}
															/>
														)}
														<Input>{endDateEducation.toDateString()}</Input>
													</Item>
												</Item>
												<Item stackedLabel>
													<Label>Major</Label>
													<Input value={major} onChange={handleMajorChange} />
												</Item>
												<Item stackedLabel>
													<Label>Degree</Label>
													<Input value={degree} onChange={handleDegreeChange} />
												</Item>

											</Form>

											<View style={{ flexDirection: 'row', justifyContent: 'space-evenly' }}>
												<Button rounded
													onPress={() => {
														handleCreatEducation();
														setEducationModalVisible(!educationModalVisible);
													}}>
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
								</ScrollView>
							</KeyboardAvoidingView>
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
							<FlatList
								data={experienceList}
								renderItem={renderExperienceItem}
								keyExtractor={(item) => item.id}
							></FlatList>
						</CardItem>
						<Modal
							animationType="slide"
							transparent={true}
							visible={experienceModalVisible}
						//presentationStyle='formSheet'
						>
							<KeyboardAvoidingView behavior="position" enabled>
								<ScrollView scrollEnabled={false} keyboardShouldPersistTaps='handled'>
									<View style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
										<View style={styles.modalView}>
											<Form style={{ margin: 25 }}>
												<Item stackedLabel>
													<Label>Company Name</Label>
													<Input value={companyName} onChange={handleCompanyNameChange} />
												</Item>
												<Item stackedLabel>
													<Label>Start Date</Label>
													<Item>
														<Icon
															style={styles.textInputIcon}
															name='calendar-outline'
															onPress={handleStartDateExperiencePickerPress}
														/>
														{showStartDateExperiencePicker && (
															<DateTimePicker
																testID='startDateTimePicker'
																value={startDateExperience}
																display='default'
																onChange={(event, date) => handleStartDateExperienceChange(date)}
															/>
														)}
														<Input>{startDateExperience.toDateString()}</Input>
													</Item>
												</Item>
												<Item stackedLabel>
													<Label>End Date</Label>
													<Item>
														<Icon
															style={styles.textInputIcon}
															name='calendar-outline'
															onPress={handleEndDateExperiencePickerPress}
														/>
														{showEndDateExperiencePicker && (
															<DateTimePicker
																testID='endDateTimePicker'
																value={endDateExperience}
																display='default'
																onChange={(event, date) => handleEndDateExperienceChange(date)}
															/>
														)}
														<Input>{endDateExperience.toDateString()}</Input>
													</Item>
												</Item>
												<Item stackedLabel>
													<Label>Position</Label>
													<Input value={title} onChange={handleTitleChange} />
												</Item>
												<Item stackedLabel>
													<Label>Describe</Label>
													<Input value={description} onChange={handleDescriptionChange} />
												</Item>
											</Form>
											<View style={{ flexDirection: 'row', justifyContent: 'space-evenly' }}>
												<Button rounded onPress={() => {
													handleCreatExperience();
													setExperienceModalVisible(!experienceModalVisible);
												}}>
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
								</ScrollView>
							</KeyboardAvoidingView>
						</Modal>
					</Card>
				</Container>
			</ScrollView>
		</Screen>
	)
}
