import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import React from "react";
import CustomText from "./CustomText";

const SingleSelectOptionCard = ({
  equipment,
  index,
  isSelected,
  handleSelectItem,
}: {
  equipment: any;
  index: number;
  isSelected: boolean;
  handleSelectItem: (value: string) => void;
}) => {
  return (
    <TouchableOpacity
      activeOpacity={1}
      style={[
        styles.container,
        index % 2 === 0 && { marginRight: 12 },
        isSelected && { borderWidth: 2, borderColor: "#000" },
      ]}
      onPress={() => handleSelectItem(equipment.value)}
    >
      <CustomText style={styles.title}>{equipment.label}</CustomText>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    gap: 10,
    padding: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#CACACA",
    height: 200,
    textAlign: "center",
  },
  title: {
    fontSize: 16,
  },
});

export default SingleSelectOptionCard;
