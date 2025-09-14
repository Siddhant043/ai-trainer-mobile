interface ScheduleRecord {
  _id: string;
  scheduleId: string;
  userId: string;
  workoutId: string;
  duration: number;
  exerciseRecords: {
    exerciseId: string;
    sets: {
      setNumber: number;
      reps?: number;
      weight?: number;
      duration?: number;
      distance?: number;
      completed?: boolean;
    }[];
  }[];
  createdAt?: string;
  updatedAt?: string;
}

export default ScheduleRecord;
