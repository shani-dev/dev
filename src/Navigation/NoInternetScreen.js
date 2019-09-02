/** @format */

import React, { PureComponent } from 'react'
import { NoInternet } from '@container'

export default class NoInternetScreen extends PureComponent {
	static navigationOptions = ({ navigation }) => {
		return {
			header: null
		}
	}

	render() {
		const { navigation } = this.props

		return (
			<NoInternet
				navigation={navigation}
			/>
		);
	}
}