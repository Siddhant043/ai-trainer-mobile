interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  phoneNumber?: number;
  dob?: string;
  physicalDetials?: {
    weight?: number;
    height?: number;
    gender?: string;
  };
  dietaryPreferences?: {
    dietaryRestrictions?: string;
    state?: string;
    fastingPreference?: string;
  };
  exercisePreferences?: {
    goal?: string;
    experienceLevel?: string;
    schedulePreference?: string;
    timeAvailable?: string;
    workoutLocation?: string;
  };
  updatedAt?: string;
  timezone?: string;
  language?: string;
  currency?: string;
  equipments?: string[];
}
export default User;
