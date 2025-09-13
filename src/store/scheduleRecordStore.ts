import { create } from "zustand";
import { ScheduleRecord } from "../types";

interface ScheduleRecordStore {
  scheduleRecords: Partial<ScheduleRecord>[];
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

const useScheduleRecordStore = create<ScheduleRecordStore>((set) => ({
  scheduleRecords: [],
  setScheduleRecords: (scheduleRecords) => set({ scheduleRecords }),

  initializeScheduleRecord: ({
    scheduleId,
    userId,
    workoutId,
  }: {
    scheduleId: string;
    userId: string;
    workoutId: string;
  }) =>
    set((state: any) => ({
      scheduleRecords: [
        ...state.scheduleRecords,
        { scheduleId, userId, workoutId, exerciseRecords: [] },
      ],
    })),

  // ✅ Unified add + update
  upsertSetByScheduleAndExerciseId: (
    scheduleId: string,
    exerciseId: string,
    newSet: any
  ) =>
    set((state: any) => ({
      scheduleRecords: state.scheduleRecords.map((record: any) => {
        if (record.scheduleId !== scheduleId) return record;

        return {
          ...record,
          exerciseRecords: record.exerciseRecords.map((exercise: any) => {
            if (exercise.exerciseId !== exerciseId) return exercise;

            // check if set exists
            const existingSetIndex = exercise.sets.findIndex(
              (s: any) => s.setNumber === newSet.setNumber
            );

            if (existingSetIndex > -1) {
              // update existing set
              const updatedSets = [...exercise.sets];
              updatedSets[existingSetIndex] = {
                ...updatedSets[existingSetIndex],
                ...newSet,
              };
              return { ...exercise, sets: updatedSets };
            } else {
              // add new set
              return { ...exercise, sets: [...exercise.sets, newSet] };
            }
          }),
        };
      }),
    })),

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
