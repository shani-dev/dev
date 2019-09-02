import React, { PureComponent } from 'react'
import { PropTypes } from 'prop-types'
import { View, Text, Image, TextInput, ActivityIndicator, TouchableNativeFeedback, Alert, ScrollView } from 'react-native'
import { Config } from '@common'
import { connect } from 'react-redux'
import { fetchWallets } from '@redux/actions'

import styles from './styles'

class AddWallet extends PureComponent {
	static propTypes = {
	  fetchWallets: PropTypes.func,
	  navigate: PropTypes.func
	}

	constructor(props) {
	  super(props);
	
	  this.state = {
	  	name: '',
	  	showLoader: false
	  };
	}

	fetchingWallets = () => {
		const { user, fetchWallets } = this.props

		fetchWallets(user.token)
	}

	onSubmit = () => {
		const { user, navigation } = this.props
		let self = this

		this.setState({ showLoader: true })

		if (this.state.name == '') return Alert.alert('Invalid', 'Wallet name cannot blank!');

		fetch(Config.api_url + 'api/user/create_wallet?token=' + user.token, {
			method: 'POST',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				name: self.state.name
			})
		})
		.then(response => response.json())
		.then((json) => {
			self.fetchingWallets()
			self.setState({ showLoader: false, name: '' })
			navigation.goBack()
		})
	}

	_renderButton = () => {
		if (this.state.showLoader) {
			return <ActivityIndicator animating={true} size="small" color="#ef5350" />;
		}

		return (
			<TouchableNativeFeedback
				onPress={this.onSubmit}
        background={TouchableNativeFeedback.SelectableBackground()}>
	      <View style={{flexDirection: 'row', height: 45, marginTop: 45, backgroundColor: '#ef5350', alignItems: 'center'}}>
	        <Text style={{flex: 1, color: '#fff', fontSize: 16, textAlign: 'center'}}>Create</Text>
	      </View>
	    </TouchableNativeFeedback>
		);
	}

	_onChange = (val) => {
		this.setState({ name: val })
	}

	render() {
		return (
			<ScrollView style={ styles.body }>
				<View style={styles.formWrap}>
					<Text style={styles.fieldLabel}>Wallet Name</Text>
					<TextInput
						style={styles.field}
						onChangeText={(val) => this._onChange(val)}
					/>

					{this._renderButton()}
				</View>
			</ScrollView>
		);
	}
}

const mapStateToProps = ({ user }, ownProps) => {
	return {
		user: user
	}
}

export default connect(mapStateToProps, { fetchWallets })(AddWallet)