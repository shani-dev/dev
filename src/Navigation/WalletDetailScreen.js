import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { TouchableOpacity } from 'react-native'
import { connect } from 'react-redux'
import { WalletDetail } from '@container'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import { deleteWallet } from '@redux/actions'


class WalletDetailScreen extends Component {
	static propTypes = {
	  deleteWallet: PropTypes.func
	}

	static navigationOptions = ({ navigation }) => {
	  return {
	  	title: 'My Wallet',
		  headerStyle: { marginTop: 24 },
		  headerRight: (
		  	<TouchableOpacity
		  		onPress={navigation.getParam('deletingWallet')}
	  		>
	  			<MaterialCommunityIcons name="delete" color="red" size={28} style={{ marginRight: 15 }} />
				</TouchableOpacity>
	  	)
	  }
	}

	componentDidMount() {
		this.props.navigation.setParams({ deletingWallet: this._deleteWallet });
	}

	_deleteWallet = () => {
		const { deleteWallet, token } = this.props;
		const data = this.props.navigation.getParam('data');
		
		if(data.wallet.name != 'Dompet Utama'){
			deleteWallet(token, data.wallet.id);
		}
		

		this.props.navigation.goBack();
	}
	
	render() {
		const { navigation } = this.props
		const data = navigation.getParam('data')

		return (
			<WalletDetail
				navigate={this.props.navigation.navigate}
				data={data}
			/>
		);
	}
}

const mapStateToProps = ({ user }, ownProps) => {
	return {
		token: user.token
	}
}

export default connect(mapStateToProps, { deleteWallet })(WalletDetailScreen)