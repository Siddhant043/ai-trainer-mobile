import {
  View,
  Modal,
  TouchableWithoutFeedback,
  StyleSheet,
  Dimensions,
  KeyboardAvoidingView,
  Keyboard,
  Platform,
} from "react-native";
import React, { useCallback, useState } from "react";
import CustomText from "./CustomText";
import CustomTextInput from "./CustomTextInput";
import MultiSelectCustomPicker from "./MultiSelectCustomPicker";
import Button from "./Button";
import { useCreateWorkout } from "../hooks/useWorkout";
import { useRouter } from "expo-router";

const { height: screenHeight } = Dimensions.get("window");

const CreateWorkoutSplitModal = ({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) => {
  const {
    createWorkout,
    isPending,
    error: createWorkoutError,
  } = useCreateWorkout();
  const [splitName, setSplitName] = useState("");
  const [description, setDescription] = useState("");
  const [selectedDays, setSelectedDays] = useState<string[]>([]);
  const [error, setError] = useState("");
  const router = useRouter();

  const dayOptions = [
    { label: "Sunday", value: "sunday" },
    { label: "Monday", value: "monday" },
    { label: "Tuesday", value: "tuesday" },
    { label: "Wednesday", value: "wednesday" },
    { label: "Thursday", value: "thursday" },
    { label: "Friday", value: "friday" },
    { label: "Saturday", value: "saturday" },
  ];

  const handleCreate = useCallback(async () => {
    if (!splitName || selectedDays.length === 0 || !description) {
      setError("Please fill all the fields");
      return;
    }

    if (isPending) {
      setError("Creating workout split...");
      return;
    }

    try {
      setError("");
      if (createWorkoutError) {
        setError(createWorkoutError.message);
        return;
      }

      const workout = await createWorkout({
        name: splitName,
        description,
        workoutDays: selectedDays,
      });

      if (workout._id) {
        router.push(`/(tabs)/workouts/viewWorkoutSplit/${workout._id}`);
      }

      onClose();
    } catch (err: any) {
      setError(err.message || "Failed to create workout");
    }
  }, [splitName, description, selectedDays, createWorkout, router, onClose]);

  return (
    <Modal
      visible={isOpen}
      onRequestClose={onClose}
      transparent
      animationType="slide"
    >
      <TouchableWithoutFeedback onPress={onClose}>
        <View style={styles.backdrop} />
      </TouchableWithoutFeedback>
      <KeyboardAvoidingView
        style={styles.bottomSheet}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 20}
      >
        {/* Handle bar */}
        <View style={styles.handleBar} />
        <CustomText style={styles.title}>Create Workout Split</CustomText>
        <View style={styles.sliptFormContainer}>
          <CustomTextInput
            label="Workout Split Name"
            placeholder="Enter split name"
            value={splitName}
            handleValueChange={setSplitName}
          />
          <CustomTextInput
            label="Description"
            placeholder="Enter description"
            value={description}
            handleValueChange={setDescription}
          />
          <MultiSelectCustomPicker
            label="Workout Days"
            options={dayOptions}
            selectedValues={selectedDays}
            onValueChange={setSelectedDays}
            placeholder="Select workout days"
            maxSelections={7}
          />
          {error && <CustomText style={styles.error}>{error}</CustomText>}
          <View style={styles.buttonContainer}>
            <Button onPress={handleCreate}>Create Split</Button>
          </View>
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
};

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.3)",
  },
  bottomSheet: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    padding: 10,
    backgroundColor: "#fff",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    maxHeight: screenHeight * 0.85,
    minHeight: screenHeight * 0.4,
  },
  handleBar: {
    width: 40,
    height: 4,
    backgroundColor: "#E0E0E0",
    borderRadius: 2,
    alignSelf: "center",
    marginTop: 8,
    marginBottom: 8,
  },
  title: {
    fontSize: 16,
    color: "#707070",
    marginBottom: 10,
  },
  sliptFormContainer: {
    flex: 1,
    flexDirection: "column",
    marginTop: 10,
    marginBottom: 20,
    gap: 5,
  },
  error: {
    color: "red",
    fontSize: 12,
  },
  buttonContainer: {
    marginTop: 30,
    marginBottom: 20,
  },
});

export default CreateWorkoutSplitModal;
