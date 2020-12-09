import { Dimensions, StyleSheet } from 'react-native'
import { color } from '../../theme'

const { width, height } = Dimensions.get('screen')

export const styles = StyleSheet.create({
  button: {
    backgroundColor: color.palette.white,
    borderRadius: 44,
    height: height * 0.07,
    justifyContent: 'center',
    textAlign: 'center',
    width: width * 0.25,
  },
  container: {
    backgroundColor: color.brandPrimary,
    flex: 1,
  },
  footer: {
    flex: 1,
    flexDirection: 'row',
    width: width,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  header: {
    alignItems: 'center',
    height: height / 2.5,
    justifyContent: 'center',
    width: width,
  },
  iconMsg: {
    color: color.palette.white, // "rgba(255,220,216,1)",
    fontSize: 40,
  },
  imageLogoSplash: {
    alignItems: 'center',
    backgroundColor: color.brandPrimary,
    color: color.palette.orangeDarker,
    flex: 1,
    justifyContent: 'center',
  },
  jobsText: {
    color: color.palette.white, // "#ffffff",
    fontFamily: 'roboto-regular',
    fontSize: 35,
    justifyContent: 'center',
    marginLeft: 10,
    textAlign: 'center',
  },
  leftFooter: {
    flex: 1,
    flexDirection: 'row',
    width: width / 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoThumbnail: {
    resizeMode: 'contain',
    width: 300,
  },
  messageHeader: {
    flexDirection: 'row',
    flex: 1,
    alignItems: 'center',
  },
  middle: {
    alignItems: 'center',
    flexDirection: 'column',
    height: height / 3,
    justifyContent: 'center',
    width: width,
  },
  rect: {
    backgroundColor: color.palette.white,
    borderRadius: 44,
    height: 12,
    marginHorizontal: 2,
    width: 40,
  },
  rect2: {
    backgroundColor: color.palette.white,
    borderRadius: 44,
    height: 12,
    marginHorizontal: 2,
    width: 20,
  },
  rightFooter: {
    alignItems: 'center',
    justifyContent: 'center',
    width: width / 2,
  },
  skipText: {
    alignSelf: 'center',
    color: color.brandPrimary,
    fontFamily: 'roboto-700',
    fontSize: 23,
    position: 'absolute',
  },
  text: {
    color: color.palette.white, // "rgba(246,213,213,1)",
    flex: 1,
    fontFamily: 'roboto-regular',
    fontSize: 15,
    justifyContent: 'center',
    textAlign: 'center',
  },
})
