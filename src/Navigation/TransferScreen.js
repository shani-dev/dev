import React, { Component } from 'react'
import { Transfer } from '@container'

export default class TransferScreen extends Component {
	static navigationOptions = ({ navigation }) => {
		const { params } = navigation.state;

    return {
    	...params,
      header: null
    };
  };

	render() {
		const { navigation } = this.props;
		const data = navigation.getParam('data');

		return (
			<Transfer
				navigation={navigation}
				data={data}
			/>
		);
	}
}