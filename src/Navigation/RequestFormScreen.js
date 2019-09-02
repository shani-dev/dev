import React, { Component } from 'react'
import { RequestForm } from '@container'

export default class RequestMoneyScreen extends Component {
	static navigationOptions = ({ navigation }) => {
    return {
      title: 'Terima',
      headerStyle: { marginTop: 24 },
    };
  };

	render() {
		const { navigation } = this.props
		const wallet = navigation.getParam('wallet')

		return (
			<RequestForm
				navigation={navigation}
				wallet={wallet}
			/>
		);
	}
}