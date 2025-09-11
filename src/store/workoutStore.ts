import { create } from "zustand";
import { Workout } from "../types";

interface WorkoutStore {
  workouts: Workout[];
  setWorkouts: (workouts: Workout[]) => void;
}

const useWorkoutStore = create<WorkoutStore>((set, get) => ({
  workouts: [],
  setWorkouts: (workouts) => set({ workouts: [...workouts] }),
}));

export default useWorkoutStore;
