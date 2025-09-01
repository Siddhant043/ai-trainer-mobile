import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";

// Create axios instance with base configuration
const api = axios.create({
  timeout: 10000, // 10 seconds timeout
});

// Request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    const token = AsyncStorage.getItem("token");
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Handle common errors here if needed
    if (error.response?.status === 401) {
      // Token expired or invalid - remove token
      AsyncStorage.removeItem("token");
      // Optionally redirect to login
      router.navigate("/login" as any);
    }
    return Promise.reject(error);
  }
);

export default api;

// Export env variables
export const USER_MS_URL = process.env.EXPO_PUBLIC_USER_MS_URL;
