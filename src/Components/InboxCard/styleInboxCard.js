import { StyleSheet, Dimensions } from 'react-native'

export default StyleSheet.create({
    containerCardView: {
        flexDirection: "column"
    },
    Image:{
    },  
    lineBorder:{ 
    borderBottomColor: '#cfd8dc',
    borderBottomWidth: 1,
    margin: 5,
    marginTop:5
    },
    featureTitle:{
        color:'#009688',
        fontWeight:'bold',
        fontSize:20
    },  
    containerCardHolder:{
        width:Dimensions.get('window').width - 10,
        minHeight:200,
        alignSelf:'center',
        justifyContent:'center',
        borderRadius: 5,
        marginBottom:10,
        flexDirection: "row"
    },  
    titleName: {
        color:"grey",
        fontWeight: "bold",
        fontSize: 14,
        marginTop:10,
        alignSelf:'center'
    },
    containerHolder: {
        padding: 5
    },
    middleCard: {
        marginTop: 10,
        flexDirection: "row"
    },
    separator:{
        height:2,
        marginTop:10,
        backgroundColor:'red',
        borderBottomWidth: 1,
        alignSelf:'center'
    },
    footerCard:{
        alignSelf:'flex-end',
        justifyContent:'flex-end',
        flexDirection: "row"
    },
    date:{
        alignSelf:'center',
        color:'#ef9a9a',
        fontSize:12,
        marginTop:1
    }
})