import React from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";

// Mock data for bookings (replace this with actual data from your backend)
const mockBookings = [
  {
    id: "1",
    spotName: "Downtown Parking A",
    date: "2023-05-15",
    time: "14:00-16:00",
    price: 4,
  },
  {
    id: "2",
    spotName: "City Center Garage",
    date: "2023-05-18",
    time: "09:00-11:00",
    price: 6,
  },
  {
    id: "3",
    spotName: "Harbor Parking",
    date: "2023-05-20",
    time: "12:00-14:00",
    price: 4,
  },
];

export default function BookingsScreen() {
  const router = useRouter();

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
      <View>
        <Text style={styles.spotName}>{item.spotName}</Text>
        <Text style={styles.bookingDetails}>
          {item.date} | {item.time}
        </Text>
      </View>
      <Text style={styles.price}>${item.price}</Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>My Bookings</Text>
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
  listContainer: {
    padding: 20,
  },
  bookingItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#f0f0f0",
    borderRadius: 10,
    padding: 15,
    marginBottom: 10,
  },
  spotName: {
    fontSize: 18,
    fontWeight: "bold",
  },
  bookingDetails: {
    fontSize: 14,
    color: "#666",
    marginTop: 5,
  },
  price: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#007AFF",
  },
});
