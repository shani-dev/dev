import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { View, Text, Alert, TouchableNativeFeedback, FlatList, TouchableOpacity, Share, TextInput, ScrollView, StatusBar, Dimensions, PermissionsAndroid, Picker } from 'react-native';
import { CheckBox, Button, Overlay, ListItem, Header } from 'react-native-elements';
import QRCodeScanner from 'react-native-qrcode-scanner';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import { connect } from 'react-redux';
import { fetchRecentTransactions, fetchWallets } from '@redux/actions';
import { Config } from '@common';
import PINCode from '@haskkor/react-native-pincode';
import Contacts from 'react-native-contacts';
import NfcManager, {Ndef} from 'react-native-nfc-manager';
import { Accordion } from '@components';
import Loader from '@components/Loader';
import styles from './styles';
import BottomSheet from '@components/BottomSheet';
import AutoComplete from '@components/AutoComplete';

const { height } = Dimensions.get('window');


class Transfer extends Component {
	static propTypes = {
	  user: PropTypes.object,
	  data: PropTypes.object
	}

	constructor(props) {
	  super(props);
	
	  this.state = {
	  	scanned: false,
	  	receiver: '',
	  	receiver_phone: '',
	  	amount: 0,
	  	dotpayuser_amount: 0,
	  	onTransfer: false,
	  	btnDisabled: false,
	  	notes: '',
			buttonTitle: 'Transfer',
			titleSheet:'',
			sheetVisible:false,
	  	pinIsSet: false,
	  	hasEnterPin: false,
	  	completed: false,
	  	tf_via: 'scan',
	  	cameraActive: false,
	  	showContacts: false,
			contacts: [],
			isLoading:false,
			dataCard:undefined,
	  	tabState: {
	  		index: 0,
	  		routes: [
	  			{ key: 'rekening', title: 'Rekening Bank' },
	  			{ key: 'dotpayuser', title: 'DotPay User' },
	  			{ key: 'qrcode', title: 'Scan QR' }
	  		]
	  	},
	  	generating_link: false,
	  	rekening_amount: 1000,
	  	link_to_share: '',
			is_nfc_supported: false,
			scheduledSelectedPaymentType: 'onetime',
			validRekeningBank: false,
			validDotpayUser: false,
			validScheduled: false
	  };
	}

	componentWillMount() {
		this._checkParams();

		console.log('navigation', this.props)

		if (this.props.data.direct_scanning && false === this.state.scanned) {
			this.props.navigation.setParams({
				header: null
			});
		}
	}

  componentDidMount() {
    this.requestReadContactsPermission();
    this._checkNFCSupported();
  }

  _checkNFCSupported = () => {
  	NfcManager.isSupported()
  		.then(supported => {
  			let tabState = this.state.tabState;

  			if (supported) {
	  			tabState.routes.push({
	  				key: 'nfc',
	  				title: 'NFC Tap'
	  			});

	  			this.setState({
	  				tabState: tabState
	  			});
  			}
  		})
  }

	async requestReadContactsPermission() {
    let self = this;

    try {
      var granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.READ_CONTACTS,
        {
          title: "Contacts",
          message: "This app would like to view your contacts."
        }
      );

      var check = await PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.READ_CONTACTS);

      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        self.setState({
          read_contact_permission: true
        });

        Contacts.getAllWithoutPhotos((err, contacts) => {
			    if (err === 'denied'){
			      // error
			    } else {
			    	console.log('contacts', contacts);
			      self.setState({
			      	contacts: contacts
			      });
			    }
			  });

        console.log("contacts read permissions granted", granted);
      } else {
        console.log("contacts read permissions denied");
      }
    } catch (err) {
      console.log(err);
    }
	}
	
	

	_checkParams = () => {
		const { data, user } = this.props;

		if (data.tfParams !== undefined) {
			let tfData = {};

			if (data.tfParams.address !== undefined) {
				tfData.receiver = data.tfParams.address;
			}

			if (data.tfParams.amount !== undefined) {
				tfData.amount = data.tfParams.amount;
			}

			if (data.tfParams.msg !== undefined) {
				tfData.notes = decodeURIComponent(data.tfParams.msg);
			}

			tfData.scanned = true;
			tfData.source = data.wallet.id;

			if (user.blockchain.walletSecurity !== '') {
				tfData.pinIsSet = true;
			}

			this.setState({
				...tfData
			})
		}
	}

	onScannedReceiver = (e) => {
		const { data } = this.props
		let isValid = false;
		let content = e.data;
		let splitted = content.split('://');
		let receiver = '';
		let amount = 0;
		let msg = '';

		if (content.indexOf('dotpay://') === -1) return Alert.alert('Invalid', 'Invalid QR Code');

		receiver = splitted[1].split('?')[0];
		let paramsArr = splitted[1].split('?')[1].split('&');

		for (var i = 0; i < paramsArr.length; i++) {
			if (paramsArr[i].indexOf('amount=') > -1) {
				amount = paramsArr[i].split('=')[1];
			}

			if (paramsArr[i].indexOf('msg=') > -1) {
				msg = paramsArr[i].split('=')[1];
			}
		}

		this.setState({
			receiver: receiver,
			amount: amount,
			scanned: true,
			source: data.wallet.id,
			notes: msg
		});
	}

	refresh = () => {
		const { fetchRecentTransactions, fetchWallets, user, navigation } = this.props

		fetchRecentTransactions(user.token, user.blockchain.wallets)
		fetchWallets(user.token)
	}

	_doTransfer = () => {
		const { user, navigation } = this.props
		const { wallet } = this.props.data

		if (this.state.amount === '' || parseFloat(this.state.amount) <= 0 ) {
			return Alert.alert('Invalid', 'Amount must larger than 0!');
		}

		if (parseFloat(wallet.balance) < parseFloat(this.state.amount)) {
			return Alert.alert('Invalid', 'Insufficient balance');
		}

		this.setState({
			onTransfer: true,
			btnDisabled: true
		});
	}

	_transfer = () => {
		const { user, navigation } = this.props
		const { wallet } = this.props.data

		this.setState({
			hasEnterPin: true,
			isLoading:true,
			btnDisabled:true,
			sheetVisible:false
		})

		let data = {
			sender: this.state.source,
			receiver: this.state.receiver,
			amount: this.state.amount,
			msg: this.state.notes
		}

		fetch(Config.api_url + 'api/user/transfer?token=' + user.token, {
			method: 'POST',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(data)
		})
		.then(response => response.json())
		.then((json) => {
			console.log('_transfer', json);
			this.refresh()
			this.setState({
				buttonTitle: 'Transfer',
				onTransfer: false,
				completed: true,
			})
			setTimeout(()=>{this.setState({isLoading:false,btnDisabled:false,	buttonTitle: 'Transfer', onTransfer: false, hasEnterPin:false, btnbuttonTitle:'Transfer', sheetVisible:true, titleSheet:'TRANSFER SUKSES',dataCard:data})},2000)
		})
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

	_onPinIsCorrect = (pinCode) => {

	}

	_onEndProcessFunction = (pinCode) => {
		this.setState({
			pinIsSet: true
		})
	}

	_onComplete = (pin) => {
		let self = this;
		const { user } = this.props;
		fetch(Config.api_url + 'api/user/change_pin?token=' + user.token, {
			method: 'POST',
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json'
			},
			'body': JSON.stringify({
				pin: pin
			})
		})
		.then(response => response.json())
		.then((json) => {
			if (json.success) {
				self.fetchingUser();
				self.setState({
					pinIsSet: true,
					isLoading:false
				})
			}
		})
	}

	_tapToScan = () => {
		this.setState({ cameraActive: true })
	}

	_renderScanQRScene = () => {
		if (this.state.cameraActive) {
			return (
				<View style={[styles.tabInner, { paddingTop: 15 }]}>
					<QRCodeScanner
						onRead={(event) => this.onScannedReceiver(event)}
						cameraStyle={styles.cameraStyle}
						containerStyle={{}}
						topViewStyle={{}}
						bottomViewStyle={{}}
					/>
				</View>
			)
		}

		return (
			<TouchableOpacity
				onPress={this._tapToScan}
				style={[styles.tabInner, { justifyContent: 'center', alignItems: 'center', height: 300, borderWidth: 2, borderStyle: 'dotted', borderColor: '#aaaa', borderRadius: 2, marginTop: 15, paddingTop: 0 }]}
			>
				<Text>Tap to scan QR</Text>
			</TouchableOpacity>
		)
	}

	_renderDotpayUser = () => {
		return (
			<View style={[styles.tabInner, { marginTop: 15 }]}>
				<Text style={{}}>Penerima</Text>

				<AutoComplete  handling={this._handlingAutoCompleteComponent} />
				<Text style={{}}>Amount</Text>
				<TextInput
					keyboardType="decimal-pad"
					defaultValue={this.state.dotpayuser_amount.toString()}
					style={styles.inputStyle}
					onChangeText={(value) => this.setState({ dotpayuser_amount: value })}
				/>

				<View style={
					{
						flexDirection: 'row',
						justifyContent: 'space-between'
					}
				}>
					<Button
						disabled={this.state.validDotpayUser}
						title="Transfer"
						containerStyle={{ marginTop: 20, width: '48%' }}
						onPress={this._generateLink}
						loading={this.state.generating_link}
					/>
					<Button
						disabled={this.state.validDotpayUser}
						title="Share Link"
						containerStyle={{ marginTop: 20, width: '48%' }}
						onPress={this._generateLink}
						loading={this.state.generating_link}
					/>
				</View>
			</View>
		)
	}

	_renderRekeningScene = () => {
		return (
			<View style={[styles.tabInner, { marginTop: 15 }]}>
				<Text style={{}}>Phone Number</Text>

				<AutoComplete  handling={this._handlingAutoCompleteComponent} />
				<Text style={{}}>Amount</Text>
				<TextInput
					keyboardType="decimal-pad"
					defaultValue={this.state.rekening_amount.toString()}
					style={styles.inputStyle}
					onChangeText={(value) => this.setState({ rekening_amount: value })}
				/>

				<Button
					disabled={this.state.validRekeningBank}
					title="Share Link"
					containerStyle={{ marginTop: 20 }}
					onPress={this._generateLink}
					loading={this.state.generating_link}
				/>
			</View>
		)
	}

	_renderScheduledScene = () => {
		return (
			<View style={[styles.tabInner, { marginTop: 15 }]}>
				<Text>Payment Description</Text>
				<TextInput
					style={styles.inputStyle}
				/>

				<Text style={{}}>Phone Number</Text>
				<TextInput
					style={styles.inputStyle}
				/>

				<Text>Amount</Text>
				<TextInput
					keyboardType="decimal-pad"
					style={styles.inputStyle}
				/>
				<View style={styles.radioWrapper}>
					<CheckBox
						title="One time"
						checked={this.state.scheduledSelectedPaymentType === 'onetime' ? true : false}
						containerStyle={styles.radioContainerStyle}
						textStyle={styles.radioText}
						checkedIcon='dot-circle-o'
						uncheckedIcon='circle-o'
						onPress={() => this.setState({ scheduledSelectedPaymentType: 'onetime' })}
					/>
					<CheckBox
						title="Recurring"
						checked={this.state.scheduledSelectedPaymentType === 'recurring' ? true : false}
						containerStyle={styles.radioContainerStyle}
						textStyle={styles.radioText}
						checkedIcon='dot-circle-o'
						uncheckedIcon='circle-o'
						onPress={() => this.setState({ scheduledSelectedPaymentType: 'recurring' })}
					/>
				</View>

				<Button
					disabled={this.state.validScheduled}
					title={this.state.scheduledSelectedPaymentType === 'onetime' ? 'Transfer' : 'Confirm'}
					containerStyle={{ marginTop: 20 }}
					onPress={this._generateLink}
					loading={this.state.generating_link}
				/>
			</View>
		)
	}

	_renderNFCTab = () => {
		return (
			<View>
				<Text>NFC Tab Content</Text>
			</View>
		)
	}


	_handlingAutoCompleteComponent = (name,phone) => {
		this.setState({
			receiver:name,
			receiver_phone:phone
		})
	}

	_renderScene = ({ route, jumpTo }) => {
		switch (route.key) {
			case 'rekening':
				return (
					this._renderRekeningScene()
				)
				break;
			case 'dotpayuser':
				return (
					this._renderDotpayUser()
				)
				break;
			default:
				return (
					this._renderScanQRScene()
				)
				break;
		}
	}

	_generateLink = () => {
		const { data, user } = this.props
		let self = this;
		let phone = '+62' + parseFloat(this.state.receiver_phone);

		if (this.state.receiver_phone === '') return Alert.alert('Info', 'Receiver phone number cannot be blank!');
		if (parseFloat(this.state.rekening_amount) === 0) return Alert.alert('Info', 'Amount is 0!');
		if (parseFloat(data.wallet.balance) < parseFloat(this.state.rekening_amount)) return Alert.alert('Info', 'Insufficient balance!');

		this.setState({
			generating_link: true
		})

		fetch(Config.api_url + 'api/user/generate_tf_link?token=' + user.token, {
			method: 'POST',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				wallet: data.wallet.id,
				amount: this.state.rekening_amount,
				phone: phone
			})
		})
		.then(response => response.json())
		.then((json) => {
			self.setState({ link_to_share: json.link, generating_link: false });
			self.onShare();
		})
	}

	onShare = async () => {
		try {
      const result = await Share.share({
        message:
          this.state.link_to_share,
      })

      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
          //this.props.navigation.goBack();
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error) {
      alert(error.message);
    }		
  };

  _keyExtractor = (item, index) => item.id;

  _renderContact = ({item, index}) => {
  	return (
  		<ListItem
  			key={index}
  			leftAvatar={{ source: { uri: item.thumbnailPath } }}
  			title={item.givenName}
  			subtitle={item.phoneNumbers.number}
			/>
		)
  }

	render() {
		const self = this;
		const { data, user } = this.props
		const { receiver, amount, scanned, onTransfer, hasEnterPin, completed,sheetVisible,titleSheet } = this.state
		
		if (data.direct_scanning && false === scanned) {
			return (
				<View style={{ flex: 1 }}>
					<QRCodeScanner
						onRead={(event) => this.onScannedReceiver(event)}
						cameraStyle={{
							height: height
						}}
						containerStyle={{}}
						topViewStyle={{
							backgroundColor: 'transparent',
							zIndex: 10
						}}
						cameraProps={{
							captureAudio: false
						}}
						bottomViewStyle={{}}
						showMarker={true}
						markerStyle={{
							borderColor: '#ff0000',
							borderStyle: 'dashed'
						}}
						topContent={(
							<View style={{
								paddingTop: 80,
								zIndex: 100
							}}>
								<TouchableOpacity
									style={{
										zIndex: 110
									}}
									onPress={() => alert('test')}
								>
									<MaterialCommunityIcons name="flashlight" color="white" size={23} />
								</TouchableOpacity>
							</View>
						)}
					/>
				</View>
			)
		}

		if (false === completed && scanned === false) {
			return (
				<View style={{ flex: 1, backgroundColor: '#f7f7f7' }}>
					<Header
						leftComponent={{ icon: 'arrow-back', color: '#fff', onPress:() => this.props.navigation.goBack() }}
						centerComponent={{ text: 'Transfer', style: { color: '#fff' } }}
						containerStyle={styles.header}
					/>
	        <ScrollView>

		        <View style={styles.topArea}>
		        	<Text>Silahkan pilih metode transfer</Text>
		        </View>

		        <Accordion
		        	heading="Rekening Bank"
		        	content={this._renderRekeningScene}
	        	/>

		        <Accordion
		        	heading="DotPay User"
		        	content={this._renderDotpayUser}
	        	/>

		        <Accordion
		        	heading="Scan QR"
		        	content={this._renderScanQRScene}
	        	/>
						<Accordion
							heading="Scheduled Transfer"
							content={this._renderScheduledScene}
						/>
        	</ScrollView>

					<Overlay
						isVisible={this.state.showContacts}
						windowBackgroundColor="rgba(0, 0, 0, .5)"
						onBackdropPress={() => this.setState({ showContacts: false })}
					>
						<View>
							<FlatList
								data={this.state.contacts}
								renderItem={this._renderContact}
								keyExtractor={this.keyExtractor}
							/>
						</View>
					</Overlay>
				</View>
			)
		}

		if (onTransfer && false === hasEnterPin) {
			return (
				<View style={{ flex: 1 }}>
				  <StatusBar
	          backgroundColor="#4a416e"
	          barStyle="light-content"
					/>
					<PINCode
							status={'enter'}
							finishProcess={this._transfer}
							storedPin={this.props.user.blockchain.walletSecurity}
							passwordLength={6}
							touchIDSentence="To process this transaction"
						/>
				</View>
			
			)
		}

		return (
			<View style={{ flex: 1 }}>
			  <StatusBar
          backgroundColor="#4a416e"
          barStyle="light-content"
        />
				<ScrollView>
					<View style={{ padding: 15,marginTop:10 }}>
						<Text>To:</Text>
						<TextInput
							editable={false}
							style={styles.inputStyle}
							placeholder="to"
							value={receiver}
						/>

						<Text>Amount:</Text>
						<TextInput
							selectTextOnFocus
							autoFocus={true}
							style={styles.inputStyle}
							placeholder="Amount"
							value={amount === '0' ? '' : amount}
							onChangeText={(value) => this._onChangeAmount(value)}
							keyboardType="decimal-pad"
						/>

						<Text>Source:</Text>
						<TextInput
							style={styles.inputStyle}
							placeholder="to"
							value={data.wallet.name}
							editable={false}
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
							title={this.state.buttonTitle}
							loading={this.state.onTransfer}
							onPress={() => this._doTransfer()}
							disabled={this.state.btnDisabled}
						/>
						<Loader
							animationType="fade"
							modalVisible={this.state.isLoading || false}
							/>
						
					</View>
				</ScrollView>
				<BottomSheet
					animationType="fade"
					titleContent={this.state.titleSheet || 'sukses'}
					dataContent={this.state.dataCard}
					sheetVisible={this.state.sheetVisible || false}
					btnPress={() => this.props.navigation.goBack()}
					/>
			</View>
		);
	}
}

const mapStateToProps = ({ user }, ownProps) => {
	return {
		user: user
	}
}

export default connect(mapStateToProps, { fetchRecentTransactions, fetchWallets })(Transfer)