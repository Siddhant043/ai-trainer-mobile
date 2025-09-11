import CustomText from "@/src/components/CustomText";
import {
  Modal,
  Pressable,
  ScrollView,
  StyleSheet,
  View,
  TouchableWithoutFeedback,
  Dimensions,
} from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import ScheduleCard from "@/src/components/ScheduleCard";
import SecondaryButton from "@/src/components/SecondaryButton";
import Button from "@/src/components/Button";

const Workouts = () => {
  const router = useRouter();

  const handleWorkoutSplits = () => {
    router.navigate("/(tabs)/workouts/splits");
  };

  const handleCheckHistory = () => {
    router.navigate("/(tabs)/home");
  };
  const handleShowExercises = () => {
    router.navigate("/(tabs)/workouts/checkExercises");
  };
  const currentScheduleDetails = {
    _id: "1",
    name: "Back and Biceps",
    description: "This is a description of the workout split",
    days: ["Monday", "Wednesday", "Friday"],
    exercises: [
      { exerciseName: "Pull Ups" },
      { exerciseName: "Lat Pull Down" },
      { exerciseName: "Close Grip Lat Pull Down" },
      { exerciseName: "Seated Cable Rows" },
      { exerciseName: "Dumbbell Rows" },
      { exerciseName: "T Bar Rows" },
      { exerciseName: "Inclined Dumbbell Curls" },
      { exerciseName: "Hammer Curls" },
    ],
  };

  const otherSchedules = [
    {
      _id: "2",
      name: "Chest and Triceps",
      description: "This is a description of the workout split",
      days: ["Monday", "Wednesday", "Friday"],
      exercises: [
        { exerciseName: "Bench Press" },
        { exerciseName: "Incline Bench Press" },
        { exerciseName: "Decline Bench Press" },
        { exerciseName: "Push Ups" },
        { exerciseName: "Tricep Pushdowns" },
        { exerciseName: "Tricep Extensions" },
        { exerciseName: "Tricep Pushdowns" },
      ],
    },
    {
      _id: "3",
      name: "Legs and Shoulders",
      description: "This is a description of the workout split",
      days: ["Monday", "Wednesday", "Friday"],
      exercises: [
        { exerciseName: "Squats" },
        { exerciseName: "Leg Press" },
        { exerciseName: "Leg Extension" },
        { exerciseName: "Leg Curl" },
        { exerciseName: "Calf Raises" },
        { exerciseName: "Shoulder Press" },
        { exerciseName: "Lateral Raises" },
        { exerciseName: "Front Raises" },
        { exerciseName: "Reverse Flys" },
      ],
    },
  ];

  return (
    <>
      <SafeAreaView style={styles.container}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.header}>
            <CustomText style={styles.title}>Your Workouts</CustomText>
            <Pressable onPress={handleCheckHistory}>
              <CustomText style={styles.link}>Check History</CustomText>
            </Pressable>
          </View>
          <View style={styles.activeSplitContainer}>
            <View style={styles.activeSplitTextValueContainer}>
              <CustomText style={styles.activeSplitTextValueTitle}>
                Active Workout Split:
              </CustomText>
              <CustomText style={styles.activeSplitTextValueName}>
                2-muscle/day
              </CustomText>
            </View>
            <ScheduleCard
              scheduleDetails={currentScheduleDetails}
              isCardOpen={true}
              isActivityCard={true}
            />

            {otherSchedules.map((schedule) => (
              <ScheduleCard
                key={schedule.name}
                scheduleDetails={schedule}
                isActivityCard={true}
              />
            ))}
          </View>
          <View style={styles.buttonsContainer}>
            <SecondaryButton onPress={handleWorkoutSplits}>
              Workout Splits
            </SecondaryButton>
            <Button onPress={handleShowExercises}>Show Exercises</Button>
          </View>
        </ScrollView>
      </SafeAreaView>
    </>
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
    justifyContent: "space-between",
    alignItems: "center",
  },

  title: {
    fontSize: 20,
    fontWeight: "regular",
    color: "#707070",
  },
  link: {
    fontSize: 12,
    fontWeight: "regular",
  },
  activeSplitContainer: {
    marginTop: 40,
    flexDirection: "column",
    gap: 10,
    marginBottom: 20,
  },
  activeSplitTextValueContainer: {
    flexDirection: "row",
    gap: 5,
  },
  activeSplitTextValueTitle: {
    fontSize: 16,
    fontWeight: "regular",
    color: "#707070",
  },
  activeSplitTextValueName: {
    fontSize: 16,
    fontFamily: "Outfit-SemiBold",
    color: "black",
  },
  schedulesContainer: {
    marginTop: 20,
  },
  schedulesTitle: {
    fontSize: 20,
    fontFamily: "OutfitRegular",
    color: "#707070",
  },
  buttonsContainer: {
    flexDirection: "column",
    gap: 10,
  },
});

export default Workouts;
