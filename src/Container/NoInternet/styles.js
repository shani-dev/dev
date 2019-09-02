import { StyleSheet, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

export default StyleSheet.create({
	body: {
		flex: 1,
		padding: 15,
		justifyContent: 'center',
		alignItems: 'center'
	},
	text: {
		fontSize: 30,
		marginBottom: 30,
		marginTop: -30
	},
	image: {
		marginBottom: 60
	},
	button: {
		width: (width) - 100
	}
});