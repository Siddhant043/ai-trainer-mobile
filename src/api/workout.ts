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

  createWorkout: async (workout: Workout) => {
    const response = await api.post(`${WORKOUT_MS_URL}/workouts`, workout);
    return response.data;
  },
  getWorkouts: async () => {
    const response = await api.get(`${WORKOUT_MS_URL}/workouts`);
    return response.data;
  },
};
