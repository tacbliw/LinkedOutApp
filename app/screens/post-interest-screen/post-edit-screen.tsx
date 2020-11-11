import { useNavigation } from "@react-navigation/native"
import { observer } from "mobx-react-lite"
import { Body, Card, CardItem, Container, Content, Header, Icon, Left, Text, Thumbnail } from "native-base"
import React from "react"
import { Dimensions, Image, StyleSheet, ViewStyle } from "react-native"
import { TextInput, TouchableOpacity } from "react-native-gesture-handler"
// import { useNavigation } from "@react-navigation/native"
// import { useStores } from "../../models"
import { color } from "../../theme"
const ROOT: ViewStyle = {
    backgroundColor: color.palette.black,
    flex: 1,
}

const screenWidth = Math.round(Dimensions.get('window').width);
const screenHeight = Math.round(Dimensions.get('window').height);
const siraj = require("./avatar.jpg");
const cover = require("./cover.jpg");

const styles = StyleSheet.create({
    header: {
      alignItems: 'center',
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    ButtonActive: {
      color: color.brandPrimary,
      fontWeight: 'bold',
    },
    ButtonDeactive: {
      color: color.brandLight,
      fontWeight: 'bold',
    },
  })

export const PostEditScreen = observer(function PostEditScreen() {
    // Pull in one of our MST stores
    // const { someStore, anotherStore } = useStores()
    // OR
    // const rootStore = useStores()

    // Pull in navigation via hook
    // const navigation = useNavigation()
    const navigation = useNavigation()
    const editDisabled = false
    return (
        <Container style={{ backgroundColor: '#f6f5fb' }}>
            <Header transparent style={styles.header}>
                <TouchableOpacity
                    onPress={() => {
                        navigation.goBack()
                    }}
                >
                    <Icon name="close-outline" style={{ color: color.brandLight }}></Icon>
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Create Post</Text>
                <TouchableOpacity onPress={() => { }} disabled={editDisabled}>
                    <Text
                        style={editDisabled ? styles.ButtonDeactive : styles.ButtonActive}
                    >
                        Edit
                    </Text>
                </TouchableOpacity>
            </Header>
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
                        <Image source={cover} style={{ height: 200, width: screenWidth * 0.8, borderRadius: 15 }} />
                    </CardItem>
                    <CardItem style={{ flexDirection: 'column', alignItems: 'flex-start' }}>

                        <TextInput style={{ fontWeight: 'bold', fontSize: 20 }}>Native Base</TextInput>
                        <TextInput multiline style={{ fontSize: 18 }}>NativeBase is a free and source framework that enable
                        developers to build high-quality mobile apps using React
                        Native iOS and Android apps with a fusion of ES6. NativeBase
                        builds a layer on top of React Native that provides you with
                        basic set of components for mobile application development.</TextInput>
                    </CardItem>
                </Card>
            </Content>
        </Container>
    )
})
