import { View, Text, StatusBar, StyleSheet } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import CustomText from "@/src/components/CustomText";
import { useLocalSearchParams } from "expo-router";

const WorkoutLogging = () => {
  const { scheduleId } = useLocalSearchParams<{ scheduleId: string }>();
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <CustomText style={styles.title}>Workout Logging</CustomText>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    padding: 10,
    backgroundColor: "#f9f6f6",
  },
  title: {
    fontSize: 20,
  },
});

export default WorkoutLogging;
