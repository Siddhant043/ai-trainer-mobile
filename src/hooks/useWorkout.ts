// hooks/useWorkout.ts
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { workoutAPI } from "../api/workout";
import { ExercisesResponse, Workout } from "../types";
import useWorkoutStore from "../store/workoutStore";
import { useEffect } from "react";
import storage from "../config/storage";

export const useGetExercises = (
  name = "",
  bodyPart = "",
  target = "",
  page = 1,
  limit = 20,
  equipment = "",
  category = ""
) => {
  const queryClient = useQueryClient();

  const query = useQuery<ExercisesResponse>({
    queryKey: [
      "exercises",
      name,
      bodyPart,
      target,
      page,
      limit,
      equipment,
      category,
    ],
    queryFn: () =>
      workoutAPI.getExercises({
        name,
        bodyPart,
        target,
        page,
        limit,
        equipment,
        category,
      }),
    enabled: true,
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes (renamed from cacheTime in newer versions)
    retry: 3,
    retryDelay: 1000,
  });

  return {
    ...query,
    invalidateQueries: () =>
      queryClient.invalidateQueries({ queryKey: ["exercises"] }),
  };
};

export const useGetWorkouts = () => {
  const { setWorkouts } = useWorkoutStore();
  const storedWorkouts = storage.getString("workouts");
  const {
    data: workouts,
    isPending,
    error,
  } = useQuery<Workout[]>({
    queryKey: ["workouts"],
    queryFn: workoutAPI.getWorkouts,
  });
  useEffect(() => {
    if (workouts) {
      setWorkouts(workouts);
      storage.set("workouts", JSON.stringify(workouts));
    } else if (storedWorkouts) {
      setWorkouts(JSON.parse(storedWorkouts));
    }
  }, [workouts, storedWorkouts]);
  return {
    workouts,
    isPending,
    error,
  };
};

export const useCreateWorkout = () => {
  const queryClient = useQueryClient();
  const { workouts, setWorkouts } = useWorkoutStore();
  const {
    mutateAsync: createWorkout, // 👈 use mutateAsync instead of mutate
    data: createWorkoutData,
    isPending,
    error,
  } = useMutation({
    mutationFn: ({
      name,
      description,
      workoutDays,
    }: {
      name: string;
      description: string;
      workoutDays: string[];
    }) => workoutAPI.createWorkout({ name, description, workoutDays }),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["creation-workout"] });
      queryClient.invalidateQueries({ queryKey: ["workouts"] });
      setWorkouts([...workouts, data]);
      storage.set("workouts", JSON.stringify([...workouts, data]));
    },
    onError: (error) => {
      console.error(error);
    },
  });

  return {
    createWorkout, // now async
    isPending,
    error,
    createWorkoutData,
  };
};

export const useUpdateWorkout = () => {
  const { workouts, setWorkouts } = useWorkoutStore();
  const queryClient = useQueryClient();
  const {
    mutate: updateWorkout,
    isPending,
    error,
  } = useMutation({
    mutationFn: ({
      workoutId,
      workout,
    }: {
      workoutId: string;
      workout: Partial<Workout>;
    }) => workoutAPI.updateWorkout(workoutId, workout),
    onSuccess: (data) => {
      setWorkouts([...workouts, data]);
      storage.set("workouts", JSON.stringify([...workouts, data]));
      queryClient.invalidateQueries({ queryKey: ["workouts"] });
    },
    onError: (error) => {
      console.error(error);
    },
  });
  return {
    updateWorkout,
    isPending,
    error,
  };
};

export const useDeleteWorkout = () => {
  const queryClient = useQueryClient();
  const { workouts, setWorkouts } = useWorkoutStore();
  const {
    mutateAsync: deleteWorkout,
    isPending,
    error,
  } = useMutation({
    mutationFn: (workoutId: string) => workoutAPI.deleteWorkout(workoutId),
    onSuccess: (data) => {
      setWorkouts(workouts.filter((workout) => workout._id !== data._id));
      queryClient.invalidateQueries({ queryKey: ["creation-workout"] });
      queryClient.invalidateQueries({ queryKey: ["workouts"] });
      storage.set(
        "workouts",
        JSON.stringify(workouts.filter((workout) => workout._id !== data._id))
      );
    },
    onError: (error) => {
      console.error(error);
    },
  });
  return { deleteWorkout, isPending, error };
};

export const useToggleWorkoutActiveStatus = () => {
  const queryClient = useQueryClient();
  const { workouts, setWorkouts } = useWorkoutStore();
  const {
    mutateAsync: toggleWorkoutActiveStatus,
    isPending,
    error,
  } = useMutation({
    mutationFn: (workoutId: string) =>
      workoutAPI.toggleWorkoutActiveStatus(workoutId),
    onSuccess: (data) => {
      setWorkouts(
        workouts.map((workout) => (workout._id === data._id ? data : workout))
      );
      queryClient.invalidateQueries({ queryKey: ["workouts"] });
      storage.set(
        "workouts",
        JSON.stringify(
          workouts.map((workout) => (workout._id === data._id ? data : workout))
        )
      );
    },
    onError: (error) => {
      console.error(error);
    },
  });
  return { toggleWorkoutActiveStatus, isPending, error };
};
