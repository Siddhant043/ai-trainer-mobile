import { View, StyleSheet, ScrollView } from "react-native";
import { Picker } from "@react-native-picker/picker";
import React, { useState } from "react";

import CustomText from "../CustomText";

import Button from "../Button";
import CustomPicker from "../CustomPicker";

const StepFour = ({ setNext }: { setNext: (step: number) => void }) => {
  const [schedulePreference, setSchedulePreference] = useState<
    "morning" | "afternoon" | "evening" | "anytime"
  >("morning");
  const [timeAvailable, setTimeAvailable] = useState<
    | "30-mins"
    | "1-hour"
    | "1-hours-30-mins"
    | "2-hours"
    | "2-hours-30-mins"
    | "3-hours"
    | "more-than-3-hours"
  >("1-hours-30-mins");

  const [workoutLocation, setWorkoutLocation] = useState<
    "home" | "gym" | "park" | "other"
  >("gym");

  const workoutLocationOptions = [
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

  const schedulePreferenceOptions = [
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

  const timeAvailableOptions = [
    {
      label: "30 mins",
      value: "30-mins",
    },
    {
      label: "1 hour",
      value: "1-hour",
    },
    {
      label: "1 hours 30 mins",
      value: "1-hours-30-mins",
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
    setSchedulePreference(
      value as "morning" | "afternoon" | "evening" | "anytime"
    );
  };

  const handleTimeAvailableChange = (value: string) => {
    setTimeAvailable(
      value as
        | "30-mins"
        | "1-hour"
        | "1-hours-30-mins"
        | "2-hours"
        | "2-hours-30-mins"
        | "3-hours"
        | "more-than-3-hours"
    );
  };

  const handleWorkoutLocationChange = (value: string) => {
    setWorkoutLocation(value as "home" | "gym" | "park" | "other");
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
        <Button onPress={() => setNext(5)}>Next</Button>
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
