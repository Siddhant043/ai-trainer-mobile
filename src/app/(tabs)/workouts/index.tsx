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
import { useWorkoutStore } from "@/src/store";
import { WEEKDAYS } from "@/src/constants";

const Workouts = () => {
  const router = useRouter();
  const { getActiveWorkout } = useWorkoutStore();
  const activeWorkout = getActiveWorkout();
  const currentDay = new Date().getDay();
  const currentScheduleDetails =
    activeWorkout?.schedules?.find((schedule) =>
      schedule.days?.includes(WEEKDAYS[currentDay])
    ) || null;
  const otherSchedules =
    activeWorkout?.schedules?.filter(
      (schedule) => !schedule.days?.includes(WEEKDAYS[currentDay])
    ) || null;

  const handleWorkoutSplits = () => {
    router.navigate("/(tabs)/workouts/splits");
  };

  const handleCheckHistory = () => {
    router.navigate("/(tabs)/home");
  };
  const handleShowExercises = () => {
    router.navigate("/(tabs)/workouts/checkExercises");
  };

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
                {activeWorkout?.name}
              </CustomText>
            </View>
            {currentScheduleDetails && (
              <ScheduleCard
                scheduleDetails={currentScheduleDetails}
                isCardOpen={true}
                isActivityCard={true}
              />
            )}

            {otherSchedules &&
              otherSchedules.map((schedule) => (
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
    marginBottom: 70,
  },
});

export default Workouts;
