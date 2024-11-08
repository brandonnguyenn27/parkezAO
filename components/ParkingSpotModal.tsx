import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Dimensions,
  Modal,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import { useRouter } from "expo-router";

const { width, height } = Dimensions.get("window");

interface ParkingSpot {
  id: number;
  name: string;
  address: string;
  price: number;
  rating: number;
  reviews: number;
}

interface ParkingSpotModalProps {
  spot: ParkingSpot | null;
  visible: boolean;
  onClose: () => void;
}

export default function ParkingSpotModal({
  spot,
  visible,
  onClose,
}: ParkingSpotModalProps) {
  const router = useRouter();

  if (!spot) return null;

  const renderStars = (rating: number) => {
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
    <Modal
      animationType="fade"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <Icon name="close" size={24} color="#007AFF" />
          </TouchableOpacity>
          <Image
            source={{ uri: "https://via.placeholder.com/300x200" }}
            style={styles.modalImage}
          />
          <View style={styles.modalTextContainer}>
            <Text style={styles.modalTitle}>{spot.name}</Text>
            <Text style={styles.modalAddress}>{spot.address}</Text>
            <Text style={styles.modalPrice}>${spot.price}/hr</Text>
            <View style={styles.modalRatingContainer}>
              {renderStars(spot.rating)}
              <Text style={styles.modalRating}>
                {spot.rating.toFixed(1)} ({spot.reviews} reviews)
              </Text>
            </View>
          </View>
          <View style={styles.modalButtonsContainer}>
            <TouchableOpacity
              style={[styles.button, styles.moreDetailsButton]}
              onPress={() => {
                onClose();
                router.push({
                  pathname: "/spot-details/[id]",
                  params: { id: spot.id },
                });
              }}
            >
              <Text style={styles.moreDetailsButtonText}>More Details</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    backgroundColor: "#fff",
    borderRadius: 20,
    padding: 20,
    width: width * 0.9,
    maxHeight: height * 0.8,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  closeButton: {
    position: "absolute",
    top: 10,
    right: 10,
    zIndex: 1,
  },
  modalImage: {
    width: "100%",
    height: 200,
    borderRadius: 10,
    marginBottom: 15,
  },
  modalTextContainer: {
    marginBottom: 15,
  },
  modalTitle: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 5,
  },
  modalAddress: {
    fontSize: 16,
    color: "#666",
    marginBottom: 10,
  },
  modalPrice: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#007AFF",
    marginBottom: 5,
  },
  modalRatingContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  modalRating: {
    fontSize: 16,
    color: "#666",
    marginLeft: 5,
  },
  starsContainer: {
    flexDirection: "row",
  },
  modalButtonsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 15,
  },
  button: {
    borderRadius: 10,
    paddingHorizontal: 20,
    paddingVertical: 10,
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  moreDetailsButton: {
    borderColor: "#007AFF",
    borderWidth: 1,
    marginRight: 10,
  },
  moreDetailsButtonText: {
    color: "#007AFF",
    fontSize: 16,
    fontWeight: "600",
  },
  bookButton: {
    backgroundColor: "#007AFF",
    marginLeft: 10,
  },
  bookButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
});
