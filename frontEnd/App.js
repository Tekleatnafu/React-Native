import { useEffect, useState } from "react";
//import { StatusBar } from "expo-status-bar";
import { StyleSheet } from "react-native";
import GlobalContext from "./GlobalContext";
import AsyncStorage from "@react-native-async-storage/async-storage";
////////////////////////////////////
import {
  NavigationContainer,
  useRoute,
  useNavigation,
} from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
// import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
// import { Ionicons } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "react-native-vector-icons";

//////////////////////////////////////
import Login from "./components/Login";
import SignUp from "./components/SignUp";
//import OwnerList from "./components/OwnerList";
import FoodList from "./components/FoodList";
import Notes from "./components/Notes";
import Profile from "./components/Profile";
import AddFood from "./components/AddFood";
import EditFood from "./components/EditFood";
import ViewFood from "./components/ViewFood";
import AddNote from "./components/AddNote";
import ViewNotes from "./components/ViewNotes";
const Stack = createNativeStackNavigator();
const BTab = createBottomTabNavigator();

const LoginSign = () => {
  return (
    <Stack.Navigator initialRouteName="login">
      <Stack.Screen
        name={"login"}
        component={Login}
        options={{
          title: "Login",
          headerShown: false,
        }}
      />
      <Stack.Screen
        name={"signUp"}
        component={SignUp}
        options={{
          title: "SignUp",
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
};

const Home = () => {
  return (
    <BTab.Navigator initialRouteName="Foods">
      <BTab.Screen
        name={"Foods"}
        component={Foods}
        options={{
          title: "Foods",
          headerShown: false,
          tabBarIcon: (tabBarInfo) => (
            // <Ionicons name="home" size={24}></Ionicons>
            <MaterialCommunityIcons
              name="home"
              size={24}
              color={tabBarInfo.color}
            ></MaterialCommunityIcons>
          ),
        }}
      />
      <BTab.Screen
        name={"profile"}
        component={Profile}
        options={{
          title: "Profile",
          headerShown: false,
          tabBarIcon: (tabBarInfo) => (
            // <Ionicons name="home" size={24}></Ionicons>
            <MaterialCommunityIcons
              name="human-male-male"
              size={24}
              color={tabBarInfo.color}
            ></MaterialCommunityIcons>
          ),
        }}
      />
      <BTab.Screen
        name={"notes"}
        component={notes}
        options={{
          title: "notes",
          headerShown: false,
          tabBarIcon: (tabBarInfo) => (
            // <Ionicons name="home" size={24}></Ionicons>
            <MaterialCommunityIcons
              name="book-open"
              size={24}
              color={tabBarInfo.color}
            ></MaterialCommunityIcons>
          ),
        }}
      />
    </BTab.Navigator>
  );
};

const Foods = () => {
  return (
    <Stack.Navigator initialRouteName="FoodList">
      <Stack.Screen
        name={"FoodList"}
        component={FoodList}
        options={{
          title: "FoodList",
          headerShown: false,
        }}
      />
      <Stack.Screen
        name={"AddFood"}
        component={AddFood}
        options={{
          title: "AddFood",
          headerShown: false,
        }}
      />
      <Stack.Screen
        name={"EditFood"}
        component={EditFood}
        options={{
          title: "EditFood",
          headerShown: false,
        }}
      />
      <Stack.Screen
        name={"ViewFood"}
        component={ViewFood}
        options={{
          title: "ViewFood",
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
};
///////////////////////
const notes = () => {
  return (
    <Stack.Navigator initialRouteName="Notes">
      <Stack.Screen
        name={"Notes"}
        component={Notes}
        options={{
          title: "Notes",
          headerShown: false,
        }}
      />
      <Stack.Screen
        name={"AddNote"}
        component={AddNote}
        options={{
          title: "AddNote",
          headerShown: false,
        }}
      />

      <Stack.Screen
        name={"ViewNotes"}
        component={ViewNotes}
        options={{
          title: "ViewNotes",
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
};

export default function App() {
  const [owner, setOwner] = useState(null);
  useEffect(() => {
    const getOwner = async () => {
      try {
        const data = await AsyncStorage.getItem("@Owner");
        console.log(123, data);
        if (data) {
          console.log("thao ", data);
          setOwner(data);
        }
      } catch (error) {}
    };
    getOwner();
  }, []);
  return (
    <GlobalContext.Provider value={{ owner, setOwner }}>
      <NavigationContainer>
        {owner ? <Home /> : <LoginSign />}
      </NavigationContainer>
    </GlobalContext.Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
