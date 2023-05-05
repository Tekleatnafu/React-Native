import AsyncStorage from "@react-native-async-storage/async-storage";
import { TabRouter } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import { FlatList, TextInput } from "react-native-gesture-handler";
//import { Button } from "react-native-paper";

import Food from "./Food";

export default function FoodList({ navigation, route }) {
  const [search, setSearch] = useState("");
  const [originalList, setOriginList] = useState([]);
  const [displayList, setDisplayList] = useState([]);

  const renderFunc = ({ item, index }) => {
    return <Food data={{ ...item, index }} />;
  };

  const getFoods = async () => {
    try {
      const name = await AsyncStorage.getItem("name");
      console.log("This is from the food list................", name);
      const response = await fetch(
        `http://localhost:3000/owners/${name}/foods`
      );
      const json = await response.json();
      setDisplayList(json.foods);
      setOriginList(json.foods);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    getFoods();
  }, []);

  useEffect(() => {
    if (route.params && route.params.refresh) {
      getFoods();
    }
  }, [route.params]);

  const searchFun = (text) => {
    const srch = originalList.filter((item) => {
      return item.name.toUpperCase().includes(text.toUpperCase());
    });
    setDisplayList(srch);
    setSearch(text);
  };
  const addFood = () => {
    navigation.navigate("AddFood");
  };
  return (
    <View>
      <Text style={{ fontSize: 60, marginLeft: 200, marginTop: 30 }}>
        Food List
      </Text>
      <View style={{ flex: 1, flexDirection: "row", margin: 50 }}>
        <TextInput
          style={styles.input}
          placeholder="Live Search"
          onChangeText={searchFun}
          value={search}
        />
        <TouchableOpacity
          style={styles.button}
          onPress={addFood}
          underlayColor="#5398DC"
        >
          <Text>AddFood</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        data={displayList}
        renderItem={renderFunc}
        keyExtractor={(item) => item.name}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    //margin: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  input: {
    padding: 10,
    paddingHorizontal: 20,
    fontSize: 16,
    color: "#444",
    borderBottomWidth: 1,
    borderColor: "#ddd",
    backgroundColor: "#F5F5F5",
    margin: 20,
    borderWidth: 2,
  },
  button: {
    width: 60,
    height: 30,
    margin: 10,
    borderWidth: 1,
    margin: 10,
    borderRadius: 10,
    backgroundColor: "lightgreen",
    padding: 5,
    alignItems: "center",
    justifyContent: "center",
  },
});
