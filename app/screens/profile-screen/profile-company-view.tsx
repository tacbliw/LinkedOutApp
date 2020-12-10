import {
  Body,
  Button,
  Card,
  CardItem,
  Header,
  Icon,
  Text,
  View
} from 'native-base'
import {
  FlatList,
  LogBox,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  ViewStyle
} from 'react-native'
import { PieChart } from 'react-native-chart-kit'
import FastImage from 'react-native-fast-image'
import React, { useEffect, useState } from 'reactn'
import { CardTopJob, Container, Screen, Tag } from '../../components'
import { toBackendUrl } from '../../helpers/string-helper'
import { companyProfileService } from '../../services/company-profile-service'
import { followService } from '../../services/follow-service'
import { color } from '../../theme'

const ROOT: ViewStyle = {
  backgroundColor: color.palette.black,
  flex: 1,
}


const chartConfig = {
  backgroundGradientFrom: '#1E2923',
  backgroundGradientFromOpacity: 0,
  backgroundGradientTo: '#08130D',
  backgroundGradientToOpacity: 0.5,
  color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
  strokeWidth: 2, // optional, default 3
  barPercentage: 0.5,
  useShadowColorFromDataset: false, // optional
}

const styles = StyleSheet.create({
  profileHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: color['color-gray-200'],
  },

  backIcon: {
    color: color.brandDark,
    fontSize: 24,
  },

  menuIcon: {
    color: color.brandDark,
    fontSize: 24,
  },

  topInfo: {
    padding: 16,
    marginLeft: 16,
  },

  about: {
    fontSize: 15,
    left: 5,
  },

  userName: {
    fontSize: 30,
    fontWeight: '700',
    left: 5,
  },

  avatarUser: {
    width: 115,
    height: 115,
    borderRadius: 10,
  },

  socialStatisticContainter: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 70,
  },

  follower: {
    fontWeight: '700',
  },

  cardSection: {
    marginLeft: 16,
    marginRight: 16,
  },

  cardHeader: {
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    backgroundColor: '#FFFFFF',
  },

  cardEnd: {
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    backgroundColor: '#FFFFFF',
  },
})
const colorList = ['#495867', '#577399', '#BDD5EA', '#FE5F55', '#F7F052', '#F28123', '#D34E24', '#563F1B', '#38726C', '#413C58', '#A3C4BC', '#210F04', '#452103', '#436436']

export function ProfileCompanyViewScreen({ route, navigation }) {
  LogBox.ignoreLogs(['VirtualizedList'])
  const { accountId } = route.params
  const [
    name,
    website,
    profilePicture,
    specialties,
    description,
    job,
    getInfo,
    getCompanyJob,
  ] = companyProfileService.useGetCompany(accountId)

  const [checkFollowed, doFollow, doUnFollow] = followService.useFollow(
    accountId,
  )

  const [followerCount, handleCountChange] = followService.useFollowerCount(
    accountId,
  )
  const [statisticData, setStatisticData] = useState<any[]>([])

  useEffect(() => {
    // Subscribe for the focus Listener
    const unsubscribe = navigation.addListener('focus', () => {
      getInfo()
      getCompanyJob()
    })

    return unsubscribe
  }, [navigation, getCompanyJob, getInfo])

  useEffect(() => {
    let skillCount = { "": 0 };
    job.forEach(element => {
      if (element.skills) {
        element.skills.forEach((s) =>
          skillCount[s] = (skillCount[s] || 0) + 1
        )
      }
    });
    const newStatisticData = []
    let index = 0
    Object.keys(skillCount).forEach(i => {
      if (i) {
        newStatisticData.push({
          name: i,
          population: skillCount[i],
          color: colorList[index],
          legendFontColor: '#7F7F7F',
          legendFontSize: 15,
        })
        index++
      }
    })
    setStatisticData(newStatisticData)
  }, [job])
  
  const renderSpecialtyItem = ({ item }) => {
    return <Tag tagText={item}></Tag>
  }

  const renderCardTopJob = ({ item }) => {
    return (
      <CardTopJob
        width={300}
        height={150}
        backgroundImage={toBackendUrl(item.jobPicture)}
        label={item.title}
        description={item.description}
        maxTitleLength={14}
        maxDescriptionLength={30}
      />
    )
  }

  return (
    <Screen style={ROOT} preset='scroll'>
      <ScrollView>
        <Header noShadow transparent={true} style={styles.profileHeader}>
          <Button transparent onPress={() => navigation.goBack()}>
            <Icon style={styles.backIcon} name='arrow-back-outline' />
          </Button>
        </Header>

        <Container style={{ backgroundColor: color['color-gray-200'] }}>
          <View style={styles.topInfo}>
            <View style={{ flexDirection: 'row' }}>
              <FastImage
                style={styles.avatarUser}
                source={{ uri: toBackendUrl(profilePicture) }}
              />
              <View style={{ marginLeft: 25, justifyContent: 'center' }}>
                <Text style={styles.userName}>{name}</Text>
                <Text style={styles.about}>
                  <Icon name='globe-outline' style={{ fontSize: 16 }}></Icon>
                  {' ' + website}
                </Text>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                  }}
                >
                  <View style={styles.socialStatisticContainter}>
                    <Text style={styles.follower}>
                      {followerCount.toString() + 'k'}
                    </Text>
                    <Text style={{ color: color.brandLight }}>Followers</Text>
                  </View>
                  <View style={styles.socialStatisticContainter}>
                    <Text style={styles.follower}>{job.length}</Text>
                    <Text style={{ color: color.brandLight }}>Jobs</Text>
                  </View>
                </View>
              </View>
            </View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                flex: 1,
                marginRight: 10,
              }}
            >
              <TouchableOpacity style={{ flexGrow: 8 / 10 }}>
                {checkFollowed ? (
                  <Button
                    transparent
                    full
                    rounded
                    style={{
                      alignSelf: 'center',
                      borderWidth: 1,
                      borderColor: color.brandPrimary,
                    }}
                    onPress={() => {
                      doUnFollow()
                      handleCountChange(-1)
                    }}
                  >
                    <Icon
                      name='checkmark-outline'
                      style={{ color: color.brandPrimary }}
                    />
                    <Text style={{ color: color.brandPrimary }}>Following</Text>
                  </Button>
                ) : (
                  <Button
                    transparent
                    full
                    rounded
                    style={{
                      backgroundColor: color.brandPrimary,
                      alignSelf: 'center',
                    }}
                    onPress={() => {
                      doFollow()
                      handleCountChange(1)
                    }}
                  >
                    <Icon name='add-outline' style={{ color: 'white' }} />
                    <Text style={{ color: 'white' }}>Follow</Text>
                  </Button>
                )}
              </TouchableOpacity>
              <TouchableOpacity>
                <Button
                  transparent
                  full
                  rounded
                  style={{
                    alignSelf: 'center',
                    borderWidth: 1,
                    borderColor: color.brandPrimary,
                  }}
                  onPress={() => {
                    navigation.navigate('room', {
                      id: accountId,
                      name: name,
                      profilePicture: toBackendUrl(profilePicture),
                    })
                  }}
                >
                  <Text style={{ color: color.brandPrimary }}>Contact Now</Text>
                </Button>
              </TouchableOpacity>
            </View>
          </View>

          <Card transparent style={styles.cardSection}>
            <CardItem header style={styles.cardHeader}>
              <Text style={{ fontWeight: '700', fontSize: 20 }}>About us</Text>
            </CardItem>
            <CardItem style={styles.cardEnd}>
              <Body>
                <Text>{description}</Text>
                <FlatList
                  data={specialties}
                  renderItem={renderSpecialtyItem}
                  horizontal
                  style={{ marginTop: 16 }}
                  keyExtractor={(item) => item}
                  scrollEnabled={false}
                ></FlatList>
              </Body>
            </CardItem>
          </Card>

          <Card transparent style={styles.cardSection}>
            <CardItem header style={styles.cardHeader}>
              <Text style={{ fontWeight: '700', fontSize: 20 }}>Statistic</Text>
            </CardItem>
            <CardItem
              style={[
                styles.cardEnd,
                { justifyContent: 'center', alignContent: 'center' },
              ]}
            >
              <Body
                style={{ justifyContent: 'center', alignContent: 'center' }}
              >
                <PieChart
                  data={statisticData}
                  width={350}
                  height={200}
                  chartConfig={chartConfig}
                  accessor='population'
                  backgroundColor='transparent'
                  paddingLeft='15'
                />
              </Body>
            </CardItem>
          </Card>
          <Card transparent style={styles.cardSection}>
            <CardItem
              header
              style={[styles.cardHeader, { justifyContent: 'space-between' }]}
            >
              <Text style={{ fontWeight: '700', fontSize: 20 }}>
                Lastest job
              </Text>
            </CardItem>
            <CardItem style={styles.cardEnd}>
              <Body>
                <FlatList
                  data={job}
                  renderItem={renderCardTopJob}
                  keyExtractor={(item) => item.id.toString()}
                ></FlatList>
              </Body>
            </CardItem>
          </Card>
        </Container>
      </ScrollView>
    </Screen>
  )
}
