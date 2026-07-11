import api from "../api/axios";


const getAuthConfig = () => ({
  headers: {
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  },
});

export const getAllSubscriptions = async () => {
  const response = await api.get(
    "/subscriptions",
    getAuthConfig()
  );

  return response.data;
};

export const createSubscription = async (data) => {
  const response = await api.post(
    "/subscriptions",
    data,
    getAuthConfig()
  );

  return response.data;
};

export const renewSubscription = async (
  id,
  data
) => {
  const response = await api.post(
    `/subscriptions/${id}/renew`,
    data,
    getAuthConfig()
  );

  return response.data;
};

export const cancelSubscription = async (
  id
) => {
  const response = await api.put(
    `/subscriptions/${id}/cancel`,
    {},
    getAuthConfig()
  );

  return response.data;
};

export const getSubscriptionById = async (
  id
) => {
  const response = await api.get(
    `/subscriptions/${id}`,
    getAuthConfig()
  );

  return response.data;
};

export const getAllPublications = async () => {
  const response = await api.get(
    "/publications",
    getAuthConfig()
  );

  return response.data;
};

export const getSubscriptionDetails = async (id) => {
  const response = await api.get(
    `/subscriptions/${id}`,
    getAuthConfig()
  );

  return response.data;
};

export const deliverMagazine = async (
  id,
  month
) => {
  const response = await api.put(
    `/subscriptions/${id}/deliver`,
    { month },
    getAuthConfig()
  );

  return response.data;
};