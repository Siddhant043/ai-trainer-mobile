import { create } from "zustand";
import { Meal } from "../types";

interface MealsStore {
  meals: Meal[];
  todaysMeals: Meal[];
  setMeals: (meals: Meal[]) => void;
  setTodaysMeals: (todaysMeals: Meal[]) => void;
}

const useMealsStore = create<MealsStore>((set) => ({
  meals: [],
  todaysMeals: [],
  setMeals: (meals: Meal[]) => set({ meals }),
  setTodaysMeals: (todaysMeals: Meal[]) => set({ todaysMeals }),
}));

export default useMealsStore;
