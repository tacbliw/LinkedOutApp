import { Dimensions, StyleSheet } from 'react-native'
import { color } from '../../theme'
const { width, height } = Dimensions.get('screen')
export const styles = StyleSheet.create({
  button: {
    backgroundColor: color.brandPrimary,
    borderRadius: 33,
    // elevation: 15,
    flex: 1,
    justifyContent: 'center',
  },
  container: {
    alignItems: 'center',
    backgroundColor: color.brandPrimary,
    flex: 1,
    justifyContent: 'center',
  },
  group: {
    alignItems: 'stretch',
    justifyContent: 'space-around',
    //  backgroundColor:"#000",
    marginBottom: height * 0.05,
  },
  group2: {
    // justifyContent: "space-around",
    alignItems: 'center',
    // backgroundColor:color.brandPrimary,
  },
  header: {
    alignSelf: 'center',
    color: color.palette.white,
    fontFamily: 'roboto-700',
    fontSize: 30,
    height: height / 15,
    justifyContent: 'center',
    marginTop: height / 15,
    textAlign: 'center',
  },
  rect: {
    alignItems: 'center',
    backgroundColor: color.palette.white, // "#E6E6E6",
    borderTopLeftRadius: 44,
    borderTopRightRadius: 44,
    elevation: 30,
    height: height * 0.8,
    justifyContent: 'space-evenly',
    // marginTop: height/15,
    shadowOpacity: 10,
    shadowRadius: 10,
    width: width,
  },
  submit: {
    alignSelf: 'center',
    color: color.palette.white,
    fontFamily: 'roboto-700',
    fontSize: 23,
  },
  submitButton: {
    height: height * 0.07,
    width: width * 0.4,
  },
  textInput: {
    marginTop: 24,
  },

  textInputIcon: {
    color: color.brandPrimary,
  },
})
