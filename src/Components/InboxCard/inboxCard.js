import React from "react";
import { Text, View } from "react-native";
import { Card, Image, Icon } from 'react-native-elements';
import styles from './styleInboxCard';
import { Tools } from '@common'

inboxCard = props => {
  const {
      title,
      body,
      read,
      deleteInbox,
      timestamp
  } = props;

  _deleteProps = () => {
       
      deleteInbox()
  }
  
  return (
    <View style={styles.containerCardView}>
      <Card
      titleStyle={styles.featureTitle}
       title={title}
       containerStyle={styles.containerCardHolder}>
       <View style={styles.containerHolder}>
       <Image
        style={styles.Image}
        source={require('@assets/Images/in_app_logo_2.png')}
        imageProps={{resizeMode:'center'}}
       />
       </View>
        <View style={styles.containerHolder}>
        <View 
        style={styles.lineBorder}/>
          <Text style={styles.titleName}>{body}</Text>
        </View>
            <View style={styles.containerHolder}>
            <Text style={styles.date}>{Tools.date(timestamp)}</Text>
          </View>
        <View style={styles.footerCard}>
            <Icon
            raised
            name='trash'
            type='font-awesome'
            color='#f50'
            onPress={this._deleteProps.bind(this)} />
        </View>
      </Card>
    </View>
    

  );

}

  export default inboxCard;

