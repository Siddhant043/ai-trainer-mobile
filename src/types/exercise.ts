interface Exercise {
  _id: string;
  exerciseName: string;
  instructions: string[];
  equipment: string;
  imageUrl: string[];
  bodyPart: string;
  secondaryMuscels: string[];
  target: string;
  description: string;
  difficulty: string;
  category: string;
  loggingType:
    | "sets_reps"
    | "time_distance"
    | "sets_reps_weight"
    | "duration_only";
}
export default Exercise;
