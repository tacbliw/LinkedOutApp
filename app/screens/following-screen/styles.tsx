import { Dimensions, StyleSheet } from 'react-native'
import { color } from '../../theme'

const { width, height } = Dimensions.get('screen')
export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: color.backgroundSetting,
  },
  //   header:{
  //     backgroundColor:color.brandDanger,
  //     color: color.palette.white,
  //     fontFamily: "roboto-regular",
  //     fontSize:50,
  //     width: width,
  //     height: height/6,
  //     justifyContent:'center',
  //     textAlign:'center',
  //     elevation: 20,
  //     borderRadius: 2,
  //   },
  header: {
    backgroundColor: color.brandDanger,
    color: color.palette.white,
    fontSize: 40,
    width: width,
    height: height / 8,
    justifyContent: 'center',
    textAlign: 'center',
    //marginLeft: width*0.05,
    elevation: 20,
    borderRadius: 2,
    fontWeight: '700',
  },
  line: {
    marginVertical: height * 0.01,
    backgroundColor: '#f9fbe7',
    //elevation: 50,
    marginLeft: 0,
    height: height * 0.1,
    width: width,
    justifyContent: 'center',
  },
  text: {
    color: color.brandDark,
    fontSize: 25,
    alignSelf: 'center',
    width: width * 0.65,
    fontWeight: '700',
    //  backgroundColor:color.brandPrimary
  },
  info: {
    flex: 1,
    marginLeft: width * 0.05,
    flexDirection: 'column',
    alignItems: 'stretch',
  },
  name: {
    color: color.brandDark,
    fontSize: 20,
    fontWeight: '700',
  },

  type: {
    color: color.pickerOption,
    fontSize: 15,
  },
})
