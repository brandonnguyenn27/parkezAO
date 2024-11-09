import React, { useState } from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
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
      {isActive && (
        <ScrollView style={styles.dropdown}>
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
      )}
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
  dropdown: {
    position: "absolute",
    top: 40,
    left: 0,
    right: 0,
    backgroundColor: "#fff",
    padding: 10,
    borderRadius: 5,
    borderColor: "#ddd",
    borderWidth: 1,
    zIndex: 1000,
    maxHeight: 200,
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
});
