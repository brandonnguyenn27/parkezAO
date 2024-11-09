import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Modal,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { Button, CheckBox } from "@rneui/themed";
import Icon from "react-native-vector-icons/MaterialIcons";

interface AmenitiesFilterProps {
  onFilterChange: (amenities: string[]) => void;
}

const amenitiesList = [
  "Security",
  "EV Charging",
  "Wheelchair Accessible",
  "Covered Parking",
];

export default function AmenitiesFilter({
  onFilterChange,
}: AmenitiesFilterProps) {
  const [isActive, setIsActive] = useState(false);
  const [selectedAmenities, setSelectedAmenities] = useState<string[]>([]);

  const toggleFilter = () => {
    setIsActive(!isActive);
  };

  const toggleAmenity = (amenity: string) => {
    const updatedAmenities = selectedAmenities.includes(amenity)
      ? selectedAmenities.filter((a) => a !== amenity)
      : [...selectedAmenities, amenity];
    setSelectedAmenities(updatedAmenities);
    onFilterChange(updatedAmenities);
  };

  return (
    <View>
      <Button
        title="Amenities"
        type={isActive ? "solid" : "outline"}
        icon={
          <Icon
            name="local-offer"
            size={15}
            color={isActive ? "#fff" : "#000"}
          />
        }
        buttonStyle={[
          styles.filterButton,
          isActive && styles.activeFilterButton,
        ]}
        titleStyle={[
          styles.filterButtonText,
          isActive && styles.activeFilterButtonText,
        ]}
        onPress={toggleFilter}
      />
      <Modal
        animationType="fade"
        transparent={true}
        visible={isActive}
        onRequestClose={toggleFilter}
      >
        <TouchableOpacity
          style={styles.modalOverlay}
          activeOpacity={1}
          onPressOut={toggleFilter}
        >
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Amenities Filter</Text>
            <ScrollView style={styles.amenitiesList}>
              {amenitiesList.map((amenity) => (
                <CheckBox
                  key={amenity}
                  title={amenity}
                  checked={selectedAmenities.includes(amenity)}
                  onPress={() => toggleAmenity(amenity)}
                  containerStyle={styles.checkboxContainer}
                  textStyle={styles.checkboxText}
                />
              ))}
            </ScrollView>
            <Button
              title="Apply"
              onPress={toggleFilter}
              buttonStyle={styles.applyButton}
            />
          </View>
        </TouchableOpacity>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
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
  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 10,
    width: "80%",
    maxHeight: "80%",
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 15,
  },
  amenitiesList: {
    maxHeight: 300,
  },
  checkboxContainer: {
    backgroundColor: "transparent",
    borderWidth: 0,
    padding: 0,
    marginLeft: 0,
  },
  checkboxText: {
    fontWeight: "normal",
  },
  applyButton: {
    marginTop: 15,
    backgroundColor: "#007AFF",
  },
});
