import { StyleSheet, Pressable } from "react-native";
import React from "react";
import CustomText from "./CustomText";

const SecondaryButton = ({
  onPress,
  children,
  disabled,
  size,
}: {
  onPress: () => void;
  children: React.ReactNode;
  disabled?: boolean;
  size?: "small" | "medium" | "large";
}) => {
  return (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      style={({ pressed }) => [
        styles.base,
        !size && styles.fullWidth, // only full width when size is not passed
        pressed && styles.buttonPressed,
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
  base: {
    backgroundColor: "#fff",
    padding: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#D6D6D6",
    height: 56,
    alignItems: "center",
    justifyContent: "center",
  },
  fullWidth: {
    flex: 1,
  },
  buttonPressed: {
    opacity: 0.8,
  },
  buttonText: {
    color: "#000",
    textAlign: "center",
    fontFamily: "OutfitSemiBold",
    fontSize: 16,
  },
  buttonDisabled: {
    backgroundColor: "#f5f5f5",
  },
  buttonSmall: {
    height: 40,
    width: 100, // define width for small
  },
  buttonMedium: {
    height: 48,
    width: 160, // define width for medium
  },
  buttonLarge: {
    height: 56,
    width: 220, // define width for large
  },
});

export default SecondaryButton;
