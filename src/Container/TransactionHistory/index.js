/** @format */

import React, { PureComponent } from 'react'
import { View, ScrollView, TouchableOpacity, Image, Text, StatusBar } from 'react-native'
import LinearGradient from 'react-native-linear-gradient'
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import { Config, Tools } from '@common'

import styles from './styles'

class TransactionHistory extends PureComponent {
	render() {
		let mainBalance = Tools.formatMoney(Config.userData.wallets[0].balance, 0, ',', '.')

		return (
			<View style={{ flex: 1 }}>
				<StatusBar
					translucent={true}
	        backgroundColor={'transparent'}
	        barStyle="light-content"
        />
        <LinearGradient
        	colors={['#DE1FB1', '#FF4A4A']}
        	style={styles.header}
        	start={{x: 0, y: 1}}
        	end={{x: 1, y: 0}}
      	>
      		<View style={styles.headerBar}>
      			<TouchableOpacity
      				onPress={() => this.props.navigation.goBack()}
      				style={styles.backWrapper}>
      				<MaterialCommunityIcons name="arrow-left" color="#ffffff" size={25} style={styles.backButton} />
    				</TouchableOpacity>
      			<View style={styles.logoWrapper}>
	      			<Image
	      				source={require('@images/in_app_logo.png')}
	      				style={styles.headerLogo}
	    				/>
    				</View>
    				<TouchableOpacity style={styles.headerNotif}>
    					<SimpleLineIcons name="bell" color="#ffffff" size={20} style={styles.notifIcon} />
  					</TouchableOpacity>
      		</View>

      		<View style={styles.walletTitle}>
      			<Text style={styles.walletTitleText}>Dompet Utama</Text>
      		</View>
      		<View style={styles.walletBalance}>
    				<Text style={styles.balanceCurrency}>Rp </Text>
    				<Text style={styles.balanceText}>{mainBalance}</Text>
      		</View>
    		</LinearGradient>
			</View>
		);
	}
}

export default TransactionHistory