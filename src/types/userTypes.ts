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
  id: string;
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
  updatedAt?: string;
  timezone?: string;
  language?: string;
  currency?: string;
  equipments?: string[];
}
export default User;
