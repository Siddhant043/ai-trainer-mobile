import Exercise from "./exercise";

export { default as User } from "./userTypes";
export { default as Exercise } from "./exercise";
export { default as Workout } from "./workout";
export { default as Schedule } from "./schedule";
export { default as ExerciseRecord } from "./exerciseRecord";
export { default as ScheduleRecord } from "./scheduleRecord";
export { default as Meal } from "./meal";

// API Response Types
export interface ExercisesResponse {
  total: number;
  page: number;
  pages: number;
  exercises: Exercise[];
}

export type STATE =
  | "andaman-and-nicobar-islands"
  | "andhra-pradesh"
  | "arunachal-pradesh"
  | "assam"
  | "bihar"
  | "chandigarh"
  | "chhattisgarh"
  | "dadra-and-nagar-haveli-and-daman-and-diu"
  | "delhi"
  | "goa"
  | "gujarat"
  | "haryana"
  | "himachal-pradesh"
  | "jammu-and-kashmir"
  | "jharkhand"
  | "karnataka"
  | "kerala"
  | "ladakh"
  | "lakshadweep"
  | "madhya-pradesh"
  | "maharashtra"
  | "manipur"
  | "meghalaya"
  | "mizoram"
  | "nagaland"
  | "odisha"
  | "puducherry"
  | "punjab"
  | "rajasthan"
  | "sikkim"
  | "tamil-nadu"
  | "telangana"
  | "tripura"
  | "uttar-pradesh"
  | "uttarakhand"
  | "west-bengal";

export type DIETARY_RESTRICTIONS =
  | "vegetarian"
  | "vegan"
  | "non-vegetarian"
  | "gluten-free"
  | "lactose-free"
  | "other"
  | "none";

export type FASTING_PREFERENCE = "navratri" | "ramadan" | "other" | "none";

export type FITNESS_GOAL =
  | "weight-loss"
  | "muscle-gain"
  | "recomposition"
  | "endurance";

export type EXPERIENCE_LEVEL = "beginner" | "intermediate" | "advanced";

export type SCHEDULE_PREFERENCE =
  | "morning"
  | "evening"
  | "afternoon"
  | "anytime";

export type TIME_AVAILABLE =
  | "30-mins"
  | "1-hour"
  | "1-hour-30-mins"
  | "2-hours"
  | "2-hours-30-mins"
  | "3-hours"
  | "more-than-3-hours";

export type WORKOUT_LOCATION = "home" | "gym" | "park" | "other";
