import { useState } from "react";
import { authAPI } from "../api";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useUserStore } from "../store";
import * as SecureStore from "expo-secure-store";
import { RelativePathString, router, useRouter } from "expo-router";
import storage from "../config/storage";
import { User } from "../types";
import { userAPI } from "../api/user";

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
      storage.set("user", JSON.stringify(data.user));

      // Navigate based on onboarding status
      data.user.isOnboarded
        ? router.navigate("/(tabs)/home" as RelativePathString)
        : router.navigate("/onboarding" as RelativePathString);
    },
  });
  return { verifyOtp, isPending, error };
};

export const useCheckUserLoggedIn = () => {
  const router = useRouter();
  const { setIsAuthenticated, setUser, user } = useUserStore();
  const [isLoading, setIsLoading] = useState(true);

  // Query for fetching user from API (only when needed)
  const getUserQuery = useQuery({
    queryKey: ["current-user"],
    queryFn: userAPI.getCurrentUser,
    enabled: false,
    retry: false,
  });

  const checkAuthStatus = async () => {
    try {
      setIsLoading(true);

      // Step 1: Check if user exists in MMKV storage
      const currentUser = storage.getString("user");
      console.log("currentUser", currentUser);
      if (currentUser) {
        try {
          const parsedUser = JSON.parse(currentUser) as User;
          setUser(parsedUser);
          setIsAuthenticated(true);

          // Navigate based on onboarding status
          if (parsedUser.isOnboarded) {
            router.navigate("/(tabs)/home" as RelativePathString);
          } else {
            router.navigate("/onboarding" as RelativePathString);
          }
          setIsLoading(false);
          return;
        } catch (error) {
          console.error("Error parsing stored user:", error);
          storage.delete("user");
          // Continue to check auth token
        }
      }

      // Step 2: User not in storage, check if auth token exists
      const token = await SecureStore.getItemAsync("token");
      if (!token) {
        // No token found, redirect to login

        router.navigate("/login" as RelativePathString);
        setIsLoading(false);
        return;
      }

      // Step 3: Token exists, fetch user details from API
      const result = await getUserQuery.refetch();

      if (result.data) {
        const userData = result.data;
        setIsAuthenticated(true);
        setUser(userData);
        storage.set("user", JSON.stringify(userData));

        // Navigate based on onboarding status
        if (userData.isOnboarded) {
          router.navigate("/(tabs)/home" as RelativePathString);
        } else {
          router.navigate("/onboarding" as RelativePathString);
        }
      } else {
        // API call failed, token might be invalid
        console.error("Failed to fetch user data");
        await SecureStore.deleteItemAsync("token");
        storage.delete("user");
        router.navigate("/login" as RelativePathString);
      }
    } catch (error) {
      console.error("Error checking auth status:", error);
      // Clean up invalid data
      await SecureStore.deleteItemAsync("token");
      storage.delete("user");
      router.navigate("/login" as RelativePathString);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    checkAuthStatus,
    isLoading: isLoading || getUserQuery.isFetching,
  };
};

export const useLogout = () => {
  const { setIsAuthenticated, setUser } = useUserStore();

  const logout = async () => {
    try {
      await SecureStore.deleteItemAsync("token");
      storage.delete("user");
      setIsAuthenticated(false);
      setUser({} as User);
      router.navigate("/login" as RelativePathString);
    } catch (error) {
      console.error("Error during logout:", error);
      // Still navigate to login even if cleanup fails
      router.navigate("/login" as RelativePathString);
    }
  };

  return { logout };
};
