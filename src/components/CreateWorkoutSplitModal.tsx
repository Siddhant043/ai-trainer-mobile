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
import React, { useCallback, useState, useEffect } from "react";
import CustomText from "./CustomText";
import CustomTextInput from "./CustomTextInput";
import MultiSelectCustomPicker from "./MultiSelectCustomPicker";
import Button from "./Button";
import {
  useCreateWorkout,
  useUpdateWorkout,
  useGetWorkouts,
} from "../hooks/useWorkout";
import { useRouter } from "expo-router";

const { height: screenHeight } = Dimensions.get("window");

const CreateWorkoutSplitModal = ({
  isOpen,
  onClose,
  workoutId,
}: {
  isOpen: boolean;
  onClose: () => void;
  workoutId?: string;
}) => {
  const {
    createWorkout,
    isPending: isCreating,
    error: createWorkoutError,
  } = useCreateWorkout();
  const {
    updateWorkout,
    isPending: isUpdating,
    error: updateWorkoutError,
  } = useUpdateWorkout();
  const { workouts } = useGetWorkouts();

  const [splitName, setSplitName] = useState("");
  const [description, setDescription] = useState("");
  const [selectedDays, setSelectedDays] = useState<string[]>([]);
  const [error, setError] = useState("");
  const router = useRouter();

  // Determine if we're in edit mode
  const isEditMode = !!workoutId;
  const isPending = isCreating || isUpdating;

  // Get the workout to edit
  const workoutToEdit = workoutId
    ? workouts?.find((w) => w._id === workoutId)
    : null;

  const dayOptions = [
    { label: "Sunday", value: "sunday" },
    { label: "Monday", value: "monday" },
    { label: "Tuesday", value: "tuesday" },
    { label: "Wednesday", value: "wednesday" },
    { label: "Thursday", value: "thursday" },
    { label: "Friday", value: "friday" },
    { label: "Saturday", value: "saturday" },
  ];

  // Populate form when editing
  useEffect(() => {
    if (isEditMode && workoutToEdit) {
      setSplitName(workoutToEdit.name || "");
      setDescription(workoutToEdit.description || "");
      setSelectedDays(workoutToEdit.workoutDays || []);
    } else {
      // Reset form when creating new workout
      setSplitName("");
      setDescription("");
      setSelectedDays([]);
    }
    setError(""); // Clear any previous errors
  }, [isEditMode, workoutToEdit, isOpen]);

  const handleSubmit = useCallback(async () => {
    if (!splitName || selectedDays.length === 0 || !description) {
      setError("Please fill all the fields");
      return;
    }

    if (isPending) {
      setError(
        isEditMode ? "Updating workout split..." : "Creating workout split..."
      );
      return;
    }

    try {
      setError("");

      const workoutData = {
        name: splitName,
        description,
        workoutDays: selectedDays,
      };

      let workout;

      if (isEditMode && workoutId) {
        // Update existing workout
        if (updateWorkoutError) {
          setError(updateWorkoutError.message);
          return;
        }
        workout = await updateWorkout({ workoutId, workout: workoutData });
      } else {
        // Create new workout
        if (createWorkoutError) {
          setError(createWorkoutError.message);
          return;
        }
        workout = await createWorkout(workoutData);
      }

      onClose();
    } catch (err: any) {
      setError(
        err.message || `Failed to ${isEditMode ? "update" : "create"} workout`
      );
    }
  }, [
    splitName,
    description,
    selectedDays,
    isEditMode,
    workoutId,
    createWorkout,
    updateWorkout,
    createWorkoutError,
    updateWorkoutError,
    isPending,
    router,
    onClose,
  ]);

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
        <CustomText style={styles.title}>
          {isEditMode ? "Edit Workout Split" : "Create Workout Split"}
        </CustomText>
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
            <Button onPress={handleSubmit}>
              {isEditMode ? "Update Split" : "Create Split"}
            </Button>
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
