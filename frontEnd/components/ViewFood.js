import React from "react";
import { useState } from "react";
//import Stars from "./Stars";
import { StyleSheet, Text, View, ScrollView, Image } from "react-native";
const ViewFood = ({ route }) => {
  const foods = route.params.data;

  return (
    <ScrollView>
      <View style={{ flex: 1, flexDirection: "row", margin: 20 }}>
        <Image style={styles.image} source={require("./doro.jpg")} />
        <Image style={styles.image} source={require("./cultureFood.jpg")} />
      </View>
      <View>
        <Text style={styles.root}>View Food</Text>
      </View>
      <View>
        <View style={styles.infoHeader}>
          <Text style={styles.parametres}>{foods.name}</Text>
          <Text style={styles.parametres}>{foods.origin}</Text>
          <Text style={styles.parametres}>{foods.price}</Text>
          <Text style={styles.parametres}>{foods.image}</Text>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  root: { margin: 50, fontSize: 40 },
  parametres: {
    marginLeft: 100,
    fontSize: 20,
    color: "black",
  },
  image: {
    width: 200,
    height: 200,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 30,
  },
});

export default ViewFood;
