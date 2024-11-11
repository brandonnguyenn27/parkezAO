import React from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { FontAwesome } from "@expo/vector-icons";
import { hostParkingSpots, HostParking } from "./data/hostparking";

export default function HostListingsScreen() {
  const router = useRouter();

  const renderItem = ({ item }: { item: HostParking }) => (
    <TouchableOpacity
      style={styles.listingItem}
      onPress={() => router.push(`/hostlistingdetails/${item.id}`)}
    >
      <Image source={{ uri: item.imageUrl }} style={styles.listingImage} />
      <View style={styles.listingDetails}>
        <Text style={styles.listingAddress}>{item.address}</Text>
        <Text
          style={styles.listingCity}
        >{`${item.city}, ${item.state} ${item.zipCode}`}</Text>
        <Text style={styles.listingRate}>${item.hourlyRate}/hr</Text>
        <Text style={styles.listingAvailability}>{item.availableDates}</Text>
        <Text style={styles.listingDescription} numberOfLines={2}>
          {item.description}
        </Text>
        <View style={styles.amenitiesContainer}>
          {item.amenities.map((amenity, index) => (
            <View key={index} style={styles.amenityTag}>
              <Text style={styles.amenityText}>{amenity}</Text>
            </View>
          ))}
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => router.back()}
          style={styles.backButton}
        >
          <FontAwesome name="arrow-left" size={24} color="#ffce00" />
        </TouchableOpacity>
        <Text style={styles.title}>Your Listings</Text>
      </View>
      <FlatList
        data={hostParkingSpots}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.listContainer}
      />
      <TouchableOpacity
        style={styles.addButton}
        onPress={() => router.push("/host")}
      >
        <FontAwesome name="plus" size={24} color="#fff" />
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#e0e0e0",
  },
  backButton: {
    color: "ffce00",
    marginRight: 15,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  listContainer: {
    padding: 15,
  },
  listingItem: {
    flexDirection: "row",
    marginBottom: 20,
    borderWidth: 1,
    borderColor: "#e0e0e0",
    borderRadius: 8,
    overflow: "hidden",
  },
  listingImage: {
    width: 120,
    height: 120,
  },
  listingDetails: {
    flex: 1,
    padding: 10,
  },
  listingAddress: {
    fontSize: 16,
    fontWeight: "bold",
  },
  listingCity: {
    fontSize: 14,
    color: "#666",
  },
  listingRate: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#ffce00",
    marginTop: 5,
  },
  listingAvailability: {
    fontSize: 14,
    color: "#666",
    marginTop: 5,
  },
  listingDescription: {
    fontSize: 14,
    color: "#333",
    marginTop: 5,
  },
  amenitiesContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: 5,
  },
  amenityTag: {
    backgroundColor: "#f0f0f0",
    borderRadius: 4,
    paddingHorizontal: 6,
    paddingVertical: 2,
    marginRight: 5,
    marginBottom: 5,
  },
  amenityText: {
    fontSize: 12,
    color: "#666",
  },
  addButton: {
    position: "absolute",
    right: 20,
    bottom: 20,
    backgroundColor: "#4CAF50",
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
});
