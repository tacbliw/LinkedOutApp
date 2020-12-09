import moment from 'moment'
import {
  Body,
  Button,
  Card,
  CardItem,
  Col,
  Grid,
  Header,
  Icon,
  Text,
} from 'native-base'
import {
  FlatList,
  LogBox,
  ScrollView,
  StyleSheet,
  View,
  ViewStyle,
} from 'react-native'
import FastImage from 'react-native-fast-image'
import Timeline from 'react-native-timeline-flatlist'
import React, { useEffect, useState } from 'reactn'
import {
  CardJob,
  Container,
  FollowingUser,
  Screen,
  Tag,
} from '../../components'
import { GlobalState } from '../../config/global'
import { screens } from '../../config/screens'
import { toBackendUrl } from '../../helpers/string-helper'
import { ExperienceObject } from '../../repositories/experience-repository'
import { followService } from '../../services/follow-service'
import { postService } from '../../services/post-service'
import { userProfileService } from '../../services/user-profile-service'
import { color } from '../../theme'
const ROOT: ViewStyle = {
  backgroundColor: color.palette.black,
  flex: 1,
}

const styles = StyleSheet.create({
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
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#f6f5fb',
    // backgroundColor: color.backgroundColor,
  },

  avatarUser: {
    borderRadius: 10,
    height: 85,
    width: 85,
  },

  userName: {
    fontSize: 30,
    fontWeight: '700',
    left: 5,
    // color: "#FFFFFF"
  },

  about: {
    fontSize: 15,
    left: 5,
  },

  socialStatisticContainter: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 70,
  },

  following: {
    fontWeight: '700',
  },

  follower: {
    fontWeight: '700',
  },

  topInfo: {
    // marginLeft: 16
    paddingHorizontal: 16,
    marginLeft: 16,
  },

  followingContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },

  cardSection: {
    marginLeft: 16,
    marginRight: 16,
  },

  textDescription: {
    color: 'gray',
  },
})

export function ProfileUserScreen({ navigation }) {
  LogBox.ignoreAllLogs() // holy fuck im actually using this fucking shit

  const accountId = parseInt(React.getGlobal<GlobalState>().accountId)

  const [educationListRender, setEducationListRender] = useState([])

  const [
    firstName,
    lastName,
    gender,
    dateOfBirth,
    profilePicture,
    description,
    getInfo,
  ] = userProfileService.useGetUser(accountId)

  const [phoneList, getPhone] = userProfileService.useGetPhone(accountId)

  const [emailList, getMail] = userProfileService.useGetMail(accountId)

  const [educationList] = userProfileService.useGetEducation(accountId)

  const [experienceList] = userProfileService.useGetExperience(accountId)

  const [skillList, getSkill] = userProfileService.useGetSkill(accountId)

  const [followerCount] = followService.useFollowerCount(accountId)

  const [followingCount] = followService.useFollowingCount(accountId)

  const [companiesFollowed] = followService.useCompanyFollowed(accountId)

  const [postCount] = postService.usePostCount(accountId)

  const renderExperienceItem = ({ item }: { item: ExperienceObject }) => {
    return (
      <CardJob
        minWidth={350}
        companyName={item.companyName}
        position={item.title}
        avatarUri={toBackendUrl(item.profilePicture)}
        describe={item.description}
      ></CardJob>
    )
  }

  const renderSkillItem = ({ item }) => {
    return <Tag tagText={item}></Tag>
  }

  useEffect(() => {
    // Subscribe for the focus Listener
    const unsubscribe = navigation.addListener('focus', () => {
      getInfo()
      getPhone()
      getMail()
      getSkill()
    })

    return unsubscribe
  }, [navigation])

  useEffect(() => {
    if (educationList && educationList.length > 0) {
      setEducationListRender(
        educationList.map((item) => {
          return {
            id: item.educationId,
            time: moment(item.startDate, 'YYYY-MM-DD')
              .format('MMM YYYY')
              .toString(),
            title: item.schoolName,
            description: (
              <View>
                <Text style={styles.textDescription}>{item.major}</Text>
              </View>
            ),
          }
        }),
      )
    }
  }, [educationList])

  return (
    <Screen style={ROOT} preset='scroll'>
      <ScrollView>
        <Header
          noShadow
          transparent={true}
          style={styles.profileHeader}
          androidStatusBarColor={color.brandPrimary}
        >
          <Button
            transparent
            onPress={() =>
              navigation.navigate(screens.authenticated.user.home, {
                screen: screens.authenticated.user.newsfeed.navigator,
              })
            }
          >
            <Icon style={styles.backIcon} name='arrow-back-outline' />
          </Button>
          <Button
            transparent
            onPress={() =>
              navigation.navigate(screens.authenticated.user.editprofile, {
                userData: {
                  firstName: firstName,
                  lastName: lastName,
                  gender: gender,
                  dateOfBirth: dateOfBirth,
                  profilePicture: profilePicture,
                  description: description,
                  phoneList: phoneList,
                  emailList: emailList,
                },
                skillData: skillList,
                educationData: educationList,
                experienceData: experienceList,
              })
            }
          >
            <Icon style={styles.menuIcon} name='create-outline' />
          </Button>
        </Header>
        <Container>
          <View style={styles.topInfo}>
            <View style={{ flexDirection: 'row' }}>
              <FastImage
                style={styles.avatarUser}
                source={{ uri: toBackendUrl(profilePicture) }}
              />
              <View
                style={{ marginLeft: 25, justifyContent: 'center', flex: 1 }}
              >
                <Text style={styles.userName}>
                  {firstName + ' ' + lastName}
                </Text>
                <Text style={styles.about}>
                  {emailList ? emailList[0] : ''}
                </Text>
              </View>
            </View>
          </View>

          <Grid>
            <Col style={styles.socialStatisticContainter}>
              <Text style={styles.following}>{followingCount}</Text>
              <Text style={{ color: color.brandLight }}>Following</Text>
            </Col>
            <Col style={styles.socialStatisticContainter}>
              <Text style={styles.follower}>{followerCount}</Text>
              <Text style={{ color: color.brandLight }}>Followers</Text>
            </Col>
            <Col style={styles.socialStatisticContainter}>
              <Text style={styles.follower}>{postCount}</Text>
              <Text style={{ color: color.brandLight }}>Posts</Text>
            </Col>
          </Grid>

          <Card transparent style={styles.cardSection}>
            <CardItem header>
              <Text style={{ fontWeight: '700', fontSize: 20 }}>About me</Text>
            </CardItem>
            <CardItem>
              <Body>
                <Text>{description}</Text>
                <FlatList
                  contentContainerStyle={{
                    flexDirection: 'column',
                    // flexWrap: 'wrap',
                  }}
                  numColumns={4}
                  data={skillList}
                  renderItem={renderSkillItem}
                  // horizontal
                  style={{ marginTop: 16 }}
                  keyExtractor={(item) => item}
                ></FlatList>
              </Body>
            </CardItem>
          </Card>

          <Card transparent style={styles.cardSection}>
            <CardItem header>
              <Text style={{ fontWeight: '700', fontSize: 20 }}>Education</Text>
            </CardItem>
            <CardItem>
              <Timeline
                data={educationListRender}
                renderCircle={(rowData, sectionID, rowID) => {}}
                timeStyle={{
                  textAlign: 'center',
                  backgroundColor: color['color-info-500'],
                  color: 'white',
                  padding: 5,
                  borderRadius: 13,
                  marginTop: 16,
                  marginLeft: 16,
                }}
              ></Timeline>
            </CardItem>
          </Card>

          <Card transparent style={styles.cardSection}>
            <CardItem header>
              <Text style={{ fontWeight: '700', fontSize: 20 }}>
                Experience
              </Text>
            </CardItem>
            <CardItem style={{ flexDirection: 'column' }}>
              <FlatList
                data={experienceList}
                renderItem={renderExperienceItem}
                keyExtractor={(item) => String(item.id)}
              ></FlatList>
            </CardItem>
          </Card>

          <Card transparent style={styles.cardSection}>
            <CardItem header>
              <Text style={{ fontWeight: '700', fontSize: 20 }}>Following</Text>
            </CardItem>
            {companiesFollowed.length > 0 ? (
              <CardItem style={styles.followingContainer}>
                <FollowingUser
                  width={40}
                  height={40}
                  borderRadius={10}
                  label={companiesFollowed[0].name}
                  avatarUri={toBackendUrl(companiesFollowed[0].profilePicture)}
                ></FollowingUser>
                {companiesFollowed.length > 1 ? (
                  <FollowingUser
                    width={40}
                    height={40}
                    borderRadius={100}
                    label={'More'}
                    textThumbnail={
                      '+' + (companiesFollowed.length - 1).toString()
                    }
                    textColor={color.brandPrimary}
                  />
                ) : null}
              </CardItem>
            ) : null}
          </Card>
        </Container>
      </ScrollView>
    </Screen>
  )
}
