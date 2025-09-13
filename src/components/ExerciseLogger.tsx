import { StyleSheet, View } from "react-native";
import React, { useState } from "react";
import { Exercise } from "../types";
import CustomText from "./CustomText";
import { Entypo } from "@expo/vector-icons";
import SetsLoggingForm from "./SetsLoggingForm";
import TimeDistanceLoggingForm from "./TimeDistanceLoggingForm";
import SetsRepsWeightLoggingForm from "./SetsRepsWeightLoggingForm";
import DurationOnlyLoggingForm from "./DurationOnlyLoggingForm";

const ExerciseLogger = ({
  exercise,
  scheduleId,
}: {
  exercise: Exercise;
  scheduleId: string;
}) => {
  const [exerciseRecord, setExerciseRecord] = useState([]);
  const loggingType = exercise.loggingType;
  return (
    <View style={styles.container}>
      <View style={styles.exerciseNameContainer}>
        <CustomText style={styles.exerciseName}>
          {exercise.exerciseName}
        </CustomText>
        <Entypo
          name="dots-three-horizontal"
          size={24}
          color="black"
          onPress={() => {}}
        />
      </View>
      <LoggingContainer
        loggingType={loggingType}
        exerciseRecord={exerciseRecord}
        setExerciseRecord={setExerciseRecord}
        exerciseId={exercise._id}
        scheduleId={scheduleId}
      />
    </View>
  );
};

const LoggingContainer = ({
  loggingType,
  exerciseRecord,
  setExerciseRecord,
  exerciseId,
  scheduleId,
}: {
  loggingType: string;
  exerciseRecord: any;
  setExerciseRecord: any;
  exerciseId: string;
  scheduleId: string;
}) => {
  const getLoggingForm = (loggingType: string) => {
    switch (loggingType) {
      case "sets_reps":
        return (
          <SetsLoggingForm exerciseId={exerciseId} scheduleId={scheduleId} />
        );
      case "time_distance":
        return (
          <TimeDistanceLoggingForm
            exerciseId={exerciseId}
            scheduleId={scheduleId}
          />
        );
      case "sets_reps_weight":
        return (
          <SetsRepsWeightLoggingForm
            exerciseId={exerciseId}
            scheduleId={scheduleId}
          />
        );
      case "duration_only":
        return (
          <DurationOnlyLoggingForm
            exerciseId={exerciseId}
            scheduleId={scheduleId}
          />
        );
    }
  };
  return (
    <View style={styles.loggingContainer}>{getLoggingForm(loggingType)}</View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    gap: 10,
  },
  exerciseNameContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  exerciseName: {
    flex: 1,
    fontSize: 16,
    textTransform: "capitalize",
    fontFamily: "OutfitBold",
  },
  loggingContainer: {
    flexDirection: "column",
    marginTop: 5,
    gap: 5,
  },
});

export default ExerciseLogger;
