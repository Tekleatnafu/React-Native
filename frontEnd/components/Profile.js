import React from "react";
import { useState } from "react";

import { StyleSheet, Text, View, ScrollView, Image } from "react-native";
const Profile = () => {
  return (
    <ScrollView>
      <View style={{ alignItems: "center", justifyContent: "center" }}>
        <View>
          <Text style={styles.root}>Owner Profile</Text>
        </View>
        <View style={{ flex: 1, flexDirection: "row", margin: 20 }}>
          <Image style={styles.image} source={require("./prof.jpg")} />
        </View>

        <View>
          <View style={styles.infoHeader}>
            <Text style={styles.parametres}>Name: Tekle</Text>
            <Text style={styles.parametres}>Email: tekle@21</Text>
            <Text style={styles.parametres}>Phone: 651-157-1234</Text>
            <Text style={styles.parametres}>password: 137</Text>
          </View>
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

export default Profile;
