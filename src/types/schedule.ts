import { Exercise } from "./";

interface Schedule {
  _id: string;
  name: string;
  description: string;
  workoutId: string;
  userId: string;
  exercises: Exercise[];
  days: Array<string>;
  createdAt: Date;
}

export default Schedule;
