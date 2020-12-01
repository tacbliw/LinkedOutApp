import {
  Body,
  Button,
  Card,
  CardItem,
  Header,
  Icon,
  Text,
  Thumbnail,
  View
} from 'native-base'
import React, { useEffect } from 'react'
import { FlatList, ScrollView, StyleSheet, ViewStyle } from 'react-native'
import { PieChart } from 'react-native-chart-kit'
import { CardTopJob, Container, Screen, Tag } from '../../components'
import { screens } from '../../config/screens'
import { companyProfileService } from '../../services/company-profile-service'
// import { useStores } from "../../models"
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
    backgroundColor: '#f6f5fb',
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
})

export function ProfileCompanyScreen({ navigation }) {
  const [
    name,
    website,
    profilePicture,
    specialties,
    description,
    getInfo
  ] = companyProfileService.useGetCompany();

  useEffect(() => {

    // Subscribe for the focus Listener
    const unsubscribe = navigation.addListener('focus', () => {
      getInfo()
    });

    return () => {
      unsubscribe;
    };
  }, [navigation]);

  const renderSpecialtyItem = ({ item }) => {
    return (
      <Tag tagText={item}></Tag>
    )
  }

  return (
    <Screen style={ROOT} preset='scroll'>
      <ScrollView>
        <Header noShadow transparent={true} style={styles.profileHeader}>
          <Button
            transparent
            onPress={() => navigation.navigate(screens.authenticated.user.home)}
          >
            <Icon style={styles.backIcon} name='arrow-back-outline' />
          </Button>
          <Button
            transparent
            onPress={() => navigation.navigate(screens.authenticated.company.editprofile, {
              companyData: { "name": name, "website": website, "profilePicture": profilePicture, "specialties": specialties, "description": description }
            })}
          >
            <Icon style={styles.menuIcon} name='create-outline' />
          </Button>
        </Header>

        <Container>
          <View style={styles.topInfo}>
            <View style={{ flexDirection: 'row' }}>
              <Thumbnail
                square={true}
                large
                style={styles.avatarUser}
                source={require('./company.jpg')}
              ></Thumbnail>
              <View style={{ marginLeft: 25, justifyContent: 'center' }}>
                <Text style={styles.userName}>{name}</Text>
                <Text style={styles.about}>
                  <Icon name='location-outline' style={{ fontSize: 16 }}></Icon>
                  {website}
                </Text>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                  }}
                >
                  <View style={styles.socialStatisticContainter}>
                    <Text style={styles.follower}>1.5 M</Text>
                    <Text style={{ color: color.brandLight }}>Follower</Text>
                  </View>
                  <View style={styles.socialStatisticContainter}>
                    <Text style={styles.follower}>215 </Text>
                    <Text style={{ color: color.brandLight }}>Post</Text>
                  </View>
                </View>
              </View>
            </View>
          </View>

          <Card transparent style={styles.cardSection}>
            <CardItem header>
              <Text style={{ fontWeight: '700', fontSize: 20 }}>About us</Text>
            </CardItem>
            <CardItem>
              <Body>
                <Text>
                  {description}
                </Text>
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
            <CardItem header>
              <Text style={{ fontWeight: '700', fontSize: 20 }}>Statistic</Text>
            </CardItem>
            <CardItem
              style={{ justifyContent: 'center', alignContent: 'center' }}
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
            <CardItem header>
              <Text style={{ fontWeight: '700', fontSize: 20 }}>Top job</Text>
            </CardItem>
            <CardItem>
              <Body>
                <CardTopJob
                  width={300}
                  height={150}
                  backgroundImage={require('./company.jpg')}
                  label={'Hiring!!'}
                  description='HUhu'
                />
                <CardTopJob
                  width={300}
                  height={150}
                  backgroundImage={require('./company.jpg')}
                  label={'Hiring!!'}
                  description='HUhu'
                />
                <CardTopJob
                  width={300}
                  height={150}
                  backgroundImage={require('./company.jpg')}
                  label={'Hiring!!'}
                  description='HUhu'
                />
              </Body>
            </CardItem>
          </Card>
        </Container>
      </ScrollView>
    </Screen>
  )
}
