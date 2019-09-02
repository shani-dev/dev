import React, { PureComponent } from 'react'
import { Alert, View, StatusBar } from 'react-native'
import { connect } from 'react-redux'
import styles from './styles'
import Processing from '@components/Processing'
import PropTypes from 'prop-types'
import { SetPin } from '@components'
import PINCode from '@haskkor/react-native-pincode'

class ChangePin extends PureComponent {
	static propTypes = {
		navigate: PropTypes.func,
		user: PropTypes.object
	}

	constructor(props) {
		super(props);

		this.state = {
		  pinCorrect: false,
		}
	}

	_checkPin = () => {
		this.setState({
	      pinCorrect: true
	    })
	}

	render() {
			if(false === this.state.pinCorrect){
				return ( <View styles={{ flex: 1 }}>
			          <StatusBar
			            backgroundColor="#4a416e"
			            barStyle="light-content"
			          />
			          <View style={{ alignSelf: 'center' }}>
			            <PINCode
			              status={'enter'}
			              passwordLength={6}
			              titleChoose="Enter Your PIN"
			              finishProcess={this._checkPin}
			              storedPin={this.props.user.blockchain.walletSecurity}
			            />
			          </View>
			        </View>	
		        )
			}
			
			if(this.state.pinCorrect){
				return <SetPin goBack={this.props.navigation.goBack} />
			}
		
	}
}

const mapStateToProps = ({ user }, ownProps) => {
	return {
		user: user
	}
}

export default connect(mapStateToProps, null)(ChangePin)