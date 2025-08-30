import { create } from "zustand";
import { User } from "../types";

interface UserStore {
  user: User | null;
  isAuthenticated: boolean;
  setIsAuthenticated: (isAuthenticated: boolean) => void;
  getIsAuthenticated: () => boolean;
  setUser: (user: User | null) => void;
  getUser: () => User | null;
}

const useUserStore = create<UserStore>((set, get) => ({
  user: null,
  isAuthenticated: false,
  setUser: (user) => set({ user }),
  getIsAuthenticated: () => get().isAuthenticated,
  getUser: () => get().user,
  setIsAuthenticated: (isAuthenticated) => set({ isAuthenticated }),
}));

export default useUserStore;
