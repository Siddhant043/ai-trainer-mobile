import { Text, StyleSheet, Pressable } from "react-native";
import React from "react";
import CustomText from "./CustomText";

const Button = ({
  onPress,
  children,
}: {
  onPress: () => void;
  children: React.ReactNode;
}) => {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.button,
        pressed && styles.buttonPressed, // apply on press
      ]}
    >
      <CustomText style={styles.buttonText}>{children}</CustomText>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: "#000",
    padding: 10,
    borderRadius: 8,
    height: 56,
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
  },
  buttonPressed: {
    backgroundColor: "#2B2B2B",
  },
  buttonText: {
    color: "#fff",
    textAlign: "center",
    fontFamily: "OutfitSemiBold",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default Button;
