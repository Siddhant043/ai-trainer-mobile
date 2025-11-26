export default interface Meal {
  macros: {
    calories: number;
    protein: number;
    carbohydrates: number;
    fat: number;
  };
  _id: string;
  mealTopic: string;
  userId: string;
  createdAt: string;
  updatedAt: string;
}
