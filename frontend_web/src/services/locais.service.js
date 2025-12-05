import { api } from "./api.js";

export const getLocais = () => api.get("/lugares");
export const getLocalById = (id) => api.get(`/lugares/${id}`);
