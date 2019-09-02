import React, { Component } from "react";
import { Text, View } from "react-native";
import { Card, Button, Icon } from "react-native-elements";
import ImageConvert from '../ImageConvert';
import styles from './styleContent';
import { Tools } from '@common'
class Content extends Component {
  constructor(props) {
	  super(props);
	  this.state = {
      viewImage:false
    }
  
  }
  _shareHandler = () =>{
    this.setState({
      viewImage:true
    })
  
  }
  render() {
    const { dataContent, titleContent, btnPress, btnCloseModal } = this.props;
    const {viewImage } = this.state;
    if(viewImage){
      return(
         <ImageConvert dataContent={dataContent} titleContent={titleContent} btnPress={btnPress} btnCloseModal={btnCloseModal} />
      )
    }

    return (
      <Card
        title={titleContent}
        wrapperStyle={styles.cardHolder}
        image={require('@assets/Images/intro/intro_2.png')}>
        <Text style={styles.toRowContainer}>
        <Text style={styles.toRowText}>
            To :
        </Text>
        <Text style={styles.toRowProps}>
          &nbsp;{dataContent.receiver.split(':')[0]}
        </Text>
        </Text>
        <Text style={styles.toRowContainer}>
        <Text style={styles.toRowText}>
            Amount : 
        </Text>
        <Text style={styles.toRowProps}>
        &nbsp;Rp. {Tools.formatMoney(dataContent.amount, 0, ',', '.')},- 
        </Text>
        </Text>
        <Text style={styles.toRowContainer}>
        <Text style={styles.toRowText}>
            Notes : 
        </Text>
        <Text style={styles.toRowProps}>
          &nbsp;{dataContent.msg}
        </Text>
        </Text>
        <View
            style={styles.separator}
            />
        <View style={styles.containerButtonBottom}>
          <View style={styles.buttonLeftBottom}>
          <Button
            onPress={btnPress}
            backgroundColor='#03A9F4'
            buttonStyle={styles.buttonHome}
            title='HOME' />
          <Button
            onPress={btnCloseModal}
            backgroundColor='#F44336'
            buttonStyle={styles.buttonTransfer}
            title='TRANSFER' />
          </View>
          <View style={styles.shareButton}>
            <Icon
            raised
            name='share'
            type='font-awesome'
            color='#f50'
            onPress={this._shareHandler} />
          </View>
        </View>
        
      </Card>
    );
  }
}

export default Content;