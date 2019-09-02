import { StyleSheet } from 'react-native'
import { Platform } from 'react-native'

const statusBarHeight = Platform.OS === 'ios' ? 35 : 0
const fontFamily = Platform.OS === 'ios' ? 'Avenir' : 'sans-serif'

export default StyleSheet.create({
	body: {
		flexGrow: 1,
		alignItems: 'center',
		marginLeft: 15,
		marginRight: 15,
	},
	navBar: {
		backgroundColor: '#8c231c',
		height: 44 + statusBarHeight,
		alignSelf: 'stretch',
		paddingTop: statusBarHeight,
		justifyContent: 'center',
		alignItems: 'center',
	},
	navBarTitle: {
		color: 'white',
		fontFamily,
		fontSize: 17,
	},
	inputContainerStyle: {
		paddingLeft: 0,
		paddingRight: 0,
		marginBottom: 15
	},
	inputStyle: {
		backgroundColor: '#f8f8f8',
		marginBottom: 20,
		marginTop: 10,
		paddingLeft: 10,
		paddingRight: 10,
		borderColor: '#f1f1f1',
		borderWidth: 1
	},
	disabled: {
		backgroundColor: '#C0C0C0',
	},
	button: {
		width: '40%'
	},
	buttonGroup: {
		flex: 1,
		flexDirection: 'row'
	},
})