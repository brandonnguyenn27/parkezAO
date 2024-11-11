import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Modal,
  TextInput,
  Alert,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { FontAwesome } from "@expo/vector-icons";

// Mock data for bookings
const initialCurrentBookings = [
  {
    id: "1",
    location: "123 Main St",
    date: "11-06-2024",
    time: "2:00 PM - 4:00 PM",
  },
  {
    id: "2",
    location: "456 Elm St",
    date: "11-09-2024",
    time: "9:00 PM - 11:00 PM",
  },
];

const initialPastBookings = [
  {
    id: "3",
    location: "789 Oak St",
    date: "06-01-2024",
    time: "10:00 AM - 12:00 PM",
  },
  {
    id: "4",
    location: "321 Pine St",
    date: "05-28-2024",
    time: "1:00 PM - 3:00 PM",
  },
];

export default function BookingsScreen() {
  const [currentBookings, setCurrentBookings] = useState(
    initialCurrentBookings
  );
  const [pastBookings, setPastBookings] = useState(initialPastBookings);
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState("");
  const [isCurrentBooking, setIsCurrentBooking] = useState(false);

  const renderBookingItem = ({ item, isPast }) => (
    <TouchableOpacity
      style={styles.bookingItem}
      onPress={() => {
        setSelectedBooking(item);
        setIsCurrentBooking(!isPast);
        setModalVisible(true);
      }}
    >
      <View style={styles.bookingInfo}>
        <Text style={styles.bookingLocation}>{item.location}</Text>
        <Text style={styles.bookingDateTime}>
          {item.date} | {item.time}
        </Text>
      </View>
      <FontAwesome name="chevron-right" size={20} color="#FFD700" />
    </TouchableOpacity>
  );

  const renderStars = () => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <TouchableOpacity key={i} onPress={() => setRating(i)}>
          <FontAwesome
            name={i <= rating ? "star" : "star-o"}
            size={30}
            color="#FFD700"
            style={styles.star}
          />
        </TouchableOpacity>
      );
    }
    return stars;
  };

  const handleSubmitRating = () => {
    // Here you would typically send the rating and review to your backend
    console.log("Submitting rating:", rating);
    console.log("Submitting review:", review);
    setModalVisible(false);
    setRating(0);
    setReview("");
  };

  const handleCancelBooking = () => {
    Alert.alert(
      "Cancel Booking",
      "Are you sure you want to cancel this booking?",
      [
        {
          text: "No",
          style: "cancel",
        },
        {
          text: "Yes",
          onPress: () => {
            setCurrentBookings(
              currentBookings.filter(
                (booking) => booking.id !== selectedBooking.id
              )
            );
            setModalVisible(false);
          },
        },
      ]
    );
  };

  const handleChangeBooking = () => {
    // Here you would typically navigate to a screen to change the booking
    console.log("Changing booking:", selectedBooking);
    setModalVisible(false);
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Your Bookings</Text>

      <Text style={styles.sectionTitle}>Current Bookings</Text>
      <FlatList
        data={currentBookings}
        renderItem={({ item }) => renderBookingItem({ item, isPast: false })}
        keyExtractor={(item) => item.id}
        style={styles.list}
      />

      <Text style={styles.sectionTitle}>Past Bookings</Text>
      <FlatList
        data={pastBookings}
        renderItem={({ item }) => renderBookingItem({ item, isPast: true })}
        keyExtractor={(item) => item.id}
        style={styles.list}
      />

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setModalVisible(false)}
            >
              <FontAwesome name="times" size={24} color="#FFD700" />
            </TouchableOpacity>

            {selectedBooking && (
              <View>
                <Text style={styles.modalTitle}>Booking Details</Text>
                <Text style={styles.modalText}>
                  Location: {selectedBooking.location}
                </Text>
                <Text style={styles.modalText}>
                  Date: {selectedBooking.date}
                </Text>
                <Text style={styles.modalText}>
                  Time: {selectedBooking.time}
                </Text>

                {isCurrentBooking ? (
                  <View style={styles.buttonContainer}>
                    <TouchableOpacity
                      style={[styles.actionButton, styles.cancelButton]}
                      onPress={handleCancelBooking}
                    >
                      <Text style={styles.actionButtonText}>
                        Cancel Booking
                      </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={[styles.actionButton, styles.changeButton]}
                      onPress={handleChangeBooking}
                    >
                      <Text style={styles.actionButtonText}>
                        Change Booking
                      </Text>
                    </TouchableOpacity>
                  </View>
                ) : (
                  <View>
                    <Text style={styles.ratingTitle}>Leave a Rating</Text>
                    <View style={styles.starsContainer}>{renderStars()}</View>

                    <TextInput
                      style={styles.reviewInput}
                      placeholder="Write your review here..."
                      multiline
                      value={review}
                      onChangeText={setReview}
                    />

                    <TouchableOpacity
                      style={styles.submitButton}
                      onPress={handleSubmitRating}
                    >
                      <Text style={styles.submitButtonText}>Submit Rating</Text>
                    </TouchableOpacity>
                  </View>
                )}
              </View>
            )}
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#333",
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 20,
    marginBottom: 10,
    color: "#333",
  },
  list: {
    marginBottom: 20,
  },
  bookingItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 15,
    marginBottom: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  bookingInfo: {
    flex: 1,
  },
  bookingLocation: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
  },
  bookingDateTime: {
    fontSize: 14,
    color: "#666",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    backgroundColor: "#fff",
    borderRadius: 20,
    padding: 20,
    width: "90%",
    maxHeight: "80%",
  },
  closeButton: {
    alignSelf: "flex-end",
    padding: 10,
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 15,
    color: "#333",
  },
  modalText: {
    fontSize: 16,
    marginBottom: 10,
    color: "#333",
  },
  ratingTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 20,
    marginBottom: 10,
    color: "#333",
  },
  starsContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 20,
  },
  star: {
    marginHorizontal: 5,
  },
  reviewInput: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 10,
    padding: 10,
    height: 100,
    textAlignVertical: "top",
    marginBottom: 20,
  },
  submitButton: {
    backgroundColor: "#FFD700",
    borderRadius: 10,
    padding: 15,
    alignItems: "center",
  },
  submitButtonText: {
    color: "#000",
    fontSize: 18,
    fontWeight: "bold",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
  },
  actionButton: {
    flex: 1,
    borderRadius: 10,
    padding: 15,
    alignItems: "center",
    marginHorizontal: 5,
  },
  cancelButton: {
    backgroundColor: "#FF3B30",
  },
  changeButton: {
    backgroundColor: "#FFD700",
  },
  actionButtonText: {
    color: "#000",
    fontSize: 16,
    fontWeight: "bold",
  },
});
