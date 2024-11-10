import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useLocalSearchParams, useRouter } from "expo-router";
import { FontAwesome } from "@expo/vector-icons";
import { LineChart } from "react-native-chart-kit";
import { hostParkingSpots } from "../data/hostparking";

export default function HostListingDetailsScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams();
  const listing = hostParkingSpots.find((spot) => spot.id === Number(id));

  if (!listing) {
    return (
      <SafeAreaView style={styles.container}>
        <Text>Listing not found</Text>
      </SafeAreaView>
    );
  }

  // Mock data for analytics
  const bookingsData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    datasets: [
      {
        data: [20, 45, 28, 80, 99, 43],
      },
    ],
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.header}>
          <TouchableOpacity
            onPress={() => router.back()}
            style={styles.backButton}
          >
            <FontAwesome name="arrow-left" size={24} color="#007AFF" />
          </TouchableOpacity>
          <Text style={styles.title}>Listing Details</Text>
        </View>

        <Image source={{ uri: listing.imageUrl }} style={styles.image} />

        <View style={styles.detailsContainer}>
          <Text style={styles.address}>{listing.address}</Text>
          <Text
            style={styles.cityState}
          >{`${listing.city}, ${listing.state} ${listing.zipCode}`}</Text>
          <Text style={styles.price}>${listing.hourlyRate}/hr</Text>
          <Text style={styles.availability}>{listing.availableDates}</Text>
          <Text style={styles.description}>{listing.description}</Text>

          <View style={styles.amenitiesContainer}>
            <Text style={styles.sectionTitle}>Amenities:</Text>
            {listing.amenities.map((amenity, index) => (
              <View key={index} style={styles.amenityItem}>
                <FontAwesome name="check-circle" size={20} color="#4CAF50" />
                <Text style={styles.amenityText}>{amenity}</Text>
              </View>
            ))}
          </View>
        </View>

        <View style={styles.analyticsContainer}>
          <Text style={styles.sectionTitle}>Booking Analytics</Text>
          <LineChart
            data={bookingsData}
            width={300}
            height={200}
            chartConfig={{
              backgroundColor: "#ffffff",
              backgroundGradientFrom: "#ffffff",
              backgroundGradientTo: "#ffffff",
              decimalPlaces: 0,
              color: (opacity = 1) => `rgba(0, 122, 255, ${opacity})`,
              style: {
                borderRadius: 16,
              },
            }}
            bezier
            style={styles.chart}
          />
        </View>

        <View style={styles.adminActions}>
          <Text style={styles.sectionTitle}>Admin Actions</Text>
          <TouchableOpacity style={styles.actionButton}>
            <FontAwesome name="edit" size={20} color="#ffffff" />
            <Text style={styles.actionButtonText}>Edit Listing</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.actionButton, styles.deleteButton]}>
            <FontAwesome name="trash" size={20} color="#ffffff" />
            <Text style={styles.actionButtonText}>Delete Listing</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
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
    marginRight: 15,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
  },
  image: {
    width: "100%",
    height: 200,
    borderRadius: 8,
    marginBottom: 20,
  },
  detailsContainer: {
    marginBottom: 20,
  },
  address: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
  },
  cityState: {
    fontSize: 16,
    color: "#666",
    marginBottom: 5,
  },
  price: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#007AFF",
    marginBottom: 5,
  },
  availability: {
    fontSize: 16,
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    marginBottom: 15,
  },
  amenitiesContainer: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  amenityItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 5,
  },
  amenityText: {
    fontSize: 16,
    marginLeft: 10,
  },
  analyticsContainer: {
    marginBottom: 20,
  },
  chart: {
    marginVertical: 8,
    borderRadius: 16,
  },
  adminActions: {
    marginBottom: 20,
  },
  actionButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#007AFF",
    padding: 10,
    borderRadius: 8,
    marginBottom: 10,
  },
  deleteButton: {
    backgroundColor: "#FF3B30",
  },
  actionButtonText: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "bold",
    marginLeft: 10,
  },
});
