/** @format */

import React, { PureComponent } from 'react'
import { Settings } from '@container'

export default class SettingsScreen extends PureComponent {
	static navigationOptions = ({ navigation }) => {
		return {
			title: 'Settings',
			headerStyle: { marginTop: 24 },
		}
	}

	render() {
		const { navigation } = this.props

		return (
			<Settings
				navigation={navigation}
			/>
		);
	}
}