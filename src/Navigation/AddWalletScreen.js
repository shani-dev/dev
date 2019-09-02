import React, { PureComponent } from 'react'
import { Text } from 'react-native'

import { AddWallet } from '@container'

export default class AddWalletScreen extends PureComponent {
	static navigationOptions = ({ navigation }) => {
    return {
      title: 'Add New Wallet',
      headerStyle: { marginTop: 24 },
    };
  };
	
	render() {
		return (
			<AddWallet
				navigation={this.props.navigation}
			/>
		);
	}
}