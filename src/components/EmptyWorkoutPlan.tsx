import { View, StyleSheet } from "react-native";
import CustomText from "./CustomText";
import React from "react";
import Button from "./Button";
import { useRouter } from "expo-router";

const EmptyWorkoutPlan = () => {
  const router = useRouter();
  return (
    <>
      <CustomText style={styles.workoutPlanText}>
        Today's Workout Plan
      </CustomText>
      <View style={styles.container}>
        <CustomText style={styles.title}>No workouts detected</CustomText>
        <CustomText style={styles.description}>
          Add workouts to get started
        </CustomText>
        <Button
          onPress={() => {
            router.push("/workouts");
          }}
        >
          Add Workout
        </Button>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  workoutPlanText: {
    marginTop: 20,
    fontSize: 20,
    fontFamily: "Outfit-Regular",
  },
  container: {
    flex: 1,
    marginTop: 10,
    backgroundColor: "#fff",
    padding: 15,
    height: 180,
    borderRadius: 16,
    alignItems: "center",
    gap: 10,
    justifyContent: "center",
  },
  title: {
    fontSize: 20,
    fontFamily: "Outfit-Regular",
  },
  description: {
    fontSize: 16,
    textAlign: "center",
    fontFamily: "Outfit-Regular",
    color: "#707070",
  },
});

export default EmptyWorkoutPlan;
