import React, { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { Button } from "@rneui/themed";
import { Slider } from "@rneui/themed";
import Icon from "react-native-vector-icons/MaterialIcons";

interface RatingFilterProps {
  onFilterChange: (rating: number) => void;
}

export default function RatingFilter({ onFilterChange }: RatingFilterProps) {
  const [isActive, setIsActive] = useState(false);
  const [rating, setRating] = useState(0);

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
      {isActive && (
        <View style={styles.dropdown}>
          <Text>Minimum Rating: {rating.toFixed(1)}</Text>
          <Slider
            value={rating}
            onValueChange={handleRatingChange}
            minimumValue={0}
            maximumValue={5}
            step={0.1}
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
