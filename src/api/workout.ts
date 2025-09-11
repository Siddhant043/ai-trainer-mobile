import { Workout } from "../types";
import api, { WORKOUT_MS_URL } from "./config";

export const workoutAPI = {
  getExercises: async ({
    name = "",
    bodyPart = "",
    target = "",
    page = 1,
    limit = 20,
    equipment = "",
    category = "",
  }) => {
    const response = await api.get(`${WORKOUT_MS_URL}/exercises`, {
      params: {
        name,
        bodyPart,
        target,
        page,
        limit,
        equipment,
        category,
      },
    });
    return response.data;
  },

  createWorkout: async (workout: Partial<Workout>) => {
    const response = await api.post(`${WORKOUT_MS_URL}/workouts`, {
      ...workout,
      isCustom: true,
    });
    return response.data.workout;
  },

  getWorkouts: async () => {
    const response = await api.get(`${WORKOUT_MS_URL}/workouts/user`);
    return response.data.workouts;
  },

  deleteWorkout: async (workoutId: string) => {
    const response = await api.delete(
      `${WORKOUT_MS_URL}/workouts/${workoutId}`
    );
    return response.data;
  },

  updateWorkout: async (workoutId: string, workout: Partial<Workout>) => {
    const response = await api.patch(
      `${WORKOUT_MS_URL}/workouts/${workoutId}`,
      workout
    );
    return response.data;
  },
};
