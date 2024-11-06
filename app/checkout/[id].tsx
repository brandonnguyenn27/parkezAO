import React, { useState } from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Button } from "@rneui/themed";
import Icon from "react-native-vector-icons/MaterialIcons";
import { useLocalSearchParams, useRouter } from "expo-router";

const parkingSpots = [
  {
    id: 1,
    latitude: 37.3352,
    longitude: -121.8811,
    price: 2,
    name: "Residential Parking",
    address: "123 S 4th St, San Jose, CA",
    rating: 4.8,
  },
  {
    id: 2,
    latitude: 37.3337,
    longitude: -121.8847,
    price: 3,
    name: "Street Parking",
    address: "456 E San Fernando St, San Jose, CA",
    rating: 4.7,
  },
  {
    id: 3,
    latitude: 37.3372,
    longitude: -121.8795,
    price: 2,
    name: "Residential Parking",
    address: "789 S 10th St, San Jose, CA",
    rating: 4.6,
  },
  {
    id: 4,
    latitude: 37.3365,
    longitude: -121.8818,
    price: 4,
    name: "Street Parking",
    address: "101 S San Carlos St, San Jose, CA",
    rating: 4.9,
  },
  {
    id: 5,
    latitude: 37.3382,
    longitude: -121.8833,
    price: 5,
    name: "Residential Parking",
    address: "202 S Market St, San Jose, CA",
    rating: 4.5,
  },
];

export default function CheckoutView() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const spot = parkingSpots.find((spot) => spot.id === Number(id));
  const [selectedDuration, setSelectedDuration] = useState(1);

  const durations = [1, 2, 3, 4];

  if (!spot) {
    return (
      <SafeAreaView style={styles.container}>
        <Text>Parking spot not found</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Text style={styles.title}>Checkout</Text>
        <View style={styles.spotInfo}>
          <Text style={styles.spotName}>{spot.name}</Text>
          <Text style={styles.spotAddress}>{spot.address}</Text>
          <Text style={styles.spotPrice}>${spot.price}/hr</Text>
        </View>
        <View style={styles.durationSelector}>
          <Text style={styles.sectionTitle}>Select Duration</Text>
          <View style={styles.durationButtons}>
            {durations.map((duration) => (
              <Button
                key={duration}
                title={`${duration}h`}
                type={selectedDuration === duration ? "solid" : "outline"}
                buttonStyle={[
                  styles.durationButton,
                  selectedDuration === duration &&
                    styles.selectedDurationButton,
                ]}
                titleStyle={[
                  styles.durationButtonText,
                  selectedDuration === duration &&
                    styles.selectedDurationButtonText,
                ]}
                onPress={() => setSelectedDuration(duration)}
              />
            ))}
          </View>
        </View>
        <View style={styles.paymentMethods}>
          <Text style={styles.sectionTitle}>Payment Method</Text>
          <Button
            title="Credit Card"
            icon={
              <Icon
                name="credit-card"
                size={20}
                color="#007AFF"
                style={styles.paymentIcon}
              />
            }
            type="outline"
            buttonStyle={styles.paymentButton}
            titleStyle={styles.paymentButtonText}
          />
          <Button
            title="PayPal"
            icon={
              <Icon
                name="payment"
                size={20}
                color="#007AFF"
                style={styles.paymentIcon}
              />
            }
            type="outline"
            buttonStyle={styles.paymentButton}
            titleStyle={styles.paymentButtonText}
          />
        </View>
        <View style={styles.summary}>
          <Text style={styles.sectionTitle}>Summary</Text>
          <View style={styles.summaryRow}>
            <Text>Parking Fee ({selectedDuration}h)</Text>
            <Text>${spot.price * selectedDuration}.00</Text>
          </View>
          <View style={styles.summaryRow}>
            <Text>Service Fee</Text>
            <Text>$2.00</Text>
          </View>
          <View style={[styles.summaryRow, styles.totalRow]}>
            <Text style={styles.totalText}>Total</Text>
            <Text style={styles.totalText}>
              ${spot.price * selectedDuration + 2}.00
            </Text>
          </View>
        </View>
        <Button
          title="Confirm Booking"
          buttonStyle={styles.confirmButton}
          onPress={() => {
            // Implement booking confirmation logic here
            router.push("/");
          }}
        />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  scrollContent: {
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  spotInfo: {
    marginBottom: 20,
  },
  spotName: {
    fontSize: 18,
    fontWeight: "bold",
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
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  durationSelector: {
    marginBottom: 20,
  },
  durationButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  durationButton: {
    width: 70,
    marginHorizontal: 5,
  },
  selectedDurationButton: {
    backgroundColor: "#007AFF",
  },
  durationButtonText: {
    fontSize: 14,
  },
  selectedDurationButtonText: {
    color: "#fff",
  },
  paymentMethods: {
    marginBottom: 20,
  },
  paymentButton: {
    justifyContent: "flex-start",
    marginBottom: 10,
  },
  paymentButtonText: {
    color: "#007AFF",
  },
  paymentIcon: {
    marginRight: 10,
  },
  summary: {
    marginBottom: 20,
  },
  summaryRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 5,
  },
  totalRow: {
    borderTopWidth: 1,
    borderTopColor: "#ddd",
    paddingTop: 5,
    marginTop: 5,
  },
  totalText: {
    fontWeight: "bold",
  },
  confirmButton: {
    backgroundColor: "#007AFF",
    paddingVertical: 15,
  },
});
