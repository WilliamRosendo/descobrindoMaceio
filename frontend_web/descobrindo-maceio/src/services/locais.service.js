import { api } from "../services/api.js";

export const getLocais = () => api.get("/api/lugares");
export const getLocalById = (id) => api.get(`/api/lugares/${id}`);
