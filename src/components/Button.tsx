import { Text, StyleSheet, Pressable } from "react-native";
import React from "react";
import CustomText from "./CustomText";

const Button = ({
  onPress,
  children,
  disabled,
}: {
  onPress: () => void;
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
});

export default Button;
