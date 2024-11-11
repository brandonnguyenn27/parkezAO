import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Alert,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { FontAwesome } from "@expo/vector-icons";

// Mock user data (replace this with actual data from your backend or state management)
const initialCars = [
  {
    id: 1,
    make: "Toyota",
    model: "Camry",
    year: 2020,
    color: "Silver",
    type: "Sedan",
    licensePlate: "ABC123",
  },
  {
    id: 2,
    make: "Honda",
    model: "Civic",
    year: 2019,
    color: "Blue",
    type: "Hatchback",
    licensePlate: "XYZ789",
  },
];

export default function CarsScreen() {
  const router = useRouter();
  const [cars, setCars] = useState(initialCars);

  const renderCarItem = ({ item }) => (
    <View style={styles.carItem}>
      <View>
        <Text style={styles.carName}>
          {item.make} {item.model}
        </Text>
        <Text style={styles.carDetails}>
          {item.year} • {item.color} • {item.type}
        </Text>
        <Text style={styles.licensePlate}>
          License Plate: {item.licensePlate}
        </Text>
      </View>
      <TouchableOpacity onPress={() => handleDeleteCar(item.id)}>
        <FontAwesome name="trash" size={24} color="#FF3B30" />
      </TouchableOpacity>
    </View>
  );

  const handleAddCar = () => {
    if (cars.length >= 3) {
      Alert.alert("Maximum Cars Reached", "You can only have up to 3 cars.");
    } else {
      // Navigate to add car screen
      router.push("/add-car");
    }
  };

  const handleDeleteCar = (id) => {
    Alert.alert("Delete Car", "Are you sure you want to delete this car?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Delete",
        onPress: () => {
          setCars(cars.filter((car) => car.id !== id));
        },
      },
    ]);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <FontAwesome name="arrow-left" size={24} color="#000" />
        </TouchableOpacity>
        <Text style={styles.title}>Your Cars</Text>
        <TouchableOpacity onPress={handleAddCar}>
          <FontAwesome name="plus" size={24} color="#ffce00" />
        </TouchableOpacity>
      </View>
      <FlatList
        data={cars}
        renderItem={renderCarItem}
        keyExtractor={(item) => item.id.toString()}
        ListEmptyComponent={
          <Text style={styles.emptyText}>No cars added yet.</Text>
        }
      />
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
    justifyContent: "space-between",
    alignItems: "center",
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  carItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
  },
  carName: {
    fontSize: 18,
    fontWeight: "bold",
  },
  carDetails: {
    fontSize: 16,
    color: "#666",
    marginTop: 4,
  },
  licensePlate: {
    fontSize: 14,
    color: "#999",
    marginTop: 4,
  },
  emptyText: {
    textAlign: "center",
    marginTop: 50,
    fontSize: 16,
    color: "#666",
  },
});
