import api from "../api/axios";

const getAuthConfig = () => ({
  headers: {
    Authorization:
      `Bearer ${localStorage.getItem("token")}`,
  },
});



export const verifyPayment = async (
  paymentData
) => {

  const response =
    await api.post(

      "/payments/verify",

      paymentData,

      getAuthConfig()

    );

  return response.data;

};
