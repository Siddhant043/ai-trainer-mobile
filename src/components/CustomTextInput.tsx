import {
  View,
  Text,
  StyleSheet,
  TextInput,
  KeyboardTypeOptions,
} from "react-native";
import React from "react";

const CustomTextInput = ({
  label,
  type,
  placeholder,
  value,
  handleValueChange,
}: {
  label: string;
  type: KeyboardTypeOptions;
  placeholder: string;
  value: string;
  handleValueChange: (text: string) => void;
}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        style={styles.input}
        value={value}
        keyboardType={type}
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
    height: 55,
    borderRadius: 8,
    paddingHorizontal: 10,
    backgroundColor: "#D6D6D6",
    marginTop: 5,
    color: "#000",
    fontSize: 20,
    fontWeight: "regular",
  },
});

export default CustomTextInput;
