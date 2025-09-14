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
  reps: number;
  weight: number;
  previous: string;
  completed: boolean;
}

const SetsRepsWeightLoggingForm = ({
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
    // TODO: Get previous set data from database
    return "10kgx12";
  };

  const previousSetData = getPreviousSetData(exerciseId, scheduleId);

  const [sets, setSets] = useState<SetData[]>([
    {
      setNumber: 1,
      reps: 0,
      weight: 0,
      previous: previousSetData,
      completed: false,
    },
  ]);

  // Track if initialization has been attempted to prevent duplicates
  const initializationAttempted = useRef(false);

  // Reset initialization flag when scheduleId changes
  useEffect(() => {
    initializationAttempted.current = false;
  }, [scheduleId]);

  // Initialize schedule record if it doesn't exist
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

  // Load existing sets from store
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
          reps: set.reps || 0,
          weight: set.weight || 0,
          previous: previousSetData,
          completed: set.completed || false, // Use the actual completed field from store
        }));
        setSets(loadedSets);
      }
    }
  }, [scheduleRecords, scheduleId, userId, exerciseId, previousSetData]);

  const handleAddSet = useCallback(() => {
    const newSet: SetData = {
      setNumber: sets.length + 1,
      reps: 0,
      weight: 0,
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

      // Update in store
      const updatedSet = updatedSets.find((set) => set.setNumber === setNumber);
      if (updatedSet) {
        upsertSetByScheduleAndExerciseId(scheduleId, exerciseId, {
          setNumber: updatedSet.setNumber,
          reps: updatedSet.reps,
          weight: updatedSet.weight,
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
        // Mark as incomplete
        handleSetUpdate(setNumber, { completed: false });
      } else {
        // Mark as complete - validate first
        if (set.reps <= 0 || set.weight <= 0) {
          Alert.alert(
            "Invalid Input",
            "Please enter valid reps and weight before completing the set."
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
        <CustomText style={styles.headerText}>Weight (kg)</CustomText>
        <CustomText style={styles.headerText}>Reps</CustomText>
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

interface SetFormProps {
  setData: SetData;
  onUpdate: (setNumber: number, updates: Partial<SetData>) => void;
  onComplete: (setNumber: number) => void;
}

const SetForm = ({ setData, onUpdate, onComplete }: SetFormProps) => {
  const { reps, weight, completed, setNumber, previous } = setData;
  const [repsValue, setRepsValue] = useState(reps.toString());
  const [weightValue, setWeightValue] = useState(weight.toString());

  // Update local state when props change
  useEffect(() => {
    setRepsValue(reps.toString());
    setWeightValue(weight.toString());
  }, [reps, weight]);

  const handleRepsChange = (text: string) => {
    const numericValue = text.replace(/[^0-9]/g, "");
    setRepsValue(numericValue);
    const repsNum = parseInt(numericValue) || 0;
    onUpdate(setNumber, { reps: repsNum });
  };

  const handleWeightChange = (text: string) => {
    const numericValue = text.replace(/[^0-9.]/g, "");
    setWeightValue(numericValue);
    const weightNum = parseFloat(numericValue) || 0;
    onUpdate(setNumber, { weight: weightNum });
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
        style={[styles.weightInput, completed && { backgroundColor: "none" }]}
        editable={!completed}
        value={weightValue}
        onChangeText={handleWeightChange}
        keyboardType="numeric"
        placeholder="0"
      />
      <TextInput
        style={[styles.repsInput, completed && { backgroundColor: "none" }]}
        editable={!completed}
        value={repsValue}
        onChangeText={handleRepsChange}
        keyboardType="numeric"
        placeholder="0"
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
    fontSize: 16,
  },
  weightInput: {
    backgroundColor: "#d9d9d9",
    padding: 5,
    borderRadius: 5,
    textAlign: "center",
    minWidth: 30,
    fontSize: 16,
    fontFamily: "OutfitBold",
  },
  repsInput: {
    backgroundColor: "#d9d9d9",
    padding: 5,
    borderRadius: 5,
    textAlign: "center",
    minWidth: 30,
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

export default SetsRepsWeightLoggingForm;
