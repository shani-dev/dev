import { StyleSheet } from 'react-native';

export default StyleSheet.create({
	autocompletesContainer: {
        flexDirection:'row',
        width:'100%'
      },
      bigContainer:{
        paddingTop: 0,
        zIndex: 1,
        marginBottom:5,
        marginTop:5,
        flexDirection:'column',
        width: "100%",
        paddingHorizontal: 16,
      },
      ContainerLoading:{
        flexDirection:'row',
        width:"100%"
      },
      input: {maxHeight:5},
      inputContainer: {
        display: "flex",
        flexShrink: 0,
        flexGrow: 0,
        flexDirection: "row",
        flexWrap: "wrap",
        alignItems: "center",
        borderBottomWidth: 1,
        borderColor: "#c7c6c1",
        paddingVertical: 13,
        paddingLeft: 12,
        paddingRight: "5%",
        width: "100%",
        justifyContent: "flex-start",
      },
      container: {
        flex: 1,
        backgroundColor: "#ffffff",
      },
      plus: {
        position: "absolute",
        left: 15,
        top: 10,
      },
      TextVeriviedTrue:{
        fontSize:15,
        color:'green'
      },
      TextVeriviedFalse:{
        fontSize:15,
        color:'#4a416e'
      },
      closeBtn:{
          top:10,
          paddingLeft:8
      },
      TextLoading:{
        fontWeight:'bold',
        justifyContent:'center',
        fontSize:15,
        alignItems:'center',
        color:'red',
        textAlign:'center'
      },
      TextNameUser:{
          fontWeight:'bold',
          justifyContent:'center',
          fontSize:15,
          alignItems:'center',
          color:'red',
          textAlign:'center'
      },
      TextPhone:{
        justifyContent:'center',
            fontSize:12,
          alignItems:'center',
          color:'grey',
          textAlign:'center'
      },
      closeBtnCard:{
        top:10,
        paddingLeft:8,
        alignItems:'flex-end'
      }
});