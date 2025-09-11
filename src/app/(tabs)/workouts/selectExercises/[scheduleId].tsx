import { Text, StyleSheet, View, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import CustomText from "@/src/components/CustomText";
import SelectExercisesChild from "@/src/components/SelectExercisesChild";
import Button from "@/src/components/Button";
import { Exercise } from "@/src/types";

const SelectExercises = () => {
  const { scheduleId } = useLocalSearchParams<{ scheduleId: string }>();
  const router = useRouter();
  const [selectedExercises, setSelectedExercises] = useState<Exercise[]>([]);

  const handleBack = () => {
    router.navigate(`/(tabs)/workouts/viewWorkoutSplit/${scheduleId}`);
  };

  const handleDone = () => {
    console.log("selectedExercises", selectedExercises);
  };
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.headerTitle}>
          <TouchableOpacity onPress={handleBack}>
            <Ionicons name="chevron-back" size={24} color="black" />
          </TouchableOpacity>
          <CustomText style={styles.title}>Select Exercises</CustomText>
        </View>
        <Button size="small" onPress={handleDone}>
          Done
        </Button>
      </View>
      <SelectExercisesChild
        selectedExercises={selectedExercises}
        setSelectedExercises={setSelectedExercises}
        isSelectable={true}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: "#f9f6f6",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  headerTitle: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    gap: 10,
  },
  title: {
    fontSize: 20,
    color: "#707070",
  },
});

export default SelectExercises;
