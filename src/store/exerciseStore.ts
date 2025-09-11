import { create } from "zustand";
import { Exercise } from "../types";

interface ExerciseStore {
  exercises: Exercise[];
  currentPage: number;
  totalPages: number;
  hasMore: boolean;
  isLoading: boolean;
  searchQuery: string;
  bodyPart: string;
  target: string;
  equipment: string;
  category: string;
  // Actions
  setExercises: (exercises: Exercise[]) => void;
  appendExercises: (exercises: Exercise[]) => void;
  setCurrentPage: (page: number) => void;
  setTotalPages: (totalPages: number) => void;
  setHasMore: (hasMore: boolean) => void;
  setIsLoading: (isLoading: boolean) => void;
  setSearchQuery: (query: string) => void;
  setBodyPart: (bodyPart: string) => void;
  setTarget: (target: string) => void;
  setCategory: (category: string) => void;
  setEquipment: (equipment: string) => void;
  resetExercises: () => void;

  resetPagination: () => void;
}

const useExerciseStore = create<ExerciseStore>((set) => ({
  exercises: [],
  currentPage: 1,
  totalPages: 1,
  hasMore: false,
  isLoading: false,
  searchQuery: "",
  bodyPart: "",
  target: "",
  equipment: "",
  category: "",

  setExercises: (exercises: Exercise[]) => set({ exercises }),
  appendExercises: (newExercises: Exercise[]) =>
    set((state) => ({
      exercises: [...state.exercises, ...newExercises],
    })),
  setCurrentPage: (page: number) => set({ currentPage: page }),
  setTotalPages: (totalPages: number) => set({ totalPages }),
  setHasMore: (hasMore: boolean) => set({ hasMore }),
  setIsLoading: (isLoading: boolean) => set({ isLoading }),
  setSearchQuery: (query: string) => set({ searchQuery: query }),
  setBodyPart: (bodyPart: string) => set({ bodyPart }),
  setTarget: (target: string) => set({ target }),
  setCategory: (category: string) => set({ category }),
  setEquipment: (equipment: string) => set({ equipment }),
  resetExercises: () => set({ exercises: [] }),
  resetPagination: () =>
    set({
      currentPage: 1,
      totalPages: 1,
      hasMore: false,
    }),
}));
export default useExerciseStore;
