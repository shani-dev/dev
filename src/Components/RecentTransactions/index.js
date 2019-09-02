import React, { Component } from 'react'
import { View, Text, ScrollView, FlatList, TouchableOpacity, Alert } from 'react-native'
import { ListItem, Button } from 'react-native-elements'
import PropTypes from 'prop-types'
import { Tools } from '@common'
import { GlobalStyle } from '@common'
import styles from './styles'

export default class RecentTransactions extends Component {
	static propTypes = {
	  transactions: PropTypes.array,
	  limit: PropTypes.any,
	  user: PropTypes.object
	}

	constructor(props) {
	  super(props);
	
	  this.state = {};
	}

	_keyExtractor = (item, index) => index.toString();

	_renderTx = ({ item }) => {
		let title = '';
		let subtitle = '';
		let leftIcon = {};
		let amount = '';
		let date_obj = new Date(Date.parse(item.timestamp));
		let datetime = date_obj.getDate() + '/' + (date_obj.getMonth() + 1) + '/' + date_obj.getFullYear() + ' ' + date_obj.getHours() + ':' + date_obj.getMinutes() + ':' + date_obj.getSeconds();
		let isOutcash = false;
		let type = '';

		if (item.sender.indexOf(this.props.user.email) > -1) {
			type = 'SEND';
		} else {
			type = 'RECEIVE';
		}

		switch (type) {
			case 'DEPOSIT':
				title = 'Deposit';
				amount = '+ Rp ' + Tools.formatMoney(item.amount, 0, ',', '.');
				subtitle = 'Deposit to main wallet';
				break;
			case 'SEND':
				if (item.receiver !== undefined) {
					title = 'Transfer to ' + item.receiver.split('#')[1].split('@')[0];
					amount = '- Rp ' + Tools.formatMoney(item.amount, 0, ',', '.');
					subtitle = 'Notes: ' + item.msg;
					isOutcash = true;
				}
				break;
			case 'RECEIVE':
				if (item.sender !== undefined) {
					title = 'Receive from ' + item.sender.split('#')[1].split('@')[0];
					amount = '+ Rp ' + Tools.formatMoney(item.amount, 0, ',', '.');
					subtitle = 'Notes: ' + item.msg;
				}
				break;
			case 'WITHDRAW':
				title = `Withdraw to ${item.bank_branch} - ${item.bank_no}`;
				amount = `- Rp ${Tools.formatMoney(item.amount, 0, ',', '.')}`;
				subtitle = 'Notes: ' + item.msg;
				isOutcash = true;
				break;
			case 'PAYGOODSORSERVICE':
				title = '';
				subtitle = '';
				break;
			default:
				// statements_def
				break;
		}

		return (
			<TouchableOpacity style={styles.listItem}>
				<Text style={styles.textDate}>{datetime}</Text>
				<View style={styles.listInner}>
					<Text style={styles.textTitle}>{title}</Text>
					<Text style={[styles.textAmount, isOutcash && { color: '#ff4e4e' }]}>{amount}</Text>
				</View>
			</TouchableOpacity>
		)
	}

	_renderListFooter = () => {
		const { transactions } = this.props;

		if (transactions.length > 6) {
			return (
				<View>
					<Button
						title="More"
						buttonStyle={{ backgroundColor: 'transparent' }}
						titleStyle={{ color: '#03B1E5' }}
						onPress={() => Alert.alert('info', 'more click')}
					/>
				</View>
			)
		}

		return <View />
	}

	render() {
		const { transactions, limit } = this.props;
		let transactions_splice = [];

		if (limit && (transactions.length > limit)) {
			for (var i = 0; i < limit; i++) {
				transactions_splice.push(transactions[i]);
			}
		} else {
			transactions_splice = transactions;
		}

		if (transactions.length === 0) return <View />;

		return (
			<View style={GlobalStyle.sectionWrap}>
				<Text style={GlobalStyle.sectionTitle}>Transaksi Terakhir</Text>
				<ScrollView style={this.props.style}>
					<FlatList
						style={styles.list}
						data={limit ? transactions_splice : transactions}
						keyExtractor={this._keyExtractor}
						renderItem={this._renderTx}
						scrollEnabled={true}
						ListFooterComponent={this._renderListFooter}
					/>
				</ScrollView>
			</View>
		);
	}
}

RecentTransactions.defaultProps = {
  transactions: []
}