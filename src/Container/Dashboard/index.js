/** @format */

import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { View, Text, StatusBar, Image, TouchableOpacity, ScrollView, Alert, Linking, Platform, ImageBackground } from 'react-native'
import { Badge } from 'react-native-elements'
import LinearGradient from 'react-native-linear-gradient'
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import QuickSend from '@components/QuickSend'
import Processing from '@components/Processing'
import DotpayApps from '@components/DotpayApps'
import MyApps from '@components/MyApps'
import News from '@components/News'
import RecentTransactions from '@components/RecentTransactions'
import { connect } from 'react-redux'
import { fetchUser, fetchWallets, changeDashboardBg, fetchRecentTransactions } from '@redux/actions'
import ImagePicker from 'react-native-image-picker'

import { Config, Tools } from '@common'
import styles from './styles'

class Dashboard extends Component {
  static propTypes = {
    navigate: PropTypes.func,
    user: PropTypes.object,
    fetchUser: PropTypes.func,
    fetchWallets: PropTypes.func,
    changeDashboardBg: PropTypes.func,
    wallets: PropTypes.array,
    inbox: PropTypes.array,
    dashboard_background: PropTypes.string,
  }

  constructor(props) {
    super(props);

    this.state = {
      moreClick: false,
      claim_success: false
    }
  
    this._initialize()
    this._handleDeepLink()
    this._fetchTransactions()
  }

  _fetchTransactions = () => {
    const { fetchRecentTransactions, user } = this.props;

    fetchRecentTransactions(user.token, user.blockchain.wallets);
  }

  _handleDeepLink() {
    var self = this;

    if (Platform.OS === 'android') {
      Linking.getInitialURL().then(url => {
        if (null !== url && url.indexOf('https://app.dotpay.id/return') !== -1 ) {
          if (self.props.user.blockchain) {
            let wallets = self.props.user.wallets;
            let params = {};
            let urlSplit = url.split('?');
            let paramSplit = urlSplit[1].split('&');

            for (var i = 0; i < paramSplit.length; i++) {
              var paramArr = paramSplit[i].split('=');
              params[paramArr[0]] = paramArr[1];
            }

            switch (params['action']) {
              case 'send':
                self.prop.navigation.navigate('Transfer', { data: { wallet: wallets[0], tfParams: params } });
                break;
              case 'receive':
                self._receiveMoneyFromIntent(params);
                break;
              default:
                // statements_def
                break;
            }
          }
        }
      });
    }
  }

  _initialize = () => {
    const { user, fetchUser, fetchWallets } = this.props

    fetchUser(user.token)
    fetchWallets(user.token)
  }

  _receiveMoneyFromIntent = (params) => {
    const { user, wallets } = this.props;
    let self = this;

    fetch(Config.api_url + 'api/user/claim_link?token=' + user.token, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        wallet: wallets[0].id,
        link_token: params.token
      })
    })
    .then(response => response.json())
    .then((json) => {
      if (json.status) {
        self.setState({
          claim_success: true
        })
      } else {
        Alert.alert('Info', json.msg)
      }
    })
  }

  _renderWalletName = () => {
    const { wallets } = this.props;

    if (wallets.length > 0) {
      return (
        <View style={styles.walletTitle}>
          <Text style={styles.walletTitleText}>{wallets[0].name}</Text>
        </View>
      )
    }
  }

  _renderWalletBalance = () => {
    const { wallets } = this.props;

    if (wallets.length > 0) {
      let mainBalance = wallets[0].balance;
      mainBalance = Tools.formatMoney(mainBalance, 0, ',', '.');

      return (
        <View style={styles.walletBalance}>
          <Text style={styles.balanceCurrency}>Rp </Text>
          <Text style={styles.balanceText}>{mainBalance}</Text>
        </View>
      )
    }
  }

  _renderInboxBadge = () => {
    const { inbox } = this.props;
    let unread = 0;

    for (var i = 0; i < inbox.length; i++) {
      if (inbox[i].read === 0) {
        unread++;
      }
    }

    if (unread > 0) {
      return (
        <Badge status="warning" containerStyle={{ position: 'absolute', top: 5, right: 10 }} />
      )
    }

    return <View />
  }

  _clearImageBg = () => {
    const { changeDashboardBg } = this.props;

    changeDashboardBg('');
  }

  _selectImgBg = async () => {
    const { changeDashboardBg } = this.props;
    const options = {
      title: 'Select background image',
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };

    await ImagePicker.showImagePicker(options, (response) => {
      console.log('Response =', response);

      if (response.didCancel) {

      }

      if (response.uri) {
        changeDashboardBg(response.uri);
      }
    });
  }

  _renderHeader = () => {
    const { dashboard_background, wallets } = this.props;
    const { navigate } = this.props.navigation;

    if (dashboard_background) {
      return (
        <ImageBackground
          style={styles.header}
          source={{
            uri: dashboard_background
          }}
          >
          <View style={styles.headerBar}>
            <View style={{ flex: 1 }}>
              <TouchableOpacity
                style={styles.changeHeaderBtnIcon}
                onPress={this._clearImageBg}
              >
                <MaterialCommunityIcons name="window-restore" size={20} color="rgba(255,255,255,0.5)" />
              </TouchableOpacity>
            </View>
            <Image
              source={require('@images/in_app_logo.png')}
              style={styles.headerLogo}
            />
            <TouchableOpacity
              style={styles.headerNotif}
              onPress={() => navigate('Inbox')}
            >
              <SimpleLineIcons name="bell" color="#ffffff" size={20} style={styles.notifIcon} />
              {this._renderInboxBadge()}
            </TouchableOpacity>
          </View>

          {this._renderWalletName()}

          {this._renderWalletBalance()}

          <View
            style={styles.headerQuickBar}
          >
            <TouchableOpacity
              style={styles.quickBarItem}
              onPress={() => navigate('Transfer', { data: { wallet: wallets[0], activeTab: 'qrcode', direct_scanning: true } })}
            >
              <Image
                style={styles.quickBarItemImg}
                source={require('@images/icons/icon-scan-qr.png')}
              />
              <Text style={styles.quickBarItemText}>Scan QR</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.quickBarItem}
              onPress={() => navigate('Transfer', { data: { wallet: wallets[0], activeTab: 'rekening' } })}
            >
              <Image
                style={styles.quickBarItemImg}
                source={require('@images/icons/icon-kirim.png')}
              />
              <Text style={styles.quickBarItemText}>Kirim</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.quickBarItem}
              onPress={() => navigate('RequestForm', { data: { wallet: wallets[0] } })}
            >
              <Image
                style={styles.quickBarItemImg}
                source={require('@images/icons/icon-terima.png')}
              />
              <Text style={styles.quickBarItemText}>Terima</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.quickBarItem}
              onPress={() => this.setState({ moreClick: !this.state.moreClick })}
            >
              <Image
                style={styles.quickBarItemImg}
                source={require('@images/icons/icon-lainnya.png')}
              />
              <Text style={styles.quickBarItemText}>Lainnya</Text>
            </TouchableOpacity>
          </View>
        </ImageBackground>
      )
    }

    return (
      <LinearGradient
        colors={['#2F2776', '#03B1E5']}
        style={styles.header}
        start={{x: 0, y: 1}}
        end={{x: 1, y: 0}}
      >
        <View style={styles.headerBar}>
          <View style={{ flex: 1 }}>
            <TouchableOpacity
              style={styles.changeHeaderBtnIcon}
              onPress={this._selectImgBg}
            >
              <SimpleLineIcons name="pencil" color="rgba(255,255,255,0.5)" />
            </TouchableOpacity>
          </View>
          <Image
            source={require('@images/in_app_logo.png')}
            style={styles.headerLogo}
          />
          <TouchableOpacity
            style={styles.headerNotif}
            onPress={() => navigate('Inbox')}
          >
            <SimpleLineIcons name="bell" color="#ffffff" size={20} style={styles.notifIcon} />
            {this._renderInboxBadge()}
          </TouchableOpacity>
        </View>

        {this._renderWalletName()}

        {this._renderWalletBalance()}

        <View
          style={styles.headerQuickBar}
        >
          <TouchableOpacity
            style={styles.quickBarItem}
            onPress={() => navigate('Transfer', { data: { wallet: wallets[0], activeTab: 'qrcode', direct_scanning: true } })}
          >
            <Image
              style={styles.quickBarItemImg}
              source={require('@images/icons/icon-scan-qr.png')}
            />
            <Text style={styles.quickBarItemText}>Scan QR</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.quickBarItem}
            onPress={() => navigate('Transfer', { data: { wallet: wallets[0], activeTab: 'rekening' } })}
          >
            <Image
              style={styles.quickBarItemImg}
              source={require('@images/icons/icon-kirim.png')}
            />
            <Text style={styles.quickBarItemText}>Kirim</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.quickBarItem}
            onPress={() => navigate('RequestForm', { data: { wallet: wallets[0] } })}
          >
            <Image
              style={styles.quickBarItemImg}
              source={require('@images/icons/icon-terima.png')}
            />
            <Text style={styles.quickBarItemText}>Terima</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.quickBarItem}
            onPress={() => this.setState({ moreClick: !this.state.moreClick })}
          >
            <Image
              style={styles.quickBarItemImg}
              source={require('@images/icons/icon-lainnya.png')}
            />
            <Text style={styles.quickBarItemText}>Lainnya</Text>
          </TouchableOpacity>
        </View>
      </LinearGradient>
    )
  }

	render() {
    const { navigate } = this.props.navigation
    const { user, wallets, history } = this.props

    if (this.state.claim_success) {
      return (
        <View style={{ flex: 1 }}>
          <StatusBar
            backgroundColor="#4a416e"
            barStyle="light-content"
          />
          
          <Processing
            type="success"
            title="Berhasil"
            subtitle="Dana telah masuk ke Wallet Utama"
            btnTitle="Kembali"
            btnPress={() => this.setState({ claim_success: false })}
          />
        </View>
      )
    }

		return (
			<View style={styles.body}>
				<StatusBar
					translucent={true}
	        backgroundColor={'transparent'}
	        barStyle="light-content"
        />
        
        {this._renderHeader()}
				
				<ScrollView style={styles.contentWrapper}>
					<View style={{paddingTop: 40}}>
						{this.state.moreClick && (<DotpayApps />)}
						{this.state.moreClick && (<MyApps />)}
            {!this.state.moreClick && (<QuickSend />)}
            {!this.state.moreClick && (<RecentTransactions transactions={history || []} limit={6} user={user} />)}
						<News />
					</View>
				</ScrollView>

				<View style={styles.stackedBarBottom}>
					<TouchableOpacity
            onPress={() => navigate('Transfer', { data: { wallet: wallets[0] } })}
          >
						<Image
							source={require('@images/icons/qr_code_big.png')}
							style={styles.stackedBarIcon}
						/>
					</TouchableOpacity>
					<TouchableOpacity
            onPress={() => navigate('Wallets', { data: { wallet: wallets } })}
          >
						<Image
							source={require('@images/icons/wallet_big.png')}
							style={styles.stackedBarIcon}
						/>
					</TouchableOpacity>
					<TouchableOpacity>
						<Image
							source={require('@images/icons/add_send_big.png')}
							style={[styles.stackedBarIcon, {width: 50, height: 50}]}
						/>
					</TouchableOpacity>
					<TouchableOpacity
            onPress={() => navigate('TransactionHistory')}
          >
						<Image
							source={require('@images/icons/transfer_big.png')}
							style={styles.stackedBarIcon}
						/>
					</TouchableOpacity>
					<TouchableOpacity>
						<Image
							source={require('@images/icons/user_big.png')}
							style={[styles.stackedBarIcon, {width: 25, height: 25}]}
						/>
					</TouchableOpacity>
				</View>
			</View>
		);
	}
}

Dashboard.defaultProps = {
  wallets: [],
  inbox: [],
  history: []
}

const mapStateToProps = ({ user, app_reduce }, ownProps) => {
  return {
    user: user,
    wallets: user.wallets,
    inbox: app_reduce.inbox,
    dashboard_background: app_reduce.dashboard_background,
    history: user.history
  }
}

export default connect(mapStateToProps, { fetchUser, fetchWallets, changeDashboardBg, fetchRecentTransactions })(Dashboard)