import { StyleSheet, Dimensions } from 'react-native'
const { width, height } = Dimensions.get('window')

export default StyleSheet.create({
    containerMiddle:{
        flexDirection:'row',
        margin:5
    },
    fontReminder:{
        fontSize:10,
        color:'#1E9E9E',
        marginBottom:3
    },
    containerButtonBottom:{
        flexDirection:'row',
        borderRadius: 0, 
        marginLeft: 10, 
        marginRight: 10, 
        marginBottom: 10,
        justifyContent:'center'
    },
    buttonLeftBottom:{
        flexDirection:'row', 
        justifyContent:'center', 
        marginTop:15
    },
    buttonHome:{
        borderRadius: 3,
        backgroundColor:'#03A9F4'
    },
    buttonTransfer:{
        borderRadius: 3,
        backgroundColor:'#F44336'
    },
    shareButton:{
        flexDirection:'row', 
        justifyContent:'center'
    }
})