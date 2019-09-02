/** @format */

import { StyleSheet, Dimensions, PixelRatio } from 'react-native'

export default StyleSheet.create({
	body: {
		flex: 1,
		backgroundColor: '#FBFBFB',
		position: 'relative'
	},
	header: {
		height: 245,
		paddingTop: 22,
		paddingLeft: 15,
		paddingRight: 15,
	},
	headerBar: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		marginTop: 30,
	},
	changeHeaderBtnIcon: {
		top: 3,
		backgroundColor: 'rgba(255,255,255,0.1)',
		width: 30,
		height: 30,
		marginLeft: 15,
		alignItems: 'center',
		justifyContent: 'center',
		borderRadius: 30 / PixelRatio.get()
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
		marginRight: 15,
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
		fontSize: 16,
	  textShadowColor: 'rgba(0, 0, 0, 0.55)',
	  textShadowOffset: {width: -1, height: 1},
	  textShadowRadius: 6
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
		lineHeight: 20,
	  textShadowColor: 'rgba(0, 0, 0, 0.55)',
	  textShadowOffset: {width: -1, height: 1},
	  textShadowRadius: 6
	},
	balanceText: {
		fontSize: 40,
		fontWeight: 'bold',
		color: '#ffffff',
		lineHeight: 40,
	  textShadowColor: 'rgba(0, 0, 0, 0.55)',
	  textShadowOffset: {width: -1, height: 1},
	  textShadowRadius: 6
	},
	headerQuickBar: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		borderRadius: 5,
		backgroundColor: '#ffffff',
		marginTop: 18,
		paddingTop: 15,
		paddingBottom: 15,
		shadowColor: "#000",
		shadowOffset: {
			width: 0,
			height: 2
		},
		shadowOpacity: 0.23,
		shadowRadius: 2.62,
		elevation: 4,
		zIndex: 10,
	},
	quickBarItem: {
		flex: 1,
		alignItems: 'center',
	},
	quickBarItemImg: {
		width: 30,
		height: 30,
		resizeMode: 'contain',
	},
	quickBarItemText: {
		fontSize: 12,
		marginTop: 2,
	},
	contentWrapper: {
		paddingLeft: 15,
		paddingRight: 15,
	},
	stackedBarBottom: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'flex-end',
		paddingTop: 7,
		paddingBottom: 15,
		paddingLeft: 15,
		paddingRight: 15,
		backgroundColor: '#F9F9F9',
		shadowOffset: {
			width: 0,
			height: -3,
		},
		shadowOpacity: 1,
		shadowRadius: 5,
		elevation: 4,
	},
	stackedBarButton: {
		alignSelf: 'flex-end',
	},
	stackedBarIcon: {
		width: 28,
		height: 28,
		resizeMode: 'contain',
	},
})