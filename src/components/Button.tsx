import { Text, StyleSheet, Pressable } from "react-native";
import React from "react";

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
      <Text style={styles.buttonText}>{children}</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: "#000",
    padding: 10,
    borderRadius: 8,
    height: 46,
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
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default Button;
