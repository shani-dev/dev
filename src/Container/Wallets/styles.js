import { StyleSheet, Dimensions } from 'react-native'

const { width, height } = Dimensions.get('window');

export default StyleSheet.create({
	body: {
		flex: 1,
		paddingTop: 30
	},
	header: {
		height: 200,
		paddingTop: 22,
		paddingLeft: 15,
		paddingRight: 15
	},
	headerBar: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		marginTop: 20,
		flexWrap: 'wrap',
	},
	backWrapper: {
		flexDirection: 'row',
	},
	backButton: {
		marginTop: 2,
	},
	addWrapper: {
		flexDirection: 'row'
	},
	walletListHeading: {
		color: '#aaa',
		marginBottom: 10
	},
	walletTitle: {
		flexDirection: 'row',
		marginTop: 10,
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
	},
	walletListWrap: {
		marginBottom: 15
	},
	walletScroll: {
		paddingLeft: 15,
		paddingRight: 15,
		paddingTop: 15,
		height: height - 200
	},
	walletWrap: {
		position: 'relative',
		marginBottom: 15,
		marginTop: -170,
		width: '100%'
	},
	walletItem: {
		flexDirection: 'row',
		width: (width) - 30,
		borderRadius: 10,
		padding: 10,
		zIndex: 0
	},
	walletImage: {
		width: (width) - 30,
		resizeMode: 'contain'
	},
	walletItemTextWrap: {
		position: 'absolute',
		width: '100%',
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'flex-start'
	},
	walletItemName: {
		position: 'absolute',
		top: 10,
		left: 15,
		color: '#fff',
		fontWeight: 'bold'
	},
	walletItemBalance: {
		position: 'absolute',
		top: 10,
		right: 15,
		backgroundColor: 'rgba(0, 0, 0, 0.7)',
		color: '#fff',
		paddingLeft: 7,
		paddingRight: 7,
		paddingTop: 1,
		paddingBottom: 1,
		borderRadius: 7,
		fontSize: 12,
		marginTop: 1
	}
});