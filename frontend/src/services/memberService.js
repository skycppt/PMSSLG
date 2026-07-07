import api from "../api/axios";

const getAuthConfig = () => ({
  headers: {
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  },
});

export const getAllMembers = async () => {
  const response = await api.get(
    "/members",
    getAuthConfig()
  );

  return response.data;
};

export const createMember = async (memberData) => {
  const response = await api.post(
    "/members",
    memberData,
    getAuthConfig()
  );

  return response.data;
};

export const updateMember = async (
  id,
  memberData
) => {

  const response = await api.put(
    `/members/${id}`,
    memberData,
    getAuthConfig()
  );

  return response.data;
};

export const deleteMember = async (
  id
) => {

  const response = await api.delete(
    `/members/${id}`,
    getAuthConfig()
  );

  return response.data;
};