import React, { useState } from "react";

import {
  View,
  Text,
  StyleSheet,
  TouchableHighlight,
  Alert,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import Loader from "./loader";
import AsyncStorage from "@react-native-async-storage/async-storage";
const Food = ({ data }) => {
  const { index, name, Origin, price, date, image } = data;
  const [loading, setLoading] = useState(false);

  console.log(data, "============================");
  const navigation = useNavigation();
  const viewFood = () => {
    navigation.navigate("ViewFood", { data: data });
  };
  const editFun = () => {
    navigation.navigate("EditFood", data);
  };

  const onDelete = async () => {
    //console.log(displayList, "===============");
    setLoading(true);
    const ownerName = await AsyncStorage.getItem("name");
    await fetch(
      `http://localhost:3000/owners/${ownerName}/foods/${name}/food`,
      {
        method: "DELETE",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      }
    );
    setLoading(false);
    navigation.navigate("FoodList", { refresh: true });
  };

  return (
    <View style={{ backgroundColor: index % 2 === 0 ? "white" : "#F3F3F7" }}>
      <View style={styles.row}>
        <View style={styles.food}>
          <Loader loading={loading} />
          <View>
            <Text>FoodName:{name}</Text>
          </View>

          <View>
            <Text>FoodOrigin:{Origin}</Text>
          </View>

          <View>
            <Text>FoodPrice:{price}</Text>
          </View>

          <View>
            <Text>Date: {date}</Text>
          </View>

          <View></View>
          <Text>{image}</Text>
        </View>
        <View style={styles.edges}>
          <TouchableHighlight
            onPress={viewFood}
            style={styles.button}
            underlayColor="#5398DC"
          >
            <Text style={styles.buttonText}>View Food</Text>
          </TouchableHighlight>
          <TouchableHighlight
            onPress={editFun}
            style={styles.button}
            underlayColor="#5398DC"
          >
            <Text style={styles.buttonText}>Edit</Text>
          </TouchableHighlight>

          <TouchableHighlight
            onPress={onDelete}
            style={styles.button}
            underlayColor="#5398DC"
          >
            <Text style={styles.buttonText}>Delete</Text>
          </TouchableHighlight>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    padding: 20,
    borderBottomWidth: 1,
    borderColor: "#ddd",
  },
  edges: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 5,
    minWidth: 50,
  },

  food: {
    flexDirection: "column",
    flex: 8,
  },
  button: {
    borderWidth: 1,
    borderColor: "#0066CC",
    borderRadius: 14,
    paddingHorizontal: 10,
    paddingVertical: 3,
    backgroundColor: "#fff",
  },
  buttonText: {
    color: "#0066CC",
    fontSize: 12,
    textAlign: "center",
  },
  // info: {
  //   marginHorizontal: 40,
  //   marginVertical: 10,
  //   padding: 10,
  //   backgroundColor: "#fff",
  //   borderWidth: 1,
  //   borderColor: "#ddd",
  //   borderRadius: 4,
  // },
});

export default Food;
