import React, { Component } from 'react'
import { View, Text, Image, ActivityIndicator } from 'react-native'
import { Button } from 'react-native-elements'
import LinearGradient from 'react-native-linear-gradient'
import styles from './styles'

export default class Processing extends Component {
	_renderImg = () => {
		const { type } = this.props

		if (type === 'success') {
			return (
				<Image
					style={styles.img}
					source={require('@images/success_img.png')}
				/>
			)
		}

		return <ActivityIndicator animating={true} size={60} color="#fff" style={{ marginBottom: 30 }} />;
	}

	_renderBtn = () => {
		const { type } = this.props

		if (type === 'success') {
			return (
				<Button
      		title={this.props.btnTitle}
      		onPress={() => this.props.btnPress()}
      		buttonStyle={styles.buttonStyle}
      		titleStyle={{ color: '#006DF0' }}
      		containerStyle={styles.buttonContainerStyle}
    		/>
			)
		}
	}

	render() {
		return (
			<LinearGradient
        	colors={['#2F2776', '#03B1E5']}
        	style={styles.wrap}
        	start={{x: 0, y: 1}}
        	end={{x: 1, y: 0}}
      	>
      	{this._renderImg()}
      	<Text style={styles.title}>{this.props.title}</Text>
      	<Text style={styles.subtitle}>{this.props.subtitle}</Text>
      	{this._renderBtn()}
    	</LinearGradient>
		);
	}
}