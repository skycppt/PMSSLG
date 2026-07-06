import api from "../api/axios";

const getAuthConfig = () => ({
  headers: {
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  },
});

export const getAllPublications = async () => {
  const response = await api.get(
    "/publications",
    getAuthConfig()
  );

  return response.data;
};

export const createPublication = async (publicationData) => {
  const response = await api.post(
    "/publications",
    publicationData,
    getAuthConfig()
  );

  return response.data;
};

export const updatePublication = async (id, publicationData) => {
  const response = await api.put(
    `/publications/${id}`,
    publicationData,
    getAuthConfig()
  );

  return response.data;
};

export const deletePublication = async (id) => {
  const response = await api.delete(
    `/publications/${id}`,
    getAuthConfig()
  );

  return response.data;
};