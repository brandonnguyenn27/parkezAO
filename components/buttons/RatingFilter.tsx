import React, { useState } from "react";
import { View, Text, StyleSheet, Modal, TouchableOpacity } from "react-native";
import { Button } from "@rneui/themed";
import { Slider } from "@rneui/themed";
import Icon from "react-native-vector-icons/MaterialIcons";

interface RatingFilterProps {
  onFilterChange: (rating: number) => void;
  initialRating?: number;
}

export default function RatingFilter({
  onFilterChange,
  initialRating = 0,
}: RatingFilterProps) {
  const [isActive, setIsActive] = useState(false);
  const [rating, setRating] = useState(initialRating);

  const toggleFilter = () => {
    setIsActive(!isActive);
  };

  const handleRatingChange = (value: number) => {
    setRating(value);
    onFilterChange(value);
  };

  return (
    <View>
      <Button
        title="Rating"
        type={isActive ? "solid" : "outline"}
        icon={<Icon name="star" size={15} color={isActive ? "#fff" : "#000"} />}
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
            <Text style={styles.modalTitle}>Rating Filter</Text>
            <Text>Minimum Rating: {rating.toFixed(1)} stars</Text>
            <Slider
              value={rating}
              onValueChange={handleRatingChange}
              minimumValue={0}
              maximumValue={5}
              step={0.5}
              allowTouchTrack
              thumbStyle={styles.sliderThumb}
            />
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
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 15,
  },
  sliderThumb: {
    height: 20,
    width: 20,
    backgroundColor: "#007AFF",
  },
  applyButton: {
    marginTop: 15,
    backgroundColor: "#007AFF",
  },
});
