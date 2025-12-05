import { api } from "./api.js";

const getToken = () => localStorage.getItem("token");

// Adiciona interceptor para incluir token em todas as requisições
api.interceptors.request.use(
  (config) => {
    const token = getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export const getFavoritos = async () => {
  try {
    const response = await api.get("/favoritos");
    return response.data;
  } catch (error) {
    console.error("Erro ao carregar favoritos:", error);
    throw error;
  }
};

export const addFavorito = async (categoria, lugarId) => {
  try {
    const response = await api.post("/favoritos/add", { categoria, lugarId });
    return response.data;
  } catch (error) {
    console.error("Erro ao adicionar favorito:", error);
    throw error;
  }
};

export const removeFavorito = async (categoria, lugarId) => {
  try {
    const response = await api.post("/favoritos/remove", { categoria, lugarId });
    return response.data;
  } catch (error) {
    console.error("Erro ao remover favorito:", error);
    throw error;
  }
};