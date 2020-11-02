
import {
  Dimensions,
  StyleSheet
} from "react-native";
import { color } from "../../theme";

const {width,height} = Dimensions.get("screen");

export const styles = StyleSheet.create({

    imageLogoSplash:{
      flex:1, 
      alignItems: "center",
      justifyContent:"center", 
      backgroundColor: color.brandPrimary,
      color:color.palette.white},

    container: {
      flex: 1,
      backgroundColor: color.brandPrimary
    },
    header: {
      width: width,
      height: height/2.5, 
      alignItems: "center",
      justifyContent:"center"
    },
  
  
    middle: {
      flexDirection: 'column',  
      width: width,
      height: height/3,
      alignItems:'center',
      justifyContent:'center',
   
    },
      messageHeader: {
        flexDirection: "row",
        flex: 1,
        alignItems:"center"
      },
      iconMsg: {
        color: color.palette.offWhite,//"rgba(255,220,216,1)",
        fontSize: 40
      },
      jobsText: {
        fontFamily: "roboto-regular",
        color: color.palette.offWhite,//"#ffffff",
        fontSize: 35,
        marginLeft: 10,
        textAlign: 'center',
        justifyContent:'center'
      },
      text: {
        fontFamily: "roboto-regular",
        color: color.palette.offWhite,// "rgba(246,213,213,1)",
        fontSize: 15,
        textAlign: 'center',
        justifyContent:"center",
        flex:1
      },
  
  
    footer: {
      flex:1,
      width: width,
     // marginTop:height/8,
      flexDirection: "row",
      justifyContent:"flex-end",
      alignItems:"center"
    },
  
      leftFooter: {
        flex: 1,
        flexDirection: "row",
        width: width/2,
        alignItems:"center",
        justifyContent:"center",
      },
        rect: {
          width: 40,
          height: 12,
          backgroundColor: color.palette.white,
          borderRadius: 44,
          marginHorizontal: 2,
        },
        rect2: {
          width: 20,
          height: 12,
          backgroundColor: color.palette.white,
          borderRadius: 44,
          marginHorizontal: 2,
        },
  
      rightFooter: {
        width: width/2,
        alignItems:"center",
        justifyContent:"center",
      },
  
        button: {
          width: width*0.25,
          height: height*0.07,
          backgroundColor: color.palette.white,
          textAlign:"center",
          borderRadius: 44,
        },
        skipText: {
          position: "absolute",
          color: color.brandPrimary,
          fontSize: 23,
          alignSelf:"center",
          fontFamily: "roboto-700",
        },
  
  });