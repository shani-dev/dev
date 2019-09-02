/** @format */

import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { View } from 'react-native'
//import User from '@services/User'
import { Events, Config, Languages } from '@common'

export default class Base extends PureComponent {
	static propTypes = {
		goToScreen: PropTypes.func,
		navigation: PropTypes.func,
	}

	render() {
		return <View />;
	}
}