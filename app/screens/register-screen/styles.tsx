import { Dimensions, StyleSheet } from 'react-native'
import { color } from '../../theme'

const { width, height } = Dimensions.get('screen')
export const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: color.brandPrimary,
  },

  header: {
    width: width,
    height: height / 6,
    justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor:"#000"
  },
  rect: {
    width: width,
    height: (height * 5) / 6,
    // justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: color.palette.white,
    borderTopLeftRadius: 44,
    borderTopRightRadius: 44,
    elevation: 30,
    shadowOpacity: 10,
    shadowRadius: 10,
  },
  input: {
    width: width,
    marginVertical: height * 0.1,
  },

  inputText: {
    justifyContent: 'center',
    fontFamily: 'roboto-regular',
    color: color.brandDark,
    backgroundColor: color.palette.white,
    height: height * 0.07,
    width: width * 0.8,
    textAlign: 'left',
    lineHeight: 20,
    fontSize: 20,
  },
  lineIcon: {
    height: height * 0.08,
    width: width * 0.8,
    flexDirection: 'row',
    alignSelf: 'center',
    justifyContent: 'flex-start',
    margin: width * 0.02,
    // backgroundColor:color.brandLight,
    borderBottomWidth: 2,
    borderBottomColor: color.brandPrimary,
  },
  icon: {
    color: color.brandDark,
    fontSize: 23,
    alignSelf: 'center',
  },

  registerButton: {
    height: height * 0.08,
    width: width * 0.6,

    backgroundColor: color.brandPrimary,
    borderRadius: 33,
  },
  button: {
    backgroundColor: color.brandPrimary,
    borderWidth: 2,
    borderColor: color.brandPrimary,
    borderRadius: 33,
    elevation: 10,
    shadowColor: color.palette.black,

    justifyContent: 'center',
    flex: 1,
  },
  register: {
    fontFamily: 'roboto-700',
    color: color.palette.white,
    fontSize: 23,
    alignSelf: 'center',
  },
})
