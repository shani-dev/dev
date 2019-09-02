/** @format */

import { StyleSheet, Dimensions } from 'react-native'

const { width } = Dimensions.get('window')

export default StyleSheet.create({
	body: {
	},
	walletWrap: {
		position: 'relative',
		marginTop: 24,
		marginLeft: 15,
		marginRight: 15
	},
	walletImg: {
		width: (width) - 30,
		resizeMode: 'contain'
	},
	walletInner: {
		position: 'absolute',
		width: '100%',
		height: '100%',
		paddingLeft: 15,
		paddingTop: 10
	},
	walletQR: {
		width: 150,
		height: 150,
		top: 0,
		right: 10
	},
	walletQRImage: {
		position: 'absolute',
		right: 10,
		width: 120,
		height: 120,
		resizeMode: 'cover'
	},
	walletName: {
		fontSize: 16,
		color: '#fff'
	},
	walletBalanceWrap: {
		position: 'absolute',
		bottom: 15,
		left: 15
	},
	textAvail: {
		color: '#fff'
	},
	walletBalance: {
		color: '#fff',
		fontWeight: 'bold',
		fontSize: 30
	},
	listTitle: {
		fontWeight: 'bold',
		fontSize: 14
	},
	listSubTitle: {
		fontSize: 12,
		color: '#aaa'
	},
	listHeading: {
		fontSize: 12,
		color: '#aaa',
		marginLeft: 15,
		marginRight: 15,
		marginTop: 5
	},
	listHeading2: {
		fontSize: 12,
		color: '#aaa'
	},
	sendWrap: {
		marginTop: 20,
		marginLeft: 15,
		marginRight: 15
	},
	qr_code: {
		position: 'absolute',
		width: 100,
		height: 100,
		right: 15,
		top: 10,
		zIndex: 10
	},
	piggy: {
		position: 'absolute',
		width: 50,
		height: 50,
		right: 48,
		bottom: 30,
		zIndex: 10
	}
})