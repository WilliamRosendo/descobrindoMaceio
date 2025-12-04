import React, { createContext, useState, useEffect } from "react";
import { getFavoritos, addFavorito, removeFavorito } from "../services/favoritos.service";
import { useNavigate } from "react-router-dom";
import { authService } from "../services/auth.service.js";

const AppContext = createContext();
export default AppContext;

// Mapeamento dos IDs das categorias para nomes
const categoriaMap = {
  "691249111d398fea080b5482": "Praias",
  "691249581d398fea080b5485": "Passeios Culturais",
  "691249831d398fea080b5487": "Lazer",
};

export const AppProvider = ({ children }) => {
  const navigate = useNavigate();

  const [user, setUser] = useState(authService.getCurrentUser());
  const [favorites, setFavorites] = useState({
    Praias: [],
    "Passeios Culturais": [],
    Lazer: [],
  });

  const loadFavorites = async () => {
    if (!user) return;

    try {
      const data = await getFavoritos();
      setFavorites(data.categorias || { Praias: [], "Passeios Culturais": [], Lazer: [] });
    } catch (err) {
      console.error("Erro ao carregar favoritos:", err);
      if (err.response?.status === 401) {
        authService.logout();
      }
    }
  };

  useEffect(() => {
    loadFavorites();
  }, [user]);

  const toggleFavorite = async (lugar) => {
    if (!user) {
      localStorage.setItem("redirectAfterLogin", window.location.pathname);
      navigate("/login", { state: { message: "Você precisa estar logado!" } });
      return;
    }

    const categoriaId = lugar.categoria?._id || lugar.categoria?.$oid || lugar.categoria;
    const categoria = categoriaMap[categoriaId];
    if (!categoria) {
      console.error("Categoria inválida:", lugar.categoria);
      return;
    }

    const itemId = lugar._id || lugar.id;

    try {
      const isFav = favorites[categoria]?.includes(itemId);

      if (isFav) {
        await removeFavorito(categoria, itemId);
        setFavorites((prev) => ({
          ...prev,
          [categoria]: prev[categoria].filter((id) => id !== itemId),
        }));
      } else {
        await addFavorito(categoria, itemId);
        setFavorites((prev) => ({
          ...prev,
          [categoria]: [...prev[categoria], itemId],
        }));
      }
    } catch (err) {
      console.error("Erro ao toggle favorito:", err);
      if (err.response?.status === 401) {
        authService.logout();
      }
    }
  };

  const isFavorite = (lugar) => {
    const categoriaId = lugar.categoria?._id || lugar.categoria?.$oid || lugar.categoria;
    const categoria = categoriaMap[categoriaId];
    const itemId = lugar._id || lugar.id;
    return categoria ? favorites[categoria]?.includes(itemId) : false;
  };

  const logout = () => {
    authService.logout();
    setUser(null);
  };

  return (
    <AppContext.Provider value={{ user, setUser, favorites, toggleFavorite, isFavorite, logout }}>
      {children}
    </AppContext.Provider>
  );
};
