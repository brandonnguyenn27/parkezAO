import React from "react";
import { StyleSheet, View, TouchableOpacity, Text } from "react-native";
import MapView, { Marker, Circle } from "react-native-maps";
import { ParkingSpot } from "@/app/data/parking";

interface MapComponentProps {
  region: {
    latitude: number;
    longitude: number;
    latitudeDelta: number;
    longitudeDelta: number;
  };
  spots: ParkingSpot[];
  onRegionChangeComplete: (region: any) => void;
  onSpotPress: (spot: ParkingSpot) => void;
  onZoomIn: () => void;
  onZoomOut: () => void;
  onReset: () => void;
}

export default function MapComponent({
  region,
  spots,
  onRegionChangeComplete,
  onSpotPress,
  onZoomIn,
  onZoomOut,
  onReset,
}: MapComponentProps) {
  return (
    <View style={styles.mapContainer}>
      <MapView
        style={styles.map}
        region={region}
        onRegionChangeComplete={onRegionChangeComplete}
      >
        <Marker
          coordinate={{
            latitude: 37.3352,
            longitude: -121.8811,
          }}
        >
          <View style={styles.userMarkerContainer}>
            <View style={styles.userMarkerDot} />
          </View>
        </Marker>
        {spots.map((spot) => (
          <React.Fragment key={spot.id}>
            <Marker
              coordinate={{
                latitude: spot.latitude,
                longitude: spot.longitude,
              }}
              onPress={() => onSpotPress(spot)}
            >
              <View style={styles.markerContainer}>
                <Text style={styles.markerText}>${spot.price}</Text>
              </View>
            </Marker>
            <Circle
              center={{
                latitude: spot.latitude,
                longitude: spot.longitude,
              }}
              radius={100} // 100 meters radius
              fillColor="rgba(255, 206, 0, 0.1)" // Low opacity yellow
              strokeColor="rgba(255, 206, 0, 0.3)"
              strokeWidth={1}
            />
          </React.Fragment>
        ))}
      </MapView>
      <View style={styles.zoomControls}>
        <TouchableOpacity onPress={onZoomIn} style={styles.zoomButton}>
          <Text style={styles.zoomButtonText}>+</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={onZoomOut} style={styles.zoomButton}>
          <Text style={styles.zoomButtonText}>-</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={onReset} style={styles.zoomButton}>
          <Text style={styles.zoomButtonText}>Reset</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  mapContainer: {
    flex: 1,
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
  userMarkerContainer: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: "rgba(0, 122, 255, 0.1)",
    borderWidth: 1,
    borderColor: "rgba(0, 122, 255, 0.3)",
    justifyContent: "center",
    alignItems: "center",
  },
  userMarkerDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: "rgb(0, 122, 255)",
  },
});
