/** @format */

import React, {Component} from 'react'
import PropTypes from 'prop-types'
import { View, Platform, StatusBar, SafeAreaView, Alert, AsyncStorage, NetInfo } from 'react-native'
import MainNavigator from '@navigation'
import { Constants } from '@common'

import MenuAndroid from '@components/LeftMenu/MenuAndroid'

import { AppIntro, SetPin } from '@components'
import { VerifyPhone, Register, NoInternet } from '@container'
import firebase from 'react-native-firebase'
import type { Notification, NotificationOpen } from 'react-native-firebase'
import { Config } from '@common'
import { fetchUser, fetchWallets, newInbox, networkStatus } from '@redux/actions'

import { connect } from 'react-redux'
//import { setInitialNotification } from '@redux/actions'

import SplashScreen from 'react-native-splash-screen'

class RootRouter extends Component {
	static propTypes = {
	  fetchUser: PropTypes.func,
	  fetchWallets: PropTypes.func,
	  networkStatus: PropTypes.func,
	  newInbox: PropTypes.func
	}

	constructor(props) {
	  super(props);

	  if (false !== this.props.token) {
	  	this._checkUserToken();
	  	this._fetchingUser();
	  };
	}

	_checkUserToken = () => {
		const { token, networkStatus } = this.props;

		NetInfo.isConnected.fetch().then(isConnected => {
	    if (isConnected) {
	    	fetch(Config.api_url + 'api/user?token=' + token, {
					headers: {
						Accept: 'application/json',
						'Content-Type': 'application/json'
					}
				})
				.then(response => {
					if (response.ok) {
						networkStatus(true);
						return response.json();
					} else {
						networkStatus(false);
					}
				})
				.then((json) => {
					console.log('_checkUserToken', json)
				});
	    } else {
	      networkStatus(false);
	    }
	  });
	}

	_fetchingUser = () => {
		const { fetchUser, fetchWallets, token } = this.props

		fetchUser(token);
		fetchWallets(token);
	}

	async componentDidMount() {
		const { newInbox } = this.props;
		var self = this;
		const enabled = await firebase.messaging().hasPermission();

		// Hide splash screen
		SplashScreen.hide();

		if (enabled) {
			// user has permission
		} else {
			// user doesn't have permission

			try {
				firebase.messaging().requestPermission()
					.then(() => {
						// user has authorized
					})

			} catch(e) {
				// No permission for notification
			}
		}

		const notificationOpen: NotificationOpen = await firebase.notifications().getInitialNotification();
		if (notificationOpen) {
			// App was opened by a notification
			// Get the action triggered by the notification being opened
			const action = notificationOpen.action;
			// Get information about the notification that was opened
			const notification: Notification = notificationOpen.notification;
			if (notification.body !== undefined) {
				let alertOutput = '';
				if (typeof notification.body === 'string') {
					alertOutput = notification.body;
				} else {
					alertOutput = JSON.stringify(notification.body, null, 2);
				}
			} else {
				var seen = [];
        /*Alert.alert('Notification', JSON.stringify(notification.data, function(key, val) {
          if (val != null && typeof val == "object") {
            if (seen.indexOf(val) >= 0) {
                return;
            }
            seen.push(val);
          }
          return val;
        }));*/
			}

			console.log(notification)
			self._fetchingUser();
			firebase.notifications().removeDeliveredNotification(notification.notificationId);
		}

		const channel = new firebase.notifications.Android.Channel('dotpay-channel', 'DotPay Channel', firebase.notifications.Android.Importance.Max)
    .setDescription('DotPay apps tx channel');

    // Create the channel
    firebase.notifications().android.createChannel(channel);

		this.notificationDisplayedListener = firebase.notifications().onNotificationDisplayed((notification: Notification) => {
      // Process your notification as required
      // ANDROID: Remote notifications do not contain the channel ID. You will have to specify this manually if you'd like to re-display the notification.
    });

    this.notificationListener = firebase.notifications().onNotification((notification: Notification) => {
    	// Process your notification as required
      console.log('get Message');
      console.log(notification);
      notification
      	.android.setGroup(notification.data.type)
        .android.setChannelId('dotpay-channel')
        .android.setSmallIcon('ic_launcher');
      // Process your notification as required
      firebase.notifications()
      	.displayNotification(notification);

    	console.log('data type', notification.data.type)

    	if (['RECEIVE', 'SEND', 'DEPOSIT'].indexOf(notification.data.type) > -1) {
					newInbox({
						title: notification.title,
						body: notification.body,
						read: 0,
						checked:false,
						timestamp: new Date().getTime()
					})
				}
    		self._fetchingUser();
    	
    });

    this.notificationOpenedListener = firebase.notifications().onNotificationOpened((notificationOpen: NotificationOpen) => {
      // Get the action triggered by the notification being opened
      const action = notificationOpen.action;
      // Get information about the notification that was opened
      const notification: Notification = notificationOpen.notification;
      // const notification = new firebase.notifications.Notification({
      //     sound: 'default',
      //     show_in_foreground: true,
      //     show_in_background: true
      // })
      //     .setNotificationId(notificationOpen.notification.notificationId)
      //     .setTitle(notificationOpen.notification.title)
      //     .setSubtitle(notificationOpen.notification.subtitle)
      //     .setBody(notificationOpen.notification.body)
      //     .setData(notificationOpen.notification.data)
      //     .android.setChannelId('test-channel') // e.g. the id you chose above
      //     .android.setSmallIcon('ic_launcher') // create this icon in Android Studio
      //     .android.setColor('#000000') // you can set a color here
      //     .android.setPriority(firebase.notifications.Android.Priority.High);
      if (notification.body!==undefined) {
        alert(notification.body);
        // var seen = [];
        // alert(JSON.stringify(notification.data, function(key, val) {
        //     if (val != null && typeof val == "object") {
        //         if (seen.indexOf(val) >= 0) {
        //             return;
        //         }
        //         seen.push(val);
        //     }
        //     return val;
        // }));
      } else {
        var seen = [];
        Alert.alert('Notification', JSON.stringify(notification.data, function(key, val) {
          if (val != null && typeof val == "object") {
            if (seen.indexOf(val) >= 0) {
                return;
            }
            seen.push(val);
          }
          return val;
        }));
      }
      firebase.notifications().removeDeliveredNotification(notification.notificationId);
  	});

    this._checkFCMToken();
	}

	_checkFCMToken = async () => {
		const { token, userData } = this.props;

		if (false !== token) {
			firebase.messaging().getToken()
  		.then(fcmToken => {
  			if (fcmToken) {
  				let data = {};

  				if (__DEV__) {
  					data.fcm_token_dev = fcmToken;

  					if (fcmToken === userData.fcm_token_dev) return;
  				} else {
  					data.fcm_token = fcmToken;
  					if (fcmToken === userData.fcm_token) return;
  				}

  				fetch(Config.api_url + 'api/user/store_fcm_token?token=' + token, {
		      	method: 'POST',
						headers: {
							Accept: 'application/json',
							'Content-Type': 'application/json'
						},
						body: JSON.stringify(data)
		      })
		      .then(response => response.json())
		      .then((json) => {
		      })
  			}
  		});
		}
	};

	componentWillUnmount() {
		this.notificationDisplayedListener();
    this.notificationListener();
    this.notificationOpenedListener();
	}

	onIds = (device) => {
		console.log('Device info: ', device)
	}

	goToScreen = (routeName, params, isReset = true) => {
		const { navigator } = this.refs
		navigator.dispatch({
			type: 'Navigation/NAVIGATE',
			routeName,
			params
		})
	}

	_isEmpty = (obj) => {
		for(var key in obj) {
      if(obj.hasOwnProperty(key))
        return false;
    }
    return true;
	}

	renderContent = () => {
		return (
			<SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
				<View style={{ flexGrow: 1, backgroundColor: '#fff' }}>
					<StatusBar backgroundColor="#666" barStyle="light-content" />
					<MainNavigator
						ref="navigator"
					/>
				</View>
			</SafeAreaView>
		)
	}

	render() {
		const { isFinishedIntro, phoneVerified, token, pinHasSet, network_status } = this.props;

		if (false === network_status) {
			return <NoInternet />
		}

		if (false === isFinishedIntro) {
			return <AppIntro />
		}

		if (false === phoneVerified) {
			return <VerifyPhone />
		}

		if (false === token) {
			return <Register />
		}

		if (false === pinHasSet) {
			return <SetPin />
		}

		if (Platform.OS === 'android') {
			return (
				<MenuAndroid
					ref="menuDefault"
					goToScreen={this.goToScreen}
					routes={this.renderContent()}
				/>
			)
		}
	}
}

RootRouter.defaultProps = {
	isFinishedIntro: false,
	userData: false,
	phoneVerified: false,
	token: false,
	pinHasSet: false,
	network_status: true
}

const mapStateToProps = ({ user, app_reduce }, ownProps) => {
	return {
		isFinishedIntro: user.isFinishedIntro,
		userData: user.userData,
		user: user,
		phoneVerified: user.phoneVerified,
		token: user.token,
		pinHasSet: user.pinHasSet,
		network_status: app_reduce.network_status
	}
}

export default connect(mapStateToProps, { fetchUser, fetchWallets, newInbox, networkStatus })(RootRouter)