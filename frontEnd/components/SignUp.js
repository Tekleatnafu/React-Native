import React, { useState, createRef, useContext } from "react";
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
export default function SignUp() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [ownerAddress, setOwnerAddress] = useState("");
  const [password, setPassword] = useState("");

  //////////////////////////////////
  const [loading, setLoading] = useState(false);
  const [errortext, setErrortext] = useState("");
  const [isRegistraionSuccess, setIsRegistraionSuccess] = useState(false);
  ///////////////////////////////////
  const navigation = useNavigation();
  const submit = async () => {
    setErrortext("");
    if (!name) {
      alert("Please fill Name");
      return;
    }
    if (!email) {
      alert("Please fill Email");
      return;
    }
    if (!phone) {
      alert("Please fill phone");
      return;
    }
    if (!ownerAddress) {
      alert("Please fill Address");
      return;
    }
    if (!password) {
      alert("Please fill Password");
      return;
    }
    try {
      const response = await fetch("http://localhost:3000/owners/signUp", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-type": "application/json",
        },
        body: JSON.stringify({ name, email, phone, ownerAddress, password }),
      });
      const result = await response.json();
      setLoading(false);
      //setLoading(false);
      console.log(result);
      if (result.success) {
        setIsRegistraionSuccess(true);
        alert(
          "Registration Successful. Please Login to proceed",
          <View>
            <Image
              source={require("./success.png")}
              style={{
                height: 20,
                resizeMode: "contain",
                alignSelf: "center",
              }}
            />
          </View>
        );
        //setOwner(result.data);
        navigation.navigate("login");
      } else {
        console.log(result);
        setErrortext(result.msg);
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <View style={styles.container}>
      <Text style={{ fontSize: 60, marginBottom: 30, marginTop: 100 }}>
        SignUp Page
      </Text>
      <Loader loading={loading} />
      <TextInput
        style={styles.Input}
        placeholder="fullName"
        value={name}
        onChangeText={(text) => setName(text)}
      />
      <TextInput
        style={styles.Input}
        placeholder="email"
        value={email}
        onChangeText={(text) => setEmail(text)}
      />
      <TextInput
        style={styles.Input}
        placeholder="phone"
        value={phone}
        onChangeText={(text) => setPhone(text)}
      />
      <TextInput
        style={styles.Input}
        placeholder="ownerAddress"
        value={ownerAddress}
        onChangeText={(text) => setOwnerAddress(text)}
      />
      <TextInput
        style={styles.Input}
        placeholder="password"
        value={password}
        onChangeText={(text) => setPassword(text)}
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
