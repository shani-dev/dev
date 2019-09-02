import { StyleSheet, Dimensions } from 'react-native'
const { width, height } = Dimensions.get('window')

export default StyleSheet.create({
    containerCard:{
        flex:1,
        flexDirection:'row',
        justifyContent:'center'
    },
    containerRow:{
        flexDirection:'row'
    },
    titleContent:{
        marginBottom: 15,
        marginTop:5,
        justifyContent:'center',
        fontSize:16,
        textAlign:'center'
    },
    dateContent:{
        marginBottom: 5,
        marginTop:5,
        fontSize:12,
        justifyContent:'center',
        alignContent:'center',
        alignSelf:'center', 
        textAlign:'center'
    },
    textResult:{
        marginBottom: 5,
        fontSize:12,
        color: 'red', 
        marginLeft:5
    },
    textStatic:{
        marginBottom: 5,
        fontSize:12
    }
})