import { View, StyleSheet, ScrollView } from "react-native";
import { Picker } from "@react-native-picker/picker";
import React, { useState } from "react";

import CustomText from "../CustomText";

import Button from "../Button";
import CustomPicker from "../CustomPicker";
import { useUserStore } from "@/src/store";
import {
  SCHEDULE_PREFERENCE,
  TIME_AVAILABLE,
  WORKOUT_LOCATION,
} from "@/src/types";

const StepFour = ({ setNext }: { setNext: (step: number) => void }) => {
  const { user, setUser } = useUserStore();
  const [schedulePreference, setSchedulePreference] =
    useState<SCHEDULE_PREFERENCE>(
      user?.exercisePreferences?.schedulePreference || "morning"
    );
  const [timeAvailable, setTimeAvailable] = useState<TIME_AVAILABLE>(
    user?.exercisePreferences?.timeAvailable || "1-hour-30-mins"
  );

  const [workoutLocation, setWorkoutLocation] = useState<WORKOUT_LOCATION>(
    user?.exercisePreferences?.workoutLocation || "gym"
  );

  const workoutLocationOptions: { label: string; value: WORKOUT_LOCATION }[] = [
    {
      label: "Home",
      value: "home",
    },
    {
      label: "Gym",
      value: "gym",
    },
    {
      label: "Park",
      value: "park",
    },
    {
      label: "Other",
      value: "other",
    },
  ];

  const schedulePreferenceOptions: {
    label: string;
    value: SCHEDULE_PREFERENCE;
  }[] = [
    {
      label: "Morning",
      value: "morning",
    },
    {
      label: "Afternoon",
      value: "afternoon",
    },
    {
      label: "Evening",
      value: "evening",
    },
    {
      label: "Anytime",
      value: "anytime",
    },
  ];

  const timeAvailableOptions: { label: string; value: TIME_AVAILABLE }[] = [
    {
      label: "30 mins",
      value: "30-mins",
    },
    {
      label: "1 hour",
      value: "1-hour",
    },
    {
      label: "1 hour 30 mins",
      value: "1-hour-30-mins",
    },
    {
      label: "2 hours",
      value: "2-hours",
    },
    {
      label: "2 hours 30 mins",
      value: "2-hours-30-mins",
    },
    {
      label: "3 hours",
      value: "3-hours",
    },
    {
      label: "More than 3 hours",
      value: "more-than-3-hours",
    },
  ];

  const handleSchedulePreferenceChange = (value: string) => {
    setSchedulePreference(value as SCHEDULE_PREFERENCE);
  };

  const handleTimeAvailableChange = (value: string) => {
    setTimeAvailable(value as TIME_AVAILABLE);
  };

  const handleWorkoutLocationChange = (value: string) => {
    setWorkoutLocation(value as WORKOUT_LOCATION);
  };

  const handleNext = () => {
    if (!user?.id || !user?.email) {
      // Handle case where required fields are missing
      return;
    }

    setUser({
      ...user,
      exercisePreferences: {
        ...user?.exercisePreferences,
        schedulePreference: schedulePreference,
        timeAvailable: timeAvailable,
        workoutLocation: workoutLocation,
      },
    });
    setNext(5);
  };

  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <CustomText style={styles.title}>Lifestyle & Availability</CustomText>
      </View>
      <View style={styles.formContainer}>
        <CustomPicker
          options={schedulePreferenceOptions}
          selectedValue={schedulePreference}
          onValueChange={handleSchedulePreferenceChange}
          label="Schedule Preference"
        />
        <CustomPicker
          options={timeAvailableOptions}
          selectedValue={timeAvailable}
          onValueChange={handleTimeAvailableChange}
          label="Time Available"
        />
        <CustomPicker
          options={workoutLocationOptions}
          selectedValue={workoutLocation}
          onValueChange={handleWorkoutLocationChange}
          label="Workout Location"
        />
        <Button onPress={handleNext}>Next</Button>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
  },
  titleContainer: {
    flexDirection: "column",
    gap: 5,
  },
  title: {
    fontSize: 20,
  },
  subtitle: {
    fontSize: 16,
    color: "#707070",
  },
  formContainer: {
    flex: 1,
    marginTop: 20,
    flexDirection: "column",
    gap: 10,
  },
});

export default StepFour;
