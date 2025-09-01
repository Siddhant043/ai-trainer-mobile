import { userAPI } from "../api/user";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useUserStore } from "../store";
import { User } from "../types";
import { useEffect } from "react";

export const useUser = () => {
  const { setUser } = useUserStore();
  const getCurrentUserQuery = useQuery({
    queryKey: ["user"],
    queryFn: userAPI.getCurrentUser,
  });

  // Use useEffect to avoid setState during render
  useEffect(() => {
    if (getCurrentUserQuery.data) {
      setUser(getCurrentUserQuery.data);
    }
  }, [getCurrentUserQuery.data, setUser]);

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
