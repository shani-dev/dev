import React, { Component } from "react";
import { Text, View } from "react-native";
import { Card } from "react-native-elements";
import styles from "./contentStyle";
import { Tools } from '@common'
class Content extends Component {
  
  render() {
    const { dataContent, titleContent, date, initDate } = this.props;
    return (
      <Card
        title='DOTPAY - RECEIVE TRANSFER'
        >
        <Text style={styles.containerRow}>
        <Text style={styles.titleContent}>
            {titleContent}
        </Text>
        </Text>
        {initDate && (
          <View style={styles.containerRow}>
          <Text style={styles.dateContent}>
              Date : {date}
          </Text>
          </View>

        )}
        <Text style={styles.containerRow}>
        <Text style={styles.textStatic}>
            To :
        </Text>
        <Text style={styles.textResult}>
        &nbsp;{dataContent.receiver.split(':')[0]}
        </Text>
        </Text>
        <Text style={styles.containerRow}>
        <Text style={styles.textStatic}>
            Amount : 
        </Text>
        <Text style={styles.textResult}>
        &nbsp; Rp. {Tools.formatMoney(dataContent.amount, 0, ',', '.')}
        </Text>
        </Text>
        <Text style={styles.containerRow}>
        <Text style={styles.textStatic}>
            Notes : 
        </Text>
        <Text style={styles.textResult}>
        &nbsp;{dataContent.msg}
        </Text>
        </Text>
      </Card>
    );
  }
}

export default Content;