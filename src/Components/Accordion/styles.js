import { StyleSheet } from 'react-native';

export default StyleSheet.create({
	heading: {
		flexDirection: 'row',
		paddingTop: 16,
		paddingBottom: 16,
		paddingLeft: 15,
		paddingRight: 15,
		backgroundColor: '#eee',
		justifyContent: 'space-between',
		borderTopWidth: 1,
		borderTopColor: '#dedede',
		borderBottomWidth: 1,
		borderBottomColor: '#dedede'
	},
	headingText: {
		fontWeight: 'bold',
		fontSize: 16
	},
	contentInner: {
		padding: 15
	},
	headingArrow: {
		transform: [{ rotate: '180deg' }]
	},
	toggle: {
		position: 'absolute',
		right: 15,
		top: 8
	}
});