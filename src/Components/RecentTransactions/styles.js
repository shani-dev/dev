import { StyleSheet, Dimensions } from 'react-native'

export default StyleSheet.create({
	headerWrapper: {
		flexDirection: 'row'
	},
	heading: {
		fontWeight: 'bold'
	},
	wrap: {
		flexDirection: 'row'
	},
	listHeading2: {
		fontSize: 12,
		color: '#aaa'
	},
	list: {
		backgroundColor: '#fff',
		borderRadius: 10
	},
	listItem: {
		backgroundColor: '#fff',
		paddingLeft: 15,
		paddingRight: 15,
		paddingTop: 12,
		paddingBottom: 12,
		borderBottomColor: '#efefef',
		borderBottomWidth: StyleSheet.hairlineWidth
	},
	listInner: {
		flexDirection: 'row',
		justifyContent: 'space-between'
	},
	textDate: {
		fontSize: 11,
		color: '#999'
	},
	textTitle: {
		fontWeight: 'bold'
	},
	textAmount: {
		justifyContent: 'flex-end',
		fontWeight: 'bold',
		textAlign: 'right'
	}
})