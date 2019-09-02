/** @format */

import React  from 'react'
import { Inbox, InboxListDeleted } from '@container'
import { TouchableOpacity, View  } from 'react-native'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'



export default class SettingsScreen extends React.Component {
	constructor(props){
		super(props)
		this.state = {
			layoutDelete:false,
			deleteButton:false
		}
	}
	
	static navigationOptions = ({ navigation }) => {
		if(navigation.getParam('editToggle')){
			return {
				title: 'Inbox',
				headerStyle: { marginTop: 24 },
				headerRight: (
					<View style={{flexDirection:'row'}}>
						<TouchableOpacity
							onPress={navigation.getParam('deleteInbox')}
						> 
							<MaterialCommunityIcons name="delete" color="#4a416e" size={28} style={{ marginRight: 15 }} />
						</TouchableOpacity>
						<TouchableOpacity
							onPress={navigation.getParam('toggleInbox')}
						> 
							<MaterialCommunityIcons name="circle-edit-outline" color="red" size={28} style={{ marginRight: 15 }} />
						</TouchableOpacity>
					</View>
			)
			}

		}

		return {
			title: 'Inbox',
			headerStyle: { marginTop: 24 },
			headerRight: (
					<TouchableOpacity
						onPress={navigation.getParam('toggleInbox')}
					> 
						<MaterialCommunityIcons name="circle-edit-outline" color="#4a416e" size={28} style={{ marginRight: 15 }} />
					</TouchableOpacity>
		)
		}
		
	}

	componentDidMount() {
		this.props.navigation.setParams({ toggleInbox: this._layoutDeleteInbox });
		this.props.navigation.setParams({ editToggle:false  })
		this.props.navigation.setParams({ deleteInbox:this._popupDelete })
	  }

	  _popupDelete = () =>{
		  const { deleteButton } = this.state;
			if(deleteButton){
				this.setState({deleteButton:false})
			}else{
				this.setState({deleteButton:true})
			}

	  }


	_layoutDeleteInbox = ()=>{
		const { layoutDelete } = this.state;
		if(layoutDelete) {
			this.setState({layoutDelete:false})
			this.props.navigation.setParams({ editToggle:false  })
		}else{
			this.setState({layoutDelete:true})
			this.props.navigation.setParams({ editToggle:true  })
		}
		
	}


	render() {
		const { navigation } = this.props
		const { layoutDelete, deleteButton } = this.state

		if(layoutDelete){
			return (
				<InboxListDeleted
				onDeleteInboxLayout={this._layoutDeleteInbox}
					navigation={navigation}
					deleteVisibility={deleteButton}
				/>
			)
		}
		return (
			<Inbox
			onDeleteInboxLayout={this._layoutDeleteInbox}
				navigation={navigation}
			/>
		);
	}
}