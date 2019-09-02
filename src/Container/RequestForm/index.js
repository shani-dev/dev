import React, { Component } from 'react';
import { View, Text, StatusBar, Picker, DatePickerAndroid, ScrollView } from 'react-native';
import PropTypes from 'prop-types';
import { Input, Button, CheckBox } from 'react-native-elements';
import styles from './styles';
import { connect } from 'react-redux';
import Tags from 'react-native-tags';
import { Tools } from '@common';

class RequestForm extends Component {
	static propTypes = {
	  wallets: PropTypes.array
	}

	constructor(props) {
	  super(props);
	
	  this.state = {
	  	description: '',
	  	amount: 0,
	  	main_wallet: this.props.wallets[0].id,
	  	payment_type: 'onetime',
	  	recurring_date: false,
	  	tags: []
	  };
	}

	_changeDate = async () => {
		let now = new Date();

		try {
		  const {action, year, month, day} = await DatePickerAndroid.open({
		    date: new Date(),
		    minDate: new Date(now.getFullYear(), now.getMonth(), 1)
		  });
		  if (action !== DatePickerAndroid.dismissedAction) {
		    this.setState({
		    	recurring_date: `${year}-${Tools.pad(month + 1, 2)}-${Tools.pad(day, 2)}`
		    });
		  }
		} catch ({code, message}) {
		  console.warn('Cannot open date picker', message);
		}
	}

	render() {
		const { wallets } = this.props;

		return (
			<View style={styles.body}>
				<StatusBar
          backgroundColor="#4a416e"
          barStyle="light-content"
        />
        <ScrollView>
					<View style={{ padding: 15 }}>
						<Input
							autoFocus={true}
							label="Payment Description"
							value={this.state.description}
							onChangeText={(value) => this.setState({ description: value.toString() })}
							containerStyle={styles.inputWrap}
							inputContainerStyle={styles.inputContainer}
							inputStyle={styles.inputStyle}
							labelStyle={styles.labelStyle}
							returnKeyType="next"
							returnKeyLabel="Next"
							onSubmitEditing={() => this.inputAmount.focus()}
						/>

						<Input
							selectTextOnFocus
							ref={ref => this.inputAmount = ref}
							label="Amount"
							value={this.state.amount.toString()}
							onChangeText={(value) => this.setState({ amount: value })}
							keyboardType="decimal-pad"
							containerStyle={styles.inputWrap}
							inputContainerStyle={styles.inputContainer}
							inputStyle={styles.inputStyle}
							labelStyle={styles.labelStyle}
						/>

						<View>
							<Text style={styles.pickerLabel}>Deposit To Wallet</Text>
							<View style={styles.pickerWrapper}>
								<Picker
									selectedValue={this.state.main_wallet}
									onValueChange={(itemValue, itemIndex) => this.setState({ main_wallet: itemValue })}
									style={styles.pickerStyle}
									mode="dropdown"
								>
									{wallets.map((item, idx) => (
										<Picker.Item key={`picker-${idx}`} label={item.name} value={item.id} />
									))}
								</Picker>
							</View>
						</View>

						<View style={styles.radioWrapper}>
							<CheckBox
								title="One time use"
								checked={this.state.payment_type === 'onetime' ? true : false}
								containerStyle={styles.radioContainerStyle}
								textStyle={styles.radioText}
								checkedIcon='dot-circle-o'
								uncheckedIcon='circle-o'
								onPress={() => this.setState({ payment_type: 'onetime' })}
							/>

							<CheckBox
								title="Multiple use"
								checked={this.state.payment_type === 'multiple' ? true : false}
								containerStyle={styles.radioContainerStyle}
								textStyle={styles.radioText}
								checkedIcon='dot-circle-o'
								uncheckedIcon='circle-o'
								onPress={() => this.setState({ payment_type: 'multiple' })}
							/>

							<CheckBox
								title="Recurring"
								checked={this.state.payment_type === 'recurring' ? true : false}
								containerStyle={styles.radioContainerStyle}
								textStyle={styles.radioText}
								checkedIcon='dot-circle-o'
								uncheckedIcon='circle-o'
								onPress={() => {
									this.setState({ payment_type: 'recurring' });
									this._changeDate();
								}}
							/>

							<View style={[styles.radioContainerStyle, { width: '100%' }]}>
								<Text style={{ marginTop: 17, fontWeight: 'bold', color: '#005999' }} >{this.state.recurring_date ? this.state.recurring_date : ''}</Text>
							</View>
						</View>

						<View>
							<Text style={styles.pickerLabel}>Tags</Text>
							<Tags
						    initialText=""
						    textInputProps={{
						      placeholder: "Any type of tag"
						    }}
						    initialTags={this.state.tags}
						    onChangeTags={tags => this.setState({ tags: tags })}
						    onTagPress={(index, tagLabel, event, deleted) =>
						      console.log(index, tagLabel, event, deleted ? "deleted" : "not deleted")
						    }
						    containerStyle={styles.tagInputContainerStyle}
						    inputStyle={styles.tagInputStyle}
						  />
						</View>

						<View style={{ flexDirection: 'row', marginTop: 35, justifyContent: 'space-around' }}>
							<Button
								title="Save"
								buttonStyle={{
									paddingLeft: 30,
									paddingRight: 30
								}}
							/>
							<Button
								title="Delete"
								buttonStyle={{
									paddingLeft: 30,
									paddingRight: 30,
									backgroundColor: '#ff6155'
								}}
							/>
						</View>
					</View>
				</ScrollView>
			</View>
		);
	}
}

const mapStateToProps = ({ user }, ownProps) => {
	return {
		wallets: user.wallets
	}
}

export default connect(mapStateToProps, null)(RequestForm);