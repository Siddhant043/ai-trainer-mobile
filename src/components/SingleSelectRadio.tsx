import { StyleSheet, TouchableOpacity, View } from "react-native";
import React from "react";
import CustomText from "./CustomText";
import { Ionicons } from "@expo/vector-icons";

const SingleSelectRadio = ({
  label,
  options,
  value,
  handleValueChange,
}: {
  label: string;
  options: { label: string; value: string }[];
  value: string;
  handleValueChange: (value: string) => void;
}) => {
  return (
    <View>
      <CustomText style={styles.label}>{label}</CustomText>
      <View style={styles.optionsContainer}>
        {options.map((option) => (
          <TouchableOpacity
            key={option.value}
            onPress={() => handleValueChange(option.value)}
            style={styles.option}
          >
            <View style={styles.radioContainer}>
              {value === option.value ? (
                <Ionicons name="radio-button-on" size={24} color="black" />
              ) : (
                <Ionicons name="radio-button-off" size={24} color="black" />
              )}
              <CustomText style={styles.optionLabel}>{option.label}</CustomText>
            </View>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  label: {
    fontSize: 16,
    color: "#707070",
    marginBottom: 10,
  },
  optionsContainer: {
    flexDirection: "row",
    gap: 10,
  },
  option: {
    padding: 10,
    borderRadius: 10,
  },
  radioContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  optionLabel: {
    fontSize: 16,
  },
});

export default SingleSelectRadio;
