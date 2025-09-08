import { Text, StyleSheet, Pressable } from "react-native";
import React from "react";
import CustomText from "./CustomText";

const SecondaryButton = ({
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
    backgroundColor: "#fff",
    padding: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#D6D6D6",
    height: 56,
    alignItems: "center",
    justifyContent: "center",
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
});

export default SecondaryButton;
