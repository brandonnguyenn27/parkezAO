import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  Modal,
  TextInput,
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
  const [selectedRenter, setSelectedRenter] = useState(null);
  const [ratingModalVisible, setRatingModalVisible] = useState(false);
  const [currentRating, setCurrentRating] = useState(0);
  const [comment, setComment] = useState("");

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

  // Mock data for past renters
  const [pastRenters, setPastRenters] = useState([
    {
      id: 1,
      name: "John Doe",
      date: "2023-05-15",
      rating: 4,
      comment: "Great guest!",
    },
    {
      id: 2,
      name: "Jane Smith",
      date: "2023-05-10",
      rating: 5,
      comment: "Left the spot clean",
    },
    {
      id: 3,
      name: "Bob Johnson",
      date: "2023-05-05",
      rating: 3,
      comment: "Arrived late",
    },
  ]);

  const renderStars = (rating, onRatingChange = null) => {
    return [...Array(5)].map((_, index) => (
      <TouchableOpacity
        key={index}
        onPress={() => onRatingChange && onRatingChange(index + 1)}
      >
        <FontAwesome
          name={index < rating ? "star" : "star-o"}
          size={onRatingChange ? 40 : 20}
          color="#FFD700"
          style={styles.star}
        />
      </TouchableOpacity>
    ));
  };

  const openRatingModal = (renter) => {
    setSelectedRenter(renter);
    setCurrentRating(renter.rating);
    setComment(renter.comment || "");
    setRatingModalVisible(true);
  };

  const handleRating = () => {
    // Here you would update the rating in your backend
    const updatedRenters = pastRenters.map((renter) =>
      renter.id === selectedRenter.id
        ? { ...renter, rating: currentRating, comment: comment }
        : renter
    );
    setPastRenters(updatedRenters);
    console.log(
      `Rating ${selectedRenter.name}: ${currentRating}, Comment: ${comment}`
    );
    setRatingModalVisible(false);
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
              color: (opacity = 1) => `rgba(255, 215, 0, ${opacity})`,
              style: {
                borderRadius: 16,
              },
            }}
            bezier
            style={styles.chart}
          />
        </View>

        <View style={styles.pastRentersContainer}>
          <Text style={styles.sectionTitle}>Past Renters</Text>
          {pastRenters.map((renter) => (
            <TouchableOpacity
              key={renter.id}
              style={styles.renterItem}
              onPress={() => openRatingModal(renter)}
            >
              <View>
                <Text style={styles.renterName}>{renter.name}</Text>
                <Text style={styles.renterDate}>{renter.date}</Text>
                <Text style={styles.renterComment} numberOfLines={1}>
                  {renter.comment}
                </Text>
              </View>
              <View style={styles.ratingContainer}>
                {renderStars(renter.rating)}
              </View>
            </TouchableOpacity>
          ))}
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

      <Modal
        animationType="slide"
        transparent={true}
        visible={ratingModalVisible}
        onRequestClose={() => setRatingModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Rate {selectedRenter?.name}</Text>
            <View style={styles.starContainer}>
              {renderStars(currentRating, setCurrentRating)}
            </View>
            <TextInput
              style={styles.commentInput}
              placeholder="Leave a comment..."
              value={comment}
              onChangeText={setComment}
              multiline
            />
            <TouchableOpacity
              style={styles.submitButton}
              onPress={handleRating}
            >
              <Text style={styles.submitButtonText}>Submit Rating</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setRatingModalVisible(false)}
            >
              <Text style={styles.closeButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
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
    color: "#FFD700",
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
  pastRentersContainer: {
    marginBottom: 20,
  },
  renterItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#e0e0e0",
  },
  renterName: {
    fontSize: 16,
    fontWeight: "bold",
  },
  renterDate: {
    fontSize: 14,
    color: "#666",
  },
  renterComment: {
    fontSize: 14,
    color: "#666",
    fontStyle: "italic",
  },
  ratingContainer: {
    flexDirection: "row",
  },
  star: {
    marginLeft: 2,
  },
  adminActions: {
    marginBottom: 20,
  },
  actionButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFD700",
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
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    backgroundColor: "#ffffff",
    padding: 20,
    borderRadius: 10,
    alignItems: "center",
    width: "80%",
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
  },
  starContainer: {
    flexDirection: "row",
    marginBottom: 20,
  },
  commentInput: {
    width: "100%",
    height: 100,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    marginBottom: 20,
    textAlignVertical: "top",
  },
  submitButton: {
    backgroundColor: "#FFD700",
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
  submitButtonText: {
    color: "#ffffff",
    fontWeight: "bold",
  },
  closeButton: {
    backgroundColor: "#ccc",
    padding: 10,
    borderRadius: 5,
  },
  closeButtonText: {
    color: "#ffffff",
    fontWeight: "bold",
  },
});
