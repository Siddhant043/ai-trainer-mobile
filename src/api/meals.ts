import api, { MEAL_MS_URL } from "./config";

export const mealAPI = {
  createMeal: async (meal: {
    dailyNutritionId: string;
    mealDetails: string;
  }) => {
    const response = await api.post(`${MEAL_MS_URL}/meals`, {
      dailyNutritionId: meal.dailyNutritionId,
      mealTopic: meal.mealDetails,
    });
    return response.data.meal;
  },
  getAllMealsByUserId: async () => {
    const response = await api.get(`${MEAL_MS_URL}/meals/user`);
    return response.data.meals;
  },
  getTodaysMealsByUserId: async () => {
    const response = await api.get(`${MEAL_MS_URL}/meals/user/today`);
    return response.data.meals;
  },

  deleteMeal: async (mealId: string) => {
    const response = await api.delete(`${MEAL_MS_URL}/meals/${mealId}`);
    return response.data.meal;
  },
};
