import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Switch,
  Platform,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { FontAwesome } from "@expo/vector-icons";

export default function HostScreen() {
  const router = useRouter();
  const [fullName, setFullName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [zipCode, setZipCode] = useState("");
  const [spotDimensions, setSpotDimensions] = useState("");
  const [hourlyRate, setHourlyRate] = useState("");
  const [availableDates, setAvailableDates] = useState("");
  const [insuranceInfo, setInsuranceInfo] = useState("");
  const [evCharging, setEvCharging] = useState(false);
  const [securityCam, setSecurityCam] = useState(false);
  const [wheelchairAccessible, setWheelchairAccessible] = useState(false);
  const [hostBio, setHostBio] = useState("");
  const [proofOfOwnership, setProofOfOwnership] = useState(null);

  const handleDocumentPick = () => {
    // Simulating document selection
    setProofOfOwnership({ name: "proof_of_ownership.pdf" });
    alert("Document selected: proof_of_ownership.pdf");
  };

  const handleSubmit = () => {
    // Here you would typically send the data to your backend
    console.log("Submitting driveway data:", {
      fullName,
      phoneNumber,
      address,
      city,
      state,
      zipCode,
      spotDimensions,
      hourlyRate,
      availableDates,
      insuranceInfo,
      evCharging,
      securityCam,
      wheelchairAccessible,
      hostBio,
      proofOfOwnership,
    });
    // After submission, navigate back to the profile or a confirmation page
    router.push("/");
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Text style={styles.title}>Host Your Driveway</Text>

        <View style={styles.inputContainer}>
          <FontAwesome
            name="user"
            size={24}
            color="#007AFF"
            style={styles.icon}
          />
          <TextInput
            style={styles.input}
            placeholder="Full Name"
            value={fullName}
            onChangeText={setFullName}
          />
        </View>

        <View style={styles.inputContainer}>
          <FontAwesome
            name="phone"
            size={24}
            color="#007AFF"
            style={styles.icon}
          />
          <TextInput
            style={styles.input}
            placeholder="Phone Number"
            value={phoneNumber}
            onChangeText={setPhoneNumber}
            keyboardType="phone-pad"
          />
        </View>

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
            name="arrows-alt"
            size={24}
            color="#007AFF"
            style={styles.icon}
          />
          <TextInput
            style={styles.input}
            placeholder="Spot Dimensions (e.g., 10ft x 20ft)"
            value={spotDimensions}
            onChangeText={setSpotDimensions}
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
            placeholder="Hourly Rate"
            value={hourlyRate}
            onChangeText={setHourlyRate}
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
            placeholder="Available Dates (e.g., Mon-Fri, 9AM-5PM)"
            value={availableDates}
            onChangeText={setAvailableDates}
          />
        </View>

        <View style={styles.inputContainer}>
          <FontAwesome
            name="shield"
            size={24}
            color="#007AFF"
            style={styles.icon}
          />
          <TextInput
            style={styles.input}
            placeholder="Insurance Information"
            value={insuranceInfo}
            onChangeText={setInsuranceInfo}
          />
        </View>

        <Text style={styles.sectionTitle}>Amenities</Text>

        <View style={styles.switchContainer}>
          <Text style={styles.switchLabel}>EV Charging</Text>
          <Switch value={evCharging} onValueChange={setEvCharging} />
        </View>

        <View style={styles.switchContainer}>
          <Text style={styles.switchLabel}>Security Camera</Text>
          <Switch value={securityCam} onValueChange={setSecurityCam} />
        </View>

        <View style={styles.switchContainer}>
          <Text style={styles.switchLabel}>Wheelchair Accessible</Text>
          <Switch
            value={wheelchairAccessible}
            onValueChange={setWheelchairAccessible}
          />
        </View>

        <View style={styles.inputContainer}>
          <FontAwesome
            name="file-text"
            size={24}
            color="#007AFF"
            style={styles.icon}
          />
          <TextInput
            style={[styles.input, styles.multilineInput]}
            placeholder="Host Bio / Description of Spot"
            value={hostBio}
            onChangeText={setHostBio}
            multiline
            numberOfLines={4}
          />
        </View>

        <Text style={styles.sectionTitle}>Background Check</Text>

        <TouchableOpacity
          style={styles.uploadButton}
          onPress={handleDocumentPick}
        >
          <FontAwesome
            name="upload"
            size={24}
            color="#fff"
            style={styles.uploadIcon}
          />
          <Text style={styles.uploadButtonText}>
            {proofOfOwnership ? "File Selected" : "Upload Proof of Ownership"}
          </Text>
        </TouchableOpacity>

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
  multilineInput: {
    height: 100,
    textAlignVertical: "top",
    paddingTop: 10,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 20,
    marginBottom: 10,
  },
  switchContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 15,
  },
  switchLabel: {
    fontSize: 16,
  },
  uploadButton: {
    backgroundColor: "#007AFF",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: 15,
    borderRadius: 8,
    marginBottom: 20,
  },
  uploadIcon: {
    marginRight: 10,
  },
  uploadButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
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
