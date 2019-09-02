import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {
	View,
	TouchableOpacity,
	Image,
	Text,
	TextInput,
	ScrollView,
	Alert,
	ActivityIndicator,
	Platform,
	StatusBar,
	TouchableNativeFeedback,
	KeyboardAvoidingView,
	Keyboard
} from 'react-native'
import { Button } from 'react-native-elements'
import { Config } from '@common'
import { connect } from 'react-redux'
import { phoneVerify, requestVerifyPhone, fetchUser } from '@redux/actions'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import SmsListener from 'react-native-android-sms-listener'
import { PermissionsAndroid } from 'react-native'

import styles from './styles'

class VerifyPhone extends Component {
	static propTypes = {
	  phoneVerify: PropTypes.func,
	  requestVerifyPhone: PropTypes.func,
	  request_id: PropTypes.string,
	  provider: PropTypes.string
	}

	constructor(props) {
	  super(props);
	
	  this.state = {
	  	countryCode: '+62',
	  	phone: '',
	  	phoneText: '',
	  	waiting: false,
	  	showLoader: false,
	  	request_id: '',
	  	provider: '',
	  	wait_verify: false,
	  	avail_resend: false,
	  	code1: '',
	  	code2: '',
	  	code3: '',
	  	code4: '',
	  	timer: 60,
	  	visibleResend: false
	  };
	}

	componentDidMount() {
		if (Platform.OS === 'android') {
			// this.requestReadSmsPermission()
			this._requestAllPermission()
		}

		Keyboard.addListener(
			'keyboardDidShow',
			this._keyboardDidShow,
		);
	}

	_keyboardDidShow = () => {
		let self = this;

		setTimeout(function() {
			if (self.scrollview !== undefined) {
				self.scrollview.scrollToEnd({animated: true});
			}
		}, 0);
	}

	_startCount = () => {
		let self = this;

		setTimeout(function() {
			clearTimeout(self.countInterval);
			self.setState({
				timer: 60,
				visibleResend: true
			});
		}, 60000);

		this.countInterval = setInterval(function() {
			self.setState({
				timer: --self.state.timer
			});
		}, 1000);
	}

	async _requestAllPermission() {
		try {

		PermissionsAndroid.requestMultiple(
			[PermissionsAndroid.PERMISSIONS.CAMERA,
				PermissionsAndroid.PERMISSIONS.READ_SMS,
				PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
				PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
				PermissionsAndroid.PERMISSIONS.READ_CONTACTS, PermissionsAndroid.PERMISSIONS.WRITE_CONTACTS]
			).then(async (result) => {
				if (result['android.permission.READ_EXTERNAL_STORAGE'] && result['android.permission.READ_SMS']
				&& result['android.permission.CAMERA'] && result['android.permission.WRITE_EXTERNAL_STORAGE']
				&& result['android.permission.READ_CONTACTS'] && result['android.permission.WRITE_CONTACTS']){
					var check = await PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.READ_SMS);

					if (result === PermissionsAndroid.RESULTS.GRANTED) {
						console.log("sms read permissions granted", granted); 
						result = await PermissionsAndroid.request( 
							PermissionsAndroid.PERMISSIONS.RECEIVE_SMS,
							{ 
								title: "Receive SMS",
								message: "Need access to receive sms, to verify OTP"
							}
						);

						if (result === PermissionsAndroid.RESULTS.GRANTED) {
							console.log("RECEIVE_SMS permissions granted", granted);
						} else {
							console.log("RECEIVE_SMS permissions denied");
						}
					} else {
						console.log("sms read permissions denied");
					}

				}else{
					return
				}
			})
		} catch (err) {
			console.log(err);
		}
	}

	// async requestReadSmsPermission() {
	// 	try {
	// 		var granted = await PermissionsAndroid.request(
	// 			PermissionsAndroid.PERMISSIONS.READ_SMS,
	// 			{
	// 				title: "Auto Verification OTP",
	// 				message: "need access to read sms, to verify OTP"
	// 			}
	// 		);

	// 		var check = await PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.READ_SMS);

	// 		if (granted === PermissionsAndroid.RESULTS.GRANTED) {
	// 			console.log("sms read permissions granted", granted); 
	// 			granted = await PermissionsAndroid.request( 
	// 				PermissionsAndroid.PERMISSIONS.RECEIVE_SMS,
	// 				{ 
	// 					title: "Receive SMS",
	// 					message: "Need access to receive sms, to verify OTP"
	// 				}
	// 			);

	// 			if (granted === PermissionsAndroid.RESULTS.GRANTED) {
	// 				console.log("RECEIVE_SMS permissions granted", granted);
	// 			} else {
	// 				console.log("RECEIVE_SMS permissions denied");
	// 			}
	// 		} else {
	// 			console.log("sms read permissions denied");
	// 		}
	// 	} catch (err) {
	// 		console.log(err);
	// 	}
	// }

	onFillPhone = (text) => {
		this.setState({
			phone: this.state.countryCode + parseInt(text, 10).toString(),
			phoneText: text
		});
	}

	onSubmit = () => {
		let self = this;

		if (this.state.phone == '') {
			Alert.alert('Invalid', 'Phone number cannot be blank!');
		} else {
			this.setState({
				showLoader: true
			});

			this._submitVerify();
		}
	}

	_submitVerify = () => {
		const { requestVerifyPhone, request_id, provider } = this.props;
		let self = this;

		fetch(Config.api_url + 'verify_phone', {
				method: 'POST',
				headers: {
					'Accept': 'application/json',
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({
					country_code: this.state.countryCode.replace('+', ''),
					phone: parseFloat(this.state.phoneText)
				})
			})
			.then(response => response.json())
			.then(json => {
				console.log('verify_phone', json)
				if (json.success) {
					requestVerifyPhone(json.request_id, json.provider)

					self.setState({
						showLoader: false,
						waiting: true,
						request_id: json.request_id
					})

					self._startCount();

					self._listenSMS()
				} else {
					if (request_id !== undefined && request_id !== '') {
						self.setState({
							showLoader: false,
							waiting: true
						})

						self._listenSMS()
					} else {
						self.setState({
							showLoader: false
						})

						Alert.alert('Message', json.msg)
					}
				}

				self.setState({
					wait_verify: false
				})
			})
			.catch((err) => {
				self.setState({
					showLoader: false,
					waiting: false
				})
				Alert.alert('Error', err.toString())
			})
	}

	_renderButton = () => {
		let self = this;

		if (this.state.showLoader) {
			return <ActivityIndicator animating={true} size="small" color="#ef5350" />;
		}

		return (
			<Button
				ref={btn => { this.btnSubmit = btn; }}
				title="Verify"
				onPress={this.onSubmit}
				TouchableComponent={TouchableNativeFeedback}
				containerStyle={{
					marginTop: 20,
					marginBottom: 15
				}}
				buttonStyle={{
					backgroundColor: '#ef5350',
					height: 50
				}}
			/>
		);
	}

	_renderVerifyButton = () => {
		if (this.state.wait_verify) {
			return (
				<View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginTop: 100 }}>
					<ActivityIndicator animating={true} size="small" color="#ef5350" />
				</View>
			)
		}

		return (
			<View style={styles.verButtonContainerStyle}>
		  	{this.state.visibleResend && (
		  		<Button
			  		title="Resend"
			  		containerStyle={styles.verButtonStyle}
			  		buttonStyle={[styles.verButtonInnerStyle, { backgroundColor: '#9E9E9E', height: 50 }]}
			  		disabled={this.state.wait_verify}
			  		onPress={() => this._resendVerification()}
		  		/>
	  		)}
	  		<Button
		  		title="Change Number"
		  		containerStyle={styles.verButtonStyle}
		  		buttonStyle={[styles.verButtonInnerStyle, { backgroundColor: '#009688', height: 50 }]}
		  		onPress={() => this._changeNumber()}
	  		/>
		  </View>
		)
	}

	_renderManualButton() {
		if (this.state.code1 !== '' && this.state.code2 !== '' && this.state.code3 !== '' && this.state.code4 !== '') {
			return (
				<View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: 20 }}>
					<Button
						containerStyle={{ width: '92%' }}
						buttonStyle={[styles.verButtonInnerStyle, { width: '100%', height: 50 }]}
			  		title="Verify"
			  		color="#005999"
			  		disabled={this.state.wait_verify}
			  		onPress={() => this._doVerify()}
		  		/>
	  		</View>
			)
		}
	}

	_changeNumber = () => {
		this.setState({
			waiting: false,
			showLoader: false
		});

		clearInterval(this.countInterval);
	}

	_listenSMS = () => {
		const { phoneVerify, fetchUser } = this.props
		let self = this

		let subscription = SmsListener.addListener(message => {
		  let verificationCodeRegex = /Kode DotPay anda adalah ([\d]{4})/;
		  let verificationCodeRegex2 = /Kode verifikasi DotPay anda adalah: ([\d]{4})/;

		  console.log(message)
		 
		  if (verificationCodeRegex.test(message.body) || verificationCodeRegex2.test(message.body)) {
		    let verificationCode = '';

		    if (verificationCodeRegex.test(message.body)) {
		    	verificationCode = message.body.match(verificationCodeRegex)[1];
		    } else if (verificationCodeRegex2.test(message.body)) {
		    	verificationCode = message.body.match(verificationCodeRegex2)[1];
		    }

		    this.setState({
		    	code: verificationCode.split('')
		    })

		    console.log('verificationCode', verificationCode)
		 		
		 		fetch(Config.api_url + 'do_verify', {
		 			method: 'POST',
					headers: {
						'Accept': 'application/json',
						'Content-Type': 'application/json'
					},
		 			body: JSON.stringify({
		 				code: verificationCode,
		 				request_id: this.state.request_id || this.props.request_id,
		 				provider: this.state.provider || this.props.provider,
		 				phone: parseFloat(this.state.phoneText),
		 				country_code: this.state.countryCode
		 			})
		 		})
		 		.then(response => response.json())
		 		.then(json => {
		 			//Alert.alert('do_verify', JSON.stringify(json, null, 2))
		 			console.log('do_verify', json)
		 			if (json.success) {
	 					phoneVerify(json.userData, self.state.phone, json.token);
	 					fetchUser(json.token);
	 					subscription.remove();
	 				} else {
	 					Alert.alert('Invalid', json.msg)
	 				}
		 		})
		  }
		});
	}

	_doVerify = () => {
		const { phoneVerify, fetchUser } = this.props;
		var self = this;

		if (this.state.code1 !== '' && this.state.code2 !== '' && this.state.code3 !== '' && this.state.code4 !== '') {
			this.setState({
				wait_verify: true
			})

			fetch(Config.api_url + 'do_verify', {
	 			method: 'POST',
				headers: {
					'Accept': 'application/json',
					'Content-Type': 'application/json'
				},
	 			body: JSON.stringify({
	 				code: this.state.code1 + this.state.code2 + this.state.code3 + this.state.code4,
	 				request_id: this.state.request_id || this.props.request_id,
	 				provider: this.state.provider || this.props.provider,
	 				phone: parseFloat(this.state.phoneText),
	 				country_code: this.state.countryCode
	 			})
	 		}).then(response => response.json())
	 		.then(json => {
	 			console.log('do_verify', json)
	 			if (json.success) {
					phoneVerify(json.userData, self.state.phone, json.token);
					fetchUser(json.token);
				} else {
					Alert.alert('Invalid', json.msg)
				}

				self.setState({
					wait_verify: false
				})
	 		});
		};
	}

	_resendVerification = () => {
		let self = this;

		this.setState({
			wait_verify: true,
			visibleResend: false
		});

		console.log('_resendVerification', this.state)

		if (this.state.provider === 'nexmo') {
			fetch(Config.api_url + 'cancel_verify', {
				method: 'POST',
				headers: {
					'Accept': 'application/json',
					'Content-Type': 'application/json'
				},
	 			body: JSON.stringify({ request_id: this.state.request_id || this.props.request_id, provider: this.state.provider || this.props.provider })
			})
			.then(response => response.json())
			.then((json) => {
				console.log('cancel_verify', json)
				if (json.success) {
					self._submitVerify();
				} else {
					Alert.alert('Info', json.msg)
					self.setState({
						wait_verify: false
					})
				}
			});
		} else {
			self._submitVerify();
		}
	}

	render() {
		const { phoneVerify, request_id } = this.props

		if (this.state.waiting) {
			return (
				<KeyboardAvoidingView style={styles.body} behavior="padding" enabled>
					<ScrollView style={styles.scroll} keyboardShouldPersistTaps="always" ref={scrollview => { this.scrollview = scrollview; }}>
					  <StatusBar
		          backgroundColor="#4a416e"
		          barStyle="light-content"
		        />
					  <View>
						  <Text style={styles.waitingTextHeader}>SMS Verification</Text>
						  <Text style={styles.waitingTextSubHeader}>Waiting to automatically detect SMS sent to:</Text>
						  <Text style={styles.waitingPhoneNum}>{this.state.phone}</Text>
					  </View>

					  <View style={styles.inputCodeWrap}>
					  	<TextInput
					  		ref="code1"
					  		style={styles.inputCodeText}
					  		keyboardType="number-pad"
					  		maxLength={1}
					  		value={this.state.code1}
					  		onChangeText={(val) => {
					  			this.setState({code1: val});
					  			if (val !== '') {
					  				this.refs.code2.focus();
					  			} else {
					  				this.refs.code1.focus();
					  			}
					  		}}
				  		/>
				  		<Text style={styles.space}>—</Text>
					  	<TextInput
					  		ref="code2"
					  		style={styles.inputCodeText}
					  		keyboardType="number-pad"
					  		maxLength={1}
					  		value={this.state.code2}
					  		onChangeText={(val) => {
					  			this.setState({code2: val});
					  			if (val !== '') {
					  				this.refs.code3.focus();
					  			} else {
					  				this.refs.code1.focus();
					  			}
					  		}}
				  		/>
				  		<Text style={styles.space}>—</Text>
					  	<TextInput
					  		ref="code3"
					  		style={styles.inputCodeText}
					  		keyboardType="number-pad"
					  		maxLength={1}
					  		value={this.state.code3}
					  		onChangeText={(val) => {
					  			this.setState({code3: val});
					  			if (val !== '') {
					  				this.refs.code4.focus();
					  			} else {
					  				this.refs.code2.focus();
					  			}
					  		}}
				  		/>
				  		<Text style={styles.space}>—</Text>
					  	<TextInput
					  		ref="code4"
					  		style={styles.inputCodeText}
					  		keyboardType="number-pad"
					  		maxLength={1}
					  		value={this.state.code4}
					  		onChangeText={(val) => {
					  			this.setState({code4: val});
					  			if (val !== '') {
					  				this.refs.code4.blur();
					  			} else {
					  				this.refs.code3.focus();
					  			}
					  		}}
				  		/>
					  </View>

					  {!this.state.visibleResend && (
						  <View style={{
						  	marginTop: 15
						  }}>
						  	<Text style={{ textAlign: 'center' }}>You can request new code until this timeout {this.state.timer}</Text>
						  </View>
				  	)}

					  {this._renderManualButton()}

					  {this._renderVerifyButton()}
				  </ScrollView>
			  </KeyboardAvoidingView>
			);
		}

		return (
			<KeyboardAvoidingView style={styles.body} behavior="padding" enabled>
				<ScrollView style={styles.scroll} keyboardShouldPersistTaps="always" ref={scrollview => { this.scrollview = scrollview; }}>
					<View style={styles.header}>
						<Text style={styles.headerText}>Get Started</Text>
					</View>

					<View style={styles.imageWrapper}>
						<Image
							source={require('@images/get_started_img.png')}
							style={styles.getStarted}
						/>
					</View>

					<Text style={styles.textLabel}>Enter your Phone number</Text>
					<View style={styles.phoneInputWrapper}>
						<TextInput
							defaultValue={this.state.countryCode}
							style={styles.inputCode}
							editable={false}
						/>
						<TextInput
							defaultValue={this.state.phoneText}
							keyboardType="phone-pad"
							placeholder="Phone number"
							style={styles.inputPhone}
							onChangeText={this.onFillPhone}
							maxLength={15}
						/>
					</View>
					<View style={styles.submitWrap}>
						<Text style={styles.textAgreement} numberOfLines={3}>
							{`By Clicking "Verify" I Certify that i am 18 years\nof ageor older, and i agree to the User\nagreement and privacy policy`}
						</Text>
						
						{this._renderButton()}
					</View>
				</ScrollView>
			</KeyboardAvoidingView>
		);
	}
}

VerifyPhone.defaultProps = {
	request_id: '',
	provider: ''
}

const mapStateToProps = ({ user }, ownProps) => {
	let request_id = '';
	let provider = '';

	if (user.verify_phone_requestid !== undefined) {
		request_id = user.verify_phone_requestid;
	}

	if (user.verify_phone_provider !== undefined) {
		provider = user.verify_phone_provider;
	}

	return {
		request_id: request_id,
		provider: provider
	}
}

export default connect(mapStateToProps, { phoneVerify, requestVerifyPhone, fetchUser })(VerifyPhone)