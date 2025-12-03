import { api } from "../services/api.js";

export const getCategorias = async () => {
  const res = await api.get("/api/categorias");
  return res.data;
};

export const getLocais = async () => {
  const res = await api.get("/api/lugares");
  return res.data;
};

export const getLugaresByCategoria = async (id) => {
  const res = await api.get(`/api/lugares/categoria/${id}`);
  return res.data;
};
