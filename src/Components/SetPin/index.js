import React, { Component } from 'react'
import { View, SafeAreaView, StatusBar } from 'react-native'
import PINCode from '@haskkor/react-native-pincode'
import Processing from '@components/Processing'
import PropTypes from 'prop-types'
import { setPin, fetchUser } from '@redux/actions'
import { connect } from 'react-redux'
import { Config } from '@common'

class SetPin extends Component {
	static propTypes = {
	  setPin: PropTypes.func,
	  fetchUser: PropTypes.func
	}
	constructor(props) {
	  super(props);
	
	  this.state = {
	  	onSetPin: false,
	  	pinSetSuccess: false
	  };
	}

	finished = () => {
		const { user, fetchUser } = this.props;

		fetchUser(user.token)
	}

  onSetPINFinish = (pin) => {
    const { user, setPin, fetchUser } = this.props
    let self = this;

    this.setState({
      onSetPin: true
    })

    fetch(Config.api_url + 'api/user/change_pin?token=' + user.token, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        pin: pin
      })
    })
    .then(response => response.json())
    .then((json) => {
      self.finished()
      self.setState({
        pinSetSuccess: true,
        onSetPin: false
      })
    })
  }

	render() {
		const { setPin } = this.props;

    if (false === this.state.onSetPin && false === this.state.pinSetSuccess) {
      return (
        <View styles={{ flex: 1 }}>
          <StatusBar
            backgroundColor="#4a416e"
            barStyle="light-content"
          />
          <View style={{ alignSelf: 'center' }}>
            <PINCode
              status={'choose'}
              passwordLength={6}
              titleChoose="Please set your PIN"
              finishProcess={this.onSetPINFinish}
            />
          </View>
        </View>
      )
    }

    if (this.state.onSetPin) {
      return (
        <View style={{ flex: 1 }}>
          <StatusBar
            backgroundColor="#4a416e"
            barStyle="light-content"
          />
          <Processing
            type="processing"
            title="Sedang memproses"
            subtitle=""
          />
        </View>
      )
    }

    if (this.state.pinSetSuccess) {
      return (
        <SafeAreaView style={{ flex: 1 }}>
          <StatusBar
            backgroundColor="#4a416e"
            barStyle="light-content"
          />
          <Processing
            type="success"
            title="PIN telah di set"
            subtitle="Selamat anda dapat melakukan proses transaksi"
            btnTitle="Done"
            btnPress={() => {
            	setPin()
              if(this.props.goBack !== undefined){
                this.props.goBack();
              }
            }}
          />
        </SafeAreaView>
      )
    }
	}
}

const mapStateToProps = ({user}, ownProps) => {
	return {
		user: user
	}
}

export default connect(mapStateToProps, { setPin, fetchUser })(SetPin)