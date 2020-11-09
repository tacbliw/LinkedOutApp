// import {
//   Dimensions, StyleSheet
// } from "react-native";
// import { color } from "../../theme";
  
  
//   const {width,height}=Dimensions.get("screen");
//   export const styles = StyleSheet.create({
//       container: {
//         flex: 1,
//         justifyContent: 'center',
//         alignItems: 'center',
//         backgroundColor: color.brandPrimary,
//       },
      
//     //   header: {
//     //     width: width,
//     //     height: height/6,
//     //     justifyContent: 'center',
//     //     alignItems: 'center',
//     //   },
//     //   rect: {
//     //     width: width,
//     //     justifyContent: '',
//     //     alignItems: 'center',
  
//     //   },
//     //   input: {
  
//     //   },
//     //     placeHolder: {
  
//     //     },
//     //     inputText
//       rect: {
//         width: width,
//         height: height*0.8,
//         marginTop:height*0.15, 
//         backgroundColor: color.palette.white,
  
//         borderTopLeftRadius: 44,
//         borderTopRightRadius:44,
//         elevation: 30,
//         shadowOpacity: 10,
//         shadowRadius: 10,
     
//       },
//       textInput: {
//         justifyContent: "center",
//         fontFamily: "roboto-regular",
//         color: color.brandDark,
//         backgroundColor: color.palette.white,
//         height: height*0.08,
//         width: width*0.8,
//         borderRadius: 22,
//         textAlign: "center",
//         lineHeight: 20,
//         fontSize: 20,
//         elevation: 10,
//         alignSelf: "center"
//       },
      
//       group2: {
//         width: 297,
//         height: 421,
//         justifyContent: "space-between",
//         alignItems: "center",
//         marginTop: 28,
//         marginLeft: 33
//       },
//       group: {
//         width: 297,
//         height: 326,
//         justifyContent: "space-around",
//         alignItems: "stretch"
//       },
//       userName: {
//         width: 289,
//         height: 56
//       },
//       icon: {
//         left: 5,
//         position: "absolute",
//         color: "rgba(128,128,128,1)",
//         fontSize: 32,
//         top: 12
//       },
//       username: {
//         position: "absolute",
//         fontFamily: "roboto-regular",
//         color: color.brandDark,
//         backgroundColor: color.palette.white,
//         height: height*0.08,
//         width: width*0.8,
//         borderRadius: 22,
//         textAlign: "center",
//         lineHeight: 20,
//         fontSize: 20,
//         elevation: 10,
        
//         alignSelf: "center"
//       },
//       iconStack: {
//         height: 56
//       },
//       email: {
//         width: 289,
//         height: 56
//       },
//       icon2: {
//         top: 16,
//         left: 13,
//         position: "absolute",
//         color: "rgba(128,128,128,1)",
//         fontSize: 32
//       },
//       mail: {
//         position: "absolute",
//         fontFamily: "roboto-regular",
//         color: color.brandDark,
//         backgroundColor: color.palette.white,
//         height: height*0.08,
//         width: width*0.8,
//         borderRadius: 22,
//         textAlign: "center",
//         lineHeight: 20,
//         fontSize: 20,
//         elevation: 10,
//         alignSelf: "center"
//       },
//       icon2Stack: {
//         width: 289,
//         height: 56
//       },
//       type: {
//         width: 289,
//         height: 56,
//         justifyContent: "center"
//       },
//       user: {
//         fontFamily: "roboto-regular",
//         color: color.brandDark,
//         backgroundColor: color.palette.white,
//         height: height*0.08,
//         width: width*0.8,
//         borderRadius: 22,
//         textAlign: "center",
//         lineHeight: 20,
//         fontSize: 20,
//         elevation: 10,
//         alignSelf: "center"
//       },
//       gender: {
//         width: 289,
//         height: 56
//       },
//       icon3: {
//         left: 5,
//         position: "absolute",
//         color: "rgba(128,128,128,1)",
//         fontSize: 32,
//         top: 11
//       },
//       password: {
//         fontFamily: "roboto-regular",
//         color: color.brandDark,
//         backgroundColor: color.palette.white,
//         height: height*0.08,
//         width: width*0.8,
//         borderRadius: 22,
//         textAlign: "center",
//         lineHeight: 20,
//         fontSize: 20,
//         elevation: 10,
//         alignSelf: "center",
//       },
//       icon3Stack: {
//         width: 289,
//         height: 56
//       },
//       registerButton: {
//         width: 213,
//         height: 47
//       },
//       button: {
//         backgroundColor: color.brandPrimary,
//         borderWidth: 2,
//         borderColor: color.brandPrimary,
//         borderRadius: 33,
//         elevation: 10,
//         shadowColor: color.palette.black,
       
//         justifyContent: "center",
//         flex: 1,
//       },
//       register: {
//         fontFamily: "roboto-700",
//         color: color.palette.white,
//         fontSize: 23,
//         alignSelf: "center"
//       }
//     });




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
    
  
    rect: {
      width: width,
      height: height*0.8,
      borderTopLeftRadius: 44,
      borderTopRightRadius:44,
      backgroundColor: color.palette.white,//"#E6E6E6",
      elevation: 30,
      shadowOpacity: 10,
      shadowRadius: 10,
    
    },
    group2: {
      alignItems: "center",
      marginTop: height/15,
      
    },
    group: {
     
      justifyContent: "space-around",
      alignItems: "stretch",
      marginBottom:height*0.05,
    },
    textInput: {
      
      fontFamily: "roboto-regular",
      color: color.brandDark,
      backgroundColor: color.palette.white,
      height: height*0.08,
      width: width*0.8,
      borderRadius: 25,
      marginVertical: height*0.01,
  
      lineHeight: 20,
      fontSize: 20,
      elevation: 10,
    },
    textInputDescription: {
      fontFamily: "roboto-regular",
      color: color.brandDark,
      backgroundColor: color.palette.white,
      height: height*0.2,
      width: width*0.8,
      borderRadius: 25,
      marginVertical: height*0.01,
  
      lineHeight: 20,
      fontSize: 20,
      elevation: 10,

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
    
    