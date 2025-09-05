import { useEffect } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import useUserStore from "../store/userStore";
import storage from "../config/storage";
import { userAPI } from "../api/user";
import { User } from "../types";

export const useUser = () => {
  const { setUser } = useUserStore();
  const currentUser = storage.getString("user");

  const getCurrentUserQuery = useQuery({
    queryKey: ["user"],
    queryFn: userAPI.getCurrentUser,
  });

  // Initialize user from storage on mount
  useEffect(() => {
    if (currentUser && !getCurrentUserQuery.data) {
      try {
        const parsedUser = JSON.parse(currentUser);
        setUser(parsedUser);
      } catch (error) {
        console.error("Error parsing stored user:", error);
        storage.delete("user");
      }
    }
  }, []); // Only run on mount

  // Update user when API data is available
  useEffect(() => {
    if (getCurrentUserQuery.data && !currentUser) {
      setUser(getCurrentUserQuery.data);
      storage.set("user", JSON.stringify(getCurrentUserQuery.data));
    }
  }, [getCurrentUserQuery.data, currentUser, setUser]);

  return { getCurrentUserQuery };
};

export const useUpdateUser = () => {
  const { setUser } = useUserStore();
  const updateUserMutation = useMutation({
    mutationFn: (user: User) => {
      return userAPI.updateUser(user);
    },
    onSuccess: (data: User) => {
      setUser(data);
    },
    onError: (error: any) => {
      console.error("Failed to update user:", error);
    },
  });

  return { updateUserMutation };
};
