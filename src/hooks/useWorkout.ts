// hooks/useWorkout.ts
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { workoutAPI } from "../api/workout";
import { ExercisesResponse } from "../types";

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
