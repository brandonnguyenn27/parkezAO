import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  TextInput,
  Image,
  FlatList,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Icon from "react-native-vector-icons/MaterialIcons";
import { useRouter } from "expo-router";
import { Button, Overlay } from "@rneui/themed";
import ParkingSpotModal from "@/components/ParkingSpotModal";
import PriceFilter from "@/components/buttons/PriceFilter";
import RatingFilter from "@/components/buttons/RatingFilter";
import AmenitiesFilter from "@/components/buttons/AmenitiesFilter";
import { parkingSpots } from "../data/parking";
import FontAwesome from "@expo/vector-icons/build/FontAwesome";
import MapComponent from "@/components/MapComponent";
import { LogBox } from "react-native";
const { height, width } = Dimensions.get("window");

type SortOption = "price_asc" | "price_desc" | "rating_desc" | "distance_asc";

export default function HomeScreen() {
  LogBox.ignoreAllLogs();
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
  const [sortBy, setSortBy] = useState<SortOption>("distance_asc");
  const [sortOverlayVisible, setSortOverlayVisible] = useState(false);
  const router = useRouter();

  useEffect(() => {
    applyFilters();
  }, [minPrice, maxPrice, minRating, selectedAmenities, searchQuery, sortBy]);

  const applyFilters = () => {
    let filtered = parkingSpots.filter((spot) => {
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

    filtered.sort((a, b) => {
      switch (sortBy) {
        case "price_asc":
          return a.price - b.price;
        case "price_desc":
          return b.price - a.price;
        case "rating_desc":
          return b.rating - a.rating;
        case "distance_asc":
          return a.distance - b.distance;
        default:
          return 0;
      }
    });

    setFilteredSpots(filtered);
  };

  const handlePriceChange = (min: number, max: number) => {
    setMinPrice(min);
    setMaxPrice(max);
  };

  const handleRatingChange = (rating: number) => {
    setMinRating(rating);
  };

  const handleAmenitiesChange = (amenities: string[]) => {
    setSelectedAmenities(amenities);
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

  const toggleSortOverlay = () => {
    setSortOverlayVisible(!sortOverlayVisible);
  };

  const handleSort = (option: SortOption) => {
    setSortBy(option);
    toggleSortOverlay();
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
            placeholderTextColor="#999"
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>
        <View style={styles.mapContainer}>
          <MapComponent
            region={region}
            spots={filteredSpots}
            onRegionChangeComplete={setRegion}
            onSpotPress={openSpotDetails}
            onZoomIn={increaseZoom}
            onZoomOut={decreaseZoom}
            onReset={resetRegion}
          />
        </View>

        <View style={styles.contentContainer}>
          <ScrollView horizontal style={styles.filtersContainer}>
            <PriceFilter
              onFilterChange={handlePriceChange}
              initialMinPrice={0}
              initialMaxPrice={25}
            />
            <RatingFilter
              onFilterChange={handleRatingChange}
              initialRating={0}
            />
            <AmenitiesFilter onFilterChange={handleAmenitiesChange} />
          </ScrollView>

          <View style={styles.bottomSheet}>
            <View style={styles.bottomSheetHeader}>
              <Text style={styles.bottomSheetTitle}>Parking Spots</Text>
              <Button
                title="Sort by"
                type="clear"
                icon={
                  <Icon
                    name="sort"
                    size={20}
                    color="#ffce00"
                    style={{ marginRight: 5 }}
                  />
                }
                titleStyle={{ color: "#000" }}
                onPress={toggleSortOverlay}
              />
            </View>
            <FlatList
              data={filteredSpots}
              keyExtractor={(item) => item.id.toString()}
              renderItem={({ item: spot }) => (
                <TouchableOpacity
                  style={styles.parkingSpotCard}
                  onPress={() => openSpotDetails(spot)}
                >
                  <Image
                    source={{ uri: spot.images[0] }}
                    style={styles.parkingSpotImage}
                  />
                  <View style={styles.parkingSpotInfo}>
                    <Text style={styles.parkingSpotPrice}>
                      ${spot.price}/hr
                    </Text>
                    <Text style={styles.parkingSpotLocation}>{spot.name}</Text>
                    <Text style={styles.parkingSpotRating}>
                      <FontAwesome name="star" size={16} color="#ffce00" />{" "}
                      {spot.rating} ({spot.reviews})
                    </Text>
                    <Text style={styles.parkingSpotDistance}>
                      {spot.distance.toFixed(1)} mi. away
                    </Text>
                  </View>
                </TouchableOpacity>
              )}
            />
          </View>
        </View>

        <ParkingSpotModal
          spot={selectedSpot}
          visible={modalVisible}
          onClose={() => setModalVisible(false)}
        />

        <Overlay
          isVisible={sortOverlayVisible}
          onBackdropPress={toggleSortOverlay}
          overlayStyle={styles.sortOverlay}
        >
          <View>
            <Text style={styles.sortOverlayTitle}>Sort by</Text>
            <TouchableOpacity
              onPress={() => handleSort("distance_asc")}
              style={styles.sortOption}
            >
              <Icon
                name="place"
                size={20}
                color="#ffce00"
                style={styles.sortOptionIcon}
              />
              <Text style={styles.sortOptionText}>Nearest</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => handleSort("price_asc")}
              style={styles.sortOption}
            >
              <Icon
                name="arrow-upward"
                size={20}
                color="#ffce00"
                style={styles.sortOptionIcon}
              />
              <Text style={styles.sortOptionText}>Price: Low to High</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => handleSort("price_desc")}
              style={styles.sortOption}
            >
              <Icon
                name="arrow-downward"
                size={20}
                color="#ffce00"
                style={styles.sortOptionIcon}
              />
              <Text style={styles.sortOptionText}>Price: High to Low</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => handleSort("rating_desc")}
              style={styles.sortOption}
            >
              <Icon
                name="star"
                size={20}
                color="#ffce00"
                style={styles.sortOptionIcon}
              />
              <Text style={styles.sortOptionText}>Highest Rated</Text>
            </TouchableOpacity>
          </View>
        </Overlay>
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
  contentContainer: {
    flex: 1,
  },
  filtersContainer: {
    paddingHorizontal: 10,
    paddingVertical: 10,
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
  bottomSheetHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  bottomSheetTitle: {
    fontSize: 18,
    fontWeight: "bold",
  },
  parkingSpotCard: {
    flexDirection: "row",
    marginBottom: 15,
    backgroundColor: "#fff",
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  parkingSpotImage: {
    width: 100,
    height: 100,
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
  },
  parkingSpotInfo: {
    flex: 1,
    padding: 10,
  },
  parkingSpotPrice: {
    fontWeight: "bold",
    fontSize: 16,
  },
  parkingSpotLocation: {
    fontSize: 14,
    color: "#666",
    marginBottom: 2,
  },
  parkingSpotRating: {
    fontSize: 14,
    color: "#666",
    marginBottom: 2,
  },
  parkingSpotDistance: {
    fontSize: 14,
    color: "#666",
  },
  sortOverlay: {
    width: 250,
    borderRadius: 10,
    padding: 0,
    backgroundColor: "#fff",
  },
  sortOverlayTitle: {
    fontSize: 18,
    fontWeight: "bold",
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  sortOption: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  sortOptionIcon: {
    marginRight: 10,
  },
  sortOptionText: {
    fontSize: 16,
    color: "#333",
  },
});
