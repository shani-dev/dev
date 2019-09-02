import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { View, Image, NetInfo, Text, StatusBar, Alert } from 'react-native';
import { Button } from 'react-native-elements';
import { connect } from 'react-redux';
import { Config } from '@common';
import { networkStatus } from '@redux/actions';
import styles from './styles';

class NoInternet extends PureComponent {
	static propTypes = {
	  networkStatus: PropTypes.func,
	  network_status: PropTypes.bool
	}

	constructor(props) {
	  super(props);
	
	  this.state = {
	  	loading: false
	  };
	}

	_checkInternet = () => {
		const { networkStatus, token } = this.props;

		this.setState({ loading: true });

		NetInfo.isConnected.fetch().then(isConnected => {
	    if (isConnected) {
	    	fetch(Config.api_url + 'api/user?token=' + token, {
					headers: {
						Accept: 'application/json',
						'Content-Type': 'application/json'
					}
				})
				.then(response => {
					this.setState({ loading: false });

					if (response.ok) {
						console.log('internet connected');
						networkStatus(true);
						return response.json();
					} else {
						console.log('no internet');
						Alert.alert('Info', 'There is no internet connection');
						networkStatus(false);
					}
				})
				.then((json) => {
					console.log('_checkUserToken', json)
				});
	    } else {
				console.log('no internet');
				this.setState({ loading: false });
				Alert.alert('Info', 'There is no internet connection');
	      networkStatus(false);
	    }
	  });
	}

	render() {
		return (
			<View style={styles.body}>
				<StatusBar
          backgroundColor="#4a416e"
          barStyle="light-content"
        />
				<Text style={styles.text}>No Internet</Text>
				<Image source={require('@images/dino.png')} style={styles.image} />
				<Button
					loading={this.state.loading}
					title="Try again"
					buttonStyle={styles.button}
					onPress={() => this._checkInternet()}
				/>
			</View>
		);
	}
}

const mapStateToProps = ({ app_reduce, user }, ownProps) => {
	return {
		network_status: app_reduce.network_status,
		token: user.token
	}
}

export default connect(mapStateToProps, { networkStatus })(NoInternet)