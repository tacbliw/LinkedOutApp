// import React from 'react'
// import { View, Text, Button, Dimensions, StyleSheet } from 'react-native'
// import { Text } from '../../components'

// export const SplashScreen = () => {
//   return (
//     <View>
//       <Text>LMAO</Text>
//     </View>
//   )
// }


import React from "react";
import {
  Dimensions,
  StatusBar, StyleSheet,
  Text, TouchableOpacity, View
} from "react-native";
import Svg, { Ellipse } from "react-native-svg";
import MaterialCommunityIconsIcon from "react-native-vector-icons/MaterialCommunityIcons";
import MaterialIconsIcon from "react-native-vector-icons/MaterialIcons";
import { screens } from "../../config/screens";
import { color } from "../../theme";

const {width,height} = Dimensions.get("screen");

export const SplashScreen = ({navigation}) => { 
  // useEffect(() => {
  //   const timer = setTimeout(() => {
  //     navigation.navigate('login)
  //   }, 10000);
  //   return () => clearTimeout(timer);
  // }, [])
  React.useEffect(() => {
    console.log('Splash')
  }, [])
  return (
    <View style={styles.container}>
      <StatusBar animated />
      
      <View style={styles.header}>
        <Svg style={styles.ellipse}>
          <Ellipse
            fill="rgba(230, 230, 230,1)"
            cx={width/2}
            cy={0}
            rx={width*0.7}
            ry={height/3}
          ></Ellipse>
        </Svg>
      </View>

      <View style={styles.middle}>
          <View style={styles.icon2Row}> 
            <MaterialCommunityIconsIcon
              name="message-text"
              style={styles.icon2}
            ></MaterialCommunityIconsIcon>
            
            <Text style={styles.jobs}>JOBS</Text>
          </View>
      </View>
      
      <Text style={styles.text}>
          Provide a plenty of jobs to find the best one for you
      </Text>
     
      <View style={styles.footer}>
        <View style={styles.leftFooterRow}>
          <View style={styles.leftFooter}>
            <View style={styles.rectRow}>
              <View style={styles.rect}></View>
              <View style={styles.rect2}></View>
            </View>
          </View>
          <View style={styles.rightFooter}>
          
            <TouchableOpacity style={styles.button} onPressOut={()=>navigation.navigate(screens.basic.login)}>
              <View style={styles.iconStack}>
                <MaterialIconsIcon
                  name="navigate-next"
                  style={styles.icon}
                ></MaterialIconsIcon>
              </View>
              <Text style={styles.skip}>SKIP</Text>
            </TouchableOpacity>
            
          </View>
        </View>
      </View>
      
      
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: color.brandPrimary
  },
  footer: {
    width: width,
    height: height/5,
    flexDirection: "row",
    marginTop: width/3,
    marginLeft: width/12,
  },
  leftFooter: {
    width: 70,
    height: 12,
    flexDirection: "row",
    marginTop: 25
  },
  rect: {
    width: 40,
    height: 12,
    backgroundColor: color.palette.white,
    borderRadius: 40
  },
  rect2: {
    width: 20,
    height: 12,
    backgroundColor: color.palette.white,
    borderRadius: 40,
    marginLeft: 10
  },
  rectRow: {
    height: 12,
    flexDirection: "row",
    flex: 1
  },
  rightFooter: {
    width: width/5,
    marginLeft: width/3
  },
  button: {
    width: width*0.25,
    height: height*0.07,
    backgroundColor: color.palette.white,
    
    elevation: 30,
    shadowRadius: 0,
    borderRadius: 33 
  },
  icon: {
    top: 1,
    left: 34,
    position: "absolute",
    color: "rgba(235,103,89,1)",
    fontSize: 38,
    // height: 40,
    // width: 40
  },
  skip: {
    marginTop: height*0.02,
    marginLeft: width*0.05,
    position: "absolute",
    fontFamily: "roboto-700",
    color: color.brandPrimary,
    fontSize: 20
  },
  iconStack: {
    width: 76,
    height: 42,
    marginTop: 4,
    marginLeft: 15
  },
  leftFooterRow: {
    flexDirection: "row",
    flex: 1
  },
  header: {
    width: width,
    height: height,
    marginTop: -height/1.75,
    alignSelf: "center",
   //backgroundColor: "#ffffff"
  },
  ellipse: {
    width: width*1.5,
    height: width*1.5
  },
  middle: {
    flexDirection: 'row',  
    width: width/4,
    height: height/10,
    marginLeft: width/3
  },
 
  icon2: {
    color: "rgba(255,220,216,1)",
    fontSize: 40
  },
  jobs: {
    fontFamily: "roboto-regular",
    color: "#ffffff",
    fontSize: 30,
    marginLeft: 10,
    textAlign: 'center'
  },
  icon2Row: {
    height: 43,
    flexDirection: "row",
    flex: 1,
  },
  text: {
    fontFamily: "roboto-regular",
    color: "rgba(246,213,213,1)",
    fontSize: 14,
     textAlign: 'center'
  }
});