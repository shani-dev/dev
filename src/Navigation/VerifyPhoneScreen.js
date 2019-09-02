/** @format */

import React, { Component } from 'react'
import { AsyncStorage } from 'react-native'
import PropTypes from 'prop-types'
import { VerifyPhone } from '@container'

export default class VerifyPhoneScreen extends Component {
	static navigationOptions = {
		header: null
	}

	constructor(props) {
	  super(props);
	
	  this._bootstrapAsync();
	}

	_bootstrapAsync = async () => {
		const userToken = await AsyncStorage.getItem('userToken');
		let exists = false;
		let phoneVerified = false;

		if (userToken) {
			exists = true;
		}

		if (!exists) {
			this.props.navigation.navigate('Dashboard');
		}
	}

	render() {
		const { navigate } = this.props

		return (
			<VerifyPhone
				navigation={this.props.navigation}
			/>
		);
	}
}