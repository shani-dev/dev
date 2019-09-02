/** @format */

import { StyleSheet, Dimensions } from 'react-native'

const { width } = Dimensions.get('window')

export default StyleSheet.create({
	body: {
		flex: 1,
		paddingBottom: 15
	},
	scroll: {
		paddingLeft: 15,
		paddingRight: 15,
		paddingTop: 15,
		paddingBottom: 15
	},
	header: {
		flexDirection: 'row',
		justifyContent: 'center',
		marginBottom: 40
	},
	headerText: {
		color: '#07C',
	},
	textLabel: {
		textAlign: 'center',
		marginBottom: 10
	},
	imageWrapper: {
		flexDirection: 'row',
		justifyContent: 'center',
		marginBottom: 40
	},
	getStarted: {
	},
	phoneInputWrapper: {
		flexDirection: 'row',
		marginTop: 10,
		justifyContent: 'space-between'
	},
	inputCode: {
		width: 80,
		height: 50,
		textAlign: 'center',
		borderColor: '#ebebeb',
		borderTopWidth: 1,
		borderBottomWidth: 1,
		borderLeftWidth: 1,
		borderTopLeftRadius: 3,
		borderBottomLeftRadius: 3,
		fontSize: 20
	},
	inputPhone: {
		flex: 1,
		height: 50,
		backgroundColor: '#ececec',
		borderTopRightRadius: 3,
		borderBottomRightRadius: 3,
		fontSize: 18,
		paddingLeft: 10,
		paddingRight: 10
	},
	textAgreement: {
		flexDirection: 'row',
		textAlign: 'center',
		width: '100%',
		marginBottom: 15,
		fontSize: 11,
		color: '#999'
	},
	submitWrap: {
		marginTop: 30,
		marginBottom: 30
	},
	submitButton: {
		height: 50
	},
	waitingTextHeader: {
		textAlign: 'center',
		fontSize: 20,
		marginTop: 20,
		marginBottom: 10
	},
	waitingTextSubHeader: {
		textAlign: 'center',
		fontSize: 14
	},
	waitingPhoneNum: {
		fontSize: 30,
		color: '#009688',
		textAlign: 'center',
		marginTop: 20
	},
	inputCodeWrap: {
		flexDirection: 'row',
		justifyContent: 'center',
		marginTop: 30
	},
	space: {
		fontWeight: 'bold',
		color: '#333',
		fontSize: 20,
		marginLeft: 5,
		marginRight: 5
	},
	inputCodeText: {
		height: 50,
		backgroundColor: '#fff',
		borderBottomWidth: 0.5,
		borderBottomColor: '#000',
		borderStyle: 'solid',
		fontSize: 20,
		marginLeft: 5,
		marginRight: 5,
		paddingLeft: 10,
		paddingRight: 10,
		textAlign: 'center'
	},
	verButtonContainerStyle: {
		flexDirection: 'row',
		alignItems: 'center',
		flexWrap: 'wrap',
		justifyContent: 'center'
	},
	verButtonStyle: {
		flexDirection: 'row',
		marginLeft: 5,
		marginRight: 5,
		marginBottom: 10,
		marginTop: 20
	},
	verButtonInnerStyle: {
		flexDirection: 'row'
	}
})