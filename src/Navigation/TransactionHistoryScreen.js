/** @format */

import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Style } from '@common'
import { TransactionHistory } from '@container'

export default class DashboardScreen extends Component {
	static navigationOptions = {
		header: null
	}
	
	render() {
		const { navigate } = this.props.navigation

		return (
			<TransactionHistory
				navigation={this.props.navigation}
			/>
		);
	}
}