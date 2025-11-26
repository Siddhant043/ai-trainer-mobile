import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { mealAPI } from "../api/meals";
import useMealsStore from "../store/mealsStore";
import { useEffect } from "react";
import { useDailyNutrition } from "./useUser";

export const useMeals = () => {
  const queryClient = useQueryClient();
  const { setMeals, setTodaysMeals } = useMealsStore();
  const { refetchDailyNutrition } = useDailyNutrition();
  const { mutate: createMeal, isPending: isCreatingMeal } = useMutation({
    mutationFn: mealAPI.createMeal,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["meals", "todaysMeals", "dailyNutrition"],
      });
      refetchMeals();
      refetchTodaysMeals();
      setMeals(meals);
      setTodaysMeals(todaysMeals);
    },
  });
  const {
    data: meals,
    isLoading: isLoadingMeals,
    refetch: refetchMeals,
  } = useQuery({
    queryKey: ["meals"],
    queryFn: mealAPI.getAllMealsByUserId,
    refetchInterval: 1000,
    refetchOnMount: true,
    refetchOnReconnect: true,
  });
  const {
    data: todaysMeals,
    isLoading: isLoadingTodaysMeals,
    refetch: refetchTodaysMeals,
  } = useQuery({
    queryKey: ["todaysMeals"],
    queryFn: mealAPI.getTodaysMealsByUserId,
    refetchInterval: 1000,
    refetchOnMount: true,
    refetchOnReconnect: true,
  });

  const { mutate: deleteMeal, isPending: isDeletingMeal } = useMutation({
    mutationFn: mealAPI.deleteMeal,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["meals", "todaysMeals", "dailyNutrition"],
      });
      refetchMeals();
      refetchTodaysMeals();
      refetchDailyNutrition();
    },
  });
  useEffect(() => {
    if (meals) {
      setMeals(meals);
    }
    if (todaysMeals) {
      setTodaysMeals(todaysMeals);
    }
  }, [meals, todaysMeals]);
  return {
    createMeal,
    meals,
    todaysMeals,
    isCreatingMeal,
    isLoadingMeals,
    isLoadingTodaysMeals,
    deleteMeal,
    isDeletingMeal,
  };
};
