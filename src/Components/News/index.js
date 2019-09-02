/** @format */

import React, { PureComponent } from 'react'
import { View, Text, FlatList, Image, TouchableOpacity, ScrollView, Animated, Dimensions } from 'react-native'

import styles from './styles'
import Indicator from './Indicator';

const { width: deviceWidth } = Dimensions.get('window');

class News extends PureComponent {
	constructor(props) {
	  super(props);
  
    this.state = {
      currentIndex: 0,
    };

	  this.scrollX = new Animated.Value(0)
	
	  this.state = {
	  	news: [
	  		{
	  			id: 0,
	  			name: 'news_1',
	  			displayName: 'BUMN Bikin Perusahaan Pesaing GoPay dan OVO',
	  			icon: require('@images/news1.png'),
	  			short_desc: 'CNN - Lorem ipsum dolor sit amet consectetuer'
	  		},
	  		{
	  			id: 1,
	  			name: 'news_2',
	  			displayName: 'BUMN Bikin Perusahaan Pesaing GoPay dan OVO',
	  			icon: require('@images/news2.png'),
	  			short_desc: 'CNN - Lorem ipsum dolor sit amet consectetuer'
	  		},
	  		{
	  			id: 0,
	  			name: 'news_1',
	  			displayName: 'BUMN Bikin Perusahaan Pesaing GoPay dan OVO',
	  			icon: require('@images/news1.png'),
	  			short_desc: 'CNN - Lorem ipsum dolor sit amet consectetuer'
	  		},
	  		{
	  			id: 1,
	  			name: 'news_2',
	  			displayName: 'BUMN Bikin Perusahaan Pesaing GoPay dan OVO',
	  			icon: require('@images/news2.png'),
	  			short_desc: 'CNN - Lorem ipsum dolor sit amet consectetuer'
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
				numColumns={2}
				contentContainerStyle={styles.flatlist}
				data={items}
				keyExtractor={(item, index) => `${item.id || (index+idx)}`}
				renderItem={this.renderItem}
			/>
		)
	}

	render() {
		let { news } = this.state;
		let sliced = [];
		let chunk = 2;
		var i,j;

		for (i=0,j=news.length; i<j; i+=chunk) {
	    sliced.push(news.slice(i,i+chunk));
		}

		return (
			<View style={styles.section}>
				<Text style={styles.sectionTitle}>Info Terbaru</Text>
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
            <Indicator items={news} scrollX={this.scrollX}/>
          </View>
        </View>
			</View>
		);
	}
}

export default News