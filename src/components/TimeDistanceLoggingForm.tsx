import {
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Alert,
} from "react-native";
import React, { useState, useEffect, useCallback, useRef } from "react";
import CustomText from "./CustomText";
import { Feather } from "@expo/vector-icons";
import useUserStore from "../store/userStore";
import SecondaryButton from "./SecondaryButton";
import { useWorkoutStore } from "../store";
import useScheduleRecordStore from "../store/scheduleRecordStore";

interface SetData {
  setNumber: number;
  distance: number;
  time: number; // stored as seconds
  previous: string;
  completed: boolean;
}

const TimeDistanceLoggingForm = ({
  exerciseId,
  scheduleId,
}: {
  exerciseId: string;
  scheduleId: string;
}) => {
  const { user } = useUserStore();
  const { getActiveWorkout } = useWorkoutStore();
  const workoutId = getActiveWorkout()?._id || "";
  const userId = user._id;

  const {
    scheduleRecords,
    upsertSetByScheduleAndExerciseId,
    initializeScheduleRecord,
  } = useScheduleRecordStore();

  const getPreviousSetData = (exerciseId: string, scheduleId: string) => {
    // TODO: Replace with actual database call
    return "1.5km and 12:00";
  };

  const previousSetData = getPreviousSetData(exerciseId, scheduleId);

  const [sets, setSets] = useState<SetData[]>([
    {
      setNumber: 1,
      distance: 0,
      time: 0, // stored as seconds
      previous: previousSetData,
      completed: false,
    },
  ]);

  const initializationAttempted = useRef(false);

  useEffect(() => {
    initializationAttempted.current = false;
  }, [scheduleId]);

  useEffect(() => {
    if (scheduleId && userId && workoutId && !initializationAttempted.current) {
      const existingRecord = scheduleRecords.find(
        (record) => record.scheduleId === scheduleId && record.userId === userId
      );

      if (!existingRecord) {
        initializationAttempted.current = true;
        initializeScheduleRecord({ scheduleId, userId, workoutId });
      } else {
        initializationAttempted.current = true;
      }
    }
  }, [scheduleId, userId, workoutId, initializeScheduleRecord]);

  useEffect(() => {
    const scheduleRecord = scheduleRecords.find(
      (record) => record.scheduleId === scheduleId && record.userId === userId
    );

    if (scheduleRecord?.exerciseRecords) {
      const exerciseRecord = scheduleRecord.exerciseRecords.find(
        (record) => record.exerciseId === exerciseId
      );

      if (exerciseRecord?.sets && exerciseRecord.sets.length > 0) {
        const loadedSets = exerciseRecord.sets.map((set: any) => ({
          setNumber: set.setNumber,
          distance: set.distance || 0,
          time: set.time || 0,
          previous: previousSetData,
          completed: set.completed || false,
        }));
        setSets(loadedSets);
      }
    }
  }, [scheduleRecords, scheduleId, userId, exerciseId, previousSetData]);

  const handleAddSet = useCallback(() => {
    const newSet: SetData = {
      setNumber: sets.length + 1,
      distance: 0,
      time: 0,
      previous: previousSetData,
      completed: false,
    };
    setSets([...sets, newSet]);
  }, [sets, previousSetData]);

  const handleSetUpdate = useCallback(
    (setNumber: number, updates: Partial<SetData>) => {
      const updatedSets = sets.map((set) =>
        set.setNumber === setNumber ? { ...set, ...updates } : set
      );
      setSets(updatedSets);

      const updatedSet = updatedSets.find((set) => set.setNumber === setNumber);
      if (updatedSet) {
        upsertSetByScheduleAndExerciseId(scheduleId, exerciseId, {
          setNumber: updatedSet.setNumber,
          distance: updatedSet.distance,
          time: updatedSet.time,
          completed: updatedSet.completed,
        });
      }
    },
    [sets, scheduleId, exerciseId, upsertSetByScheduleAndExerciseId]
  );

  const handleSetComplete = useCallback(
    (setNumber: number) => {
      const set = sets.find((s) => s.setNumber === setNumber);
      if (!set) return;

      if (set.completed) {
        handleSetUpdate(setNumber, { completed: false });
      } else {
        if (set.distance <= 0 || set.time <= 0) {
          Alert.alert(
            "Invalid Input",
            "Please enter valid distance and time before completing the set."
          );
          return;
        }
        handleSetUpdate(setNumber, { completed: true });
      }
    },
    [sets, handleSetUpdate]
  );

  return (
    <View style={styles.container}>
      <View style={styles.headers}>
        <CustomText style={styles.headerText}>Set</CustomText>
        <CustomText style={styles.headerText}>Previous</CustomText>
        <CustomText style={styles.headerText}>Distance (km)</CustomText>
        <CustomText style={styles.headerText}>Time</CustomText>
        <Feather name="check" size={24} color="#707070" />
      </View>
      {sets.map((set) => (
        <SetForm
          key={set.setNumber}
          setData={set}
          onUpdate={handleSetUpdate}
          onComplete={handleSetComplete}
        />
      ))}
      <View style={styles.addSetButton}>
        <SecondaryButton size="medium" onPress={handleAddSet}>
          Add New Set
        </SecondaryButton>
      </View>
    </View>
  );
};

// ----------------------
// Helpers
// ----------------------

const formatTime = (seconds: number) => {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins.toString().padStart(2, "0")}:${secs
    .toString()
    .padStart(2, "0")}`;
};

const parseTime = (text: string) => {
  const [m, s] = text.split(":").map((n) => parseInt(n) || 0);
  return m * 60 + s;
};

// ----------------------
// Set Form
// ----------------------

interface SetFormProps {
  setData: SetData;
  onUpdate: (setNumber: number, updates: Partial<SetData>) => void;
  onComplete: (setNumber: number) => void;
}

const SetForm = ({ setData, onUpdate, onComplete }: SetFormProps) => {
  const { distance, time, completed, setNumber, previous } = setData;
  const [distanceValue, setDistanceValue] = useState(distance.toString());
  const [timeValue, setTimeValue] = useState(formatTime(time));

  useEffect(() => {
    setDistanceValue(distance.toString());
    setTimeValue(formatTime(time));
  }, [distance, time]);

  const handleDistanceChange = (text: string) => {
    const numericValue = text.replace(/[^0-9]/g, "");
    setDistanceValue(numericValue);
    const distanceNum = parseInt(numericValue) || 0;
    onUpdate(setNumber, { distance: distanceNum });
  };

  const handleTimeChange = (text: string) => {
    const cleaned = text.replace(/\D/g, "");
    if (!cleaned) {
      setTimeValue("");
      onUpdate(setNumber, { time: 0 });
      return;
    }

    // Always take last 2 as seconds, rest as minutes
    const padded = cleaned.padStart(3, "0"); // ensures at least mmss
    const seconds = padded.slice(-2);
    const minutes = padded.slice(0, -2);

    const formatted = `${minutes.padStart(2, "0")}:${seconds}`;
    setTimeValue(formatted);

    const timeInSeconds = parseTime(formatted);
    onUpdate(setNumber, { time: timeInSeconds });
  };

  const handleCompleteToggle = () => {
    onComplete(setNumber);
  };

  return (
    <View style={completed ? styles.completedSetForm : styles.setForm}>
      <TextInput
        style={[styles.setInput, completed && { backgroundColor: "none" }]}
        editable={false}
        value={setNumber.toString()}
      />
      <TextInput
        style={styles.previousInput}
        editable={false}
        value={previous}
      />
      <TextInput
        style={[styles.distanceInput, completed && { backgroundColor: "none" }]}
        editable={!completed}
        value={distanceValue}
        onChangeText={handleDistanceChange}
        keyboardType="numeric"
        placeholder="0"
      />
      <TextInput
        style={[styles.timeInput, completed && { backgroundColor: "none" }]}
        editable={!completed}
        value={timeValue}
        onChangeText={handleTimeChange}
        keyboardType="numeric"
        placeholder="MM:SS"
      />
      {!completed ? (
        <TouchableOpacity
          activeOpacity={0.7}
          style={styles.incompleteInput}
          onPress={handleCompleteToggle}
        />
      ) : (
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={handleCompleteToggle}
          style={styles.completedInput}
        >
          <Feather name="check" size={20} color="#fff" />
        </TouchableOpacity>
      )}
    </View>
  );
};

// ----------------------
// Styles
// ----------------------

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    gap: 5,
  },
  headers: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 5,
  },
  addSetButton: {
    marginVertical: 10,
    alignSelf: "center",
  },
  headerText: {
    fontSize: 16,
    color: "#707070",
  },
  setForm: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 5,
    padding: 5,
  },
  completedSetForm: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 5,
    borderRadius: 5,
    gap: 5,
    backgroundColor: "#C9F6B1",
  },
  setInput: {
    backgroundColor: "#d9d9d9",
    padding: 5,
    borderRadius: 5,
    textAlign: "center",
    minWidth: 30,
    fontSize: 16,
    fontFamily: "OutfitBold",
  },
  previousInput: {
    textAlign: "center",
    width: "30%",
    fontSize: 14,
  },
  timeInput: {
    backgroundColor: "#d9d9d9",
    padding: 5,
    borderRadius: 5,
    textAlign: "center",
    minWidth: 50,
    fontSize: 16,
    fontFamily: "OutfitBold",
  },
  distanceInput: {
    backgroundColor: "#d9d9d9",
    padding: 5,
    borderRadius: 5,
    textAlign: "center",
    minWidth: 40,
    fontSize: 16,
    fontFamily: "OutfitBold",
  },
  incompleteInput: {
    backgroundColor: "#d9d9d9",
    padding: 5,
    borderRadius: 5,
    textAlign: "center",
    minWidth: 30,
    fontSize: 16,
    fontFamily: "OutfitBold",
  },
  completedInput: {
    backgroundColor: "#4DBB13",
    padding: 5,
    borderRadius: 5,
    textAlign: "center",
    minWidth: 30,
    fontSize: 16,
    fontFamily: "OutfitBold",
  },
});

export default TimeDistanceLoggingForm;
