import { ActionSheet, Icon, Thumbnail } from "native-base"
import * as React from "react"
import { StyleSheet, TouchableOpacity, View, ViewStyle } from "react-native"
import { Text } from "../"
import { color } from "../../theme"

const postActionSheetButton = [
	{ text: "Not interested in this post", icon: "sad-outline", iconColor: color.brandLight },
	{ text: "Unfollow", icon: "analytics", iconColor: color.brandLight },
	{ text: "Report", icon: "flag-outline", iconColor: color.brandLight },
	{ text: "Cancel", icon: "close", iconColor: color.brandLight }
]

export interface PostProps {
	/**
	 * An optional style override useful for padding & margin.
	 */
	style?: ViewStyle,

	avatarUri?,

	name?: string,
	atname?: string,
	date?: string,

	content?: string,
	tag?: string[],

	reaction?: string[]

}

const ROOT: ViewStyle = {
	backgroundColor: color.palette.black,
	flex: 1,
}

const styles = StyleSheet.create({

	post: {
		flexDirection: 'row',
	},

	postUserAvatar: {
		marginLeft: 10,
		marginTop: 10,
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

/**
 * Describe your component here
 */
export function Post(props) {

	return (
		<View style={styles.post}>
			<Thumbnail style={styles.postUserAvatar} source={props.avatarUri} />
			<View style={styles.postContentContainer}>
				<View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
					<View style={{ flexDirection: 'row', alignItems: 'center' }}>
						<Text style={styles.postUsername}>{props.name}</Text>
						<Text style={styles.postAtName}> @{props.atname}</Text>
						<Text style={styles.postDate}> • {props.date}</Text>
					</View>
					<View>
						<TouchableOpacity onPress={() => {
							ActionSheet.show({
								options: postActionSheetButton,
								cancelButtonIndex: 3,
								destructiveButtonIndex: 2,
								title: "",
							},
								buttonIndex => {

								});
						}}>
							<Icon name="chevron-down-outline"></Icon>
						</TouchableOpacity>
					</View>
				</View>

				<View>
					<Text style={styles.postContent}>{props.content}</Text>
					<Text style={styles.postTag}>{props.tag[0]}</Text>
				</View>

				<View style={styles.postInteractionContainer}>
					<View>
						<TouchableOpacity style={styles.postInteractionButton}>
							<Icon name="chatbubble-outline"></Icon>
							<Text style={styles.reactionFontStyle}> {props.reaction[0]}</Text>
						</TouchableOpacity>
					</View>
					<View>
						<TouchableOpacity style={styles.postInteractionButton}>
							<Icon name="repeat-outline"></Icon>
							<Text style={styles.reactionFontStyle}> {props.reaction[1]}</Text>
						</TouchableOpacity>
					</View>
					<View>
						<TouchableOpacity style={styles.postInteractionButton}>
							<Icon name="heart-outline"></Icon>
							<Text style={styles.reactionFontStyle}> {props.reaction[2]}</Text>
						</TouchableOpacity>
					</View>
					<View>
						<TouchableOpacity style={styles.postInteractionButton}>
							<Icon name="share-social-outline"></Icon>
							<Text style={styles.reactionFontStyle}> {props.reaction[3]}</Text>
						</TouchableOpacity>
					</View>
				</View>
			</View>
		</View>

	)
}
