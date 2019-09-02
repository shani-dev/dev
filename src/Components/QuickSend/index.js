import React, { Component } from 'react'
import { View, Text, PermissionsAndroid } from 'react-native'
import { Avatar } from 'react-native-elements'
import { GlobalStyle } from '@common'
import styles from './styles'

class QuickSend extends Component {
  constructor(props) {
    super(props);
  
    this.state = {
      read_contact_permission: false,
      favorites: []
    };

    this._fetchPersons()
  }

  componentDidMount() {
    //this.requestReadContactsPermission();
  }

  // for testing
  _fetchPersons = async () => {
    let self = this;

    await fetch('https://randomuser.me/api/?results=4&nat=us', {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    })
    .then(response => response.json())
    .then((json) => {
      self.setState({
        favorites: json.results
      })
    })
  }

  async requestReadContactsPermission() {
    let self = this;

    try {
      var granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.READ_CONTACTS,
        {
          title: "Contacts",
          message: "This app would like to view your contacts."
        }
      );

      var check = await PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.READ_CONTACTS);

      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        self.setState({
          read_contact_permission: true
        });

        console.log("contacts read permissions granted", granted);
      } else {
        console.log("contacts read permissions denied");
      }
    } catch (err) {
      console.log(err);
    }
  }

  render() {
    return (
      <View style={GlobalStyle.sectionWrap}>
        <Text style={GlobalStyle.sectionTitle}>Kirim Uang</Text>

        <View style={styles.listWrap}>
          {this.state.favorites.map((item, index) => (
            <View key={`fav-${index}`}>
              <Avatar
                rounded
                size="medium"
                activeOpacity={0.7}
                source={{
                  uri: item.picture.medium
                }}
              />
              <Text style={styles.favName}>{item.name.first}</Text>
            </View>
          ))}

          <View key={`fav-${this.state.favorites.length}`}>
              <Avatar
                rounded
                size="medium"
                activeOpacity={0.7}
                source={require('@images/app_icons/buat_baru.png')}
                overlayContainerStyle={{ backgroundColor: '#fff' }}
              />
              <Text style={styles.favName}>Lainnya</Text>
            </View>
        </View>
      </View>
    );
  }
}

export default QuickSend