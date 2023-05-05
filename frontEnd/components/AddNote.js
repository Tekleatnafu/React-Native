import React, { useState } from "react";
import {
  Text,
  View,
  TextInput,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
//import GlobalContext from "../GlobalContext";
import Loader from "./loader";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
export default function AddFood() {
  //const [name, setName] = useState("");
  const [date, setDate] = useState("");
  const [header, setHeader] = useState("");
  const [comment, setComment] = useState("");
  //////////////////////////////////
  const [loading, setLoading] = useState(false);
  const [errortext, setErrortext] = useState("");
  const [isAddSuccess, setIsAddSuccess] = useState(false);
  ///////////////////////////////////
  const navigation = useNavigation();
  const submit = async () => {
    setErrortext("");
    if (!header) {
      alert("Please fill header");
      return;
    }

    //const ownerEmail = await AsyncStorage.getItem("email");
    try {
      const ownerName = await AsyncStorage.getItem("name");
      const response = await fetch(
        `http://localhost:3000/owners/${ownerName}/notes`,
        {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-type": "application/json",
          },
          body: JSON.stringify({ header, comment }),
        }
      );
      const result = await response.json();
      setLoading(false);
      setLoading(false);
      if (isAddSuccess) {
        setIsAddSuccess(true);
        alert("Add note Successful. ");
        //setOwner(result.data);
        navigation.navigate("Notes");
      } else {
        console.log(result);
        setErrortext(result.msg);
      }
    } catch (error) {
      console.log(error);
    }
    navigation.navigate("Notes");
  };

  return (
    <View style={styles.container}>
      <Text style={{ fontSize: 60, marginBottom: 30, marginTop: 100 }}>
        Add Note Page
      </Text>
      <Loader loading={loading} />
      <TextInput
        style={styles.Input}
        placeholder="header"
        value={header}
        onChangeText={(text) => setHeader(text)}
      />
      <TextInput
        style={styles.Input}
        placeholder="Comment"
        value={comment}
        onChangeText={(text) => setComment(text)}
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
