/** @format */

import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { DrawerLayoutAndroid } from 'react-native'
import { Events } from '@common'

import SideMenu from './SideMenu'

export default class MenuAndroid extends PureComponent {
	static propTypes = {
	  goToScreen: PropTypes.func,
	  routes: PropTypes.any
	}

	render() {
		return (
			<DrawerLayoutAndroid
				drawerWidth={300}		
				ref={(_drawer) => (this.drawer = _drawer)}
				drawerPosition={DrawerLayoutAndroid.positions.left}
				renderNavigationView={() => (
					<SideMenu goToScreen={this.props.goToScreen} />
				)}
			>
				{this.props.routes}
			</DrawerLayoutAndroid>
		);
	}
}