/** @format */

import React, { PureComponent } from 'react'
import { View, Text, FlatList, Image, TouchableOpacity, ScrollView, Animated, Dimensions } from 'react-native'

import styles from './styles'
import Indicator from './Indicator';

const { width: deviceWidth } = Dimensions.get('window');

class MyApps extends PureComponent {
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
	  			name: 'buat_baru',
	  			displayName: 'Buat Baru',
	  			icon: require('@images/app_icons/buat_baru.png'),
	  			short_desc: 'Topup untuk kemudahan bayar tagihan'
	  		},
	  		{
	  			id: 1,
	  			name: 'gajiku',
	  			displayName: 'Gajiku',
	  			icon: require('@images/app_icons/gajiku.png'),
	  			short_desc: 'Lihat info tentang gaji anda disini'
	  		},
	  		{
	  			id: 2,
	  			name: 'kpr',
	  			displayName: 'KPR',
	  			icon: require('@images/app_icons/kpr.png'),
	  			short_desc: 'Peminjaman Kredit Pemilikan Rumah'
	  		},
	  		{
	  			id: 3,
	  			name: 'tagihan',
	  			displayName: 'Tagihan',
	  			icon: require('@images/app_icons/tagihan.png'),
	  			short_desc: 'Lihat daftar tagihan kamu disini'
	  		},
	  		{
	  			id: 4,
	  			name: 'transfer',
	  			displayName: 'Transfer',
	  			icon: require('@images/app_icons/transfer2.png'),
	  			short_desc: 'Semua daftar transfer, dan tarik tunai'
	  		},
	  		{
	  			id: 5,
	  			name: 'laporan',
	  			displayName: 'Laporan',
	  			icon: require('@images/app_icons/laporan.png'),
	  			short_desc: 'Lihat daftar laporan keuangan terakhir'
	  		},
	  		{
	  			id: 6,
	  			name: 'buat_baru',
	  			displayName: 'Buat Baru',
	  			icon: require('@images/app_icons/buat_baru.png'),
	  			short_desc: 'Topup untuk kemudahan bayar tagihan'
	  		},
	  		{
	  			id: 7,
	  			name: 'gajiku',
	  			displayName: 'Gajiku',
	  			icon: require('@images/app_icons/gajiku.png'),
	  			short_desc: 'Lihat info tentang gaji anda disini'
	  		},
	  		{
	  			id: 8,
	  			name: 'kpr',
	  			displayName: 'KPR',
	  			icon: require('@images/app_icons/kpr.png'),
	  			short_desc: 'Peminjaman Kredit Pemilikan Rumah'
	  		},
	  		{
	  			id: 9,
	  			name: 'tagihan',
	  			displayName: 'Tagihan',
	  			icon: require('@images/app_icons/tagihan.png'),
	  			short_desc: 'Lihat daftar tagihan kamu disini'
	  		},
	  		{
	  			id: 10,
	  			name: 'transfer',
	  			displayName: 'Transfer',
	  			icon: require('@images/app_icons/transfer2.png'),
	  			short_desc: 'Semua daftar transfer, dan tarik tunai'
	  		},
	  		{
	  			id: 11,
	  			name: 'laporan',
	  			displayName: 'Laporan',
	  			icon: require('@images/app_icons/laporan.png'),
	  			short_desc: 'Lihat daftar laporan keuangan terakhir'
	  		},
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
				<Text style={styles.sectionTitle}>Keuangan Saya</Text>
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

export default MyApps