import { api } from "./api.js"; 

export const getCategorias = async () => {
  const res = await api.get("/categorias");
  return res.data;
};

export const getLocais = async () => {
  const res = await api.get("/lugares");
  return res.data;
};

export const getLugaresByCategoria = async (id) => {
  const res = await api.get(`/lugares/categoria/${id}`);
  return res.data;
};
