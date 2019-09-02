import React, { Component } from 'react'
import { View, Text, Image, Modal } from 'react-native'
import LinearGradient from 'react-native-linear-gradient'
import styles from './styles'


export default class Loader extends Component {
    render(){
    const { animationType, modalVisible } = this.props;
        return(
            <Modal
            onRequestClose={()=>{}}
            animationType={animationType}
            transparent={modalVisible} 
            visible={modalVisible}
            >  
                <LinearGradient
                colors={['#2F2776', '#03B1E5']}
                style={styles.wrap}
                start={{x: 0, y: 1}}
                end={{x: 1, y: 0}}
                >
                <View style={styles.viewContainer}>
                    <Image
                    style={styles.LoaderImage}
                    source={require('@assets/LoaderAssets/dotPayLoader.gif')}
                    />
                </View>
                </LinearGradient>
            </Modal>
        );
    }


}
