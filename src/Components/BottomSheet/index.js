import React, { Component } from 'react'
import { StyleSheet, View, Animated, Dimensions } from "react-native";
import styles from './styles'
import Content from "./Content";

export default class BottomSheet extends Component {
    constructor(props){
        super(props)
        this.state = {
             animation: new Animated.Value(0)
        }

    }

    componentDidUpdate(){
        this._initAnimation();
    }

    _initAnimation =() => {
        Animated.timing(this.state.animation, {
            toValue: 1,
            duration: 200,
            useNativeDriver: true,
          }).start();
    }

    handleClose = () => {
        Animated.timing(this.state.animation, {
          toValue: 0,
          duration: 200,
          useNativeDriver: true,
        }).start();
      };

      

    render(){
    const screenHeight = Dimensions.get("window").height;

    const backdrop = {
        transform: [
          {
            translateY: this.state.animation.interpolate({
              inputRange: [0, 0.01],
              outputRange: [screenHeight, 0],
              extrapolate: "clamp",
            }),
          },
        ],
        opacity: this.state.animation.interpolate({
          inputRange: [0.01, 0.5],
          outputRange: [0, 1],
          extrapolate: "clamp",
        }),
      };
   
    const slideUp = {
        transform: [
          {
            translateY: this.state.animation.interpolate({
              inputRange: [0.01, 1],
              outputRange: [0, -1 * screenHeight],
              extrapolate: "clamp",
            }),
          },
        ],
      };
    const { sheetVisible, titleContent, dataContent, btnPress } = this.props;
    if(sheetVisible){
        return(
            <Animated.View style={[StyleSheet.absoluteFill, styles.cover, backdrop]}>
                <View style={[styles.sheet]}>
                    <Animated.View style={[styles.popup, slideUp]}>
                          <Content titleContent={titleContent} dataContent={dataContent} btnPress={btnPress} btnCloseModal={this.handleClose}  />
                    </Animated.View>
                </View>
            </Animated.View>
        );

    }else{
        return(
            <View>
            </View>
        );

    }
        
    }


}
