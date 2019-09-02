import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { View, Text, FlatList, StatusBar, Image, Platform, RefreshControl, Switch, TouchableOpacity } from 'react-native'
import { ListItem } from 'react-native-elements'
import { connect } from 'react-redux'
import styles from './styles'
import Icon from 'react-native-vector-icons/Entypo'
import ReactNativeSettingsPage, { 
  SectionRow, 
  NavigateRow,
  CheckRow
} from 'react-native-settings-page';

class Settings extends PureComponent {

	static propTypes = {
	  user: PropTypes.object,
    navigate: PropTypes.func,
	}

   constructor(props) {
    super(props);

    this.state = {
      refreshing: false,
    }
  }


  renderHero = () => {
    const { user } = this.props;

    return (
      <TouchableOpacity style={styles.heroContainer} onPress={() => this.props.navigation.navigate('ChangeAccount')}>
        <Image source={{uri: 'https://facebook.github.io/react-native/docs/assets/favicon.png'}} style={styles.heroImage} />
        <View style={{ flex: 1 }}>
          <Text style={styles.heroTitle}>{user.name}</Text>
          <Text style={styles.heroSubtitle}>{user.email}</Text>
        </View>
        <Chevron />
      </TouchableOpacity>
    )
  }

	render() {
		return (
          <ReactNativeSettingsPage>
            <StatusBar barStyle="light-content" backgroundColor="#8c231a" />
            <TouchableOpacity style={styles.heroContainer} onPress={() => this.props.navigation.navigate('ChangeAccount')}>
              <Image source={{uri: 'https://facebook.github.io/react-native/docs/assets/favicon.png'}} style={styles.heroImage} />
              <View style={{ flex: 1 }}>
                <Text style={styles.heroTitle}>{this.props.user.name}</Text>
                <Text style={styles.heroSubtitle}>{this.props.user.email}</Text>
              </View>
            </TouchableOpacity>  
            <SectionRow text="SECURITY">
              <NavigateRow
                text="Update PIN"
                iconName="lock"
                onPressCallback={() => this.props.navigation.navigate('ChangePin')}
              />
  	        </SectionRow>
          </ReactNativeSettingsPage>
	      
	    );
	}
}

const mapStateToProps = ({ user }, ownProps) => {
  return {
    user: user
  }
}

export default connect(mapStateToProps) (Settings)