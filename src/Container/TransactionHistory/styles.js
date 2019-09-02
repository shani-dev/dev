/** @format */

import { StyleSheet, Dimensions } from 'react-native'

const { width } = Dimensions.get('window')

export default StyleSheet.create({
	body: {
		flex: 1,
		backgroundColor: '#FBFBFB',
	},
	header: {
		height: 200,
		paddingTop: 22,
		paddingLeft: 15,
		paddingRight: 15,
	},
	headerBar: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		marginTop: 30,
		flexWrap: 'wrap',
	},
	backWrapper: {
		flex: 1,
		flexDirection: 'column',
	},
	backButton: {
		marginTop: 2,
	},
	logoWrapper: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'flex-start',
	},
	headerLogo: {
		flex: 1,
		width: 150,
		height: 35,
		resizeMode: 'contain',
	},
	headerNotif: {
		flex: 1,
		flexDirection: 'row',
		justifyContent: 'flex-end',
		flexWrap: 'wrap',
	},
	notifIcon: {
		marginTop: 8,
	},
	walletTitle: {
		flexDirection: 'row',
		marginTop: 20,
	},
	walletTitleText: {
		flex: 1,
		textAlign: 'center',
		color: '#ffffff',
		fontSize: 16
	},
	walletBalance: {
		flexDirection: 'row',
		flexWrap: 'wrap',
		justifyContent: 'center',
		marginTop: 10
	},
	balanceCurrency: {
		fontSize: 20,
		color: '#ffffff',
		lineHeight: 20
	},
	balanceText: {
		fontSize: 40,
		fontWeight: 'bold',
		color: '#ffffff',
		lineHeight: 40
	}
})