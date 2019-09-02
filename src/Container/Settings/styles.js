import { StyleSheet, Platform } from 'react-native'


const statusBarHeight = Platform.OS === 'ios' ? 35 : 0

export default StyleSheet.create({
	body: {
	    flex: 1,
	    justifyContent: 'center',
	    alignItems: 'center',
	    width: '100%'
	  },
	  navBar: {
	    backgroundColor: '#8c231c',
	    height: 44 + statusBarHeight,
	    alignSelf: 'stretch',
	    paddingTop: statusBarHeight,
	    justifyContent: 'center',
	    alignItems: 'center',
	  },
	  navBarTitle: {
	    color: 'white',
	    fontSize: 17,
	  },
	  heroContainer: {
	    marginBottom: 50,
	    paddingVertical: 20,
	    justifyContent: 'center',
	    alignItems: 'center',
	    backgroundColor: 'white',
	    borderTopWidth: StyleSheet.hairlineWidth,
	    borderBottomWidth: StyleSheet.hairlineWidth,
	    borderColor: '#ccc',
	    flexDirection: 'row',
	  },
	  heroImage: {
	    width: 80,
	    height: 80,
	    borderRadius: 40,
	    borderWidth: 3,
	    borderColor: 'black',
	    marginHorizontal: 20,
	  },
	  heroTitle: {
	    color: 'black',
	    fontSize: 24,
	  },
	  heroSubtitle: {
	    color: '#999',
	    fontSize: 14,
	  },
})