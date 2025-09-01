import { create } from "zustand";
import { User } from "../types";

interface UserStore {
  user: User;
  isAuthenticated: boolean;
  setIsAuthenticated: (isAuthenticated: boolean) => void;
  getIsAuthenticated: () => boolean;
  setUser: (user: User) => void;
  getUser: () => User;
}

const useUserStore = create<UserStore>((set, get) => ({
  user: {
    _id: "",
    name: "",
    email: "",
  },
  isAuthenticated: false,
  setUser: (user) => set({ user }),
  getIsAuthenticated: () => get().isAuthenticated,
  getUser: () => get().user,
  setIsAuthenticated: (isAuthenticated) => set({ isAuthenticated }),
}));

export default useUserStore;
