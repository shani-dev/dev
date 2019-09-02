/** @format */

import React from 'react'
import { Easing, Animated } from 'react-native'
import {
	createBottomTabNavigator,
	createStackNavigator,
	createAppContainer,
} from 'react-navigation'
import { Color, Images } from '@common'
//import VerifyPhoneScreen from './VerifyPhoneScreen'
import DashboardScreen from './DashboardScreen'
import TransactionHistoryScreen from './TransactionHistoryScreen'
import WalletsScreen from './WalletsScreen'
import WalletDetailScreen from './WalletDetailScreen'
import AddWalletScreen from './AddWalletScreen'
import TransferScreen from './TransferScreen'
import RequestMoneyScreen from './RequestMoneyScreen'
import SettingsScreen from './SettingsScreen'
import InboxScreen from './InboxScreen'
import InboxDetailScreen from './InboxDetailScreen'
import RequestFormScreen from './RequestFormScreen'
import NoInternetScreen from './NoInternetScreen'
import ChangeAccountScreen from './ChangeAccountScreen'
import ChangePinScreen from './ChangePinScreen'

const transitionConfig = () => {
	return {
		transitionSpec: {
			duration: 400,
			easing: Easing.out(Easing.poly(4)),
			timing: Animated.timing,
			useNativeDriver: true,
		},
		screenInterpolator: sceneProps => {
			const { layout, position, scene } = sceneProps

			const thisSceneIndex = scene.index
			const width = layout.initWidth

			const translateX = position.interpolate({
				inputRange: [thisSceneIndex - 1, thisSceneIndex],
				outputRange: [width, 0],
			})

			return { transform: [ { translateX } ] }
		},
	}
}

const AppNavigator = createStackNavigator(
	{
		//VerifyPhone: { screen: VerifyPhoneScreen },
		Dashboard: { screen: DashboardScreen },
		TransactionHistory: { screen: TransactionHistoryScreen },
		Wallets: { screen: WalletsScreen },
		WalletDetail: { screen: WalletDetailScreen },
		AddWallet: { screen: AddWalletScreen },
		Transfer: { screen: TransferScreen },
		RequestMoney: { screen: RequestMoneyScreen },
		ChangeAccount: { screen: ChangeAccountScreen },
		ChangePin: { screen: ChangePinScreen },
		Settings: { screen: SettingsScreen },
		Inbox: { screen: InboxScreen },
		InboxDetail: { screen: InboxDetailScreen },
		RequestForm: { screen: RequestFormScreen },
		NoInternet: { screen: NoInternetScreen }
	},
	{
		header: null,
		transitionConfig
	}
)

const AppContainer = createAppContainer(AppNavigator)

export default AppContainer