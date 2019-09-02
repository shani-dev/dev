import React, { Component } from 'react'
import ViewShot from "react-native-view-shot";
import { CameraRoll, Platform, PermissionsAndroid, View } from 'react-native';
import { Icon, Text } from 'react-native-elements'
import Content from './Content';
import styles from '../../Components/ImageConvert/styles';
import { Tools } from '@common'
import RNFetchBlob from 'rn-fetch-blob'
import Share from 'react-native-share'

export default class ImageConverter extends Component {
    constructor(props){
        super(props)
        this.state = {
            date:'',
            initDate:false
        }

        }

    componentDidMount () {
        this._checkPermission();
        this._utilDate();
    }

    _checkPermission = () => {
        if (Platform.OS === 'android') {
            PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE)
            .then(checking => {
                if(!checking){
                    PermissionsAndroid.requestMultiple(
                    [PermissionsAndroid.PERMISSIONS.CAMERA,
                        PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
                        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE]
                    ).then((result) => {
                        if (result['android.permission.READ_EXTERNAL_STORAGE']
                        && result['android.permission.CAMERA'] && result['android.permission.WRITE_EXTERNAL_STORAGE']){
                            this._captureImage();
                        }else{
                            return
                        }
                    })
                }else{

                    this._captureImage();
                }
                    
            })
           
        }
    }

    _base64Convert = async (uri)=> {
        const { dataContent } = this.props;
        let data = ''
        RNFetchBlob.fs.readStream(
            uri,
            'base64')
        .then(async (ifstream) => {
            await ifstream.open()
            await ifstream.onData((chunk) => {
                data += chunk
            })
            ifstream.onError((err) => {
            })
            ifstream.onEnd(async () => {
            
                console.log("dataImage", data)

                let shareOptions;
           
                shareOptions = {
                    title:`hi, ${dataContent.receiver.split('@')[0]}...you just receive Rp ${Tools.formatMoney(dataContent.amount, 0, ',', '.')},-  transfer from dotpay`,
                    url: `data:image/png;base64,${data}`
                };
               

                try {
                    const ShareResponse = await Share.open(shareOptions);
                  } catch (error) {
                    console.log('Error =>', error);
                  }
            })
            
        })
        .catch(err => {
            console.log("chunk failed" + err)
           
        })
    }

    _captureImage = ()=> {
        const { dataContent } = this.props;
        this.refs.viewShot.capture().then(async uri => {
            await CameraRoll.saveToCameraRoll(uri).then(async result => {
               
                shareOptions = {
                    subject: 'DOTPAY RECEIVE TRANSFER',
                    title:`hi, ${dataContent.receiver.split('@')[0]}...you just receive Rp ${Tools.formatMoney(dataContent.amount, 0, ',', '.')},-  transfer from dotpay`,
                    url:uri
                };
                

                try {
                    const ShareResponse = await Share.open(shareOptions);
                  } catch (error) {
                    console.log('Error =>', error);
                  }
               

            });
            
        });
    }

    _utilDate = () => {
        const date = new Date().getDate();
        const month = new Date().getMonth() + 1;
        const year = new Date().getFullYear(); 
        const hours = new Date().getHours();
        const min = new Date().getMinutes();
        const sec = new Date().getSeconds();
        this.setState({
            initDate:true,
            date:
                date + '/' + month + '/' + year + ' ' + hours + ':' + min + ':' + sec,
        });
    }

    _shareWhatsap = () => {


    }


    _shareFacebook = () => {

    }


    _shareEmail = () => {

    }


    
    render() {
    const { dataContent, titleContent,btnPress, btnCloseModal } = this.props;
    const { initDate, date } = this.state;
    return (
        <React.Fragment> 
            <ViewShot ref="viewShot" options={{ format: "png", quality: 1 }}>
                <Content dataContent={dataContent} titleContent={titleContent} initDate={initDate} date={date} />
            </ViewShot>
            <View style={styles.containerMiddle}>
                <Text style={styles.fontReminder}>You Can Check Your Receipt in Your Image Folder</Text>
            </View>
            <View style={styles.containerButtonBottom}>
                <View style={styles.buttonLeftBottom}>
                <Icon
                    raised
                    name='reply'
                    type='font-awesome'
                    color='#f50'
                    onPress={btnCloseModal} />
                    <Icon
                    raised
                    name='envelope'
                    type='font-awesome'
                    color='#f50'
                    onPress={this._shareEmail} />
                    <Icon
                        raised
                        name='whatsapp'
                        type='font-awesome'
                        color='#00bfa5'
                        onPress={this._shareWhatsap} />
                     <Icon
                        raised
                        name='facebook'
                        type='font-awesome'
                        color='#1877F2'
                        onPress={this._shareFacebook} />
                </View>
            </View>
        </React.Fragment> 
           
    );
    }
}
