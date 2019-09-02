import React, { Component } from 'react'
import { StyleSheet, View } from "react-native";
import BoxPlaceholder from "@components/BoxPlaceholder";

const styles = StyleSheet.create({
    container: {
      flex: 1,
      flexDirection: "row"
    },
    hotelImage: {
      width: 100,
      height: 150,
      zIndex: 1,
      borderTopLeftRadius: 5,
      borderBottomLeftRadius: 5
    },
    hotelName: {
      width: 170,
      height: 20
    },
    rating: {
      width: 150,
      height: 20,
      marginTop: 5,
      alignItems: "flex-start"
    },
    rightContainer: {
      padding: 10
    },
    location: {
      width: 100,
      height: 30,
      marginTop: 10
    },
    discountPrice: {
      width: 100,
      height: 10,
      marginTop: 10
    },
    locationText: {
      width: 100,
      height: 10,
      marginTop: 10
    }
  }),
  HotelCard = props => {
    const { style } = props;

    return (
      <View style={style}>
        <View style={styles.container}>
          <BoxPlaceholder style={styles.hotelImage} />
          <View style={styles.rightContainer}>
            <BoxPlaceholder style={styles.hotelName} />
            <BoxPlaceholder style={styles.rating} />
            <BoxPlaceholder style={styles.location} />
            <BoxPlaceholder style={styles.discountPrice} />
          </View>
        </View>
      </View>
    );
  };

export default HotelCard;
