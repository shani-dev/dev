/** @format */

import React, { PureComponent } from 'react'
import { ChangeAccount } from '@container'

export default class ChangeAccountScreen extends PureComponent {
	static navigationOptions = ({ navigation }) => {
		return {
			title: 'Change Account',
			headerStyle: { marginTop: 24 },
		}
	}

	render() {
		const { navigation } = this.props

		return (
			<ChangeAccount
				navigation={navigation}
			/>
		);
	}
}