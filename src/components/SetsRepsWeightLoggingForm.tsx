import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import CustomText from "./CustomText";
import { Feather } from "@expo/vector-icons";
import useUserStore from "../store/userStore";
import SecondaryButton from "./SecondaryButton";
import { useWorkoutStore } from "../store";

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

  const getPreviousSetData = (exerciseId: string, scheduleId: string) => {
    // TODO: Get previous set data from database
    return "10kgx12";
  };

  const previousSetData = getPreviousSetData(exerciseId, scheduleId);

  const [sets, setSets] = useState([
    {
      setNumber: 1,
      reps: 0,
      weight: 0,
      previous: previousSetData,
      completed: false,
    },
  ]);

  const emptySet = {
    setNumber: sets.length + 1,
    reps: 0,
    weight: 0,
    previous: previousSetData,
    completed: false,
  };

  const handleAddSet = () => {
    setSets([...sets, emptySet]);
  };

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
        <SetForm key={set.setNumber} setData={set} />
      ))}
      <View style={styles.addSetButton}>
        <SecondaryButton size="medium" onPress={handleAddSet}>
          Add New Set
        </SecondaryButton>
      </View>
    </View>
  );
};

const SetForm = ({ setData }: { setData: any }) => {
  const { reps, weight, completed, setNumber, previous } = setData;
  const [repsValue, setRepsValue] = useState(reps);
  const [weightValue, setWeightValue] = useState(weight);
  const [completedValue, setCompletedValue] = useState(completed);

  const handleCompleteToggle = () => {
    if (repsValue === 0 || weightValue === 0) {
      return;
    }
    setCompletedValue(!completedValue);
  };

  return (
    <View style={completedValue ? styles.completedSetForm : styles.setForm}>
      <TextInput
        style={[styles.setInput, completedValue && { backgroundColor: "none" }]}
        editable={false}
        value={setNumber.toString()}
      />
      <TextInput
        style={styles.previousInput}
        editable={false}
        value={previous}
      />
      <TextInput
        style={[
          styles.weightInput,
          completedValue && { backgroundColor: "none" },
        ]}
        editable={!completed}
        value={weightValue.toString()}
        onChangeText={(text) => setWeightValue(text)}
      />
      <TextInput
        style={[
          styles.repsInput,
          completedValue && { backgroundColor: "none" },
        ]}
        editable={!completed}
        value={repsValue.toString()}
        onChangeText={(text) => setRepsValue(text)}
      />
      {!completedValue ? (
        <TouchableOpacity
          activeOpacity={1}
          style={styles.incompleteInput}
          onPress={handleCompleteToggle}
        />
      ) : (
        <TouchableOpacity
          activeOpacity={1}
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
