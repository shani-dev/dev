import React, { Component } from 'react'
import { RequestMoney } from '@container'

export default class RequestMoneyScreen extends Component {
	static navigationOptions = ({ navigation }) => {
    return {
      title: 'Request Money',
      headerStyle: { marginTop: 24 },
    };
  };

	render() {
		const { navigation } = this.props
		const wallet = navigation.getParam('wallet')

		return (
			<RequestMoney
				navigation={navigation}
				wallet={wallet}
			/>
		);
	}
}