import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { View, Text, Image, ScrollView, ImageBackground, StatusBar, TouchableOpacity, Dimensions, Alert } from 'react-native'
import LinearGradient from 'react-native-linear-gradient'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import { fetchWallets } from '@redux/actions'
import { connect } from 'react-redux'
import { Tools, Config } from '@common'
import resolveAssetSource from 'resolveAssetSource'

import styles from './styles'

const { width, height } = Dimensions.get('window')

class Wallets extends Component {
	static propTypes = {
		user: PropTypes.object,
	  wallets: PropTypes.array,
	  fetchWallets: PropTypes.func
	}

	constructor(props) {
	  super(props);

	  this.state = {
	  	activeWallet: 0,
	  	walletWidth: 0,
	  	walletHeight: 0
	  }
	
	  //this._fetchWallets()
	}

	componentWillMount() {
		let icon =  require('@images/wallets/1.png'); 
		let source = resolveAssetSource(icon);

		this.setState({
			walletWidth: width - 30,
			walletHeight: source.height * ((width - 30) / source.width)
		})
	}

	_fetchWallets = () => {
		fetchWallets()
	}

	_renderWallet = (item, index) => {
		let imgIndex = index + 1;
		let imgName;
		let imgReq;

		if (imgIndex > 6) {
			imgIndex = 0;
		}

		switch (imgIndex) {
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
			<TouchableOpacity key={index} activeOpacity={0.9} style={ [styles.walletWrap, { height: this.state.walletHeight }, (index === 0 && { marginTop: 0 })] } onPress={() => this._setActiveWallet(index, item, imgIndex)}>
				<Image ref={(img) => this['image'+index] = img} source={imgReq} style={[styles.walletImage, { height: this.state.walletHeight }]} />
				<View style={styles.walletItemTextWrap}>
					<Text style={[styles.walletItemName, (index === this.state.activeWallet && { color: '#222' })]}>{item.name}</Text>
					<Text style={[styles.walletItemBalance, (index === this.state.activeWallet && { backgroundColor: 'rgba(255, 255, 255, 0.7)', color: '#222' })]}>Rp {Tools.formatMoney(item.balance, 0, ',', '.')}</Text>
				</View>
			</TouchableOpacity>
		);
	}

	_setActiveWallet = (index, wallet, imgIndex) => {
		this._onDoublePress(wallet, imgIndex)
		this.setState({ activeWallet: index })
	}

	_onDoublePress = (wallet, imgIndex) => {
   	const time = new Date().getTime();
		const delta = time - this.lastPress;

		const DOUBLE_PRESS_DELAY = 400;
		if (delta < DOUBLE_PRESS_DELAY) {
			this.props.navigation.navigate('WalletDetail', { data: { wallet: wallet, imgIndex: imgIndex } })
		}

		this.lastPress = time;
	};

	render() {
		const { wallets } = this.props;
    let mainBalance = 0;

    if (wallets[this.state.activeWallet] === undefined) {
    	this.setState({
    		activeWallet: 0
    	});

    	return <View />
    }

    mainBalance = Tools.formatMoney(wallets[this.state.activeWallet].balance, 0, ',', '.');

		return (
			<View styles={styles.body}>
				<StatusBar
					translucent={true}
	        backgroundColor={'transparent'}
	        barStyle="light-content"
        />
        <LinearGradient
        	colors={['#2F2776', '#03B1E5']}
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
      			<TouchableOpacity
      				onPress={() => this.props.navigation.navigate('AddWallet')}
      				style={styles.addWrapper}>
      				<MaterialCommunityIcons name="plus" color="#ffffff" size={25} style={styles.backButton} />
    				</TouchableOpacity>
      		</View>

      		<View style={styles.walletTitle}>
      			<Text style={styles.walletTitleText}>{wallets[this.state.activeWallet].name}</Text>
      		</View>
      		<View style={styles.walletBalance}>
    				<Text style={styles.balanceCurrency}>Rp </Text>
    				<Text style={styles.balanceText}>{mainBalance}</Text>
      		</View>
    		</LinearGradient>

    		<View
					style={styles.walletListWrap}>
					<ScrollView style={styles.walletScroll}>
						<Text style={styles.walletListHeading}>Wallets:</Text>
						{wallets.map((item, index) => this._renderWallet(item, index))}
					</ScrollView>
				</View>
			</View>
		);
	}
}

const mapStateToProps = ({ user }, ownProps) => {
	return {
		user: user,
		wallets: user.wallets
	}
}

export default connect(mapStateToProps, { fetchWallets })(Wallets)