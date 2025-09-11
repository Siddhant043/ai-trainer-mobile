import { Schedule } from "../types";

import api, { WORKOUT_MS_URL } from "./config";

export const scheduleAPI = {
  getAllSchedulesByWorkoutId: async (workoutId: string) => {
    const response = await api.get(
      `${WORKOUT_MS_URL}/schedules/workout/${workoutId}`
    );
    return response.data.schedules;
  },
  createSchedule: async (schedule: Partial<Schedule>) => {
    const response = await api.post(`${WORKOUT_MS_URL}/schedules`, schedule);
    return response.data.schedule;
  },
  updateSchedule: async (schedule: Partial<Schedule>) => {
    const response = await api.patch(
      `${WORKOUT_MS_URL}/schedules/${schedule._id}`,
      schedule
    );
    return response.data.schedule;
  },
  deleteSchedule: async (scheduleId: string) => {
    const response = await api.delete(
      `${WORKOUT_MS_URL}/schedules/${scheduleId}`
    );
    return response.data.schedule;
  },
};
