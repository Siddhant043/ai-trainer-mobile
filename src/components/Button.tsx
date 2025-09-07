import { Text, StyleSheet, Pressable } from "react-native";
import React from "react";
import CustomText from "./CustomText";

const Button = ({
  onPress,
  size,
  children,
  disabled,
}: {
  onPress: () => void;
  size?: "small" | "medium" | "large";
  children: React.ReactNode;
  disabled?: boolean;
}) => {
  return (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      style={({ pressed }) => [
        styles.button,
        pressed && styles.buttonPressed, // apply on press
        disabled && styles.buttonDisabled,
        size === "small" && styles.buttonSmall,
        size === "medium" && styles.buttonMedium,
        size === "large" && styles.buttonLarge,
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
    fontFamily: "OutfitBold",
    fontSize: 16,
  },
  buttonDisabled: {
    backgroundColor: "#2B2B2B",
  },
  buttonSmall: {
    height: 40,
    width: 100,
  },
  buttonMedium: {
    height: 56,
    width: "auto",
  },
  buttonLarge: {
    height: 72,
    width: "auto",
  },
});

export default Button;
