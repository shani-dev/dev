/** @format */

import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Dashboard } from '@container'

export default class DashboardScreen extends Component {
	static navigationOptions = {
		header: null
	}
	
	render() {
		const { navigate } = this.props.navigation

		return (
			<Dashboard
				navigation={this.props.navigation}
			/>
		);
	}
}