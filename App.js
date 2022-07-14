import { StyleSheet } from "react-native";
import React, { useState, useEffect } from "react";
import TimingStack from "./TimingScreen";
import HomeStack from "./HomeScreen";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

const Stack = createStackNavigator();

export default function App({navigation}) {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Group>
          <Stack.Screen
            name="Home"
            component={HomeStack}
            options={{
              headerShown: false,
            }}
          />
        </Stack.Group>
        <Stack.Group>
          <Stack.Screen
            name="BusArrival"
            component={TimingStack}
            options={{
              headerShown: false,
            }}
          />
        </Stack.Group>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 40,
    marginVertical: 20,
  },
  time: {
    fontSize: 30,
    margin: 10,
    fontWeight: "bold",
    textAlign: "center",
  },
  nextTime: {
    fontSize: 24,
    margin: 10,
    fontWeight: "bold",
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
