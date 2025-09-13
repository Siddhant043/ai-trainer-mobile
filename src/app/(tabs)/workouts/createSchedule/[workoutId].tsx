import {
  View,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Modal,
  TouchableWithoutFeedback,
  Dimensions,
  Image,
} from "react-native";
import React, { useCallback, useState, useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useLocalSearchParams, useRouter } from "expo-router";
import { Ionicons, Feather } from "@expo/vector-icons";
import CustomText from "@/src/components/CustomText";
import CustomTextInput from "@/src/components/CustomTextInput";
import Button from "@/src/components/Button";
import MultiSelectCustomPicker from "@/src/components/MultiSelectCustomPicker";
import {
  useCreateSchedule,
  useUpdateSchedule,
  useGetSchedulesByWorkoutId,
} from "@/src/hooks/useSchedule";
import { useScheduleStore } from "@/src/store";
import SelectExercisesChild from "@/src/components/SelectExercisesChild";
import { Exercise, Schedule } from "@/src/types";
import SecondaryButton from "@/src/components/SecondaryButton";

const { height: screenHeight } = Dimensions.get("window");

const CreateSchedule = () => {
  const { workoutId, scheduleId } = useLocalSearchParams<{
    workoutId: string;
    scheduleId?: string;
  }>();
  const router = useRouter();
  const [scheduleName, setScheduleName] = useState("");
  const [description, setDescription] = useState("");
  const [selectedDays, setSelectedDays] = useState<string[]>([]);
  const [error, setError] = useState("");
  const [selectedExercises, setSelectedExercises] = useState<Exercise[]>([]);
  const [showExercisesModal, setShowExercisesModal] = useState(false);

  // Reset form fields function
  const resetFields = useCallback(() => {
    setScheduleName("");
    setDescription("");
    setSelectedDays([]);
    setSelectedExercises([]);
    setError("");
  }, []);
  const {
    createSchedule,
    isPending: isCreating,
    error: createScheduleError,
  } = useCreateSchedule();
  const {
    updateSchedule,
    isPending: isUpdating,
    error: updateScheduleError,
  } = useUpdateSchedule();
  const { schedules: querySchedules, isLoading: schedulesLoading } =
    useGetSchedulesByWorkoutId(workoutId || "");
  const { schedules: storeSchedules } = useScheduleStore();

  // Determine if we're in edit mode
  const isEditMode = !!scheduleId;
  const isPending = isCreating || isUpdating;

  // Use query schedules if available, otherwise fall back to store schedules
  const schedules = querySchedules || storeSchedules;

  // Get the schedule to edit
  const scheduleToEdit = scheduleId
    ? schedules?.find((s: Schedule) => s._id === scheduleId)
    : null;

  // Populate form when editing
  useEffect(() => {
    if (isEditMode && scheduleToEdit) {
      setScheduleName(scheduleToEdit.name || "");
      setDescription(scheduleToEdit.description || "");
      setSelectedDays(scheduleToEdit.days || []);
      setSelectedExercises(scheduleToEdit.exercises || []);
    } else if (isEditMode && !scheduleToEdit && !schedulesLoading) {
      resetFields();
    } else {
      resetFields();
    }
  }, [
    isEditMode,
    scheduleToEdit,
    scheduleId,
    workoutId,
    schedulesLoading,
    querySchedules,
    storeSchedules,
    schedules,
    resetFields,
  ]);

  const handleBack = useCallback(() => {
    router.navigate(`/(tabs)/workouts/viewWorkoutSplit/${workoutId}`);
  }, [router, workoutId]);

  const handleRemoveExercise = useCallback((exerciseId: string) => {
    setSelectedExercises((prev) =>
      prev.filter((exercise) => exercise._id !== exerciseId)
    );
  }, []);

  const handleSave = useCallback(async () => {
    if (!workoutId) {
      setError("Workout ID is required");
      return;
    }
    if (!scheduleName || !description || !selectedDays.length) {
      setError("Please fill all the fields");
      return;
    }
    if (isPending) {
      setError(isEditMode ? "Updating schedule..." : "Creating schedule...");
      return;
    }
    try {
      setError("");

      const scheduleData = {
        name: scheduleName,
        description: description,
        workoutId: workoutId,
        days: selectedDays,
        exercises: selectedExercises,
      };

      let schedule;

      if (isEditMode && scheduleId) {
        // Update existing schedule
        if (updateScheduleError) {
          setError(updateScheduleError.message);
          return;
        }
        schedule = await updateSchedule({
          ...scheduleData,
          _id: scheduleId,
        });
      } else {
        // Create new schedule
        if (createScheduleError) {
          setError(createScheduleError.message);
          return;
        }
        schedule = await createSchedule(scheduleData);
      }

      if (schedule._id) {
        resetFields();
        router.navigate(`/(tabs)/workouts/viewWorkoutSplit/${workoutId}`);
      }
    } catch (error: any) {
      setError(
        error.message ||
          `Failed to ${isEditMode ? "update" : "create"} schedule`
      );
    }
  }, [
    workoutId,
    scheduleName,
    description,
    selectedDays,
    selectedExercises,
    isEditMode,
    scheduleId,
    createSchedule,
    updateSchedule,
    createScheduleError,
    updateScheduleError,
    isPending,
    router,
    resetFields,
  ]);

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
        <View style={styles.headerLeft}>
          <TouchableOpacity activeOpacity={0.8} onPress={handleBack}>
            <Ionicons name="chevron-back" size={20} color="#707070" />
          </TouchableOpacity>
          <CustomText style={styles.title}>
            {isEditMode ? "Edit Schedule" : "Create Schedule"}
          </CustomText>
        </View>
        <Button size="small" onPress={handleSave}>
          {isEditMode ? "Update" : "Create"}
        </Button>
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

        {/* Show loading state when in edit mode and schedules are loading */}
        {isEditMode && schedulesLoading && (
          <CustomText style={styles.loadingText}>
            Loading schedule data...
          </CustomText>
        )}

        <View style={styles.buttonContainer}>
          <SecondaryButton onPress={() => setShowExercisesModal(true)}>
            Select Exercises
          </SecondaryButton>

          {/* Selected Exercises List */}
          {selectedExercises.length > 0 && (
            <View style={styles.selectedExercisesContainer}>
              <CustomText style={styles.selectedExercisesTitle}>
                Selected Exercises ({selectedExercises.length})
              </CustomText>
              {selectedExercises.map((exercise) => (
                <View key={exercise._id} style={styles.exerciseItem}>
                  <View style={styles.exerciseInfo}>
                    {exercise.imageUrl && exercise.imageUrl.length > 0 && (
                      <View style={styles.exerciseImageContainer}>
                        <Image
                          source={{ uri: exercise.imageUrl[0] }}
                          style={styles.exerciseImage}
                        />
                      </View>
                    )}
                    <CustomText style={styles.exerciseName}>
                      {exercise.exerciseName}
                    </CustomText>
                  </View>
                  <TouchableOpacity
                    onPress={() => handleRemoveExercise(exercise._id)}
                    style={styles.deleteButton}
                  >
                    <Feather name="trash-2" size={18} color="#EA2929" />
                  </TouchableOpacity>
                </View>
              ))}
            </View>
          )}
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
    justifyContent: "space-between",
    gap: 10,
  },
  headerLeft: {
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
    marginBottom: 70,
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
  loadingText: {
    color: "#666",
    fontSize: 14,
    textAlign: "center",
    marginVertical: 10,
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
  selectedExercisesContainer: {
    marginTop: 20,
    marginBottom: 10,
  },
  selectedExercisesTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 12,
  },
  exerciseItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#fff",
    padding: 12,
    borderRadius: 8,
    marginBottom: 8,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  exerciseInfo: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  exerciseImageContainer: {
    marginRight: 12,
  },
  exerciseImage: {
    width: 40,
    height: 40,
    borderRadius: 6,
  },
  exerciseName: {
    fontSize: 14,
    color: "#333",
    flex: 1,
  },
  deleteButton: {
    padding: 8,
    borderRadius: 6,
    backgroundColor: "#FFF5F5",
  },
});

export default CreateSchedule;
