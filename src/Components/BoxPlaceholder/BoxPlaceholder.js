import React, { Component } from "react";
import { View, Animated, StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});

export default class BoxPlaceholder extends Component {
  constructor(props) {
    super(props);

    this.state = {
      animationValue: new Animated.Value(0)
    };
  }

  componentDidMount() {
    const { animationValue } = this.state;

    Animated.loop(
      Animated.sequence([
        Animated.timing(animationValue, {
          toValue: 1,
          duration: 500
        }),
        Animated.timing(animationValue, {
          toValue: 0,
          duration: 500
        })
      ])
    ).start();
  }

  render() {
    const { style } = this.props,
      { animationValue } = this.state,
      animatedColor = animationValue.interpolate({
        inputRange: [0, 1],
        outputRange: ["#E0E0E0", "#757575"]
      });

    return (
      <View styles={[styles.placeholder]}>
        <Animated.View style={[style, { backgroundColor: animatedColor }]} />
      </View>
    );
  }
}
