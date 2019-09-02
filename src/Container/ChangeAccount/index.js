import React, { PureComponent } from 'react'
import { ScrollView, View, StatusBar, Platform, TouchableOpacity, Image, TextInput, Text} from 'react-native'
import { ListItem, Avatar, Input, Button } from 'react-native-elements'
import { connect } from 'react-redux'
import styles from './styles'
import Icon from 'react-native-vector-icons/Entypo';
import ImagePicker from 'react-native-image-picker'
import PropTypes from 'prop-types'

class ChangeAccount extends PureComponent {
	static propTypes = {
		navigate: PropTypes.func,
		user: PropTypes.object
	}

	constructor(props) {
		super(props);

		this.state = {
		  refreshing: false,
		  avatarSource: false,
		  user_name: this.props.user.name,
		  user_phone: this.props.user.phone,
		  user_email: this.props.user.email
		}
	}

	_selectAvatar = async () => {
		let self = this;

	    const options = {
	      title: 'Select Avatar',
	      storageOptions: {
	        skipBackup: true,
	      },
	    };

	    await ImagePicker.showImagePicker(options, (response) => {
	      console.log('Response =', response);

	      if (response.didCancel) {

	      }

	      if (response.uri) {
	      	let source = {uri : response.uri}
	        self.setState({
	          avatarSource: source,
	        });
	      }
	    });
	}

	render() {
		return (
			 <ScrollView contentContainerStyle={styles.body}>
		        <StatusBar barStyle="light-content" backgroundColor="#8c231a" />
				<Avatar
					containerStyle={{marginTop: 10}}
					rounded
					size="large"
					source={this.state.avatarSource !== false ? this.state.avatarSource : require('@images/no_avatar.png')}
					showEditButton
					onEditPress={this._selectAvatar}
				/>
				<Text style={{textAlign: 'left', width: '100%'}}>Name</Text>
				<Input
					defaultValue={this.state.user_name}
					containerStyle={styles.inputContainerStyle}
					inputStyle={styles.inputStyle2}
					onChangeText={(user_name) => this.setState({user_name})}
				/>
				<Text style={{textAlign: 'left', width: '100%'}}>Phone</Text>
				<Input
					keyboardType="phone-pad"
					defaultValue={this.state.user_phone}
					containerStyle={styles.inputContainerStyle}
					inputStyle={styles.inputStyle2}
					onChangeText={(user_phone) => this.setState({user_phone})}
				/>
				<Text style={{textAlign: 'left', width: '100%'}}>Email</Text>
				<Input
					editable={false}
					defaultValue={this.state.user_email}
					containerStyle={styles.inputContainerStyle}
					inputStyle={[styles.inputStyle2, styles.disabled]}
					onChangeText={(user_email) => this.setState({user_email})}
				/>
				<View style={styles.buttonGroup}>
					<Button
					  containerStyle={[styles.button, {marginRight: '10%'}]}
					  buttonStyle = {{backgroundColor: 'red'}}
					  icon={
					    <Icon
					      name="cross"
					      size={15}
					      color="white"
					    />
					  }
					  title="Cancel"
					  onPress={() => this.props.navigation.goBack()}
					/>
					<Button
				      containerStyle={styles.button}
					  icon={
					    <Icon
					      name="check"
					      size={15}
					      color="white"
					    />
					  }
					  title="Update"
					/>
					
				</View>
				
		      </ScrollView>
		);
	}
}

const mapStateToProps = ({ user }, ownProps) => {
	return {
		user: user
	}
}

export default connect(mapStateToProps, null)(ChangeAccount)