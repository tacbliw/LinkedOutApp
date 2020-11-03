import { Card, CardItem, Icon, Thumbnail } from "native-base";
import * as React from "react";
import { Dimensions, StyleSheet, TextStyle, View, ViewStyle } from "react-native";
import { Text } from "../";
import { color, typography } from "../../theme";

const screenWidth = Math.round(Dimensions.get('window').width);
const screenHeight = Math.round(Dimensions.get('window').height);

const CONTAINER: ViewStyle = {
  justifyContent: "center",
}

const TEXT: TextStyle = {
  fontFamily: typography.primary,
  fontSize: 14,
  color: color.primary,
}

const styles = StyleSheet.create({

	post: {
		flexDirection: 'row',
	},

	postCompanyAvatar: {
		// marginLeft: 10,
    // marginTop: 10,
    width: 100,
    height: 100,
    borderRadius: 15
	},

	postContentContainer: {
		marginLeft: 10
	},

	postUsername: {
		color: color.brandDark,
		fontWeight: '700',
		fontSize: 20,
	},

	postAtName: {
		color: color.brandLight,
	},

	postDate: {
		color: color.brandLight
	},

	postContent: {
		width: 320,
    color: color.brandDark,
    fontSize: 20
	},

	postTag: {
		color: color.brandPrimary
	},

	postInteractionContainer: {
		flexDirection: 'row',
		justifyContent: 'space-between'
	},

	postInteractionButton: {
		flexDirection: 'row',
		alignItems: 'center',
	},

	reactionFontStyle: {
		color: color.brandDark
	}
})

export interface JobPostProps {
  /**
   * An optional style override useful for padding & margin.
   */
  style?: ViewStyle,

  avatarUri?,

	name?: string,
  date?: string,
  place?: string,
  seniority_level?: string
}

/**
 * Describe your component here
 */
export function JobPost(props: JobPostProps) {
  const { style } = props

  return (
    <Card transparent style={{borderWidth: 10}}>
    <CardItem header style={{width: screenWidth*0.9, justifyContent: 'space-between', alignItems: 'flex-start', borderRadius: 15}}>
      <View style={{flexDirection: 'row'}}>
        <Thumbnail style={styles.postCompanyAvatar} source={props.avatarUri} />
        <View style={{marginLeft: 16, flexDirection: 'column', justifyContent: 'space-between'}}>
          <View>
            <Text style={styles.postUsername}>{props.name}</Text>
            <Text style={styles.postDate}>{props.date}</Text>
          </View>
          <View style={{flexDirection: 'row', justifyContent: 'space-around'}}>
            <Text style={{color: color.brandDark}}><Icon style={{fontSize: 16}} name="location-outline"/> {props.place}</Text>
            <Text style={{color: color.brandDark}}><Icon style={{fontSize: 16}} name="person-outline"/> {props.seniority_level}</Text>
            {/* <Text style={styles.postDate}>{props.date}</Text> */}
          </View>
        </View>

      </View>
    </CardItem>
  </Card>
  )
}
