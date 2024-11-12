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
  Image,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { FontAwesome } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";

export default function HostScreen() {
  const router = useRouter();
  const [fullName, setFullName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [zipCode, setZipCode] = useState("");
  const [spotWidth, setSpotWidth] = useState("");
  const [spotLength, setSpotLength] = useState("");
  const [hourlyRate, setHourlyRate] = useState("");
  const [availableDates, setAvailableDates] = useState("");
  const [insuranceInfo, setInsuranceInfo] = useState("");
  const [evCharging, setEvCharging] = useState(false);
  const [securityCam, setSecurityCam] = useState(false);
  const [wheelchairAccessible, setWheelchairAccessible] = useState(false);
  const [hostBio, setHostBio] = useState("");
  const [proofOfOwnership, setProofOfOwnership] = useState(null);
  const [instantBookEnabled, setInstantBookEnabled] = useState(false);
  const [minUserRating, setMinUserRating] = useState("");
  const [photos, setPhotos] = useState([]);
  const [businessLicense, setBusinessLicense] = useState(null);

  const handleAddPhoto = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setPhotos([...photos, result.assets[0].uri]);
    }
  };

  const handleDocumentPick = () => {
    // Simulating document selection
    setProofOfOwnership({ name: "proof_of_ownership.pdf" });
    alert("Document selected: proof_of_ownership.pdf");
  };

  const handleBusinessLicensePick = () => {
    // Simulating document selection
    setBusinessLicense({ name: "business_license.pdf" });
    alert("Document selected: business_license.pdf");
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
      spotDimensions: `${spotWidth}ft x ${spotLength}ft`,
      hourlyRate,
      availableDates,
      insuranceInfo,
      evCharging,
      securityCam,
      wheelchairAccessible,
      hostBio,
      proofOfOwnership,
      instantBookEnabled,
      minUserRating: instantBookEnabled ? minUserRating : null,
      photos,
      businessLicense,
    });
    // After submission, navigate back to the profile or a confirmation page
    router.push("/");
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.header}>
          <TouchableOpacity
            onPress={() => router.back()}
            style={styles.backButton}
          >
            <FontAwesome name="arrow-left" size={24} color="#FFD700" />
          </TouchableOpacity>
          <Text style={styles.title}>Host Your Driveway</Text>
        </View>

        <View style={styles.inputContainer}>
          <FontAwesome
            name="user"
            size={24}
            color="#FFD700"
            style={styles.icon}
          />
          <TextInput
            style={styles.input}
            placeholder="Full Name"
            placeholderTextColor="#999"
            value={fullName}
            onChangeText={setFullName}
          />
        </View>

        <View style={styles.inputContainer}>
          <FontAwesome
            name="phone"
            size={24}
            color="#FFD700"
            style={styles.icon}
          />
          <TextInput
            style={styles.input}
            placeholder="Phone Number"
            placeholderTextColor="#999"
            value={phoneNumber}
            onChangeText={setPhoneNumber}
            keyboardType="phone-pad"
          />
        </View>

        <View style={styles.inputContainer}>
          <FontAwesome
            name="map-marker"
            size={24}
            color="#FFD700"
            style={styles.icon}
          />
          <TextInput
            style={styles.input}
            placeholder="Street Address"
            placeholderTextColor="#999"
            value={address}
            onChangeText={setAddress}
          />
        </View>

        <View style={styles.inputContainer}>
          <FontAwesome
            name="building"
            size={24}
            color="#FFD700"
            style={styles.icon}
          />
          <TextInput
            style={styles.input}
            placeholder="City"
            placeholderTextColor="#999"
            value={city}
            onChangeText={setCity}
          />
        </View>

        <View style={styles.inputContainer}>
          <FontAwesome
            name="flag"
            size={24}
            color="#FFD700"
            style={styles.icon}
          />
          <TextInput
            style={styles.input}
            placeholder="State"
            placeholderTextColor="#999"
            value={state}
            onChangeText={setState}
          />
        </View>

        <View style={styles.inputContainer}>
          <FontAwesome
            name="map"
            size={24}
            color="#FFD700"
            style={styles.icon}
          />
          <TextInput
            style={styles.input}
            placeholder="Zip Code"
            placeholderTextColor="#999"
            value={zipCode}
            onChangeText={setZipCode}
            keyboardType="numeric"
          />
        </View>

        <View style={styles.inputContainer}>
          <FontAwesome
            name="arrows-alt"
            size={24}
            color="#FFD700"
            style={styles.icon}
          />
          <TextInput
            style={[styles.input, styles.dimensionInput]}
            placeholder="Width (ft)"
            placeholderTextColor="#999"
            value={spotWidth}
            onChangeText={setSpotWidth}
            keyboardType="numeric"
          />
          <Text style={styles.dimensionSeparator}>x</Text>
          <TextInput
            style={[styles.input, styles.dimensionInput]}
            placeholder="Length (ft)"
            placeholderTextColor="#999"
            value={spotLength}
            onChangeText={setSpotLength}
            keyboardType="numeric"
          />
        </View>

        <View style={styles.inputContainer}>
          <FontAwesome
            name="dollar"
            size={24}
            color="#FFD700"
            style={styles.icon}
          />
          <TextInput
            style={styles.input}
            placeholder="Hourly Rate"
            placeholderTextColor="#999"
            value={hourlyRate}
            onChangeText={setHourlyRate}
            keyboardType="numeric"
          />
        </View>

        <View style={styles.inputContainer}>
          <FontAwesome
            name="calendar"
            size={24}
            color="#FFD700"
            style={styles.icon}
          />
          <TextInput
            style={styles.input}
            placeholder="Available Dates (e.g., Mon-Fri, 9AM-5PM)"
            placeholderTextColor="#999"
            value={availableDates}
            onChangeText={setAvailableDates}
          />
        </View>

        <View style={styles.inputContainer}>
          <FontAwesome
            name="shield"
            size={24}
            color="#FFD700"
            style={styles.icon}
          />
          <TextInput
            style={styles.input}
            placeholder="Insurance Information"
            placeholderTextColor="#999"
            value={insuranceInfo}
            onChangeText={setInsuranceInfo}
          />
        </View>

        <Text style={styles.sectionTitle}>Amenities</Text>

        <View style={styles.switchContainer}>
          <Text style={styles.switchLabel}>Covered Parking</Text>
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
            color="#FFD700"
            style={styles.icon}
          />
          <TextInput
            style={[styles.input, styles.multilineInput]}
            placeholder="Host Bio / Description of Spot"
            placeholderTextColor="#999"
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

        <Text style={styles.sectionTitle}>Business License</Text>
        <TouchableOpacity
          style={styles.uploadButton}
          onPress={handleBusinessLicensePick}
        >
          <FontAwesome
            name="file-text"
            size={24}
            color="#fff"
            style={styles.uploadIcon}
          />
          <Text style={styles.uploadButtonText}>
            {businessLicense ? "File Selected" : "Upload Business License"}
          </Text>
        </TouchableOpacity>

        <Text style={styles.sectionTitle}>Booking Options</Text>

        <View style={styles.switchContainer}>
          <Text style={styles.switchLabel}>Enable Instant Book</Text>
          <Switch
            value={instantBookEnabled}
            onValueChange={setInstantBookEnabled}
          />
        </View>

        {instantBookEnabled && (
          <View style={styles.inputContainer}>
            <FontAwesome
              name="star"
              size={24}
              color="#ffce00"
              style={styles.icon}
            />
            <TextInput
              style={styles.input}
              placeholder="Minimum User Rating (1-5)"
              placeholderTextColor="#999"
              value={minUserRating}
              onChangeText={setMinUserRating}
              keyboardType="numeric"
            />
          </View>
        )}

        <Text style={styles.sectionTitle}>Photos</Text>
        <TouchableOpacity style={styles.uploadButton} onPress={handleAddPhoto}>
          <FontAwesome
            name="camera"
            size={24}
            color="#fff"
            style={styles.uploadIcon}
          />
          <Text style={styles.uploadButtonText}>Add Photo</Text>
        </TouchableOpacity>
        {photos.length > 0 && (
          <View style={styles.photoContainer}>
            {photos.map((photo, index) => (
              <Image key={index} source={{ uri: photo }} style={styles.photo} />
            ))}
          </View>
        )}

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
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  backButton: {
    padding: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    flex: 1,
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
  dimensionInput: {
    flex: 1,
    textAlign: "center",
  },
  dimensionSeparator: {
    fontSize: 18,
    marginHorizontal: 5,
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
    backgroundColor: "#FFD700",
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
    backgroundColor: "#FFD700",
    borderRadius: 8,
    paddingVertical: 15,
    marginTop: 20,
    alignItems: "center",
  },
  submitButtonText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#000",
  },
  photoContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: 10,
  },
  photo: {
    width: 100,
    height: 100,
    margin: 5,
    borderRadius: 5,
  },
});
