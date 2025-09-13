import { View, StatusBar, StyleSheet } from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import CustomText from "@/src/components/CustomText";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useScheduleStore } from "@/src/store";
import { Schedule } from "@/src/types";
import SecondaryButton from "@/src/components/SecondaryButton";
import { Ionicons } from "@expo/vector-icons";

const WorkoutLogging = () => {
  const { scheduleId } = useLocalSearchParams<{ scheduleId: string }>();
  const router = useRouter();
  const [timer, setTimer] = useState<number>(0); // start from 0 seconds
  const { getOneSchedule } = useScheduleStore();
  const schedule = getOneSchedule(scheduleId) as Schedule;
  const [stopTimer, setStopTimer] = useState<boolean>(false);
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

  const handleFinish = () => {
    // stop timer
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
});

export default WorkoutLogging;
