// import api from "../api/axios";

// export const getDashboardData = async () => {
//   const token = localStorage.getItem("token");

//   const response = await api.get("/dashboard", {
//     headers: {
//       Authorization: `Bearer ${token}`,
//     },
//   });

//   return response.data;
// };


import api from "../api/axios";

const getAuthConfig = () => ({
  headers: {
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  },
});

export const getDashboard = async () => {

  const response = await api.get(
    "/dashboard",
    getAuthConfig()
  );

  return response.data.data;

};