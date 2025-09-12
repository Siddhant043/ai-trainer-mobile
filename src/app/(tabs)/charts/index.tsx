import { View, Text, StyleSheet } from "react-native";
import CustomText from "@/src/components/CustomText";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";

const Charts = () => {
  return (
    <SafeAreaView style={styles.container}>
      <CustomText>Charts</CustomText>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f9f6f6",
    padding: 10,
  },
});

export default Charts;
