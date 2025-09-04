import { View, StyleSheet } from "react-native";
import React from "react";
import CustomText from "./CustomText";

const AgentMessage = ({ type, value }: { type: string; value: string }) => {
  const typeCapitalized = type.charAt(0).toUpperCase() + type.slice(1);

  const backgroundMap = {
    suggestion: "#FFF4CC",
    tip: "#D8EBED",
    warning: "#FFB6D0",
    info: "#B8E5BE",
    danger: "#FFB6B6",
  };
  return (
    <View
      style={[
        styles.container,
        { backgroundColor: backgroundMap[type as keyof typeof backgroundMap] },
      ]}
    >
      <CustomText style={styles.type}>
        {typeCapitalized}: <CustomText style={styles.value}>{value}</CustomText>
      </CustomText>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 12,
    borderRadius: 12,
    marginVertical: 6,
  },
  type: {
    fontSize: 16,
    fontFamily: "OutfitSemiBold", // bold for the label
    color: "#000",
  },
  value: {
    fontSize: 16,
    fontFamily: "OutfitRegular", // normal weight for value
    color: "#000",
  },
});

export default AgentMessage;
