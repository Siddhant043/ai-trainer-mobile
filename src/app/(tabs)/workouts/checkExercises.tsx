import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import SelectExercisesChild from "@/src/components/SelectExercisesChild";
import CustomText from "@/src/components/CustomText";
import { router } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { Exercise } from "@/src/types";

const CheckExercises = () => {
  const [selectedExercises, setSelectedExercises] = useState<Exercise[]>([]);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => router.navigate("/(tabs)/workouts")}
        >
          <Ionicons name="chevron-back" size={20} color="#707070" />
        </TouchableOpacity>
        <CustomText style={styles.title}>Exercises</CustomText>
      </View>
      <View style={styles.content}>
        <SelectExercisesChild
          selectedExercises={selectedExercises}
          setSelectedExercises={setSelectedExercises}
          isSelectable={false}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f9f6f6",
  },
  header: {
    flexDirection: "row",
    justifyContent: "flex-start",
    gap: 10,
    alignItems: "center",
    padding: 10,
  },
  content: {
    flex: 1,
    paddingHorizontal: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: "regular",
    color: "#707070",
  },
});

export default CheckExercises;
