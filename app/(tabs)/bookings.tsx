import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { FontAwesome } from "@expo/vector-icons";

// Mock data for bookings (replace this with actual data from your backend)
const mockBookings = [
  {
    id: "1",
    spotName: "Residential Parking",
    address: "123 S 4th St, San Jose, CA",
    date: "2023-05-15",
    startTime: "14:00",
    endTime: "16:00",
    price: 4,
  },
  {
    id: "2",
    spotName: "Street Parking",
    address: "456 E San Fernando St, San Jose, CA",
    date: "2023-05-18",
    startTime: "09:00",
    endTime: "11:00",
    price: 6,
  },
  {
    id: "3",
    spotName: "Residential Parking",
    address: "789 S 10th St, San Jose, CA",
    date: "2023-05-20",
    startTime: "12:00",
    endTime: "14:00",
    price: 4,
  },
];

export default function BookingsScreen() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("upcoming");

  const renderBookingItem = ({ item }) => (
    <TouchableOpacity
      style={styles.bookingItem}
      onPress={() => {
        // Navigate to booking details or the spot on the map
        router.push({
          pathname: "/parking",
          params: { spotId: item.id },
        });
      }}
    >
      <Image
        source={{ uri: "https://via.placeholder.com/100" }}
        style={styles.parkingImage}
      />
      <View style={styles.bookingDetails}>
        <Text style={styles.spotName}>{item.spotName}</Text>
        <Text style={styles.address}>{item.address}</Text>
        <Text style={styles.dateTime}>
          {item.date} | {item.startTime} - {item.endTime}
        </Text>
        <Text style={styles.price}>${item.price}</Text>
      </View>
      <FontAwesome name="chevron-right" size={20} color="#999" />
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>My Bookings</Text>
      <View style={styles.tabContainer}>
        <TouchableOpacity
          style={[styles.tab, activeTab === "upcoming" && styles.activeTab]}
          onPress={() => setActiveTab("upcoming")}
        >
          <Text
            style={[
              styles.tabText,
              activeTab === "upcoming" && styles.activeTabText,
            ]}
          >
            Upcoming
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, activeTab === "past" && styles.activeTab]}
          onPress={() => setActiveTab("past")}
        >
          <Text
            style={[
              styles.tabText,
              activeTab === "past" && styles.activeTabText,
            ]}
          >
            Past
          </Text>
        </TouchableOpacity>
      </View>
      <FlatList
        data={mockBookings}
        renderItem={renderBookingItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContainer}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    padding: 20,
  },
  tabContainer: {
    flexDirection: "row",
    paddingHorizontal: 20,
    marginBottom: 10,
  },
  tab: {
    flex: 1,
    paddingVertical: 10,
    alignItems: "center",
    borderBottomWidth: 2,
    borderBottomColor: "#f0f0f0",
  },
  activeTab: {
    borderBottomColor: "#007AFF",
  },
  tabText: {
    fontSize: 16,
    color: "#999",
  },
  activeTabText: {
    color: "#007AFF",
    fontWeight: "bold",
  },
  listContainer: {
    padding: 20,
  },
  bookingItem: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f9f9f9",
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
  },
  parkingImage: {
    width: 60,
    height: 60,
    borderRadius: 5,
    marginRight: 15,
  },
  bookingDetails: {
    flex: 1,
  },
  spotName: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
  },
  address: {
    fontSize: 14,
    color: "#666",
    marginBottom: 5,
  },
  dateTime: {
    fontSize: 14,
    color: "#666",
    marginBottom: 5,
  },
  price: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#007AFF",
  },
});
