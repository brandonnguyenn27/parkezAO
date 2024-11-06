import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Modal,
  Image,
  Dimensions,
} from "react-native";
import MapView, { Marker } from "react-native-maps";
import { SafeAreaView } from "react-native-safe-area-context";
import { Button } from "@rneui/themed";
import Icon from "react-native-vector-icons/MaterialIcons";
import { useRouter } from "expo-router";

const { height } = Dimensions.get("window");

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

export default function HomeScreen() {
  const [activeFilters, setActiveFilters] = useState({
    date: false,
    price: false,
    type: false,
    more: false,
  });
  const [selectedSpot, setSelectedSpot] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [zoomLevel, setZoomLevel] = useState(14); // Initial zoom level
  const [region, setRegion] = useState({
    latitude: 37.3352,
    longitude: -121.8811,
    latitudeDelta: 0.01,
    longitudeDelta: 0.01,
  });
  const router = useRouter();

  const toggleFilter = (filter) => {
    setActiveFilters((prev) => ({
      ...prev,
      [filter]: !prev[filter],
    }));
  };

  const increaseZoom = () => {
    setZoomLevel((prev) => Math.min(prev + 1, 20)); // Max zoom level is 20
    setRegion((prev) => ({
      ...prev,
      latitudeDelta: prev.latitudeDelta / 2,
      longitudeDelta: prev.longitudeDelta / 2,
    }));
  };

  const decreaseZoom = () => {
    setZoomLevel((prev) => Math.max(prev - 1, 0)); // Min zoom level is 0
    setRegion((prev) => ({
      ...prev,
      latitudeDelta: prev.latitudeDelta * 2,
      longitudeDelta: prev.longitudeDelta * 2,
    }));
  };

  const resetRegion = () => {
    setRegion({
      latitude: 37.3352,
      longitude: -121.8811,
      latitudeDelta: 0.01,
      longitudeDelta: 0.01,
    });
  };

  const openSpotDetails = (spot) => {
    setSelectedSpot(spot);
    setModalVisible(true);
  };

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
      <SafeAreaView style={styles.container}>
        <View style={styles.mapContainer}>
          <MapView
            style={styles.map}
            region={region}
            onRegionChangeComplete={setRegion}
          >
            {parkingSpots.map((spot) => (
              <Marker
                key={spot.id}
                coordinate={{
                  latitude: spot.latitude,
                  longitude: spot.longitude,
                }}
                onPress={() => openSpotDetails(spot)}
              >
                <View style={styles.markerContainer}>
                  <Text style={styles.markerText}>${spot.price}</Text>
                </View>
              </Marker>
            ))}
          </MapView>
          <View style={{ position: "absolute", top: 10, right: 10 }}>
            <TouchableOpacity
              onPress={increaseZoom}
              style={{ marginBottom: 10 }}
            >
              <Text
                style={{ fontSize: 10, padding: 5, backgroundColor: "white" }}
              >
                +
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={decreaseZoom}
              style={{ marginBottom: 10 }}
            >
              <Text
                style={{ fontSize: 10, padding: 5, backgroundColor: "white" }}
              >
                -
              </Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={resetRegion}>
              <Text
                style={{ fontSize: 10, padding: 5, backgroundColor: "white" }}
              >
                Reset
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.contentContainer}>
          <ScrollView horizontal style={styles.filtersContainer}>
            <Button
              title="Date"
              type={activeFilters.date ? "solid" : "outline"}
              icon={
                <Icon
                  name="date-range"
                  size={15}
                  color={activeFilters.date ? "#fff" : "#000"}
                />
              }
              buttonStyle={[
                styles.filterButton,
                activeFilters.date && styles.activeFilterButton,
              ]}
              titleStyle={[
                styles.filterButtonText,
                activeFilters.date && styles.activeFilterButtonText,
              ]}
              onPress={() => toggleFilter("date")}
            />
            <Button
              title="Price"
              type={activeFilters.price ? "solid" : "outline"}
              icon={
                <Icon
                  name="attach-money"
                  size={15}
                  color={activeFilters.price ? "#fff" : "#000"}
                />
              }
              buttonStyle={[
                styles.filterButton,
                activeFilters.price && styles.activeFilterButton,
              ]}
              titleStyle={[
                styles.filterButtonText,
                activeFilters.price && styles.activeFilterButtonText,
              ]}
              onPress={() => toggleFilter("price")}
            />
            <Button
              title="Type"
              type={activeFilters.type ? "solid" : "outline"}
              icon={
                <Icon
                  name="local-parking"
                  size={15}
                  color={activeFilters.type ? "#fff" : "#000"}
                />
              }
              buttonStyle={[
                styles.filterButton,
                activeFilters.type && styles.activeFilterButton,
              ]}
              titleStyle={[
                styles.filterButtonText,
                activeFilters.type && styles.activeFilterButtonText,
              ]}
              onPress={() => toggleFilter("type")}
            />
            <Button
              title="More"
              type={activeFilters.more ? "solid" : "outline"}
              icon={
                <Icon
                  name="more-horiz"
                  size={15}
                  color={activeFilters.more ? "#fff" : "#000"}
                />
              }
              buttonStyle={[
                styles.filterButton,
                activeFilters.more && styles.activeFilterButton,
              ]}
              titleStyle={[
                styles.filterButtonText,
                activeFilters.more && styles.activeFilterButtonText,
              ]}
              onPress={() => toggleFilter("more")}
            />
          </ScrollView>

          <View style={styles.bottomSheet}>
            <Text style={styles.bottomSheetTitle}>Parking Spots</Text>
            <ScrollView horizontal>
              {parkingSpots.map((spot) => (
                <TouchableOpacity
                  key={spot.id}
                  style={styles.parkingSpotCard}
                  onPress={() => openSpotDetails(spot)}
                >
                  <View style={styles.parkingSpotImagePlaceholder} />
                  <Text style={styles.parkingSpotPrice}>${spot.price}/hr</Text>
                  <Text style={styles.parkingSpotLocation}>{spot.name}</Text>
                  <Text style={styles.parkingSpotRating}>
                    ★ {spot.rating} ({spot.reviews})
                  </Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
        </View>

        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => setModalVisible(false)}
        >
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              {selectedSpot && (
                <>
                  <Image
                    source={{ uri: "https://via.placeholder.com/300x200" }}
                    style={styles.modalImage}
                  />
                  <Text style={styles.modalTitle}>{selectedSpot.name}</Text>
                  <Text style={styles.modalAddress}>
                    {selectedSpot.address}
                  </Text>
                  <Text style={styles.modalPrice}>
                    ${selectedSpot.price}/hr
                  </Text>
                  <Text style={styles.modalRating}>
                    ★ {selectedSpot.rating} ({selectedSpot.reviews} reviews)
                  </Text>
                  <Button
                    title="Book Now"
                    buttonStyle={styles.bookButton}
                    onPress={() => {
                      setModalVisible(false);
                      router.push({
                        pathname: "/checkout/[id]",
                        params: { id: selectedSpot.id },
                      });
                    }}
                  />
                  <Button
                    title="Close"
                    type="outline"
                    buttonStyle={styles.closeButton}
                    onPress={() => setModalVisible(false)}
                  />
                </>
              )}
            </View>
          </View>
        </Modal>
      </SafeAreaView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  mapContainer: {
    height: height * 0.6, // 60% of screen height
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  contentContainer: {
    flex: 1,
  },
  filtersContainer: {
    paddingHorizontal: 10,
    paddingVertical: 10,
  },
  filterButton: {
    marginRight: 10,
    borderColor: "#ddd",
    borderRadius: 20,
    paddingHorizontal: 15,
  },
  activeFilterButton: {
    backgroundColor: "#007AFF",
    borderColor: "#007AFF",
  },
  filterButtonText: {
    color: "#000",
    fontSize: 12,
  },
  activeFilterButtonText: {
    color: "#fff",
  },
  markerContainer: {
    backgroundColor: "#fff",
    padding: 5,
    borderRadius: 5,
    borderColor: "#000",
    borderWidth: 1,
  },
  markerText: {
    fontWeight: "bold",
  },
  bottomSheet: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
  },
  bottomSheetTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  parkingSpotCard: {
    width: 150,
    marginRight: 15,
  },
  parkingSpotImagePlaceholder: {
    width: "100%",
    height: 100,
    backgroundColor: "#f2f2f2",
    borderRadius: 10,
    marginBottom: 5,
  },
  parkingSpotPrice: {
    fontWeight: "bold",
  },
  parkingSpotLocation: {
    fontSize: 12,
    color: "#666",
  },
  parkingSpotRating: {
    fontSize: 12,
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
    alignItems: "center",
  },
  modalImage: {
    width: "100%",
    height: 200,
    borderRadius: 10,
    marginBottom: 10,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 5,
  },
  modalAddress: {
    fontSize: 14,
    color: "#666",
    marginBottom: 10,
  },
  modalPrice: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#007AFF",
    marginBottom: 5,
  },
  modalRating: {
    fontSize: 14,
    color: "#666",
    marginBottom: 15,
  },
  bookButton: {
    backgroundColor: "#007AFF",
    borderRadius: 10,
    paddingHorizontal: 30,
    marginBottom: 10,
  },
  closeButton: {
    borderColor: "#007AFF",
    borderRadius: 10,
    paddingHorizontal: 30,
  },
});
