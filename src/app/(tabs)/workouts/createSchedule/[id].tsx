import {
  View,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Modal,
  TouchableWithoutFeedback,
  Dimensions,
} from "react-native";
import React, { useCallback, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useLocalSearchParams, useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import CustomText from "@/src/components/CustomText";
import CustomTextInput from "@/src/components/CustomTextInput";
import Button from "@/src/components/Button";
import MultiSelectCustomPicker from "@/src/components/MultiSelectCustomPicker";
import { useCreateSchedule } from "@/src/hooks/useSchedule";
import SelectExercisesChild from "@/src/components/SelectExercisesChild";
import { Exercise } from "@/src/types";
import SecondaryButton from "@/src/components/SecondaryButton";

const { height: screenHeight } = Dimensions.get("window");

const CreateSchedule = () => {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const [scheduleName, setScheduleName] = useState("");
  const [description, setDescription] = useState("");
  const [selectedDays, setSelectedDays] = useState<string[]>([]);
  const [error, setError] = useState("");
  const [selectedExercises, setSelectedExercises] = useState<Exercise[]>([]);
  const [showExercisesModal, setShowExercisesModal] = useState(false);

  const resetFields = useCallback(() => {
    setScheduleName("");
    setDescription("");
    setSelectedDays([]);
    setSelectedExercises([]);
  }, []);

  const {
    createSchedule,
    isPending,
    error: createScheduleError,
  } = useCreateSchedule();
  const handleBack = useCallback(() => {
    router.navigate(`/(tabs)/workouts/viewWorkoutSplit/${id}`);
  }, [router, id]);

  const handleSave = useCallback(async () => {
    if (!id) {
      setError("Workout ID is required");
      return;
    }
    if (!scheduleName || !description || !selectedDays.length) {
      setError("Please fill all the fields");
      return;
    }
    if (isPending) {
      setError("Creating workout split...");
      return;
    }
    try {
      setError("");
      if (createScheduleError) {
        setError(createScheduleError.message);
        return;
      }

      const schedule = await createSchedule({
        name: scheduleName,
        description: description,
        workoutId: id,
        days: selectedDays,
        exercises: selectedExercises,
      });
      if (schedule._id) {
        await resetFields();
        router.navigate(`/(tabs)/workouts/viewWorkoutSplit/${id}`);
      }
    } catch (error: any) {
      setError(error.message || "Failed to create workout");
    }
  }, [router, scheduleName, description, selectedDays, selectedExercises]);

  const dayOptions = [
    { label: "Sunday", value: "sunday" },
    { label: "Monday", value: "monday" },
    { label: "Tuesday", value: "tuesday" },
    { label: "Wednesday", value: "wednesday" },
    { label: "Thursday", value: "thursday" },
    { label: "Friday", value: "friday" },
    { label: "Saturday", value: "saturday" },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity activeOpacity={0.8} onPress={handleBack}>
          <Ionicons name="chevron-back" size={20} color="#707070" />
        </TouchableOpacity>
        <CustomText style={styles.title}>Create Schedule</CustomText>
      </View>
      <ScrollView
        style={styles.formContainer}
        showsVerticalScrollIndicator={false}
      >
        <CustomTextInput
          label="Schedule Name"
          placeholder="Enter schedule name"
          value={scheduleName}
          handleValueChange={setScheduleName}
        />
        <CustomTextInput
          label="Description"
          placeholder="Enter description"
          value={description}
          handleValueChange={setDescription}
        />
        <MultiSelectCustomPicker
          label="Schedule Days"
          options={dayOptions}
          selectedValues={selectedDays}
          onValueChange={setSelectedDays}
          placeholder="Select schedule days"
          maxSelections={7}
        />
        {error && <CustomText style={styles.error}>{error}</CustomText>}
        <View style={styles.buttonContainer}>
          <SecondaryButton onPress={() => setShowExercisesModal(true)}>
            Select Exercises
          </SecondaryButton>
          <Button onPress={handleSave}>Save</Button>
        </View>
      </ScrollView>
      <ExercisesModal
        isOpen={showExercisesModal}
        setIsOpen={setShowExercisesModal}
        selectedExercises={selectedExercises}
        setSelectedExercises={setSelectedExercises}
      />
    </SafeAreaView>
  );
};

const ExercisesModal = ({
  isOpen,
  setIsOpen,
  selectedExercises,
  setSelectedExercises,
}: {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  selectedExercises: Exercise[];
  setSelectedExercises: (exercises: Exercise[]) => void;
}) => {
  return (
    <Modal
      visible={isOpen}
      transparent
      animationType="slide"
      onRequestClose={() => setIsOpen(false)}
    >
      <View style={styles.modalContainer}>
        <TouchableWithoutFeedback onPress={() => setIsOpen(false)}>
          <View style={styles.backdrop} />
        </TouchableWithoutFeedback>
        <View style={styles.bottomSheet}>
          <View style={styles.modalHeader}>
            <CustomText style={styles.modalTitle}>Select Exercises</CustomText>
            <TouchableOpacity
              onPress={() => setIsOpen(false)}
              style={styles.closeButton}
            >
              <Ionicons name="close" size={24} color="#707070" />
            </TouchableOpacity>
          </View>
          <View style={styles.modalContent}>
            <SelectExercisesChild
              selectedExercises={selectedExercises}
              setSelectedExercises={setSelectedExercises}
              isSelectable={true}
            />
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f9f6f6",
    padding: 10,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  title: {
    fontSize: 20,
    color: "#707070",
  },
  buttonContainer: {
    marginTop: 30,
    gap: 20,
    marginBottom: 20,
  },
  formContainer: {
    flex: 1,
    marginTop: 20,
    gap: 20,
  },
  error: {
    color: "red",
    fontSize: 12,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "flex-end",
  },
  backdrop: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  bottomSheet: {
    backgroundColor: "#f9f6f6",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    maxHeight: screenHeight * 0.92,
    minHeight: screenHeight * 0.92,
  },
  modalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#e0e0e0",
  },
  modalTitle: {
    fontSize: 18,
    fontFamily: "Outfit-SemiBold",
    color: "#333",
  },
  closeButton: {
    padding: 4,
  },
  modalContent: {
    flex: 1,
  },
});

export default CreateSchedule;
