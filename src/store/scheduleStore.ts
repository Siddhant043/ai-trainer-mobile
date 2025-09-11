import { create } from "zustand";
import { Schedule } from "../types";

interface ScheduleStore {
  schedules: Schedule[];
  setSchedules: (schedules: Schedule[]) => void;
}

const useScheduleStore = create<ScheduleStore>((set) => ({
  schedules: [],
  setSchedules: (schedules: Schedule[]) => set({ schedules }),
}));

export default useScheduleStore;
