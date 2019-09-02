import { StyleSheet } from 'react-native';

export default StyleSheet.create({
	body: {
		flex: 1
	},
	inputWrap: {
		paddingLeft: 0,
		paddingRight: 0,
		marginBottom: 15
	},
	inputContainer: {
		borderBottomWidth: 0
	},
	inputStyle: {
		backgroundColor: '#f1f3f4',
		borderRadius: 22,
		paddingLeft: 15,
		paddingRight: 15,
		height: 45,
		color: '#666'
	},
	labelStyle: {
		marginBottom: 8,
		fontSize: 15
	},
	pickerWrapper: {
		backgroundColor: '#f1f3f4',
		borderRadius: 22,
		paddingLeft: 10,
		paddingRight: 10,
		height: 45
	},
	pickerLabel: {
		fontSize: 15,
		color: '#86939e',
		marginBottom: 5,
		fontWeight: 'bold',
		fontFamily: 'sans-serif',
		marginBottom: 8
	},
	pickerStyle: {
		height: 45
	},
	radioWrapper: {
		flexDirection: 'row',
		flexWrap: 'wrap',
		marginTop: 10,
		marginBottom: 15
	},
	radioContainerStyle: {
		flexDirection: 'column',
		paddingLeft: 0,
		paddingRight: 0,
		marginLeft: 0,
		marginRight: 0,
		backgroundColor: 'transparent',
		borderWidth: 0,
		width: '50%',
		marginBottom: 0,
		paddingBottom: 0
	},
	radioText: {
		marginLeft: 5
	},
	tagInputContainerStyle: {
		backgroundColor: '#f1f3f4',
		borderRadius: 22,
		height: 150,
		alignItems: 'flex-start'
	},
	tagInputStyle: {
		backgroundColor: 'transparent',
		backgroundColor: '#f1f3f4',
		borderRadius: 22,
		borderWidth: 0,
		height: 35
	}
});