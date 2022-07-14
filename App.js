import {
  StyleSheet,
  TouchableOpacity,
  Text,
  View,
  ActivityIndicator,
} from "react-native";
import React, { useState, useEffect } from "react";

export default function App() {
  const [loading, setLoading] = useState(true);
  const [arrival, setArrival] = useState("");
  const [duration, setDuration] = useState("");
  const [nextArrival, setNextArrival] = useState("");
  const [nextDuration, setNextDuration] = useState("");
  const [bus, setBus] = useState("");
  const BUSSTOP_URL = "https://arrivelah2.busrouter.sg/?id=83139";

  function loadBusStopData() {
    setLoading(true);
    fetch(BUSSTOP_URL)
      .then((response) => response.json())
      .then((json) => {
        const data = json;
        setBus(155);
        const myBus = json.services.filter((bus) => bus.no == 155)[0];
        // console.log(myBus);
        const arrivalTime = new Date(myBus.next.time);
        setArrival(arrivalTime.toLocaleTimeString());
        setDuration(
          myBus.next.duration_ms >= 6000
            ? Math.floor(myBus.next.duration_ms / 60000) + " mins"
            : "Arriving"
        );
        console.log("Next timing: " + arrival);
        console.log(
          "Next bus duration: " + myBus.next.duration_ms + " / " + duration
        );

        const nextArrivalTime = new Date(myBus.subsequent.time);
        setNextArrival(nextArrivalTime.toLocaleTimeString());
        setNextDuration(
          myBus.subsequent.duration_ms >= 6000
            ? Math.floor(myBus.subsequent.duration_ms / 60000) + " mins"
            : "Arriving"
        );
        console.log("Next next timing: " + nextArrival);
        console.log(
          "Next bus duration: " +
            myBus.subsequent.duration_ms +
            " / " +
            nextDuration
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
    </View>
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
