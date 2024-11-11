import React, { useState } from "react";
import { View, Text, StyleSheet, Modal, TouchableOpacity } from "react-native";
import { Button } from "@rneui/themed";
import { Slider } from "@rneui/themed";
import Icon from "react-native-vector-icons/MaterialIcons";

interface PriceFilterProps {
  onFilterChange: (minPrice: number, maxPrice: number) => void;
  initialMinPrice?: number;
  initialMaxPrice?: number;
}

export default function PriceFilter({
  onFilterChange,
  initialMinPrice = 0,
  initialMaxPrice = 25,
}: PriceFilterProps) {
  const [isActive, setIsActive] = useState(false);
  const [minPrice, setMinPrice] = useState(initialMinPrice);
  const [maxPrice, setMaxPrice] = useState(initialMaxPrice);

  const toggleFilter = () => {
    setIsActive(!isActive);
  };

  const handleMinPriceChange = (value: number) => {
    const newMinPrice = Math.min(value, maxPrice);
    setMinPrice(newMinPrice);
    onFilterChange(newMinPrice, maxPrice);
  };

  const handleMaxPriceChange = (value: number) => {
    const newMaxPrice = Math.max(value, minPrice);
    setMaxPrice(newMaxPrice);
    onFilterChange(minPrice, newMaxPrice);
  };

  return (
    <View>
      <Button
        title="Price"
        type={isActive ? "solid" : "outline"}
        icon={
          <Icon
            name="attach-money"
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
            <Text style={styles.modalTitle}>Price Filter</Text>
            <Text>Min Price: ${minPrice}</Text>
            <Slider
              value={minPrice}
              onValueChange={handleMinPriceChange}
              minimumValue={0}
              maximumValue={100}
              step={1}
              allowTouchTrack
              thumbStyle={styles.sliderThumb}
            />
            <Text>Max Price: ${maxPrice}</Text>
            <Slider
              value={maxPrice}
              onValueChange={handleMaxPriceChange}
              minimumValue={0}
              maximumValue={25}
              step={1}
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
    backgroundColor: "#ffce00",
    borderColor: "#ffce00",
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
    backgroundColor: "#ffce00",
  },
  applyButton: {
    marginTop: 15,
    backgroundColor: "#ffce00",
  },
});
