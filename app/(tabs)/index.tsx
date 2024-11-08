import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  TextInput,
} from "react-native";
import MapView, { Marker } from "react-native-maps";
import { SafeAreaView } from "react-native-safe-area-context";
import { Button } from "@rneui/themed";
import Icon from "react-native-vector-icons/MaterialIcons";
import { useRouter } from "expo-router";
import ParkingSpotModal from "@/components/ParkingSpotModal";
import { parkingSpots } from "../data/parking";
const { height, width } = Dimensions.get("window");

export default function HomeScreen() {
  const [activeFilters, setActiveFilters] = useState({
    date: false,
    price: false,
    type: false,
    more: false,
  });
  const [selectedSpot, setSelectedSpot] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [zoomLevel, setZoomLevel] = useState(14);
  const [region, setRegion] = useState({
    latitude: 37.3352,
    longitude: -121.8811,
    latitudeDelta: 0.01,
    longitudeDelta: 0.01,
  });
  const [searchQuery, setSearchQuery] = useState("");
  const router = useRouter();

  const toggleFilter = (filter) => {
    setActiveFilters((prev) => ({
      ...prev,
      [filter]: !prev[filter],
    }));
  };

  const increaseZoom = () => {
    setZoomLevel((prev) => Math.min(prev + 1, 20));
    setRegion((prev) => ({
      ...prev,
      latitudeDelta: prev.latitudeDelta / 2,
      longitudeDelta: prev.longitudeDelta / 2,
    }));
  };

  const decreaseZoom = () => {
    setZoomLevel((prev) => Math.max(prev - 1, 0));
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
    <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
      <SafeAreaView style={styles.container}>
        <View style={styles.searchContainer}>
          <Icon
            name="search"
            size={24}
            color="#999"
            style={styles.searchIcon}
          />
          <TextInput
            style={styles.searchInput}
            placeholder="Search for parking spots"
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>
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

        <ParkingSpotModal
          spot={selectedSpot}
          visible={modalVisible}
          onClose={() => setModalVisible(false)}
        />
      </SafeAreaView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f0f0f0",
    borderRadius: 20,
    margin: 10,
    paddingHorizontal: 10,
  },
  searchIcon: {
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    height: 40,
    fontSize: 16,
  },
  mapContainer: {
    height: height * 0.6,
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
});
