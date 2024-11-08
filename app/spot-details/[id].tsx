import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useLocalSearchParams, useRouter } from "expo-router";
import Icon from "react-native-vector-icons/MaterialIcons";
import { Button } from "@rneui/themed";

// Mock data for a specific parking spot
const MOCK_SPOT_DETAILS = {
  id: "1",
  name: "Residential Parking",
  address: "123 S 4th St, San Jose, CA",
  price: 2,
  rating: 4.8,
  reviews: 25,
  description:
    "Convenient residential parking spot in a quiet neighborhood. Easy access to public transportation and local amenities.",
  amenities: ["24/7 Access", "Well-lit", "Security Camera", "EV Charging"],
  images: [
    "https://via.placeholder.com/400x300?text=Parking+Spot+1",
    "https://via.placeholder.com/400x300?text=Parking+Spot+2",
    "https://via.placeholder.com/400x300?text=Parking+Spot+3",
  ],
  reviewsList: [
    {
      id: "1",
      user: "John D.",
      rating: 5,
      comment: "Great spot! Easy to find and very convenient.",
    },
    {
      id: "2",
      user: "Sarah M.",
      rating: 4,
      comment: "Good location, but a bit tight for larger vehicles.",
    },
    {
      id: "3",
      user: "Mike R.",
      rating: 5,
      comment: "Excellent spot, will definitely use again!",
    },
  ],
};

export default function SpotDetailsScreen() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const spot = MOCK_SPOT_DETAILS; // In a real app, you'd fetch the spot details based on the ID

  const renderStars = (rating) => {
    const fullStars = Math.floor(rating);
    const halfStar = rating % 1 >= 0.5;
    const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);

    return (
      <View style={styles.starsContainer}>
        {[...Array(fullStars)].map((_, i) => (
          <Icon key={`full_${i}`} name="star" size={20} color="#FFD700" />
        ))}
        {halfStar && <Icon name="star-half" size={20} color="#FFD700" />}
        {[...Array(emptyStars)].map((_, i) => (
          <Icon
            key={`empty_${i}`}
            name="star-border"
            size={20}
            color="#FFD700"
          />
        ))}
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.header}>
          <TouchableOpacity
            onPress={() => router.back()}
            style={styles.backButton}
          >
            <Icon name="arrow-back" size={24} color="#007AFF" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Spot Details</Text>
        </View>

        <ScrollView horizontal pagingEnabled style={styles.imageContainer}>
          {spot.images.map((image, index) => (
            <Image key={index} source={{ uri: image }} style={styles.image} />
          ))}
        </ScrollView>

        <View style={styles.content}>
          <Text style={styles.title}>{spot.name}</Text>
          <Text style={styles.address}>{spot.address}</Text>
          <View style={styles.ratingContainer}>
            {renderStars(spot.rating)}
            <Text style={styles.ratingText}>
              {spot.rating.toFixed(1)} ({spot.reviews} reviews)
            </Text>
          </View>
          <Text style={styles.price}>${spot.price}/hr</Text>

          <Text style={styles.sectionTitle}>Description</Text>
          <Text style={styles.description}>{spot.description}</Text>

          <Text style={styles.sectionTitle}>Amenities</Text>
          <View style={styles.amenitiesContainer}>
            {spot.amenities.map((amenity, index) => (
              <View key={index} style={styles.amenityItem}>
                <Icon name="check-circle" size={20} color="#4CAF50" />
                <Text style={styles.amenityText}>{amenity}</Text>
              </View>
            ))}
          </View>

          <Text style={styles.sectionTitle}>Reviews</Text>
          {spot.reviewsList.map((review) => (
            <View key={review.id} style={styles.reviewItem}>
              <View style={styles.reviewHeader}>
                <Text style={styles.reviewUser}>{review.user}</Text>
                {renderStars(review.rating)}
              </View>
              <Text style={styles.reviewComment}>{review.comment}</Text>
            </View>
          ))}

          <Button
            title="Book Now"
            buttonStyle={styles.bookButton}
            onPress={() => {
              router.push({
                pathname: "/checkout/[id]",
                params: { id: spot.id },
              });
            }}
          />
        </View>
      </ScrollView>
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
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#e0e0e0",
  },
  backButton: {
    padding: 5,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginLeft: 10,
  },
  imageContainer: {
    height: 300,
  },
  image: {
    width: 400,
    height: 300,
    resizeMode: "cover",
  },
  content: {
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 5,
  },
  address: {
    fontSize: 16,
    color: "#666",
    marginBottom: 10,
  },
  ratingContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  starsContainer: {
    flexDirection: "row",
    marginRight: 5,
  },
  ratingText: {
    fontSize: 14,
    color: "#666",
  },
  price: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#007AFF",
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 20,
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    color: "#333",
    lineHeight: 24,
  },
  amenitiesContainer: {
    marginBottom: 20,
  },
  amenityItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 5,
  },
  amenityText: {
    fontSize: 16,
    color: "#333",
    marginLeft: 10,
  },
  reviewItem: {
    backgroundColor: "#f9f9f9",
    borderRadius: 10,
    padding: 15,
    marginBottom: 10,
  },
  reviewHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 5,
  },
  reviewUser: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },
  reviewComment: {
    fontSize: 14,
    color: "#666",
  },
  bookButton: {
    backgroundColor: "#007AFF",
    borderRadius: 10,
    paddingVertical: 15,
    marginTop: 20,
  },
});
