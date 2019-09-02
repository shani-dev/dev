/** @format */

import { StyleSheet, Dimensions } from 'react-native'

const { width, height } = Dimensions.get('window')
const ITEM_MARGIN = 3 * 2

export default StyleSheet.create({
	section: {
		flex: 1,
		borderBottomWidth: 1,
		borderColor: '#f4f4f4',
		paddingBottom: 10,
		marginTop: 20,
	},
	sectionTitle: {
		fontWeight: '500',
		fontSize: 16,
		color: '#777',
		marginBottom: 10,
	},
	flatlist: {
		flex: 1,
		marginLeft: -5,
	},
  row:{
    flexDirection:'row',
    height: 40,
    alignItems:'center',
    justifyContent:'space-between',
    width: width - 30,
    paddingHorizontal: 10,
  },
  indicatorWrap:{
    position:'absolute',
    top:0,
    left:0,
    right:0,
    bottom:0,
    alignItems:'center',
    justifyContent:'center'
  },
	item: {
		overflow: 'hidden',
		flexDirection: 'column',
		width: (width - 30) / 3 - 11,
		paddingTop: 15,
		paddingBottom: 15,
		paddingLeft: 5,
		paddingRight: 5,
		borderRadius: 10,
		backgroundColor: '#ffffff',
		margin: 7,
		shadowColor: "#000",
		shadowOffset: {
			width: 0,
			height: 2,
		},
		shadowOpacity: 0,
		shadowRadius: 1,

		elevation: 4,
	},
	itemImage: {
		width: 40,
		height: 40,
		resizeMode: 'contain',
	},
	itemTitle: {
		fontSize: 12,
		fontWeight: 'bold',
		marginTop: 10,
		marginBottom: 5,
	},
	itemDesc: {
		fontSize: 10,
	}
});