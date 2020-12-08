import { Dimensions, StyleSheet } from 'react-native'
import { color } from '../../theme/color'


const { width, height } = Dimensions.get('screen')
export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    fontSize: 36,
    fontWeight: '700',
  },

  cardHeader: {
    borderColor: color['color-gray-200'], 
    borderTopWidth: 1, 
    borderLeftWidth: 1, 
    borderRightWidth: 1, 
    borderTopLeftRadius: 10, 
    borderTopRightRadius: 10,
    backgroundColor: color['color-gray-200']
  },

  cardBody: {
    borderColor: color['color-gray-200'], 
    borderLeftWidth: 1, 
    borderRightWidth: 1,
    backgroundColor: color['color-gray-200']
  },

  cardFooter: {
    borderColor: color['color-gray-200'], 
    borderBottomWidth: 1, 
    borderLeftWidth: 1, 
    borderRightWidth: 1,
    borderBottomLeftRadius: 10, 
    borderBottomRightRadius: 10,
    backgroundColor: color['color-gray-200']
  }
})
