import { observer } from 'mobx-react-lite'
import {
  Body,
  Card,
  CardItem,
  Container,
  Content,
  Icon,
  Left,
  List,
  ListItem,
  Text,
  Thumbnail,
  View,
} from 'native-base'
import React from 'react'
import { Dimensions, Image, ViewStyle } from 'react-native'
import { Comment } from '../../components'
import { CommentInput } from '../../components/comment/comment-input'
// import { useNavigation } from "@react-navigation/native"
// import { useStores } from "../../models"
import { color } from '../../theme'
const ROOT: ViewStyle = {
  backgroundColor: color.palette.black,
  flex: 1,
}

const screenWidth = Math.round(Dimensions.get('window').width)
const screenHeight = Math.round(Dimensions.get('window').height)
const siraj = require('./avatar.jpg')
const cover = require('./cover.jpg')
const datas = [
  {
    img: siraj,
    text: 'Kumar Pratik',
    note: 'Its time to build a difference . .',
    time: '3:43 pm',
  },
  {
    img: siraj,
    text: 'Kumar Sanket',
    note: 'One needs courage to be happy and smiling all time . . ',
    time: '1:12 pm',
  },
  {
    img: siraj,
    text: 'Megha',
    note: 'Live a life style that matchs your vision',
    time: '10:03 am',
  },
  {
    img: siraj,
    text: 'Atul Ranjan',
    note: 'Failure is temporary, giving up makes it permanent',
    time: '5:47 am',
  },
]
export const PostInterestScreen = observer(function PostInterestScreen() {
  // Pull in one of our MST stores
  // const { someStore, anotherStore } = useStores()
  // OR
  // const rootStore = useStores()

  // Pull in navigation via hook
  // const navigation = useNavigation()
  return (
    <Container style={{ backgroundColor: '#f6f5fb' }}>
      {/* <Header transparent>
                <Left>
                </Left>
                <Body />
                <Right>
                    <Button transparent>
                        <Icon name="close-outline" style={{ color: color.brandLight, fontSize: 30 }} />
                    </Button>
                </Right>
            </Header> */}

      <Content padder>
        <Card transparent>
          <CardItem>
            <Left>
              <Thumbnail circular source={siraj} />
              <Body>
                <Text>Siraj</Text>
                <Text note>@thesiraj</Text>
              </Body>
            </Left>
          </CardItem>
          <CardItem style={{ justifyContent: 'center' }}>
            <Image
              source={cover}
              style={{
                height: 200,
                width: screenWidth * 0.8,
                borderRadius: 15,
              }}
            />
          </CardItem>
          <CardItem
            style={{ flexDirection: 'column', alignItems: 'flex-start' }}
          >
            <Text style={{ fontWeight: 'bold', fontSize: 20 }}>
              Native Base
            </Text>
            <Text>
              NativeBase is a free and source framework that enable developers
              to build high-quality mobile apps using React Native iOS and
              Android apps with a fusion of ES6. NativeBase builds a layer on
              top of React Native that provides you with basic set of components
              for mobile application development.
            </Text>
          </CardItem>
          <CardItem>
            <View style={{ flex: 4 / 10 }}>
              <Text>People Interest </Text>
            </View>
            <View
              style={{
                alignItems: 'flex-start',
                flex: 6 / 10,
                flexDirection: 'row',
              }}
            >
              <List
                horizontal={true}
                dataArray={datas.slice(0, 4)}
                scrollEnabled={false}
                renderRow={(data) => (
                  <ListItem thumbnail>
                    <Image
                      style={{
                        borderWidth: 1,
                        borderColor: color.brandLight,
                        marginLeft: -15,
                        width: 40,
                        height: 40,
                        borderRadius: 20,
                      }}
                      source={data.img}
                    />
                  </ListItem>
                )}
              />
              <Icon
                name="ellipsis-horizontal-circle-outline"
                style={{ fontSize: 40 }}
              />
            </View>
          </CardItem>
          <CardItem style={{ flexDirection: 'column' }}>
            <List
              dataArray={datas}
              renderRow={(data) => (
                <ListItem
                  noIndent
                  style={{
                    borderBottomWidth: 1,
                    marginBottom: 5,
                    paddingTop: 0,
                    paddingRight: 0,
                    paddingLeft: 0,
                    paddingBottom: 0,
                  }}
                >
                  <Comment
                    avatar={data.img}
                    name={data.text}
                    content={data.note}
                    time={data.time}
                  />
                </ListItem>
              )}
            />
            <CommentInput avatar={siraj} />
          </CardItem>
        </Card>
      </Content>
    </Container>
  )
})
