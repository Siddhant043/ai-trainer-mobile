import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Exercise, Schedule } from "../types";
import { scheduleAPI } from "../api/schedule";
import { useScheduleStore, useWorkoutStore } from "../store";
import { useEffect } from "react";
import { useUpdateWorkout } from "./useWorkout";

export const useGetSchedulesByWorkoutId = (workoutId: string) => {
  const { setSchedules } = useScheduleStore();
  const {
    data: schedules,
    isLoading,
    error,
  } = useQuery<Schedule[]>({
    queryKey: ["schedules", workoutId],
    queryFn: () => scheduleAPI.getAllSchedulesByWorkoutId(workoutId),
  });
  useEffect(() => {
    if (schedules) {
      setSchedules(schedules);
    }
  }, [schedules]);
  return { schedules, isLoading, error };
};

export const useCreateSchedule = () => {
  const queryClient = useQueryClient();
  const { setSchedules, schedules } = useScheduleStore();
  const { updateWorkout } = useUpdateWorkout();
  const { workouts } = useWorkoutStore();

  const {
    mutateAsync: createSchedule,
    isPending,
    error,
  } = useMutation({
    mutationFn: ({
      name,
      description,
      workoutId,
      days,
      exercises,
    }: {
      name: string;
      description: string;
      workoutId: string;
      days?: string[];
      exercises?: Exercise[];
    }) =>
      scheduleAPI.createSchedule({
        name,
        description,
        workoutId,
        days: days || [],
        exercises: exercises || [],
      }),
    onSuccess: (data) => {
      // Invalidate both workouts and schedules queries
      queryClient.invalidateQueries({ queryKey: ["workouts"] });
      queryClient.invalidateQueries({
        queryKey: ["schedules", data.workoutId],
      });

      const oldScheduleIds =
        workouts
          .find((workout) => workout._id === data.workoutId)
          ?.schedules?.map((schedule) => schedule._id) || [];
      updateWorkout({
        workoutId: data.workoutId,
        workout: {
          schedules: [...oldScheduleIds, data._id],
        },
      });
      setSchedules([...schedules, data]);
    },
  });
  return { createSchedule, isPending, error };
};

export const useUpdateSchedule = () => {
  const { setSchedules, schedules } = useScheduleStore();
  const queryClient = useQueryClient();
  const {
    mutateAsync: updateSchedule,
    isPending,
    error,
  } = useMutation({
    mutationFn: (schedule: Partial<Schedule>) =>
      scheduleAPI.updateSchedule(schedule),
    onSuccess: (data) => {
      // Invalidate both schedules and workouts queries
      queryClient.invalidateQueries({
        queryKey: ["schedules", data.workoutId],
      });
      queryClient.invalidateQueries({
        queryKey: ["workouts"],
      });
      // Update the store with the updated schedule
      setSchedules(
        schedules.map((schedule) =>
          schedule._id === data._id ? data : schedule
        )
      );
    },
  });
  return { updateSchedule, isPending, error };
};

export const useDeleteSchedule = () => {
  const queryClient = useQueryClient();
  const { setSchedules, schedules } = useScheduleStore();
  const { updateWorkout } = useUpdateWorkout();

  const {
    mutateAsync: deleteSchedule,
    isPending,
    error,
  } = useMutation({
    mutationFn: (scheduleId: string) => scheduleAPI.deleteSchedule(scheduleId),
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: ["schedules", data.workoutId],
      });
      queryClient.invalidateQueries({ queryKey: ["workouts"] });
      setSchedules(schedules.filter((schedule) => schedule._id !== data._id));
      updateWorkout({
        workoutId: data.workoutId,
        workout: {
          schedules: schedules.filter((schedule) => schedule._id !== data._id),
        },
      });
    },
    onError: (error) => {
      console.log(error);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["workouts"] });
    },
  });
  return { deleteSchedule, isPending, error };
};
