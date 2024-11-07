import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { Button } from "@rneui/themed";
import { FontAwesome } from "@expo/vector-icons";

export default function HostScreen() {
  const router = useRouter();
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [zipCode, setZipCode] = useState("");
  const [spotType, setSpotType] = useState("");
  const [price, setPrice] = useState("");
  const [availability, setAvailability] = useState("");

  const handleSubmit = () => {
    // Here you would typically send the data to your backend
    console.log("Submitting driveway data:", {
      address,
      city,
      state,
      zipCode,
      spotType,
      price,
      availability,
    });
    // After submission, navigate back to the profile or a confirmation page
    router.back();
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Text style={styles.title}>Host Your Driveway</Text>

        <View style={styles.inputContainer}>
          <FontAwesome
            name="map-marker"
            size={24}
            color="#007AFF"
            style={styles.icon}
          />
          <TextInput
            style={styles.input}
            placeholder="Street Address"
            value={address}
            onChangeText={setAddress}
          />
        </View>

        <View style={styles.inputContainer}>
          <FontAwesome
            name="building"
            size={24}
            color="#007AFF"
            style={styles.icon}
          />
          <TextInput
            style={styles.input}
            placeholder="City"
            value={city}
            onChangeText={setCity}
          />
        </View>

        <View style={styles.inputContainer}>
          <FontAwesome
            name="flag"
            size={24}
            color="#007AFF"
            style={styles.icon}
          />
          <TextInput
            style={styles.input}
            placeholder="State"
            value={state}
            onChangeText={setState}
          />
        </View>

        <View style={styles.inputContainer}>
          <FontAwesome
            name="map"
            size={24}
            color="#007AFF"
            style={styles.icon}
          />
          <TextInput
            style={styles.input}
            placeholder="Zip Code"
            value={zipCode}
            onChangeText={setZipCode}
            keyboardType="numeric"
          />
        </View>

        <View style={styles.inputContainer}>
          <FontAwesome
            name="car"
            size={24}
            color="#007AFF"
            style={styles.icon}
          />
          <TextInput
            style={styles.input}
            placeholder="Spot Type (e.g., Driveway, Garage)"
            value={spotType}
            onChangeText={setSpotType}
          />
        </View>

        <View style={styles.inputContainer}>
          <FontAwesome
            name="dollar"
            size={24}
            color="#007AFF"
            style={styles.icon}
          />
          <TextInput
            style={styles.input}
            placeholder="Price per hour"
            value={price}
            onChangeText={setPrice}
            keyboardType="numeric"
          />
        </View>

        <View style={styles.inputContainer}>
          <FontAwesome
            name="calendar"
            size={24}
            color="#007AFF"
            style={styles.icon}
          />
          <TextInput
            style={styles.input}
            placeholder="Availability (e.g., Weekdays 9AM-5PM)"
            value={availability}
            onChangeText={setAvailability}
          />
        </View>

        <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
          <Text style={styles.submitButtonText}>Submit Driveway</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  scrollContent: {
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 15,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    paddingHorizontal: 10,
  },
  icon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    height: 40,
    fontSize: 16,
  },
  submitButton: {
    backgroundColor: "#4CAF50",
    borderRadius: 8,
    paddingVertical: 15,
    marginTop: 20,
    alignItems: "center",
  },
  submitButtonText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#fff",
  },
});
