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
import { parkingSpots, ParkingSpot } from "@/app/data/parking";

const { width, height } = Dimensions.get("window");

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
          <Icon key={`full_${i}`} name="star" size={20} color="#ffce00" />
        ))}
        {halfStar && <Icon name="star-half" size={20} color="#ffce00" />}
        {[...Array(emptyStars)].map((_, i) => (
          <Icon
            key={`empty_${i}`}
            name="star-border"
            size={20}
            color="#ffce00"
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
            <Icon name="close" size={24} color="#ffce00" />
          </TouchableOpacity>
          <Image source={{ uri: spot.images[0] }} style={styles.modalImage} />
          <View style={styles.modalTextContainer}>
            <Text style={styles.modalTitle}>{spot.name}</Text>
            <Text style={styles.modalDistance}>
              {spot.distance.toFixed(1)} mi away
            </Text>
            <Text style={styles.modalPrice}>${spot.price}/hr</Text>
            <View style={styles.modalRatingContainer}>
              {renderStars(spot.rating)}
              <Text style={styles.modalRating}>
                {spot.rating.toFixed(1)} ({spot.reviews} reviews)
              </Text>
            </View>
            <Text style={styles.modalAvailability}>
              Available: {spot.startTime} - {spot.endTime}
            </Text>
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
    overflow: "hidden",
  },
  closeButton: {
    position: "absolute",
    top: 10,
    right: 10,
    zIndex: 1,
    backgroundColor: "rgba(255, 255, 255, 0.8)",
    borderRadius: 20,
    padding: 5,
  },
  modalImage: {
    width: "100%",
    height: 200,
  },
  modalTextContainer: {
    padding: 15,
  },
  modalTitle: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 5,
  },
  modalDistance: {
    fontSize: 16,
    color: "#666",
    marginBottom: 5,
  },
  modalPrice: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#ffce00",
    marginBottom: 5,
  },
  modalRatingContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 5,
  },
  modalRating: {
    fontSize: 16,
    color: "#666",
    marginLeft: 5,
  },
  modalAvailability: {
    fontSize: 14,
    color: "#666",
  },
  starsContainer: {
    flexDirection: "row",
  },
  modalButtonsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 15,
    borderTopWidth: 1,
    borderTopColor: "#e0e0e0",
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
    backgroundColor: "#ffce00",
  },
  moreDetailsButtonText: {
    color: "#000",
    fontSize: 16,
    fontWeight: "600",
  },
});
