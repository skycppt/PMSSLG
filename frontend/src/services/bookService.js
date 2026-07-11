import api from "../api/axios";

const getAuthConfig = () => ({
  headers: {
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  },
});

export const getAllBooks = async () => {
  const response = await api.get("/books", getAuthConfig());
  return response.data;
};

export const addBookStock = async (bookId, quantity) => {
  const response = await api.put(
    `/books/${bookId}/restock`,
    { quantity },
    getAuthConfig()
  );

  return response.data;
};

export const createBook = async (bookData) => {
  const response = await api.post(
    "/books",
    bookData,
    getAuthConfig()
  );

  return response.data;
};

export const updateBook = async (id, bookData) => {
  const response = await api.put(
    `/books/${id}`,
    bookData,
    getAuthConfig()
  );

  return response.data;
};

export const deleteBook = async (id) => {
  const response = await api.delete(
    `/books/${id}`,
    getAuthConfig()
  );

  return response.data;
};