import api from "../api/axios";

const getAuthConfig = () => ({
  headers: {
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  },
});

export const getAllSales = async () => {

  const response =
    await api.get(
      "/book-sales",
      getAuthConfig()
    );

  return response.data;

};

export const createSale = async(data)=>{

const response=
await api.post(

"/book-sales",

data,

getAuthConfig()

);

return response.data;

};

export const getSaleById = async (id) => {

  const response = await api.get(

    `/book-sales/${id}`,

    getAuthConfig()

  );

  return response.data;

};

export const cancelSale = async (id) => {

  const response = await api.put(

    `/book-sales/${id}/cancel`,

    {},

    getAuthConfig()

  );

  return response.data;

};