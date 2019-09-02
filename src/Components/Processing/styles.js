import { StyleSheet, Dimensions } from 'react-native'
const { width, height } = Dimensions.get('window')

export default StyleSheet.create({
	wrap: {
		position: 'absolute',
		width: width,
		height: height,
		left: 0,
		top: 0,
		justifyContent: 'center',
		alignItems: 'center',
		paddingLeft: 20,
		paddingRight: 20
	},
	img: {
		width: 200,
		height: 200,
		resizeMode: 'contain',
		marginBottom: 20
	},
	title: {
		color: '#fff',
		fontSize: 20,
		fontWeight: 'bold',
		textAlign: 'center'
	},
	subtitle: {
		color: '#fff',
		fontSize: 16,
		fontWeight: 'bold',
		textAlign: 'center'
	},
	buttonStyle: {
		backgroundColor: '#fff',
		height: 50,
		width: '100%'
	},
	buttonContainerStyle: {
		flexDirection: 'row',
		width: '100%',
		marginTop: 30
	}
})