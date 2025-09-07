import { useEffect } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import useUserStore from "../store/userStore";
import storage from "../config/storage";
import { userAPI } from "../api/user";
import { User } from "../types";

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
