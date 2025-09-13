import { create } from "zustand";
import { Schedule } from "../types";

interface ScheduleStore {
  schedules: Schedule[];
  setSchedules: (schedules: Schedule[]) => void;
  getOneSchedule: (scheduleId: string) => Schedule | undefined;
}

const useScheduleStore = create<ScheduleStore>((set, get) => ({
  schedules: [],
  setSchedules: (schedules: Schedule[]) => set({ schedules }),
  getOneSchedule: (scheduleId: string) =>
    get().schedules.find((schedule) => schedule._id === scheduleId),
}));

export default useScheduleStore;
