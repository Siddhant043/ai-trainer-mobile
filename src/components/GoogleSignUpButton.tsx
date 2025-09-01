import { TouchableOpacity, StyleSheet } from "react-native";
import CustomText from "./CustomText";
import { Ionicons } from "@expo/vector-icons";
import React from "react";

const GoogleSignInButton = () => {
  return (
    <TouchableOpacity
      onPress={() => {}}
      activeOpacity={0.8}
      style={styles.button}
    >
      <Ionicons name="logo-google" size={24} color="#000" />
      <CustomText style={styles.buttonText}>Sign up with Google</CustomText>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#D6D6D6",
    borderRadius: 10,
    height: 56,
    width: "100%",
    paddingHorizontal: 16,
    gap: 10, // if RN < 0.71 → replace with marginLeft on text
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  buttonText: {
    color: "#000",
    fontSize: 16,
    fontFamily: "OutfitBold",
  },
});

export default GoogleSignInButton;
