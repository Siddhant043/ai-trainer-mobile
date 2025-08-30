import { View, StyleSheet, TextInput, KeyboardTypeOptions } from "react-native";
import React from "react";
import CustomText from "./CustomText";

const CustomTextInput = ({
  label,
  type,
  placeholder,
  value,
  handleValueChange,
}: {
  label: string;
  type?: KeyboardTypeOptions;
  placeholder: string;
  value: string;
  handleValueChange: (text: string) => void;
}) => {
  return (
    <View style={styles.container}>
      <CustomText style={styles.label}>{label}</CustomText>
      <TextInput
        style={styles.input}
        value={value}
        placeholderTextColor="#707070"
        keyboardType={type ?? "default"}
        onChangeText={handleValueChange}
        placeholder={placeholder}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    alignItems: "flex-start",
    width: "100%",
    marginVertical: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: "regular",
    color: "#707070",
  },
  input: {
    width: "100%",
    height: 56,
    borderRadius: 8,
    paddingHorizontal: 10,
    backgroundColor: "#EDEDED",
    marginTop: 5,
    color: "#000",
    fontSize: 20,
    fontFamily: "OutfitRegular",
  },
});

export default CustomTextInput;
