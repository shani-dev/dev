/** @format */

import React, { PureComponent } from 'react'
import { ChangePin } from '@container'

export default class ChangePinScreen extends PureComponent {
	static navigationOptions = ({ navigation }) => {
		return {
			header: null
		}
	}

	render() {
		const { navigation } = this.props

		return (
			<ChangePin
				navigation={navigation}
			/>
		);
	}
}