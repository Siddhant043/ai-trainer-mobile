import { useState } from "react";
import { authAPI } from "../api";
import { useUserStore } from "../store";
import { useMutation, useQuery } from "@tanstack/react-query";

export const useLogin = () => {
  const { setIsAuthenticated } = useUserStore();
  const {
    mutate: login,
    isPending,
    error,
  } = useMutation({
    mutationFn: authAPI.login,
    onSuccess: () => {
      setIsAuthenticated(true);
    },
  });
  return { login, isPending, error };
};
