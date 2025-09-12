import { create } from "zustand";
import { Workout } from "../types";

interface WorkoutStore {
  workouts: Workout[];
  getActiveWorkout: () => Workout | null;
  setWorkouts: (workouts: Workout[]) => void;
}

const useWorkoutStore = create<WorkoutStore>((set, get) => ({
  workouts: [],
  setWorkouts: (workouts) => set({ workouts: [...workouts] }),
  getActiveWorkout: () =>
    get().workouts.find((workout) => workout.active) || null,
}));

export default useWorkoutStore;
