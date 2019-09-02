import React, {Component} from "react";
import {View, SafeAreaView, Text, TouchableOpacity} from "react-native";
import Icon from 'react-native-vector-icons/Ionicons';
import { Card,Avatar } from 'react-native-elements';
import {Autocomplete, withKeyboardAwareScrollView} from "dotpay_dropdown";
import styles from './styles';
import Contacts from 'react-native-contacts';
import { PermissionsAndroid } from 'react-native';
import DotpayApi from '../../Services/DotpayApi';

class AutoComplete extends Component {
	static propTypes = {
	}

	constructor(props) {
	  super(props);
	
	  this.state = {
          contact: false,
          validAccount:false,
          ListContact:[],
          item:undefined,
          veriviedAccount:false
	  };
    }

    componentDidMount(){
        this._handleGetContact()
    }
    
    _handleGetContact(){
        PermissionsAndroid.check(
            PermissionsAndroid.PERMISSIONS.READ_CONTACTS
          ).then((result) => {
              if(result === true){
                Contacts.getAll((err, contacts) => {
                    if (err === 'denied'){
                      return
                    } else {
                        this._handleStateContact(contacts)
                    }
                  })
              }else{
                PermissionsAndroid.request(
                    PermissionsAndroid.PERMISSIONS.READ_CONTACTS
                  ).then(() => {
                    Contacts.getAll((err, contacts) => {
                      if (err === 'denied'){
                       return
                      } else {
                        this._handleStateContact(contacts)
                      }
                    })
                  })
              }
           
          })
          .catch(err => {
              console.log(err)
              return
          })
    }

    _handleStateContact = ( contacts ) => {
        const { ListContact } = this.state
        contacts.map(async c=>{
            let name = c.givenName
            if(c.familyName)name = c.givenName + " " + c.familyName
            if(c.phoneNumbers[0]){
                let phone = c.phoneNumbers[0].number
                let dataContact = {"name":name,"phone":phone}
                await ListContact.push(dataContact)

                if(c.phoneNumbers.length > 1){
                    for(t=1; t < c.phoneNumbers.length; t++){
                        let name2 = c.givenName
                        if(c.familyName){
                            name2 = c.givenName + " " + c.familyName + " " + t
                        }else{
                            name2 = name + " " + t
                        }
                        let phone2 = c.phoneNumbers[t].number
                        if(phone != phone2){
                            dataContact = {"name": name2, "phone":phone2}
                           await ListContact.push(dataContact)
                        }
                        
                    }
                }

            }
            
        })
        this.setState({
            ...this.state,
            contact:true,
            ListContact:ListContact
        })
    }


	handleSelectItem(item) {
        const { handling } = this.props;
        const { validAccount } = this.state;


       
        if(!validAccount){
            this.setState({
                validAccount:true,
                veriviedAccount:false,
                item:item
            })
            handling(item.name, item.phone);
            this._handleDataUserCard();
           

        }else{
            this.setState({
                validAccount:false,
                veriviedAccount:false,
                item:undefined
            })

        }
       
        
      }

      _handleIconChange = () =>{
        const { validAccount } = this.state;
        if(validAccount){
           return (<Icon name="ios-checkmark-circle-outline" size={20} color="#0091e6" style={styles.plus} />)
        }else{
           return (<Icon name="ios-phone-portrait" size={20} color="#0091e6" style={styles.plus} />)
        }

      }

      _handleValueChanged = ()=>{
          const { handling } = this.props
          const { contact } = this.state
          this.setState({
              contact:false
          })
            setTimeout(()=>{
                this.setState({
                    contact:true,
                    validAccount:false,
                    item:undefined
                })
                handling('','')
            },1000)
          
      }

      _renderAutoComplete = ()=>{
        const { ListContact } = this.state
      
            return (
                <SafeAreaView>
                    <View style={styles.autocompletesContainer}>
                    <Autocomplete
                        placeholder="Phone Number"
                        scrollToInput={ev => ev}
                        handleSelectItem={(item) => this.handleSelectItem(item)}
                        onDropdownClose={() => {}}
                        onDropdownShow={() => {}}
                        renderIcon={this._handleIconChange}
                        data={ListContact} 
                        valueExtractor={ListContact => ListContact.phone}
                        rightTextExtractor={ListContact => ListContact.name}
                        minimumCharactersCount={3}
                        highlightText
                        rightContent
                    />
                   
                    <Icon name="ios-close-circle" size={30} color="red" onPress={this._handleValueChanged} style={styles.closeBtn} />
                    </View>
                </SafeAreaView>
            );
            
      }

      _handleDataUserCard = ()=>{
        
        const { item, veriviedAccount } = this.state
       
        //check user verivied
        const userDotpay = false
        //DotpayApi.checkApiUser(item.phone,userDotpay)

         if(item != undefined){
            const titleAvatar = item.name.slice(0,2).toUpperCase()
            return (
            <Card style={{flexDirection:'row'}}>
                <View style={{flexDirection:'row', justifyContent:'space-between'}}>
                    <Avatar
                        size="medium"
                        rounded
                        title={titleAvatar}
                        onPress={() => console.log("Works!")}
                        activeOpacity={0.7}
                    />
                    <View style={{flexDirection:'column',marginTop:5}}>
                        <Text style={styles.TextNameUser}>{item.name}</Text>
                        <Text style={styles.TextPhone}>{item.phone}</Text>
                        {userDotpay && (
                        <View style={{flexDirection:'row'}}>
                            <Text style={styles.TextVeriviedTrue}>DOTPAY</Text>
                            <Icon name="ios-checkmark-circle-outline" size={20} color="green" style={{marginLeft:5}} />
                        </View>
                        )}
                        {!userDotpay && (
                            <View style={{flexDirection:'row'}}>
                                <Text style={styles.TextVeriviedFalse}>DOTPAY</Text>
                                <Icon name="ios-remove-circle-outline" size={20} color="red" style={{marginLeft:5}} />
                            </View>
                         )}
                    </View>
                    <Icon name="ios-close-circle" size={30} color="red" onPress={this._handleValueChanged} style={styles.closeBtnCard} />
                </View>
               
            </Card>
            );
         }else{
             return(
                 <View></View>
             );
         }
         
      }
    
      render() {
    
        const { contact,item } = this.state;
        
        
        if(contact && item == undefined){
            return (
                <View style={styles.bigContainer}>
                    {this._renderAutoComplete()}
                </View>
              );
        }else if(contact && item != undefined){
            return (
                <View style={styles.bigContainer}>
                    {this._handleDataUserCard()}
                </View>
            );
            
        }else{
            return (
                <View style={styles.ContainerLoading}>
                    <Text style={styles.TextLoading}>Please Wait...</Text>
                </View>
            );
        }
        
      }
    }


export default AutoComplete;
