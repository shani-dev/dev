import { StyleSheet, Dimensions } from 'react-native'

export default StyleSheet.create({
    cover: {
        backgroundColor: "rgba(0,0,0,.5)",
        opacity:0.7,
        width:Dimensions.get("window").width
      },
	sheet: {
        position: "absolute",
        top: Dimensions.get("window").height,
        left: 0,
        width:Dimensions.get("window").width,
        right: 0,
        height: "100%",
        justifyContent: "flex-end",
      },
      popup: {
        backgroundColor: "#FFF",
        borderTopLeftRadius: 5,
        borderTopRightRadius: 5,
        width:Dimensions.get("window").width,
        minHeight: 80,
        alignItems: "center",
        justifyContent: "center",
      },
      textTitle:{
          fontSize:15,
          justifyContent:'flex-end',
          textAlign:'right',
          fontWeight:'bold',
          
      }
})