/** @format */

import React, { Component } from 'react'
import { View, Text, Image, Alert, Dimensions, ScrollView, FlatList, StatusBar, TouchableOpacity } from 'react-native'
import { ListItem, Icon } from 'react-native-elements'
import PropTypes from 'prop-types'
import styles from './styles'
import { Tools, Config } from '@common'
import RecentTransactions from '@components/RecentTransactions'
import firebase from 'react-native-firebase'
import resolveAssetSource from 'resolveAssetSource'
import { connect } from 'react-redux'

const { width, height } = Dimensions.get('window')

class WalletDetail extends Component {
	static propTypes = {
	  wallet: PropTypes.object,
	  user: PropTypes.object
	}

	constructor(props) {
	  super(props);
	
	  this.state = {
	  	walletHeight: 0,
	  	transcations: []
	  };

	  //this._fetchWalletTx();
	}

	_fetchWalletTx = async () => {
		const { user, data } = this.props;
		let self = this;

		await fetch(Config.api_url + 'api/user/get_recent_transactions?wallets[]=' + encodeURIComponent('resource:org.dot.network.Wallet#' + data.wallet.id) + '&token=' + user.token, {
			headers: {
				Accept: 'applicatin/json',
				'Content-Type': 'applicatin/json'
			}
		})
			.then(response => response.json())
			.then((json) => {
				self.setState({
					transactions: json
				})
			});
	}

	componentWillMount() {
		let icon =  require('@images/wallets/1.png'); 
		let source = resolveAssetSource(icon);

		this.setState({
			walletWidth: width - 30,
			walletHeight: source.height * ((width - 30) / source.width)
		});
	}

	render() {
		const { data, user } = this.props
		let imgReq
		let qrContent = `dotpay:${data.wallet.id}`
		let balance = 0
		let history = user.history
		let tx = []

		if (history !== undefined) {
			for (var i = 0; i < history.length; i++) {
				if (history[i].sender.indexOf(data.wallet.id) > -1 || history[i].receiver.indexOf(data.wallet.id) > -1) {
					tx.push(history[i]);
				}
			}
		}

		if (data.wallet) {
			balance = data.wallet.balance
		}

		switch (data.imgIndex) {
			case 1:
				imgReq = require('@images/wallets/1.png');
				break;
			case 2:
				imgReq = require('@images/wallets/2.png');
				break;
			case 3:
				imgReq = require('@images/wallets/3.png');
				break;
			case 4:
				imgReq = require('@images/wallets/4.png');
				break;
			case 5:
				imgReq = require('@images/wallets/5.png');
				break;
			default:
				imgReq = require('@images/wallets/6.png');
				break;
		}

		return (
			<View style={styles.body}>
				<StatusBar
          backgroundColor="#4a416e"
          barStyle="light-content"
        />
				<View style={styles.walletWrap}>
					<Image source={imgReq} style={[styles.walletImg, { height: this.state.walletHeight }]} />
					<View style={styles.walletInner}>
						<Image
							source={{ uri: Config.api_url + 'get_qrcode?size=200&address=dotpay://' + data.wallet.id + '?amount=0' }}
							style={styles.qr_code}
						/>
						<Image
							source={require('@images/piggy.png')}
							style={styles.piggy}
						/>
						<Text style={styles.walletName}>{data.wallet.name}</Text>

						<View style={styles.walletBalanceWrap}>
							<Text style={styles.textAvail}>Available wallet balance:</Text>
							<Text style={styles.walletBalance}>Rp {Tools.formatMoney(balance, 0, ',', '.')}</Text>
						</View>
					</View>
				</View>

				<View style={styles.sendWrap}>
					<Text style={styles.listHeading2}>Send To:</Text>

					<View style={{ flexDirection: 'row' }}>
						<Icon
							raised
							name="download"
							type="feather"
							color="#aaa"
							containerStyle={{
								marginLeft: 0,
								paddingLeft: 0
							}}
							onPress={() => this.props.navigate('RequestMoney', { wallet: data.wallet })}
						/>
						<Icon
							raised
							name="send"
							type="feather"
							color="#aaa"
							containerStyle={{
								marginLeft: 0,
								paddingLeft: 0
							}}
							onPress={() => this.props.navigate('Transfer', { data: data })}
						/>
					</View>
				</View>

				<View style={{ marginLeft: 15, marginRight: 15 }}>
					<RecentTransactions user={this.props.user} transactions={tx} style={{ height: 310 }} />
				</View>
			</View>
		);
	}
}

const mapsStateToProps = ({ user }, ownProps) => {
	return {
		user: user
	}
}

export default connect(mapsStateToProps, null)(WalletDetail)