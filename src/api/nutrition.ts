import { User } from "../types";
import api, { USER_MS_URL } from "./config";

export const nutritionAPI = {
  getDailyNutrition: async () => {
    const response = await api.get(`${USER_MS_URL}/users/nutrition/today`);
    return response.data.dailyNutrition;
  },
};
