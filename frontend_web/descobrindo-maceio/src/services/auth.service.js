import { api } from "../services/api.js";

export const authService = {

  login: async (email, senha) => {
    try {
      const response = await api.post('/api/usuarios/login', { email, senha });

      const token = response.data.token;
      const user = response.data.usuario; // backend retorna 'usuario'

      if (token) {
        localStorage.setItem('token', token);
        console.log("✅ Token salvo no localStorage");
      } else {
        console.error("❌ Token não encontrado na resposta da API");
      }

      if (user) {
        localStorage.setItem('user', JSON.stringify(user));
        console.log("👤 Usuário salvo no localStorage");
      }

      return response.data;

    } catch (error) {
      throw error.response?.data || { error: "Erro ao fazer login" };
    }
  },

  logout: () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    window.location.href = "/login";
  },

  getToken: () => {
    return localStorage.getItem("token");
  },

  isAuthenticated: () => {
    return !!localStorage.getItem("token");
  },

  getCurrentUser: () => {
    const user = localStorage.getItem("user");
    return user ? JSON.parse(user) : null;
  },

  updateUser: async (id, data) => {
    try {
      const response = await api.put(`/usuarios/${id}`, data);

      const updatedUser = response.data;

      localStorage.setItem("user", JSON.stringify(updatedUser));
      console.log("🔄 Usuário atualizado no localStorage");

      return updatedUser;

    } catch (error) {
      throw error.response?.data || { error: "Erro ao atualizar usuário" };
    }
  },

  deleteUser: async (id) => {
    try {
      await api.delete(`/usuarios/${id}`);

      localStorage.removeItem("user");
      localStorage.removeItem("token");

      return { message: "Usuário deletado com sucesso" };

    } catch (error) {
      throw error.response?.data || { error: "Erro ao deletar usuário" };
    }
  }
};
