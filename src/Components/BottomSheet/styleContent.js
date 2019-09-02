import { StyleSheet, Dimensions } from 'react-native'
export default StyleSheet.create({
    cardHolder:{
        margin:5
    },
    imagePrint: {
        borderWidth:1
      },
	toRowText:{
        marginBottom: 5,
        fontSize:15
    },
    toRowProps:{
        marginBottom: 5,
        fontSize:15,
        color: 'red', 
        marginLeft:5
    },
    toRowContainer:{
        flexDirection:'row'
    },
    containerTextProps:{
        marginBottom: 5,
        fontSize:15,
        color: 'red', 
        marginLeft:5
    },
    separator:{
        margin:10,
        borderBottomColor: 'black',
        borderBottomWidth: 1,
        alignSelf:'center'
    },
    containerButtonBottom:{
        flexDirection:'row',
        borderRadius: 0, 
        marginLeft: 0, 
        marginRight: 0, 
        marginBottom: 0,
        justifyContent:'space-between', 
        display:'flex'
    },
    buttonLeftBottom:{
        flexDirection:'row', 
        justifyContent:'space-between', 
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
        justifyContent:'space-between'
    }
})