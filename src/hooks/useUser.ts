import { useEffect } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import useUserStore from "../store/userStore";
import storage from "../config/storage";
import { userAPI } from "../api/user";
import { User } from "../types";
import { nutritionAPI } from "../api/nutrition";

export const useUser = () => {
  const { setUser } = useUserStore();

  // This query is mainly for background syncing or manual refresh
  const getCurrentUserQuery = useQuery({
    queryKey: ["user"],
    queryFn: userAPI.getCurrentUser,
    enabled: false, // We'll control when this runs
    staleTime: 5 * 60 * 1000, // Consider data fresh for 5 minutes
  });

  // Function to initialize user from storage
  const initializeUserFromStorage = () => {
    const currentUser = storage.getString("user");
    if (currentUser) {
      try {
        const parsedUser = JSON.parse(currentUser);
        setUser(parsedUser);
        return parsedUser;
      } catch (error) {
        console.error("Error parsing stored user:", error);
        storage.delete("user");
        return null;
      }
    }
    return null;
  };

  // Function to refresh user data from API
  const refreshUserData = async () => {
    try {
      const result = await getCurrentUserQuery.refetch();
      if (result.data) {
        setUser(result.data);
        storage.set("user", JSON.stringify(result.data));
        return result.data;
      }
      return null;
    } catch (error) {
      console.error("Error refreshing user data:", error);
      return null;
    }
  };

  // Sync user data when API response is available (for background updates)
  useEffect(() => {
    if (getCurrentUserQuery.data) {
      const currentStoredUser = storage.getString("user");

      // Only update if the data is different
      if (currentStoredUser) {
        try {
          const parsedStoredUser = JSON.parse(currentStoredUser);
          const apiUser = getCurrentUserQuery.data;

          // Simple comparison - you might want to implement a more sophisticated diff
          if (JSON.stringify(parsedStoredUser) !== JSON.stringify(apiUser)) {
            setUser(apiUser);
            storage.set("user", JSON.stringify(apiUser));
          }
        } catch (error) {
          console.error("Error comparing user data:", error);
          setUser(getCurrentUserQuery.data);
          storage.set("user", JSON.stringify(getCurrentUserQuery.data));
        }
      } else {
        // No stored user, save the API data
        setUser(getCurrentUserQuery.data);
        storage.set("user", JSON.stringify(getCurrentUserQuery.data));
      }
    }
  }, [getCurrentUserQuery.data, setUser]);

  return {
    getCurrentUserQuery,
    initializeUserFromStorage,
    refreshUserData,
  };
};

export const useUpdateUser = () => {
  const { setUser } = useUserStore();

  const updateUserMutation = useMutation({
    mutationFn: (user: User) => {
      return userAPI.updateUser(user);
    },
    onSuccess: (data: User) => {
      setUser(data);
      // Update storage with the new user data
      storage.set("user", JSON.stringify(data));
    },
    onError: (error: any) => {
      console.error("Failed to update user:", error);
    },
  });

  return { updateUserMutation };
};

/**
 * Hook to fetch and manage daily nutrition data
 *
 * Features:
 * - Automatically refetches every 10 seconds if dailyNutrition is missing or has no _id
 * - Stops polling once valid data is received
 * - Updates both Zustand store and async storage when data is received
 * - Supports manual refetch via refetchDailyNutrition
 *
 * @returns {Object} - {
 *   dailyNutrition: Daily nutrition data from the API,
 *   isLoading: Loading state,
 *   error: Error object if any,
 *   refetchDailyNutrition: Manual refetch function,
 *   isDailyNutritionMissing: Boolean indicating if data is missing
 * }
 *
 * @example
 * ```tsx
 * const MyComponent = () => {
 *   const { dailyNutrition, isLoading, isDailyNutritionMissing } = useDailyNutrition();
 *
 *   if (isLoading && isDailyNutritionMissing) {
 *     return <Text>Loading nutrition data...</Text>;
 *   }
 *
 *   return <Text>Calories: {dailyNutrition?.totalRequiredCalories}</Text>;
 * }
 * ```
 */
export const useDailyNutrition = () => {
  const { setUser, user } = useUserStore();

  // Check if dailyNutrition is missing or null
  const isDailyNutritionMissing =
    !user.dailyNutrition || !user.dailyNutrition._id;

  const {
    data: dailyNutrition,
    isLoading,
    error,
    refetch: refetchDailyNutrition,
  } = useQuery({
    queryKey: ["dailyNutrition"],
    queryFn: () => nutritionAPI.getDailyNutrition(),
    // Enable automatic refetching every 10 seconds when dailyNutrition is missing
    refetchInterval: isDailyNutritionMissing ? 10000 : false, // 10 seconds
    // Keep refetching even when window is in background if data is missing
    refetchIntervalInBackground: isDailyNutritionMissing,
    // Refetch on mount if data is missing
    refetchOnMount: isDailyNutritionMissing,
    // Always refetch on window focus if data is missing
    refetchOnWindowFocus: isDailyNutritionMissing,
  });

  // Update store and storage when dailyNutrition is received
  useEffect(() => {
    if (dailyNutrition) {
      const updatedUser = { ...user, dailyNutrition };
      setUser(updatedUser);
      // Also update storage to persist the data
      storage.set("user", JSON.stringify(updatedUser));
    }
  }, [dailyNutrition]);

  return {
    dailyNutrition,
    isLoading,
    error,
    refetchDailyNutrition,
    isDailyNutritionMissing,
  };
};
