import { Dimensions, StyleSheet } from "react-native";
import { color } from "../../theme";
// const ROOT: ViewStyle = {
//   backgroundColor: color.palette.black,
//   flex: 1,
// }
const {width,height}= Dimensions.get("screen");
export const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: color.brandPrimary,
      justifyContent: 'center',
      alignItems: 'center',
    },
    header: {
      fontFamily: "roboto-700",
      color: color.palette.white,
      fontSize: 30,
      textAlign: "center",
      marginTop: height/15,
      height: height/15,
      alignSelf: "center",
    },
    footer: {
      width: width,
      height: height,
      borderRadius: 44,
      marginTop: height/15,
      marginLeft: -3
    },
    rect: {
      width: width,
      height: height*0.8,
      borderTopLeftRadius: 44,
      borderTopRightRadius:44,
      backgroundColor: color.palette.white,//"#E6E6E6",
      marginTop: height/15,
      elevation: 30,
      shadowOpacity: 10,
      shadowRadius: 10,
    
    },
    group2: {
      width: 297,
      height: 421,
      justifyContent: "space-around",
      alignItems: "center",
      marginTop: 28,
      marginLeft: 33
    },
    group: {
      width: 297,
      height: 326,
      justifyContent: "space-around",
      alignItems: "stretch"
    },
    textInput: {
      justifyContent: "center",
      fontFamily: "roboto-regular",
      color: color.brandDark,
      backgroundColor: color.palette.white,
      height: height*0.08,
      width: width*0.8,
      borderRadius: 22,
      textAlign: "center",
      lineHeight: 20,
      fontSize: 20,
      elevation: 10,
      alignSelf: "center"
    },
    
    submitButton: {
      width: 213,
      height: 47
    },
    button: {
      backgroundColor: color.brandPrimary,
      borderRadius: 33,
      elevation: 15,
      shadowOpacity: 1,
      shadowRadius: 5,
      justifyContent: "center",
      flex: 1
    },
    submit: {
      fontFamily: "roboto-700",
      color:color.palette.white,
      fontSize: 23,
      alignSelf: "center"
    },
    
    });
    