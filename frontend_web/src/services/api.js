import axios from "axios";

const isDevelopment = import.meta.env.DEV;
const baseURL = isDevelopment 
      ? "http://localhost:5000" : "/api";  

export const api = axios.create({
  baseURL: baseURL,
});