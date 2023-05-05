import React, { useState, useContext } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  Text,
  View,
  TextInput,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import GlobalContext from "../GlobalContext";
export default function Login() {
  const navigation = useNavigation();
  const [name, setName] = useState("Tekle");
  const [password, setPassword] = useState("137");

  const login = async () => {
    //call api
    //finish, refreshing app by setOwner();
    console.log(7, "check");
    try {
      const response = await fetch("http://localhost:3000/owners/login", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-type": "application/json",
        },
        body: JSON.stringify({ name, password }),
      });
      const result = await response.json();
      console.log(result);
      if (result.success) {
        console.log(result);
        try {
          await AsyncStorage.setItem("@Owner", result.data.token);
          await AsyncStorage.setItem("name", result.data.name);

          console.log("This is from login page", result.data.name);
          setOwner(result.data);
        } catch (error) {
          console.log(error);
        }
      } else {
        console.log(result);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const moveToSignUp = () => {
    navigation.navigate("signUp");
  };
  const { setOwner } = useContext(GlobalContext);
  return (
    <View style={styles.container}>
      <Text style={{ fontSize: 60, marginBottom: 30, marginTop: 100 }}>
        Login Page
      </Text>
      <TextInput
        style={styles.Input}
        placeholder="fullName"
        value={name}
        onChangeText={(text) => setName(text)}
      />
      {/* <TextInput style={styles.Input} placeholder="email" />
      <TextInput style={styles.Input} placeholder="phone" /> */}
      <TextInput
        style={styles.Input}
        placeholder="password"
        value={password}
        onChangeText={(text) => setPassword(text)}
      />
      <View style={{ flex: 1, flexDirection: "row" }}>
        <TouchableOpacity style={styles.button} onPress={login}>
          <Text style={{ fontSize: 20 }}>Login</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={moveToSignUp}>
          <Text style={{ fontSize: 20 }}>SignUp</Text>
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
