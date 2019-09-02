import React, { Component } from 'react'
import PropTypes from 'prop-types'
import firebase from 'react-native-firebase'
import { View, TextInput, Text, StatusBar, Image, ActivityIndicator, ScrollView, Alert, TouchableNativeFeedback, KeyboardAvoidingView } from 'react-native'
import { Button } from 'react-native-elements'
import { connect } from 'react-redux'
import { register } from '@redux/actions'

import styles from './styles'

class Register extends Component {
	static propTypes = {
	  phone: PropTypes.string,
	  register: PropTypes.func,
	}

	constructor(props) {
	  super(props);
	
	  this.state = {
	  	showLoader: false,
	  	firstName: '',
	  	lastName: '',
	  	email: '',
	  	phone: '',
	  	errorFields: {
	  		firstName: {
	  			error: false,
	  			msg: ''
	  		},
	  		lastName: {
	  			error: false,
	  			msg: ''
	  		},
	  		email: {
	  			error: false,
	  			msg: ''
	  		}
	  	}
	  };
	}

	componentDidMount() {
		const { phone } = this.props;
		var self = this;

		firebase.messaging().getToken()
		.then(fcmToken => {
			if (fcmToken) {
				self.setState({
					fcm_token: fcmToken,
					phone: phone
				})
			}
		});
	}

	_validateEmail = (email) => {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
	}

	_onSubmit = () => {
		const { register } = this.props;
		let errorFields = this.state.errorFields;
		let alertOutput = '';
		let self = this;

		let data = {
			firstName: this.state.firstName.trim(),
			lastName: this.state.lastName.trim(),
			phone: this.state.phone,
			email: this.state.email.trim()
		};

		if (data.firstName === '') {
			errorFields.firstName.error = true;
			errorFields.firstName.msg = 'First Name cannnot be empty.';
		}

		if (data.lastName === '') {
			errorFields.lastName.error = true;
			errorFields.lastName.msg = 'Last Name cannot be blank.';
		}

		if (data.email === '' || false === this._validateEmail(data.email)) {
			errorFields.email.error = true;
			errorFields.email.msg = 'Email field must be valid.';
		}

		if (errorFields.firstName.error || errorFields.lastName.error || errorFields.email.error) {
			this.setState({errorFields});

			for (let key in errorFields) {
				if (errorFields.hasOwnProperty(key)) {
					if (errorFields[key].error) {
						alertOutput += `${errorFields[key].msg}\n`;
					}
				}
			}

			Alert.alert('Invalid', alertOutput);
		} else {
			if (__DEV__) {
				data.fcm_token_dev = this.state.fcm_token;
			} else {
				data.fcm_token = this.state.fcm_token;
			}

			this.setState({ showLoader: true });

			register(data, (data) => {
				if (false === data.success) {
					self.setState({
						showLoader: false
					});

					Alert.alert('Info', data.msg);
				}
			});
		}
	}

	_onFirstNameChange = (val) => {
		let errorFields = this.state.errorFields;

		if (this.state.errorFields.firstName.error) {
			errorFields.firstName.error = false;
		}

		this.setState({
			firstName: val,
			errorFields: errorFields
		});
	}

	_onLastNameChange = (val) => {
		let errorFields = this.state.errorFields;

		if (this.state.errorFields.lastName.error) {
			errorFields.lastName.error = false;
		}

		this.setState({
			lastName: val,
			errorFields
		});
	}

	_onEmailChange = (val) => {
		let errorFields = this.state.errorFields;

		if (this.state.errorFields.email.error) {
			errorFields.email.error = false;
		}

		this.setState({
			email: val,
			errorFields
		});
	}

	_renderButton = () => {
		return (
			<Button
				loading={this.state.showLoader}
				disabled={this.state.showLoader}
				title="Register"
				color="#ef5350"
				buttonStyle={styles.submitButton}
				TouchableComponent={TouchableNativeFeedback}
				onPress={this._onSubmit}
			/>
		);
	}

	render() {
		return (
			<ScrollView
				innerRef={ref => {
			    this.scroll = ref
			  }}
			  style={styles.scroll}
			  keyboardShouldPersistTaps="always"
		  >
				<StatusBar
          backgroundColor="#4a416e"
          barStyle="light-content"
        />
				<Text style={styles.heading}>Register</Text>

				<View style={styles.avatarWrap}>
					<Image
						source={require('@images/no_avatar.png')}
						style={styles.avatar}
					/>
				</View>

				<View style={styles.formWrapper}>
					<Text style={styles.inputLabel}>First Name</Text>
					<TextInput
				    returnKeyType = { "next" }
				    onSubmitEditing={() => { this.secondTextInput.focus(); }}
				    blurOnSubmit={false}
				    style={[styles.inputText, this.state.errorFields.firstName.error && styles.inputTextError]}
				    placeholder="First Name"
				    onChangeText={(val) => { this._onFirstNameChange(val); }}
			    />

					<Text style={styles.inputLabel}>Last Name</Text>
					<TextInput
						returnKeyType = { "next" }
						ref={(input) => { this.secondTextInput = input; }}
				    onSubmitEditing={() => { this.thirdTextInput.focus(); }}
				    blurOnSubmit={false}
						style={[styles.inputText, this.state.errorFields.lastName.error && styles.inputTextError]}
						placeholder="Last Name"
						onChangeText={(val) => { this._onLastNameChange(val); }}
					/>

					<Text style={styles.inputLabel}>Email Address</Text>
					<TextInput
						returnKeyType = { "next" }
						keyboardType="email-address"
						ref={(input) => { this.thirdTextInput = input; }}
						blurOnSubmit={false}
						autoCapitalize="none"
						style={[styles.inputText, this.state.errorFields.email.error && styles.inputTextError]}
						placeholder="Email"
						onChangeText={(val) => { this._onEmailChange(val); }}
					/>

					<Text style={styles.inputLabel}>Mobile Number</Text>
					<TextInput
						defaultValue={this.state.phone}
						editable={false}
						style={styles.inputText}
						placeholder="Mobile Number"
					/>

					{this._renderButton()}
				</View>
			</ScrollView>
		);
	}
}

const mapStateToProps = ({ user }, ownProps) => {
	return {
		phone: user.phone
	}
}

export default connect(mapStateToProps, { register })(Register)