import { User } from "../types";
import api, { USER_MS_URL } from "./config";

export const userAPI = {
  getCurrentUser: async () => {
    //const token = await AsyncStorage.getItem("token");
    const response = await api.get(`${USER_MS_URL}/users/me`);
    return response.data.user;
  },
  updateUser: async (user: User) => {
    const response = await api.patch(`${USER_MS_URL}/users/`, user);
    return response.data.user;
  },
};
