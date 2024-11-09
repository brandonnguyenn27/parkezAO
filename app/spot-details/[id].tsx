import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  Modal,
  TextInput,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useLocalSearchParams, useRouter } from "expo-router";
import Icon from "react-native-vector-icons/MaterialIcons";
import { Button, CheckBox } from "@rneui/themed";
import { parkingSpots } from "../data/parking";

export default function SpotDetailsScreen() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const spot = parkingSpots.find((s) => s.id === Number(id));
  const [reportModalVisible, setReportModalVisible] = useState(false);
  const [reportReasons, setReportReasons] = useState({
    inaccurateInfo: false,
    unavailable: false,
    inappropriate: false,
    other: false,
  });
  const [reportComment, setReportComment] = useState("");

  if (!spot) {
    return (
      <SafeAreaView style={styles.container}>
        <Text>Parking spot not found</Text>
      </SafeAreaView>
    );
  }

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

  const handleReportSubmit = () => {
    console.log("Report submitted:", { reportReasons, reportComment });
    setReportModalVisible(false);
    setReportReasons({
      inaccurateInfo: false,
      unavailable: false,
      inappropriate: false,
      other: false,
    });
    setReportComment("");
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
          <TouchableOpacity
            onPress={() => setReportModalVisible(true)}
            style={styles.reportButton}
          >
            <Icon name="flag" size={24} color="#FF0000" />
          </TouchableOpacity>
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
                params: { id: spot.id.toString() },
              });
            }}
          />
        </View>
      </ScrollView>

      <Modal
        animationType="fade"
        transparent={true}
        visible={reportModalVisible}
        onRequestClose={() => setReportModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setReportModalVisible(false)}
            >
              <Icon name="close" size={24} color="#000" />
            </TouchableOpacity>
            <Text style={styles.modalTitle}>Report this listing</Text>
            <View style={styles.modalScroll}>
              <CheckBox
                title="Inaccurate information"
                checked={reportReasons.inaccurateInfo}
                onPress={() =>
                  setReportReasons((prev) => ({
                    ...prev,
                    inaccurateInfo: !prev.inaccurateInfo,
                  }))
                }
                containerStyle={styles.checkboxContainer}
                textStyle={styles.checkboxText}
                checkedColor="#007AFF"
                uncheckedColor="#D1D1D1"
                checkedIcon="check-square"
                uncheckedIcon="square-o"
              />
              <CheckBox
                title="Spot unavailable"
                checked={reportReasons.unavailable}
                onPress={() =>
                  setReportReasons((prev) => ({
                    ...prev,
                    unavailable: !prev.unavailable,
                  }))
                }
                containerStyle={styles.checkboxContainer}
                textStyle={styles.checkboxText}
                checkedColor="#007AFF"
                uncheckedColor="#D1D1D1"
                checkedIcon="check-square"
                uncheckedIcon="square-o"
              />
              <CheckBox
                title="Inappropriate content"
                checked={reportReasons.inappropriate}
                onPress={() =>
                  setReportReasons((prev) => ({
                    ...prev,
                    inappropriate: !prev.inappropriate,
                  }))
                }
                containerStyle={styles.checkboxContainer}
                textStyle={styles.checkboxText}
                checkedColor="#007AFF"
                uncheckedColor="#D1D1D1"
                checkedIcon="check-square"
                uncheckedIcon="square-o"
              />
              <CheckBox
                title="Other"
                checked={reportReasons.other}
                onPress={() =>
                  setReportReasons((prev) => ({ ...prev, other: !prev.other }))
                }
                containerStyle={styles.checkboxContainer}
                textStyle={styles.checkboxText}
                checkedColor="#007AFF"
                uncheckedColor="#D1D1D1"
                checkedIcon="check-square"
                uncheckedIcon="square-o"
              />
              <TextInput
                style={styles.reportComment}
                placeholder="Additional comments"
                placeholderTextColor="#A1A1A1"
                multiline
                numberOfLines={4}
                value={reportComment}
                onChangeText={setReportComment}
              />
            </View>
            <View style={styles.modalButtons}>
              <Button
                title="Cancel"
                type="outline"
                onPress={() => setReportModalVisible(false)}
                buttonStyle={styles.cancelButton}
                titleStyle={styles.cancelButtonText}
                containerStyle={styles.buttonContainer}
              />
              <Button
                title="Submit Report"
                onPress={handleReportSubmit}
                buttonStyle={styles.submitButton}
                titleStyle={styles.submitButtonText}
                containerStyle={styles.buttonContainer}
              />
            </View>
          </View>
        </View>
      </Modal>
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
    justifyContent: "space-between",
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
  },
  reportButton: {
    padding: 5,
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
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 24,
    width: "90%",
    maxWidth: 400,
  },
  closeButton: {
    alignSelf: "flex-end",
    padding: 8,
    margin: -8,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "600",
    marginBottom: 20,
    textAlign: "center",
    color: "#000",
  },
  modalScroll: {
    marginBottom: 20,
  },
  checkboxContainer: {
    backgroundColor: "transparent",
    borderWidth: 0,
    padding: 0,
    marginLeft: 0,
    marginRight: 0,
    marginBottom: 16,
  },
  checkboxText: {
    fontWeight: "normal",
    fontSize: 16,
    color: "#4A4A4A",
    marginLeft: 8,
  },
  reportComment: {
    borderWidth: 1,
    borderColor: "#E8E8E8",
    borderRadius: 12,
    padding: 16,
    marginTop: 8,
    fontSize: 16,
    minHeight: 120,
    textAlignVertical: "top",
    color: "#000",
  },
  modalButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 12,
  },
  buttonContainer: {
    flex: 1,
  },
  cancelButton: {
    height: 48,
    borderRadius: 12,
    borderColor: "#007AFF",
    borderWidth: 1,
    backgroundColor: "transparent",
  },
  submitButton: {
    height: 48,
    borderRadius: 12,
    backgroundColor: "#007AFF",
    borderWidth: 0,
  },
  cancelButtonText: {
    color: "#007AFF",
    fontSize: 16,
    fontWeight: "500",
  },
  submitButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "500",
  },
});
