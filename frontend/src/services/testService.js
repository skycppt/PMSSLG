import api from "../api/axios";

export const testBackend = async () => {
  const response = await api.get("/");
  return response.data;
};