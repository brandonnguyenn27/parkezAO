import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Alert,
  Platform,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Icon from "react-native-vector-icons/MaterialIcons";
import { useLocalSearchParams, useRouter } from "expo-router";
import { parkingSpots } from "../data/parking";
import DateTimePicker from "@react-native-community/datetimepicker";
import { Picker } from "@react-native-picker/picker";
import { CheckBox } from "@rneui/themed";

export default function CheckoutView() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const spot = parkingSpots.find((spot) => spot.id === Number(id));

  const [selectedDate, setSelectedDate] = useState(new Date());
  const [startTime, setStartTime] = useState(new Date());
  const [endTime, setEndTime] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showStartTimePicker, setShowStartTimePicker] = useState(false);
  const [showEndTimePicker, setShowEndTimePicker] = useState(false);

  const [showCreditCardForm, setShowCreditCardForm] = useState(false);
  const [cardNumber, setCardNumber] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [cvv, setCvv] = useState("");
  const [zipCode, setZipCode] = useState("");
  const [cardholderName, setCardholderName] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [saveCardInfo, setSaveCardInfo] = useState(false);

  const [useSavedPayment, setUseSavedPayment] = useState(false);
  const [savedPayments, setSavedPayments] = useState([
    { id: 1, cardNumber: "**** **** **** 1234", cardholderName: "John Doe" },
    { id: 2, cardNumber: "**** **** **** 5678", cardholderName: "Jane Smith" },
  ]);

  useEffect(() => {
    if (spot) {
      const [startHour, startMinute] = spot.startTime.split(":").map(Number);
      const [endHour, endMinute] = spot.endTime.split(":").map(Number);

      const newStartTime = new Date(selectedDate);
      newStartTime.setHours(startHour, startMinute, 0, 0);
      setStartTime(newStartTime);

      const newEndTime = new Date(selectedDate);
      newEndTime.setHours(endHour, endMinute, 0, 0);
      setEndTime(newEndTime);
    }
  }, [selectedDate, spot]);

  if (!spot) {
    return (
      <SafeAreaView style={styles.container}>
        <Text>Parking spot not found</Text>
      </SafeAreaView>
    );
  }

  const handleConfirmBooking = () => {
    if (useSavedPayment) {
      // Process payment with saved payment information
    } else if (
      !cardholderName ||
      !cardNumber ||
      !expiryDate ||
      !cvv ||
      !address ||
      !city ||
      !state ||
      !zipCode
    ) {
      Alert.alert("Error", "Please fill in all payment details");
      return;
    }

    if (saveCardInfo) {
      // Save card information logic here
      const newSavedPayment = {
        id: savedPayments.length + 1,
        cardNumber: `**** **** **** ${cardNumber.slice(-4)}`,
        cardholderName: cardholderName,
      };
      setSavedPayments([...savedPayments, newSavedPayment]);
    }

    const duration =
      (endTime.getTime() - startTime.getTime()) / (1000 * 60 * 60);
    const totalPrice = (spot.price * duration).toFixed(2);

    router.push({
      pathname: "/",
      params: {
        justCheckedOut: "true",
        spotId: spot.id,
        date: selectedDate.toISOString().split("T")[0],
        startTime: startTime.toTimeString().split(" ")[0],
        endTime: endTime.toTimeString().split(" ")[0],
        totalPrice: totalPrice,
      },
    });
  };

  const onDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || new Date();
    setShowDatePicker(false);
    setSelectedDate(currentDate);
  };

  const onStartTimeChange = (event, selectedTime) => {
    const currentTime = selectedTime || startTime;
    setShowStartTimePicker(Platform.OS === "ios");
    setStartTime(currentTime);
  };

  const onEndTimeChange = (event, selectedTime) => {
    const currentTime = selectedTime || endTime;
    setShowEndTimePicker(Platform.OS === "ios");
    setEndTime(currentTime);
  };

  const formatTime = (date) => {
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };

  const calculateDuration = () => {
    const duration =
      (endTime.getTime() - startTime.getTime()) / (1000 * 60 * 60);
    return Math.max(duration, 0).toFixed(1);
  };

  const generateTimeOptions = () => {
    const options = [];
    for (let i = 0; i < 24; i++) {
      for (let j = 0; j < 60; j += 30) {
        const hour = i.toString().padStart(2, "0");
        const minute = j.toString().padStart(2, "0");
        options.push(`${hour}:${minute}`);
      }
    }
    return options;
  };

  const timeOptions = generateTimeOptions();

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
          <Text style={styles.spotAvailability}>
            Available: {spot.startTime} - {spot.endTime}
          </Text>
        </View>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Select Date and Time</Text>
          <TouchableOpacity
            style={styles.dateTimeButton}
            onPress={() => setShowDatePicker(true)}
          >
            <Text style={styles.dateTimeButtonText}>
              {selectedDate.toDateString()}
            </Text>
            <Icon name="calendar-today" size={24} color="#007AFF" />
          </TouchableOpacity>
          {showDatePicker && (
            <DateTimePicker
              value={selectedDate}
              mode="date"
              display="default"
              onChange={onDateChange}
            />
          )}
          <View style={styles.timeContainer}>
            <TouchableOpacity
              style={styles.timeButton}
              onPress={() => setShowStartTimePicker(true)}
            >
              <Text style={styles.timeButtonText}>
                Start: {formatTime(startTime)}
              </Text>
              <Icon name="access-time" size={24} color="#007AFF" />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.timeButton}
              onPress={() => setShowEndTimePicker(true)}
            >
              <Text style={styles.timeButtonText}>
                End: {formatTime(endTime)}
              </Text>
              <Icon name="access-time" size={24} color="#007AFF" />
            </TouchableOpacity>
          </View>
          {showStartTimePicker && (
            <Picker
              selectedValue={formatTime(startTime)}
              onValueChange={(itemValue) => {
                const [hours, minutes] = itemValue.split(":");
                const newStartTime = new Date(startTime);
                newStartTime.setHours(parseInt(hours, 10));
                newStartTime.setMinutes(parseInt(minutes, 10));
                setStartTime(newStartTime);
                setShowStartTimePicker(false);
              }}
            >
              {timeOptions.map((time) => (
                <Picker.Item key={time} label={time} value={time} />
              ))}
            </Picker>
          )}
          {showEndTimePicker && (
            <Picker
              selectedValue={formatTime(endTime)}
              onValueChange={(itemValue) => {
                const [hours, minutes] = itemValue.split(":");
                const newEndTime = new Date(endTime);
                newEndTime.setHours(parseInt(hours, 10));
                newEndTime.setMinutes(parseInt(minutes, 10));
                setEndTime(newEndTime);
                setShowEndTimePicker(false);
              }}
            >
              {timeOptions.map((time) => (
                <Picker.Item key={time} label={time} value={time} />
              ))}
            </Picker>
          )}
          <Text style={styles.durationText}>
            Duration: {calculateDuration()} hours
          </Text>
        </View>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Payment Method</Text>
          {savedPayments.length > 0 && (
            <TouchableOpacity
              style={styles.paymentButton}
              onPress={() => setUseSavedPayment(!useSavedPayment)}
            >
              <Icon
                name={
                  useSavedPayment
                    ? "radio-button-checked"
                    : "radio-button-unchecked"
                }
                size={24}
                color="#007AFF"
                style={styles.paymentIcon}
              />
              <Text style={styles.paymentButtonText}>Use Saved Payment</Text>
            </TouchableOpacity>
          )}
          {useSavedPayment && (
            <Picker
              selectedValue={savedPayments[0].id}
              onValueChange={(itemValue) => {
                // Handle saved payment selection
              }}
            >
              {savedPayments.map((payment) => (
                <Picker.Item
                  key={payment.id}
                  label={`${payment.cardholderName} - ${payment.cardNumber}`}
                  value={payment.id}
                />
              ))}
            </Picker>
          )}
          <TouchableOpacity
            style={styles.paymentButton}
            onPress={() => {
              setShowCreditCardForm(!showCreditCardForm);
              setUseSavedPayment(false);
            }}
          >
            <Icon
              name={
                !useSavedPayment
                  ? "radio-button-checked"
                  : "radio-button-unchecked"
              }
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
                placeholder="Cardholder Name"
                value={cardholderName}
                onChangeText={setCardholderName}
              />
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
              </View>
              <TextInput
                style={styles.input}
                placeholder="Address"
                value={address}
                onChangeText={setAddress}
              />
              <View style={styles.row}>
                <TextInput
                  style={[styles.input, styles.halfInput]}
                  placeholder="City"
                  value={city}
                  onChangeText={setCity}
                />
                <TextInput
                  style={[styles.input, styles.halfInput]}
                  placeholder="State"
                  value={state}
                  onChangeText={setState}
                />
              </View>
              <TextInput
                style={styles.input}
                placeholder="Zip Code"
                value={zipCode}
                onChangeText={setZipCode}
                keyboardType="number-pad"
                maxLength={5}
              />
              <CheckBox
                title="Save this card for future use"
                checked={saveCardInfo}
                onPress={() => setSaveCardInfo(!saveCardInfo)}
                containerStyle={styles.checkboxContainer}
              />
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
              Parking Fee ({calculateDuration()}h)
            </Text>
            <Text style={styles.summaryPrice}>
              ${(spot.price * parseFloat(calculateDuration())).toFixed(2)}
            </Text>
          </View>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryText}>Service Fee</Text>
            <Text style={styles.summaryPrice}>$2.00</Text>
          </View>
          <View style={[styles.summaryRow, styles.totalRow]}>
            <Text style={styles.totalText}>Total</Text>
            <Text style={styles.totalPrice}>
              ${(spot.price * parseFloat(calculateDuration()) + 2).toFixed(2)}
            </Text>
          </View>
        </View>
        <TouchableOpacity
          style={styles.confirmButton}
          onPress={handleConfirmBooking}
        >
          <Text style={styles.confirmButtonText}>Confirm Booking</Text>
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
    marginBottom: 5,
  },
  spotAvailability: {
    fontSize: 14,
    color: "#666",
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
  dateTimeButton: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#f0f0f0",
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
  dateTimeButtonText: {
    fontSize: 16,
    color: "#333",
  },
  timeContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  timeButton: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#f0f0f0",
    padding: 10,
    borderRadius: 5,
    marginHorizontal: 5,
  },
  timeButtonText: {
    fontSize: 16,
    color: "#333",
  },
  durationText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#007AFF",
    marginTop: 10,
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
  },
  halfInput: {
    width: "48%",
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
    fontWeight: "bold",
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
  },
  confirmButton: {
    backgroundColor: "#007AFF",
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: "center",
    marginBottom: 20,
  },
  confirmButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  checkboxContainer: {
    backgroundColor: "transparent",
    borderWidth: 0,
    padding: 0,
    margin: 0,
  },
});
