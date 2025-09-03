import { useState, useEffect } from "react";
import { authAPI } from "../api";
import { useMutation } from "@tanstack/react-query";
import { useUserStore } from "../store";
import * as SecureStore from "expo-secure-store";
import { useUser } from "./useUser";
import { RelativePathString, useRouter } from "expo-router";
import storage from "../config/storage";

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
  const router = useRouter();
  const {
    mutate: verifyOtp,
    isPending,
    error,
  } = useMutation({
    mutationFn: ({ email, otp }: { email: string; otp: string }) =>
      authAPI.verify(email, otp),
    onSuccess: (data) => {
      setIsAuthenticated(true);
      SecureStore.setItemAsync("token", data.token);
      setUser(data.user);
      data.user.isOnboarded
        ? router.navigate("/login" as RelativePathString)
        : router.navigate("/onboarding" as RelativePathString);
    },
  });
  return { verifyOtp, isPending, error };
};

export const useCheckUserLoggedIn = () => {
  const router = useRouter();
  const { getCurrentUserQuery } = useUser();
  const { setIsAuthenticated, setUser } = useUserStore();

  const checkAuthStatus = async () => {
    try {
      const token = await SecureStore.getItemAsync("token");
      if (!token) {
        // No token found, redirect to login
        router.navigate("/login" as RelativePathString);
        return;
      }

      // Token exists, check if user data is available
      if (getCurrentUserQuery.data) {
        setIsAuthenticated(true);
        setUser(getCurrentUserQuery.data);

        // Check onboarding status
        if (!getCurrentUserQuery.data.isOnboarded) {
          router.navigate("/onboarding" as RelativePathString);
        } else {
          router.navigate("/(tabs)" as RelativePathString);
        }
      } else if (getCurrentUserQuery.error) {
        // Query failed, token might be invalid
        console.error("User query failed:", getCurrentUserQuery.error);
        await SecureStore.deleteItemAsync("token");
        router.navigate("/login" as RelativePathString);
      }
      // If query is still loading, wait for it to complete
    } catch (error) {
      console.error("Error checking auth status:", error);
      router.navigate("/login" as RelativePathString);
    }
  };

  // Automatically check auth status when query completes
  useEffect(() => {
    if (getCurrentUserQuery.data || getCurrentUserQuery.error) {
      checkAuthStatus();
    }
  }, [getCurrentUserQuery.data, getCurrentUserQuery.error]);

  return { checkAuthStatus, isLoading: getCurrentUserQuery.isLoading };
};
