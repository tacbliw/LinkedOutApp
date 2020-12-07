import {
  Body,
  Button,
  Card,
  CardItem,
  Header,
  Icon,
  Text,
  View,
} from 'native-base'
import {
  FlatList,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  ViewStyle,
} from 'react-native'
import { PieChart } from 'react-native-chart-kit'
import FastImage from 'react-native-fast-image'
import React, { useEffect } from 'reactn'
import { CardTopJob, Container, Screen, Tag } from '../../components'
import { GlobalState } from '../../config/global'
import { screens } from '../../config/screens'
import { toBackendUrl } from '../../helpers/string-helper'
import { companyProfileService } from '../../services/company-profile-service'
import { followService } from '../../services/follow-service'
import { color } from '../../theme'

const ROOT: ViewStyle = {
  backgroundColor: color.palette.black,
  flex: 1,
}

const data = [
  {
    name: 'Seoul',
    population: 21500000,
    color: 'rgba(131, 167, 234, 1)',
    legendFontColor: '#7F7F7F',
    legendFontSize: 15,
  },
  {
    name: 'Toronto',
    population: 2800000,
    color: '#F00',
    legendFontColor: '#7F7F7F',
    legendFontSize: 15,
  },
  {
    name: 'Beijing',
    population: 527612,
    color: 'red',
    legendFontColor: '#7F7F7F',
    legendFontSize: 15,
  },
  {
    name: 'New York',
    population: 8538000,
    color: color.brandLight,
    legendFontColor: '#7F7F7F',
    legendFontSize: 15,
  },
  {
    name: 'Moscow',
    population: 11920000,
    color: 'rgb(0, 0, 255)',
    legendFontColor: '#7F7F7F',
    legendFontSize: 15,
  },
]

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
    // height: 250,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: color['color-gray-200'],
    // backgroundColor: color.backgroundColor,
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
    // marginLeft: 16
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

export function ProfileCompanyScreen({ navigation }) {
  const accountId = parseInt(React.getGlobal<GlobalState>().accountId)
  const [
    name,
    website,
    profilePicture,
    specialties,
    description,
    job,
    getInfo,
    getCompanyJob,
  ] = companyProfileService.useGetCompany()

  const [followerCount] = followService.useFollowerCount(accountId)

  useEffect(() => {
    // Subscribe for the focus Listener
    const unsubscribe = navigation.addListener('focus', () => {
      // getInfo()
      // getCompanyJob()
    })

    return () => {
      unsubscribe
    }
  }, [navigation])

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
          <Button
            transparent
            onPress={() =>
              navigation.navigate(screens.authenticated.company.editprofile, {
                companyData: {
                  name: name,
                  website: website,
                  profilePicture: profilePicture,
                  specialties: specialties,
                  description: description,
                },
              })
            }
          >
            <Icon style={styles.menuIcon} name='create-outline' />
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
                  data={data}
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
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate(screens.authenticated.company.jobcreate)
                }
              >
                <Text
                  style={{ color: color['color-info-500'], fontWeight: 'bold' }}
                >
                  Add
                </Text>
              </TouchableOpacity>
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
