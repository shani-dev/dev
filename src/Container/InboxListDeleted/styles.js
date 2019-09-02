import { StyleSheet } from 'react-native';

export default StyleSheet.create({
	body: {
		flex: 1
	},
	containerList:{
		flexDirection:'row',
		justifyContent:'space-between'
	},
	containerView:{
		paddingTop:5,
		flexDirection:'column'
	},
	checkboxContainer:{
		alignContent:'flex-end',
		alignSelf:'flex-end'
		
	},
	containerList:{
		flexDirection:'row'
	},
	textBody: {
	color: 'grey'
	},
	textDate: {
		fontSize:10,
		paddingTop:2,
		color: '#ef9a9a'
	}
});