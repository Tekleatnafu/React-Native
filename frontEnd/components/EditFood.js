import React, { useState } from "react";
import {
  Text,
  View,
  TextInput,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import Loader from "./loader";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
export default function EditFood({ route }) {
  const [name, setName] = useState("");
  const [origin, setOrigin] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState("");
  const nam = route.params.name;
  //////////////////////////////////
  const [loading, setLoading] = useState(false);
  const [errortext, setErrortext] = useState("");
  const [isEditSuccess, setIsEditSuccess] = useState(false);
  ///////////////////////////////////
  const navigation = useNavigation();
  const submit = async () => {
    setErrortext("");
    if (!name) {
      alert("Please fill Name");
      return;
    }
    try {
      const ownerName = await AsyncStorage.getItem("name");
      // console.log(ownerEmail, "=======================================");
      const response = await fetch(
        `http://localhost:3000/owners/${ownerName}/foods/${nam}`,
        {
          method: "PUT",
          headers: {
            Accept: "application/json",
            "Content-type": "application/json",
          },
          body: JSON.stringify({ name, origin, price, image }),
        }
      );
      const result = await response.json();
      console.log(result, "++++++++++++++++++++++++++++++++++++");
      //setLoading(false);
      if (!isEditSuccess) {
        setIsEditSuccess(true);
        alert("Edit food Successful.");
        navigation.navigate("FoodList");
      } else {
        //console.log(result);
        setErrortext(result.msg);
      }
    } catch (error) {
      console.log(error);
    }
    //navigation.navigate("FoodList");
  };

  return (
    <View style={styles.container}>
      <Text style={{ fontSize: 60, marginBottom: 30, marginTop: 100 }}>
        Edit Food Page
      </Text>
      <Loader loading={loading} />
      <TextInput
        style={styles.Input}
        placeholder="foodName"
        value={name}
        onChangeText={(text) => setName(text)}
      />
      <TextInput
        style={styles.Input}
        placeholder="foodOrigin"
        value={origin}
        onChangeText={(text) => setOrigin(text)}
      />
      <TextInput
        style={styles.Input}
        placeholder="food Price"
        value={price}
        onChangeText={(text) => setPrice(text)}
      />
      <TextInput
        style={styles.Input}
        placeholder="image"
        value={image}
        onChangeText={(text) => setImage(text)}
      />
      <View style={{ flex: 1, flexDirection: "row" }}>
        <TouchableOpacity style={styles.button} onPress={submit}>
          <Text style={{ fontSize: 20 }}>Submit</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",

    //backgroundColor: "lightblue",
  },
  Input: {
    borderWidth: 2,
    margin: 10,
  },
  button: {
    width: 70,
    height: 40,
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
