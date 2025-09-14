import { create } from "zustand";
import { ScheduleRecord } from "../types";

interface ScheduleRecordStore {
  scheduleRecords: Partial<ScheduleRecord>[];
  getScheduleRecords: () => Partial<ScheduleRecord>[];
  setScheduleRecords: (scheduleRecords: Partial<ScheduleRecord>[]) => void;
  initializeScheduleRecord: ({
    scheduleId,
    userId,
    workoutId,
  }: {
    scheduleId: string;
    userId: string;
    workoutId: string;
  }) => void;
  upsertSetByScheduleAndExerciseId: (
    scheduleId: string,
    exerciseId: string,
    set: any
  ) => void;
  removeSetByScheduleAndExerciseId: (
    scheduleId: string,
    exerciseId: string,
    set: any
  ) => void;
}

const useScheduleRecordStore = create<ScheduleRecordStore>((set, get) => ({
  scheduleRecords: [],
  setScheduleRecords: (scheduleRecords) => set({ scheduleRecords }),
  getScheduleRecords: () => get().scheduleRecords,
  initializeScheduleRecord: ({
    scheduleId,
    userId,
    workoutId,
  }: {
    scheduleId: string;
    userId: string;
    workoutId: string;
  }) =>
    set((state: any) => {
      // Check if record already exists
      const existingRecord = state.scheduleRecords.find(
        (record: any) =>
          record.scheduleId === scheduleId && record.userId === userId
      );

      if (existingRecord) {
        return state; // Return current state without changes
      }

      const newRecord = { scheduleId, userId, workoutId, exerciseRecords: [] };
      const updatedRecords = [...state.scheduleRecords, newRecord];

      return { scheduleRecords: updatedRecords };
    }),

  // ✅ Unified add + update
  upsertSetByScheduleAndExerciseId: (
    scheduleId: string,
    exerciseId: string,
    newSet: any
  ) =>
    set((state: any) => {
      const updatedRecords = state.scheduleRecords.map((record: any) => {
        if (record.scheduleId !== scheduleId) return record;

        // Find existing exercise record
        const existingExerciseIndex = record.exerciseRecords.findIndex(
          (exercise: any) => exercise.exerciseId === exerciseId
        );

        if (existingExerciseIndex > -1) {
          // Exercise record exists, update it
          const exercise = record.exerciseRecords[existingExerciseIndex];
          const existingSetIndex = exercise.sets.findIndex(
            (s: any) => s.setNumber === newSet.setNumber
          );

          let updatedSets;
          if (existingSetIndex > -1) {
            // Update existing set
            updatedSets = [...exercise.sets];
            updatedSets[existingSetIndex] = {
              ...updatedSets[existingSetIndex],
              ...newSet,
            };
          } else {
            // Add new set
            updatedSets = [...exercise.sets, newSet];
          }

          const updatedExerciseRecords = [...record.exerciseRecords];
          updatedExerciseRecords[existingExerciseIndex] = {
            ...exercise,
            sets: updatedSets,
          };

          return {
            ...record,
            exerciseRecords: updatedExerciseRecords,
          };
        } else {
          // Exercise record doesn't exist, create it
          const newExerciseRecord = {
            exerciseId,
            sets: [newSet],
          };

          return {
            ...record,
            exerciseRecords: [...record.exerciseRecords, newExerciseRecord],
          };
        }
      });

      return { scheduleRecords: updatedRecords };
    }),

  removeSetByScheduleAndExerciseId: (
    scheduleId: string,
    exerciseId: string,
    set: any
  ) =>
    set((state: any) => ({
      scheduleRecords: state.scheduleRecords.map((record: any) =>
        record.scheduleId === scheduleId
          ? {
              ...record,
              exerciseRecords: record.exerciseRecords.map((exercise: any) =>
                exercise.exerciseId === exerciseId
                  ? {
                      ...exercise,
                      sets: exercise.sets.filter(
                        (s: any) => s.setNumber !== set.setNumber
                      ),
                    }
                  : exercise
              ),
            }
          : record
      ),
    })),
}));

export default useScheduleRecordStore;
