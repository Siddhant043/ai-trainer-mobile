import { View, Text, Pressable, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import React from "react";

const AppleSignInButton = () => {
  return (
    <Pressable
      onPress={() => {}}
      style={({ pressed }) => [
        styles.button,
        pressed && styles.buttonPressed, // apply on press
      ]}
    >
      <Ionicons name="logo-apple" size={24} color="#000" />
      <Text>Sign up with Apple</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: "#ffffff",
    padding: 10,
    borderRadius: 8,
    height: 46,
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    borderWidth: 1,
    borderColor: "#D6D6D6",
    flexDirection: "row",
    gap: 10,
  },
  buttonPressed: {
    backgroundColor: "#ECE8E8",
  },
  buttonText: {
    color: "#000",
    textAlign: "center",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default AppleSignInButton;
