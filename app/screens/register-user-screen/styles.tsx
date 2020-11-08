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
      justifyContent:'center',
      marginTop: height/15,
      height: height/15,
      alignSelf: "center",
    },
    footer: {
      width: width,
      height: height,
      borderRadius: 44,
     // marginTop: height/15,
  
    },
    rect: {
      width: width,
      height: height*0.8,
      borderTopLeftRadius: 44,
      borderTopRightRadius:44,
      backgroundColor: color.palette.white,//"#E6E6E6",
      justifyContent:'center',
     // marginTop: height/15,
      elevation: 30,
      shadowOpacity: 10,
      shadowRadius: 10,
    
    },
    group2: {
     
     // justifyContent: "space-around",
      alignItems: "center",
     //backgroundColor:color.brandPrimary,

      
    },
    group: {
     
      justifyContent: "space-around",
    //  backgroundColor:"#000",
      alignItems: "stretch",
      marginBottom:height*0.05,
    },
    textInput: {
      //justifyContent: "center",
      fontFamily: "roboto-regular",
      color: color.brandDark,
      backgroundColor: color.palette.white,
      height: height*0.08,
      width: width*0.8,
      borderRadius: 22,
      marginVertical: height*0.01,
     // marginLeft: width*0.1,
      // textAlign: "center",
      lineHeight: 20,
      fontSize: 20,
      elevation: 10,
      //alignSelf: "center"
    },
    
    submitButton: {
      width: width*0.6,
      height: height*0.08,
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
    