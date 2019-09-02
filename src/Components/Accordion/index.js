import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, Text, TouchableNativeFeedback, TouchableOpacity, Platform } from 'react-native';
import { Button } from 'react-native-elements';
import Entypo from 'react-native-vector-icons/Entypo';
import styles from './styles';

export default class Accordion extends Component {
	static propTypes = {
	  heading: PropTypes.string,
	  content: PropTypes.func,
	  headingStyle: PropTypes.object,
	  headingTextStyle: PropTypes.object,
	  arrowStyle: PropTypes.object,
	  collapse: PropTypes.bool,
	  arrowColor: PropTypes.string
	}

	constructor(props) {
	  super(props);
	
	  this.state = {
	  	collapsed: false
	  };
	}

	componentWillMount() {
		const { collapse } = this.props;

		if (!collapse) {
			this.setState({
				collapsed: true
			});
		}
	}

	toggle() {
		const { collapsed } = this.state;

		this.setState({
			collapsed: !collapsed
		});
	}

	render() {
		const { heading, content, headingStyle, arrowStyle, headingTextStyle, arrowColor } = this.props;
		const { collapsed } = this.state;

		return (
			<View ref={view => { this.container = view; }}>
				{Platform.OS === 'android' && (
					<View style={[styles.heading, headingStyle]}>
						<Text style={[styles.headingText, headingTextStyle]}>{heading}</Text>
						<Button
							type="clear"
							containerStyle={styles.toggle}
							icon={
								<Entypo name="chevron-down" size={20} color={arrowColor} style={[styles.headingArrow, arrowStyle, collapsed && { transform: [{ rotate: '0deg' }] }]} />
							}
							onPress={() => this.toggle()}
						/>
					</View>
				)}

				{Platform.OS === 'ios' && (
					<TouchableOpacity onPress={() => this.toggle()}>
						<View style={[styles.heading, headingStyle]}>
							<Text style={[styles.headingText, headingTextStyle]}>{heading}</Text>
							<Entypo name="chevron-down" size={20} color={arrowColor} style={[styles.headingArrow, arrowStyle, collapsed && { transform: [{ rotate: '0deg' }] }]} />
						</View>
					</TouchableOpacity>
				)}

				{collapsed && content()}
			</View>
		);
	}
}

Accordion.defaultProps = {
	heading: '',
	headingStyle: {},
	headingTextStyle: {},
	arrowStyle: {},
	collapse: true,
	arrowColor: '#333'
}