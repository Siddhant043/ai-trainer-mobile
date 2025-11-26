import { create } from "zustand";
import { User } from "../types";

interface UserStore {
  user: User;
  isAuthenticated: boolean;
  setIsAuthenticated: (isAuthenticated: boolean) => void;
  getIsAuthenticated: () => boolean;
  setUser: (user: User) => void;
  getUser: () => User;
  setDailyNutrition: (dailyNutrition: User["dailyNutrition"]) => void;
  getDailyNutrition: () => User["dailyNutrition"];
}

const useUserStore = create<UserStore>((set, get) => ({
  user: {
    _id: "",
    name: "",
    email: "",
    dailyNutrition: {
      _id: "",
      totalRequiredCalories: 0,
      totalRequiredProtein: 0,
      totalRequiredCarbohydrates: 0,
      totalRequiredFat: 0,
      totalConsumedCalories: 0,
      totalConsumedProtein: 0,
      totalConsumedCarbohydrates: 0,
      totalConsumedFat: 0,
    },
  },
  isAuthenticated: false,
  setUser: (user) => set({ user }),
  getIsAuthenticated: () => get().isAuthenticated,
  getUser: () => get().user,
  setIsAuthenticated: (isAuthenticated) => set({ isAuthenticated }),
  setDailyNutrition: (dailyNutrition) =>
    set((state) => ({
      user: { ...state.user, dailyNutrition },
    })),
  getDailyNutrition: () => get().user.dailyNutrition,
}));

export default useUserStore;
