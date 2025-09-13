interface ExerciseRecord {
  _id: string;
  exerciseId: string;
  sets: {
    set: number;
    reps?: number;
    weight?: number;
    previous?: string;
    completed: boolean;
    distance?: number;
    duration?: number;
  }[];
  scheduleId: string;
  userId: string;
  createdAt: string;
  updatedAt: string;
}

export default ExerciseRecord;
