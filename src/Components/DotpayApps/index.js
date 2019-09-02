/** @format */

import React, { PureComponent } from 'react'
import { View, Text, FlatList, Image, TouchableOpacity, ScrollView, Animated, Dimensions } from 'react-native'

import styles from './styles'
import Indicator from './Indicator';

const { width: deviceWidth } = Dimensions.get('window');

class DotpayApps extends PureComponent {
	constructor(props) {
	  super(props);
  
    this.state = {
      currentIndex: 0,
    };

	  this.scrollX = new Animated.Value(0)
	
	  this.state = {
	  	apps: [
	  		{
	  			id: 0,
	  			name: 'deposit',
	  			displayName: 'Deposit',
	  			icon: require('@images/app_icons/deposit.png'),
	  			short_desc: 'Topup untuk kemudahan bayar tagihan'
	  		},
	  		{
	  			id: 1,
	  			name: 'asuransi-allianz',
	  			displayName: 'Asuransi Allianz',
	  			icon: require('@images/app_icons/asuransi-allianz.png'),
	  			short_desc: 'Jaminan Perlindungan Jiwa Seumur Hidup'
	  		},
	  		{
	  			id: 2,
	  			name: 'kredivo',
	  			displayName: 'Kredivo',
	  			icon: require('@images/app_icons/kredivo.png'),
	  			short_desc: 'Belanja Sekarang Bayar Nanti'
	  		},
	  		{
	  			id: 3,
	  			name: 'tixid',
	  			displayName: 'Tix ID',
	  			icon: require('@images/app_icons/tixid.png'),
	  			short_desc: 'Promo diskon untuk  tiket nonton film'
	  		},
	  		{
	  			id: 4,
	  			name: 'reksadana',
	  			displayName: 'Reksadana',
	  			icon: require('@images/app_icons/reksadana.png'),
	  			short_desc: 'Pahami, nikmati tenting reksadana'
	  		},
	  		{
	  			id: 5,
	  			name: 'emas_antam',
	  			displayName: 'Emas Antam',
	  			icon: require('@images/app_icons/emas-antam.png'),
	  			short_desc: 'Jual beli logam mulia dengan Antam'
	  		},
	  		{
	  			id: 0,
	  			name: 'deposit',
	  			displayName: 'Deposit',
	  			icon: require('@images/app_icons/deposit.png'),
	  			short_desc: 'Topup untuk kemudahan bayar tagihan'
	  		},
	  		{
	  			id: 1,
	  			name: 'asuransi-allianz',
	  			displayName: 'Asuransi Allianz',
	  			icon: require('@images/app_icons/asuransi-allianz.png'),
	  			short_desc: 'Jaminan Perlindungan Jiwa Seumur Hidup'
	  		},
	  		{
	  			id: 2,
	  			name: 'kredivo',
	  			displayName: 'Kredivo',
	  			icon: require('@images/app_icons/kredivo.png'),
	  			short_desc: 'Belanja Sekarang Bayar Nanti'
	  		},
	  		{
	  			id: 3,
	  			name: 'tixid',
	  			displayName: 'Tix ID',
	  			icon: require('@images/app_icons/tixid.png'),
	  			short_desc: 'Promo diskon untuk  tiket nonton film'
	  		},
	  		{
	  			id: 4,
	  			name: 'reksadana',
	  			displayName: 'Reksadana',
	  			icon: require('@images/app_icons/reksadana.png'),
	  			short_desc: 'Pahami, nikmati tenting reksadana'
	  		},
	  		{
	  			id: 5,
	  			name: 'emas_antam',
	  			displayName: 'Emas Antam',
	  			icon: require('@images/app_icons/emas-antam.png'),
	  			short_desc: 'Jual beli logam mulia dengan Antam'
	  		}
	  	]
	  };
	}

  onScroll = (event) => {
    const { contentOffset } = event.nativeEvent;
    const currentIndex = Math.round(contentOffset.x / deviceWidth);
    if (this.state.currentIndex !== currentIndex) {
      this.setState({ currentIndex });
    }
  }

	renderItem = ({ item, index }) => {
		return (
			<View style={styles.item}>
				<TouchableOpacity>
					<Image
						source={item.icon}
						style={styles.itemImage}
					/>
					<Text style={styles.itemTitle}>{item.displayName}</Text>
					<Text numberOfLines={2} ellipsizeMode="head" style={styles.itemDesc}>{item.short_desc}</Text>
				</TouchableOpacity>
			</View>
		);
	}

	_renderFlatList = (items, idx) => {
		return (
			<FlatList
				key={idx}
				numColumns={3}
				contentContainerStyle={styles.flatlist}
				data={items}
				keyExtractor={(item, index) => `${item.id || (index+idx)}`}
				renderItem={this.renderItem}
			/> 
		)
	}

	render() {
		let { apps } = this.state;
		let sliced = [];
		let chunk = 6;
		var i,j;

		for (i=0,j=apps.length; i<j; i+=chunk) {
	    sliced.push(apps.slice(i,i+chunk));
		}

		return (
			<View style={styles.section}>
				<Text style={styles.sectionTitle}>Layanan Keuangan</Text>
				<Animated.ScrollView
          horizontal
          ref={(scrollView) => { this.scrollView = scrollView; }}
          showsHorizontalScrollIndicator={false}
          pagingEnabled
          scrollEventThrottle={1}
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { x: this.scrollX } } }],
            { useNativeDriver: true,
              listener: this.onScroll,
            },
          )}
				>
					{sliced.map((item, idx) => {
						return this._renderFlatList(sliced[idx], idx)
					})}
				</Animated.ScrollView>

        <View style={styles.row}>
          <View style={styles.indicatorWrap}>
            <Indicator items={apps} scrollX={this.scrollX}/>
          </View>
        </View>
			</View>
		);
	}
}

export default DotpayApps