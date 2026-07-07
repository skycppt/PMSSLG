import api from "../api/axios";

const getAuthConfig = () => ({
  headers: {
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  },
});

export const getSalesReport = async (params) => {

  const response = await api.get(
    "/reports/sales",
    {
      ...getAuthConfig(),
      params,
    }
  );

  return response.data.data;

};