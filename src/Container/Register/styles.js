import { StyleSheet } from 'react-native'

export default StyleSheet.create({
	body: {
		flex: 1
	},
	scroll: {
		flex: 1,
		paddingLeft: 15,
		paddingRight: 15,
		paddingTop: 15,
		paddingBottom: 15
	},
	heading: {
		flexDirection: 'row',
		color: '#07C',
		textAlign: 'center'
	},
	formWrapper: {
		marginTop: 20,
		marginBottom: 50
	},
	inputLabel: {
		flexDirection: 'row',
		fontSize: 14,
		marginBottom: 10,
		color: '#333'
	},
	inputText: {
		flexDirection: 'row',
		height: 50,
		backgroundColor: '#f1f1f1',
		borderTopRightRadius: 3,
		borderBottomRightRadius: 3,
		fontSize: 16,
		paddingLeft: 10,
		paddingRight: 10,
		marginBottom: 20,
		borderWidth: 1,
		borderColor: '#f1f1f1'
	},
	inputTextError: {
		borderColor: '#ff9595'
	},
	avatarWrap: {
		flexDirection: 'row',
		justifyContent: 'center'
	},
	avatar: {
		width: 200,
		resizeMode: 'contain'
	},
	submitButton: {
		height: 50
	},
})