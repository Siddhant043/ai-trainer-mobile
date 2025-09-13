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
  const { refetch: refetchExercises } = useGetExercises();

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
    invalidateQueries: () => refetchExercises(),
  };
};

export const useGetWorkouts = () => {
  const { setWorkouts } = useWorkoutStore();
  const storedWorkouts = storage.getString("workouts");
  const {
    data: workouts,
    isPending,
    error,
    refetch,
  } = useQuery<Workout[]>({
    queryKey: ["workouts"],
    queryFn: workoutAPI.getWorkouts,
  });

  useEffect(() => {
    if (workouts) {
      setWorkouts(workouts);
      storage.set("workouts", JSON.stringify(workouts));
    } else if (error) {
      setWorkouts(JSON.parse(storedWorkouts || ""));
    }
  }, [workouts, storedWorkouts]);

  return {
    workouts,
    isPending,
    error,
    refetch,
  };
};

export const useCreateWorkout = () => {
  const { refetch: refetchWorkouts } = useGetWorkouts();
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
      refetchWorkouts();
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
  const { refetch: refetchWorkouts } = useGetWorkouts();
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
      refetchWorkouts();
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
  const { workouts, setWorkouts } = useWorkoutStore();
  const { refetch: refetchWorkouts } = useGetWorkouts();
  const {
    mutateAsync: deleteWorkout,
    isPending,
    error,
  } = useMutation({
    mutationFn: (workoutId: string) => workoutAPI.deleteWorkout(workoutId),
    onSuccess: (data) => {
      setWorkouts(workouts.filter((workout) => workout._id !== data._id));
      storage.set(
        "workouts",
        JSON.stringify(workouts.filter((workout) => workout._id !== data._id))
      );
      refetchWorkouts();
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
  const { refetch: refetchWorkouts } = useGetWorkouts();
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
      storage.set(
        "workouts",
        JSON.stringify(
          workouts.map((workout) => (workout._id === data._id ? data : workout))
        )
      );
      refetchWorkouts();
    },
    onError: (error) => {
      console.error(error);
    },
  });
  return { toggleWorkoutActiveStatus, isPending, error };
};
