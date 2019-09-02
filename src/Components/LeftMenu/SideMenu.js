/** @format */

import React from 'react'
import { Text, View, TouchableOpacity, ScrollView } from 'react-native'
import { Languages } from '@common'
import _ from 'lodash'
import Base from './Base'
import styles from './style'

export default class SideMenu extends Base {
	render() {
		const { goToScreen } = this.props

		return (
			<View style={styles.sideMenu}>
				<View style={styles.menuRow}>
					<TouchableOpacity
						style={styles.menuLink}
						onPress={() => {
							goToScreen('Settings');
							//navigation.closeDrawer()
						}}
					>
						<Text>Settings</Text>
					</TouchableOpacity>
				</View>
			</View>
		);
	}
}