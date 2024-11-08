import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Image,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { FontAwesome } from "@expo/vector-icons";

export default function CreateProfileScreen() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [zip, setZip] = useState("");
  const [driversLicense, setDriversLicense] = useState("");
  const [idImageUploaded, setIdImageUploaded] = useState(false);

  const handleImageUpload = () => {
    // Mock image upload
    setIdImageUploaded(true);
  };

  const handleSubmit = () => {
    // Here you would typically send the data to your backend
    console.log("Submitting profile data:", {
      username,
      firstName,
      lastName,
      address,
      city,
      state,
      zip,
      driversLicense,
      idImageUploaded,
    });
    // After submission, navigate to the home screen or next step in your app flow
    router.replace("/");
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.header}>
          <FontAwesome name="user-circle" size={80} color="#007AFF" />
          <Text style={styles.title}>Create Your Profile</Text>
          <Text style={styles.subtitle}>
            Please provide your information below
          </Text>
        </View>

        <View style={styles.form}>
          <View style={styles.inputContainer}>
            <FontAwesome
              name="user"
              size={20}
              color="#007AFF"
              style={styles.inputIcon}
            />
            <TextInput
              style={styles.input}
              placeholder="Username"
              value={username}
              onChangeText={setUsername}
            />
          </View>
          <View style={styles.inputContainer}>
            <FontAwesome
              name="user"
              size={20}
              color="#007AFF"
              style={styles.inputIcon}
            />
            <TextInput
              style={styles.input}
              placeholder="First Name"
              value={firstName}
              onChangeText={setFirstName}
            />
          </View>
          <View style={styles.inputContainer}>
            <FontAwesome
              name="user"
              size={20}
              color="#007AFF"
              style={styles.inputIcon}
            />
            <TextInput
              style={styles.input}
              placeholder="Last Name"
              value={lastName}
              onChangeText={setLastName}
            />
          </View>
          <View style={styles.inputContainer}>
            <FontAwesome
              name="home"
              size={20}
              color="#007AFF"
              style={styles.inputIcon}
            />
            <TextInput
              style={styles.input}
              placeholder="Address"
              value={address}
              onChangeText={setAddress}
            />
          </View>
          <View style={styles.inputContainer}>
            <FontAwesome
              name="building"
              size={20}
              color="#007AFF"
              style={styles.inputIcon}
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
              name="map"
              size={20}
              color="#007AFF"
              style={styles.inputIcon}
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
              name="map-marker"
              size={20}
              color="#007AFF"
              style={styles.inputIcon}
            />
            <TextInput
              style={styles.input}
              placeholder="ZIP Code"
              value={zip}
              onChangeText={setZip}
              keyboardType="numeric"
            />
          </View>
          <View style={styles.inputContainer}>
            <FontAwesome
              name="id-card"
              size={20}
              color="#007AFF"
              style={styles.inputIcon}
            />
            <TextInput
              style={styles.input}
              placeholder="Driver's License Number"
              value={driversLicense}
              onChangeText={setDriversLicense}
            />
          </View>
        </View>

        <TouchableOpacity
          style={styles.imageUploadButton}
          onPress={handleImageUpload}
        >
          <FontAwesome
            name={idImageUploaded ? "check-circle" : "camera"}
            size={24}
            color="#007AFF"
            style={styles.uploadIcon}
          />
          <Text style={styles.imageUploadButtonText}>
            {idImageUploaded
              ? "ID/Driver's License Uploaded"
              : "Upload ID/Driver's License Image"}
          </Text>
        </TouchableOpacity>
        {idImageUploaded && (
          <View style={styles.uploadedImagePlaceholder}>
            <FontAwesome name="id-card" size={40} color="#666" />
            <Text style={styles.uploadedImageText}>
              ID/Driver's License Image
            </Text>
          </View>
        )}

        <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
          <Text style={styles.submitButtonText}>Create Profile</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  scrollContent: {
    padding: 20,
  },
  header: {
    alignItems: "center",
    marginBottom: 30,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginTop: 15,
    marginBottom: 5,
    color: "#333",
  },
  subtitle: {
    fontSize: 16,
    color: "#666",
  },
  form: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    marginBottom: 20,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
    marginBottom: 15,
  },
  inputIcon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    fontSize: 16,
    paddingVertical: 10,
  },
  imageUploadButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 15,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  uploadIcon: {
    marginRight: 10,
  },
  imageUploadButtonText: {
    fontSize: 16,
    color: "#007AFF",
  },
  uploadedImagePlaceholder: {
    width: "100%",
    height: 150,
    backgroundColor: "#e0e0e0",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
    borderRadius: 10,
  },
  uploadedImageText: {
    fontSize: 16,
    color: "#666",
    marginTop: 10,
  },
  submitButton: {
    backgroundColor: "#007AFF",
    borderRadius: 10,
    padding: 15,
    alignItems: "center",
  },
  submitButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
});
