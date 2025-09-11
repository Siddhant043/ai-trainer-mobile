import Schedule from "./schedule";

interface Workout {
  _id: string;
  name: string;
  description: string;
  workoutDays?: string[];
  schedules?: Schedule[];
  active?: boolean;
  isCustom?: boolean;
}

export default Workout;
