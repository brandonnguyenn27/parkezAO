import React, { useState, useEffect } from "react";
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
import Icon from "react-native-vector-icons/MaterialIcons";
import { useRouter } from "expo-router";
import ParkingSpotModal from "@/components/ParkingSpotModal";
import PriceFilter from "@/components/buttons/PriceFilter";
import RatingFilter from "@/components/buttons/RatingFilter";
import AmenitiesFilter from "@/components/buttons/AmenitiesFilter";
import { parkingSpots } from "../data/parking";

const { height, width } = Dimensions.get("window");

export default function HomeScreen() {
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
  const [filteredSpots, setFilteredSpots] = useState(parkingSpots);
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(100);
  const [minRating, setMinRating] = useState(0);
  const [selectedAmenities, setSelectedAmenities] = useState<string[]>([]);
  const router = useRouter();

  useEffect(() => {
    applyFilters();
  }, [minPrice, maxPrice, minRating, selectedAmenities, searchQuery]);

  const applyFilters = () => {
    const filtered = parkingSpots.filter((spot) => {
      const matchesPrice = spot.price >= minPrice && spot.price <= maxPrice;
      const matchesRating = spot.rating >= minRating;
      const matchesAmenities = selectedAmenities.every((amenity) =>
        spot.amenities.includes(amenity)
      );
      const matchesSearch =
        spot.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        spot.address.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesPrice && matchesRating && matchesAmenities && matchesSearch;
    });
    setFilteredSpots(filtered);
  };

  const handlePriceChange = (min: number, max: number) => {
    setMinPrice(min);
    setMaxPrice(max);
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
            {filteredSpots.map((spot) => (
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
          <View style={styles.zoomControls}>
            <TouchableOpacity onPress={increaseZoom} style={styles.zoomButton}>
              <Text style={styles.zoomButtonText}>+</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={decreaseZoom} style={styles.zoomButton}>
              <Text style={styles.zoomButtonText}>-</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={resetRegion} style={styles.zoomButton}>
              <Text style={styles.zoomButtonText}>Reset</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.contentContainer}>
          <ScrollView horizontal style={styles.filtersContainer}>
            <PriceFilter
              onFilterChange={handlePriceChange}
              initialMinPrice={0}
              initialMaxPrice={100}
            />
            <RatingFilter onFilterChange={setMinRating} />
            <AmenitiesFilter onFilterChange={setSelectedAmenities} />
          </ScrollView>

          <View style={styles.bottomSheet}>
            <Text style={styles.bottomSheetTitle}>Parking Spots</Text>
            <ScrollView horizontal>
              {filteredSpots.map((spot) => (
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
  zoomControls: {
    position: "absolute",
    top: 10,
    right: 10,
  },
  zoomButton: {
    backgroundColor: "white",
    padding: 5,
    marginBottom: 5,
    borderRadius: 5,
  },
  zoomButtonText: {
    fontSize: 16,
    fontWeight: "bold",
  },
  contentContainer: {
    flex: 1,
  },
  filtersContainer: {
    paddingHorizontal: 10,
    paddingVertical: 10,
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
