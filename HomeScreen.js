import {
  StyleSheet,
  TouchableOpacity,
  Text,
  View,
  TextInput,
} from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import React, { useState, useEffect } from "react";

const Stack = createStackNavigator();


function HomeScreen({ navigation }) {
  
  const [busStop, setBusStop] = useState("");
  const [busNo, setBusNo] = useState("");

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Bus Stop:</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter Bus Stop Code"
        onChangeText={(busStop) => setBusStop(busStop)}
        defaultValue={""}
      />

      <Text style={styles.title}>Bus:</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter Bus Number"
        onChangeText={(busNo) => setBusNo(busNo)}
        defaultValue={""}
      />

      <TouchableOpacity
        style={styles.button}
        onPress={() => {navigation.navigate('BusArrival', {busNo: 155, busStop: 10});}}
      >
        <Text style={styles.buttonText}>Search Bus Timings!</Text>
      </TouchableOpacity>
    </View>
  );
}
export default function HomeStack(navigation, route) {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="HomeStack"
        component={HomeScreen}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // flexDirection: "row",
    // justifyContent: "space-between",
    // flexWrap: "wrap",
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 30,
    marginVertical: 20,
    textAlign: "center",
  },
  input: {
    fontSize: 30,
    marginVertical: 20,
    textAlign: "center",
  },

  button: {
    backgroundColor: "lightblue",
    padding: 20,
    marginVertical: 20,
  },
  buttonText: {
    fontSize: 20,
  },
});
