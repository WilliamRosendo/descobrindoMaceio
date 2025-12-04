import axios from "axios";

const API_URL = "http://localhost:5000/api/favoritos";

const getToken = () => localStorage.getItem("token");

export const getFavoritos = async () => {
  try {
    const token = getToken();
    const response = await axios.get(API_URL, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    console.error("Erro ao carregar favoritos:", error);
    throw error;
  }
};

export const addFavorito = async (categoria, lugarId) => {
  try {
    const token = getToken();
    const response = await axios.post(
      `${API_URL}/add`,
      { categoria, lugarId },
      { headers: { Authorization: `Bearer ${token}` } }
    );
    return response.data;
  } catch (error) {
    console.error("Erro ao adicionar favorito:", error);
    throw error;
  }
};

export const removeFavorito = async (categoria, lugarId) => {
  try {
    const token = getToken();
    const response = await axios.post(
      `${API_URL}/remove`,
      { categoria, lugarId },
      { headers: { Authorization: `Bearer ${token}` } }
    );
    return response.data;
  } catch (error) {
    console.error("Erro ao remover favorito:", error);
    throw error;
  }
};
