import api, { USER_MS_URL } from "./config";

export const authAPI = {
  login: async (email: string) => {
    const response = await api.post(`${USER_MS_URL}/auth/login`, {
      email,
    });
    return response.data;
  },

  verify: async (email: string, otp: string) => {
    const response = await api.post(`${USER_MS_URL}/auth/verify`, {
      email,
      otp,
    });
    return response.data;
  },
};
