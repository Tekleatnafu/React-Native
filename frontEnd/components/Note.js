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
const Note = ({ data }) => {
  const { index, date, header, comment } = data;
  const [loading, setLoading] = useState(false);

  console.log(data, "============================");
  const navigation = useNavigation();
  const viewNote = () => {
    navigation.navigate("ViewNotes", { data: data });
  };

  const onDelete = async () => {
    //console.log(displayList, "===============");
    setLoading(true);
    const ownerName = await AsyncStorage.getItem("name");
    await fetch(
      `http://localhost:3000/owners/${ownerName}/notes/${header}/note`,
      {
        method: "DELETE",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      }
    );
    setLoading(false);
    navigation.navigate("Notes", { refresh: true });
  };
  // navigation.navigate("Notes", { refresh: true });

  return (
    <View style={{ backgroundColor: index % 2 === 0 ? "white" : "#F3F3F7" }}>
      <View style={styles.row}>
        <View style={styles.note}>
          <Loader loading={loading} />
          <View>
            <Text>Date:{date}</Text>
          </View>

          <View>
            <Text>Header:{header}</Text>
          </View>

          <View>
            <Text>Comment:{comment}</Text>
          </View>
        </View>
        <View style={styles.edges}>
          <TouchableHighlight
            onPress={viewNote}
            style={styles.button}
            underlayColor="#5398DC"
          >
            <Text style={styles.buttonText}>View Note</Text>
          </TouchableHighlight>
          <TouchableHighlight
            onPress={onDelete}
            style={styles.button}
            underlayColor="#5398DC"
          >
            <Text style={styles.buttonText}>Delete Note</Text>
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

  note: {
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
});

export default Note;
