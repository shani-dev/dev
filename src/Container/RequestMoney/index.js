import React, { PureComponent } from 'react';
import { View, Text, Share, ScrollView, TextInput } from 'react-native';
import { Button } from 'react-native-elements';

import styles from './styles';

export default class RequestMoney extends PureComponent {
	constructor(props) {
	  super(props);
	
	  this.state = {
	  	amount: 0,
	  	notes: ''
	  };
	}

	_onChangeAmount = (val) => {
		this.setState({
			amount: val
		})
	}

	_onChangeNotes = (val) => {
		this.setState({
			notes: val
		})
	}

	onShare = async () => {
		const { wallet } = this.props

    try {
      const result = await Share.share({
        message:
          'https://app.dotpay.id/return?action=pay&address=' + wallet.id + '&amount=' + this.state.amount + '&msg=' + this.state.notes,
      })

      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
          this.props.navigation.goBack();
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error) {
      alert(error.message);
    }
  };

	render() {
		const { data } = this.props;

		return (
			<View style={{ flex: 1 }}>
				<ScrollView>
				<View style={{ padding: 15 }}>
					<Text>Amount:</Text>
					<TextInput
						selectTextOnFocus
						autoFocus={true}
						style={styles.inputStyle}
						placeholder="Amount"
						value={this.state.amount.toString()}
						onChangeText={(value) => this._onChangeAmount(value)}
						keyboardType="decimal-pad"
					/>

					<Text>Notes:</Text>
					<TextInput
						style={styles.inputStyle}
						multiline={true}
						numberOfLines={4}
						value={this.state.notes}
						onChangeText={(value) => this._onChangeNotes(value)}
					/>

					<Button
						raised={true}
						style="outline"
						title="Share"
						loading={this.state.onTransfer}
						onPress={this.onShare}
					/>
				</View>
				</ScrollView>
			</View>
		);
	}
}