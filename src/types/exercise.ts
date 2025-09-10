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
}
export default Exercise;
