import React, { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { Button } from "@rneui/themed";
import { Slider } from "@rneui/themed";
import Icon from "react-native-vector-icons/MaterialIcons";

interface PriceFilterProps {
  onFilterChange: (minPrice: number, maxPrice: number) => void;
}

export default function PriceFilter({ onFilterChange }: PriceFilterProps) {
  const [isActive, setIsActive] = useState(false);
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(100);

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
      {isActive && (
        <View style={styles.dropdown}>
          <Text>Min Price: ${minPrice}</Text>
          <Slider
            value={minPrice}
            onValueChange={handleMinPriceChange}
            minimumValue={0}
            maximumValue={100}
            step={1}
            allowTouchTrack
            thumbStyle={{ height: 20, width: 20, backgroundColor: "#007AFF" }}
          />
          <Text>Max Price: ${maxPrice}</Text>
          <Slider
            value={maxPrice}
            onValueChange={handleMaxPriceChange}
            minimumValue={0}
            maximumValue={100}
            step={1}
            allowTouchTrack
            thumbStyle={{ height: 20, width: 20, backgroundColor: "#007AFF" }}
          />
        </View>
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
  },
});
