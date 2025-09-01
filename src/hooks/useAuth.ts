import { useState } from "react";
import { authAPI } from "../api";
import { useMutation } from "@tanstack/react-query";
import { useUserStore } from "../store";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const useLogin = () => {
  const {
    mutate: login,
    isPending,
    error,
  } = useMutation({
    mutationFn: authAPI.login,
  });
  return { login, isPending, error };
};

export const useVerifyOtp = () => {
  const { setIsAuthenticated, setUser } = useUserStore();
  const {
    mutate: verifyOtp,
    isPending,
    error,
  } = useMutation({
    mutationFn: ({ email, otp }: { email: string; otp: string }) =>
      authAPI.verify(email, otp),
    onSuccess: (data) => {
      setIsAuthenticated(true);
      AsyncStorage.setItem("token", data.token);
      setUser(data.user);
    },
  });
  return { verifyOtp, isPending, error };
};
