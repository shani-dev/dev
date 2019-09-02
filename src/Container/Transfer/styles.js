import { StyleSheet, Dimensions } from 'react-native'
const { width } = Dimensions.get('window')

export default StyleSheet.create({
	body: {
		flex: 1,
		backgroundColor: '#f8f8f8'
	},
	containerStyle: {
		marginBottom: 20
	},
	inputContainerStyle: {
		paddingLeft: 0,
		paddingRight: 0,
		marginBottom: 15
	},
	inputStyle: {
		backgroundColor: '#ffffff',
		marginBottom: 20,
		marginTop: 10,
		paddingLeft: 10,
		paddingRight: 10
	},
	inputStyle2: {

	},
	topArea: {
		marginTop: 15,
		marginBottom: 15,
		marginLeft: 15,
		marginRight: 15
	},
	tabInner: {
		marginLeft: 15,
		marginRight: 15,
		paddingBottom: 15
	},
	cameraStyle: {
		width: (width) - 30,
		height: 300,
		overflow: 'hidden'
	},
	accordionHeader: {
		paddingLeft: 15,
		paddingRight: 15,
		paddingTop: 17,
		paddingBottom: 17,
		borderBottomWidth: 1,
		borderBottomColor: '#ebebeb',
		backgroundColor: '#f6f6f6'
	},
	accordionHeaderText: {
		fontWeight: 'bold'
	},
	radioContainerStyle: {
		paddingLeft: 0,
		paddingRight: 0,
		marginLeft: 0,
		marginRight: 0,
		backgroundColor: 'transparent',
		borderWidth: 0,
		marginBottom: 0,
		paddingBottom: 0
	},
	header: {
		backgroundColor: '#4a416e'
	}
})