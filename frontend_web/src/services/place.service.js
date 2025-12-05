import { api } from "./api.js"; 

export const getAllPlaces = async () => {
  const response = await api.get("/lugares");  // Use api, não axios direto
  return response.data;
};