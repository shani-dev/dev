/** @format */

import React, { Component } from 'react'

import { Wallets } from '@container'

export default class WalletsScreen extends Component {
	static navigationOptions = ({ navigation }) => {
		return {
			header: null
		}
	};

	render() {
		const { navigation } = this.props
		const data = navigation.getParam('data');

		return (
			<Wallets navigation={this.props.navigation} data={data} />
		);
	}
}