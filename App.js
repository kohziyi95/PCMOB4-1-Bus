import {
  StyleSheet,
  TouchableOpacity,
  Text,
  View,
  ActivityIndicator,
  TextInput,
} from "react-native";
import React, { useState, useEffect } from "react";
// import TimingStack from "./TimingScreen";
// import HomeStack from "./HomeScreen";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

const Stack = createStackNavigator();

function HomeScreen({ navigation }) {
  const [busStop, setBusStop] = useState("");
  const [busNo, setBusNo] = useState("");

  return (
    <View style={styles.container}>
      <Text style={{ fontSize: 40, textAlign: 'center', marginHorizontal: 40, marginBottom: 20,  }}>Bus Arrival App</Text>
      <Text style={{ fontSize: 16, textAlign: 'center', marginHorizontal: 40, marginBottom: 60, }}>Key in your bus stop code and bus number to get the next arrival timings!</Text>
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
        onPress={() => {
          navigation.navigate("BusArrival", {
            busNo: busNo,
            busStop: busStop,
          });
        }}
      >
        <Text style={styles.buttonText}>Search Bus Timings!</Text>
      </TouchableOpacity>
    </View>
  );
}

function TimingScreen({ navigation, route }) {
  const [loading, setLoading] = useState(true);
  const [arrival, setArrival] = useState("");
  const [duration, setDuration] = useState("");
  const [nextArrival, setNextArrival] = useState("");
  const [nextDuration, setNextDuration] = useState("");
  const [bus, setBus] = useState("");

  const { busStop, busNo } = route.params;

  const BUSSTOP_URL = "https://arrivelah2.busrouter.sg/?id=" + busStop;
  // const input = ({route}) => {
  //   const { busStop, busNo } = route.params;
  // }

  function loadBusStopData() {
    // console.log(busNo);

    setLoading(true);
    fetch(BUSSTOP_URL)
      .then((response) => response.json())
      .then((json) => {
        // const data = json;
        // console.log(data);
        setBus(busNo);
        const myBus = json.services.filter((bus) => bus.no == busNo)[0];
        // console.log(myBus);
        const arrivalTime = new Date(myBus.next.time);
        setArrival(arrivalTime.toLocaleTimeString());
        setDuration(
          myBus.next.duration_ms >= 6000
            ? Math.floor(myBus.next.duration_ms / 60000) + " mins"
            : "Arriving"
        );
        console.log("Next timing: " + myBus.next.time);
        console.log(
          "Next bus duration: " +
            myBus.next.duration_ms +
            " / " +
            Math.floor(myBus.next.duration_ms / 60000)
        );

        const nextArrivalTime = new Date(myBus.subsequent.time);
        setNextArrival(nextArrivalTime.toLocaleTimeString());
        setNextDuration(
          myBus.subsequent.duration_ms >= 6000
            ? Math.floor(myBus.subsequent.duration_ms / 60000) + " mins"
            : "Arriving"
        );
        console.log("Next next timing: " + myBus.subsequent.time);
        console.log(
          "Next bus duration: " +
            myBus.subsequent.duration_ms +
            " / " +
            Math.floor(myBus.subsequent.duration_ms / 60000)
        );

        setLoading(false);
      });
  }

  useEffect(() => {
    loadBusStopData();
    const interval = setInterval(loadBusStopData, 30000);
    return () => clearInterval(interval);
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Bus: {bus} </Text>
      <Text style={styles.title}>Arrival Time:</Text>

      <Text style={styles.time}>
        {loading ? (
          <ActivityIndicator color={"blue"} />
        ) : (
          duration + ", " + arrival
        )}
      </Text>
      <Text style={styles.nextTime}>
        {loading ? (
          <ActivityIndicator color={"blue"} />
        ) : (
          nextDuration + ", " + nextArrival
        )}
      </Text>

      <TouchableOpacity style={styles.button} onPress={() => loadBusStopData()}>
        <Text style={styles.buttonText}>Refresh!</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("Home")}
      >
        <Text style={styles.buttonText}>Do Another Search!</Text>
      </TouchableOpacity>
    </View>
  );
}

export default function App({ navigation }) {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Group>
          <Stack.Screen
            name="Home"
            component={HomeScreen}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="BusArrival"
            component={TimingScreen}
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
    fontSize: 30,
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
  input: {
    fontSize: 30,
    marginVertical: 10,
    textAlign: "center",
  },
});
