import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Icon from "react-native-vector-icons/MaterialIcons";
import { useLocalSearchParams, useRouter } from "expo-router";
import { parkingSpots } from "../data/parking";

export default function CheckoutView() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const spot = parkingSpots.find((spot) => spot.id === Number(id));
  const [selectedDuration, setSelectedDuration] = useState(1);
  const [showCreditCardForm, setShowCreditCardForm] = useState(false);
  const [cardNumber, setCardNumber] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [cvv, setCvv] = useState("");
  const [zipCode, setZipCode] = useState(""); // Added zip code state

  const durations = [1, 2, 3, 4];

  if (!spot) {
    return (
      <SafeAreaView style={styles.container}>
        <Text>Parking spot not found</Text>
      </SafeAreaView>
    );
  }

  const handleConfirmBooking = () => {
    // Implement booking confirmation logic here
    router.push({
      pathname: "/",
      params: {
        justCheckedOut: "true",
        spotId: spot.id,
        duration: selectedDuration,
      },
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.header}>
          <TouchableOpacity
            onPress={() => router.back()}
            style={styles.backButton}
          >
            <Icon name="arrow-back" size={24} color="#007AFF" />
          </TouchableOpacity>
          <Text style={styles.title}>Checkout</Text>
        </View>
        <View style={styles.card}>
          <Text style={styles.spotName}>{spot.name}</Text>
          <Text style={styles.spotAddress}>{spot.address}</Text>
          <Text style={styles.spotPrice}>${spot.price}/hr</Text>
        </View>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Select Duration</Text>
          <View style={styles.durationButtons}>
            {durations.map((duration) => (
              <TouchableOpacity
                key={duration}
                style={[
                  styles.durationButton,
                  selectedDuration === duration &&
                    styles.selectedDurationButton,
                ]}
                onPress={() => setSelectedDuration(duration)}
              >
                <Text
                  style={[
                    styles.durationButtonText,
                    selectedDuration === duration &&
                      styles.selectedDurationButtonText,
                  ]}
                >
                  {duration}h
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Payment Method</Text>
          <TouchableOpacity
            style={styles.paymentButton}
            onPress={() => setShowCreditCardForm(!showCreditCardForm)}
          >
            <Icon
              name="credit-card"
              size={24}
              color="#007AFF"
              style={styles.paymentIcon}
            />
            <Text style={styles.paymentButtonText}>Credit Card</Text>
          </TouchableOpacity>
          {showCreditCardForm && (
            <View style={styles.creditCardForm}>
              <TextInput
                style={styles.input}
                placeholder="Card Number"
                value={cardNumber}
                onChangeText={setCardNumber}
                keyboardType="number-pad"
                maxLength={16}
              />
              <View style={styles.row}>
                <TextInput
                  style={[styles.input, styles.halfInput]}
                  placeholder="MM/YY"
                  value={expiryDate}
                  onChangeText={setExpiryDate}
                  keyboardType="numeric"
                />
                <TextInput
                  style={[styles.input, styles.halfInput]}
                  placeholder="CVV"
                  value={cvv}
                  onChangeText={setCvv}
                  keyboardType="number-pad"
                  maxLength={3}
                />
                <TextInput
                  style={[styles.input, styles.halfInput]}
                  placeholder="Zip Code"
                  value={zipCode}
                  onChangeText={setZipCode}
                  keyboardType="number-pad"
                  maxLength={5}
                />
              </View>
            </View>
          )}
          <TouchableOpacity style={styles.applePayButton}>
            <Icon
              name="apple"
              size={24}
              color="#fff"
              style={styles.applePayIcon}
            />
            <Text style={styles.applePayButtonText}>Apple Pay</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Summary</Text>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryText}>
              Parking Fee ({selectedDuration}h)
            </Text>
            <Text style={styles.summaryPrice}>
              ${(spot.price * selectedDuration).toFixed(2)}
            </Text>
          </View>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryText}>Service Fee</Text>
            <Text style={styles.summaryPrice}>$2.00</Text>
          </View>
          <View style={[styles.summaryRow, styles.totalRow]}>
            <Text style={styles.totalText}>Total</Text>
            <Text style={styles.totalPrice}>
              ${(spot.price * selectedDuration + 2).toFixed(2)}
            </Text>
          </View>
        </View>
        <TouchableOpacity
          style={styles.confirmButton}
          onPress={handleConfirmBooking}
        >
          <Text style={styles.confirmButtonText}>Confirm Booking</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.homeButton}
          onPress={() => router.push("/")}
        >
          <Text style={styles.homeButtonText}>Back to Home</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
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
    padding: 5,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginLeft: 10,
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 15,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  spotName: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
  },
  spotAddress: {
    fontSize: 14,
    color: "#666",
    marginBottom: 5,
  },
  spotPrice: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#007AFF",
  },
  section: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 15,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  durationButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  durationButton: {
    width: 70,
    height: 40,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#007AFF",
    justifyContent: "center",
    alignItems: "center",
  },
  selectedDurationButton: {
    backgroundColor: "#007AFF",
  },
  durationButtonText: {
    fontSize: 14,
    color: "#007AFF",
  },
  selectedDurationButtonText: {
    color: "#fff",
  },
  paymentButton: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  paymentButtonText: {
    color: "#007AFF",
    fontSize: 16,
  },
  paymentIcon: {
    marginRight: 10,
  },
  applePayButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#000",
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 15,
    marginTop: 10,
  },
  applePayIcon: {
    marginRight: 10,
  },
  applePayButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  creditCardForm: {
    marginTop: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 8,
  },
  halfInput: {
    flex: 1,
  },
  summaryRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 5,
  },
  summaryText: {
    fontSize: 16,
  },
  summaryPrice: {
    fontSize: 16,
    textAlign: "right",
    minWidth: 70,
  },
  totalRow: {
    borderTopWidth: 1,
    borderTopColor: "#ddd",
    paddingTop: 5,
    marginTop: 5,
  },
  totalText: {
    fontWeight: "bold",
    fontSize: 18,
  },
  totalPrice: {
    fontWeight: "bold",
    fontSize: 18,
    textAlign: "right",
    minWidth: 70,
  },
  confirmButton: {
    backgroundColor: "#007AFF",
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: "center",
    marginBottom: 10,
  },
  confirmButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  homeButton: {
    backgroundColor: "#fff",
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#007AFF",
  },
  homeButtonText: {
    color: "#007AFF",
    fontSize: 18,
    fontWeight: "bold",
  },
});
