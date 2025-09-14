import {
  View,
  StatusBar,
  StyleSheet,
  ScrollView,
  Alert,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import CustomText from "@/src/components/CustomText";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useScheduleStore, useUserStore } from "@/src/store";
import { Schedule } from "@/src/types";
import SecondaryButton from "@/src/components/SecondaryButton";
import { Ionicons } from "@expo/vector-icons";
import ExerciseLogger from "@/src/components/ExerciseLogger";
import { useScheduleRecordStore } from "@/src/store";
import * as fs from "node:fs/promises";

const WorkoutLogging = () => {
  const { scheduleId } = useLocalSearchParams<{ scheduleId: string }>();
  const router = useRouter();
  const { user } = useUserStore();
  const [timer, setTimer] = useState<number>(0); // start from 0 seconds
  const { getOneSchedule } = useScheduleStore();
  const schedule = getOneSchedule(scheduleId) as Schedule;
  const [stopTimer, setStopTimer] = useState<boolean>(false);
  const { getScheduleRecords } = useScheduleRecordStore();
  // redirect if schedule not found
  useEffect(() => {
    if (!schedule) {
      router.navigate("/(tabs)/workouts");
    }
  }, [schedule]);

  // run timer
  useEffect(() => {
    if (!stopTimer) {
      const interval = setInterval(() => {
        setTimer((prev) => prev + 1);
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [stopTimer]);

  const { name, exercises } = schedule;

  console.log(exercises[0].loggingType);

  const currentDate = new Date().toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });

  // format helper
  const formatTime = (seconds: number) => {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;

    const paddedMins = String(mins).padStart(2, "0");
    const paddedSecs = String(secs).padStart(2, "0");

    if (hrs > 0) {
      const paddedHrs = String(hrs).padStart(2, "0");
      return `${paddedHrs}:${paddedMins}:${paddedSecs}`;
    }

    return `${paddedMins}:${paddedSecs}`;
  };

  const checkAllSetsCompleted = () => {
    const scheduleRecords = getScheduleRecords();
    let inCompleteSetCount = 0;
    scheduleRecords.forEach((record: any) =>
      record.exerciseRecords.forEach((exerciseRecord: any) => {
        exerciseRecord.sets.forEach((set: any) => {
          if (!set.completed) {
            inCompleteSetCount++;
          }
        });
      })
    );
    return inCompleteSetCount === 0;
  };

  const handleFinish = async () => {
    // stop timer
    const allSetsCompleted = checkAllSetsCompleted();
    if (!allSetsCompleted) {
      Alert.alert("Please complete all sets");
      return;
    }
    const scheduleRecords = getScheduleRecords();
    // console.log(JSON.stringify(scheduleRecords, null, 2));
    setStopTimer(true);
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <View style={styles.header}>
        <View style={styles.headerTop}>
          <CustomText style={styles.title}>{name}</CustomText>
          <SecondaryButton onPress={handleFinish} size="small">
            Finish
          </SecondaryButton>
        </View>
        <View style={styles.headerBottom}>
          <View style={styles.dateContainer}>
            <Ionicons name="calendar-outline" size={24} color="#707070" />
            <CustomText style={styles.dateText}>{currentDate}</CustomText>
          </View>
          <View style={styles.timeContainer}>
            <Ionicons name="time-outline" size={24} color="#707070" />
            <CustomText style={styles.timeText}>{formatTime(timer)}</CustomText>
          </View>
        </View>
      </View>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.keyboardAvoidingView}
      >
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.exercisesContainer}>
            {exercises.map((exercise) => (
              <ExerciseLogger
                key={exercise._id}
                exercise={exercise}
                scheduleId={scheduleId}
              />
            ))}
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
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
    color: "#707070",
  },
  header: {
    flexDirection: "column",
    gap: 20,
  },
  headerTop: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  headerBottom: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  dateContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
  },
  dateText: {
    fontSize: 16,
    color: "#707070",
  },
  timeContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
  },
  timeText: {
    fontSize: 16,
    color: "#707070",
  },
  exercisesContainer: {
    flex: 1,
    flexDirection: "column",
    gap: 30,
    marginTop: 30,
  },
  keyboardAvoidingView: {
    flex: 1,
  },
});

export default WorkoutLogging;
