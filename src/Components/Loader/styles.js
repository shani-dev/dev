import { StyleSheet, Dimensions } from 'react-native'
const { width, height } = Dimensions.get('window')

export default StyleSheet.create({
	wrap: {
		position: 'absolute',
		width: width,
		height: height,
		left: 0,
        top: 0,
        opacity:0.6,
		justifyContent: 'center',
		alignItems: 'center',
		paddingLeft: 20,
		paddingRight: 20
    },
    viewContainer: {
        zIndex:10,
        borderRadius:20,
       
    },
    LoaderImage:{
        zIndex:10,
        opacity:1,
        width:width * 1.4,
        height:height * .1,
        paddingBottom:10
    }
})