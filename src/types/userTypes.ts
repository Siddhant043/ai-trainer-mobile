import {
  DIETARY_RESTRICTIONS,
  EXPERIENCE_LEVEL,
  FASTING_PREFERENCE,
  FITNESS_GOAL,
  SCHEDULE_PREFERENCE,
  STATE,
  TIME_AVAILABLE,
  WORKOUT_LOCATION,
} from ".";

interface User {
  _id: string;
  name: string;
  email: string;
  avatar?: string;
  phoneNumber?: string;
  dob?: string;
  physicalDetials?: {
    weight?: number;
    height?: number;
    gender?: string;
  };
  dietaryPreferences?: {
    dietaryRestrictions?: DIETARY_RESTRICTIONS;
    state?: STATE;
    fastingPreference?: FASTING_PREFERENCE;
  };
  exercisePreferences?: {
    fitnessGoal?: FITNESS_GOAL;
    experienceLevel?: EXPERIENCE_LEVEL;
    schedulePreference?: SCHEDULE_PREFERENCE;
    timeAvailable?: TIME_AVAILABLE;
    workoutLocation?: WORKOUT_LOCATION;
  };
  isOnboarded?: boolean;
  updatedAt?: string;
  timezone?: string;
  language?: string;
  currency?: string;
  dailyNutrition: {
    _id: string;
    totalRequiredCalories: number;
    totalRequiredProtein: number;
    totalRequiredCarbohydrates: number;
    totalRequiredFat: number;
    totalConsumedCalories: number;
    totalConsumedProtein: number;
    totalConsumedCarbohydrates: number;
    totalConsumedFat: number;
  };
  equipments?: string[];
}
export default User;
