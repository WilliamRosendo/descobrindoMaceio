/* eslint-disable react-hooks/set-state-in-effect */
import React, { createContext, useState, useEffect, useCallback } from "react";
import { getFavoritos, addFavorito, removeFavorito } from "../services/favoritos.service";
import { useNavigate } from "react-router-dom";
import { authService } from "../services/auth.service.js";

const AppContext = createContext();
export default AppContext;

const categoriaMap = {
  "691249111d398fea080b5482": "Praias",
  "691249581d398fea080b5485": "Passeios Culturais",
  "691249831d398fea080b5487": "Lazer",
};

export const AppProvider = ({ children }) => {
  const navigate = useNavigate();

  const [menuOpen, setMenuOpen] = useState(false);
  const [user, setUser] = useState(authService.getCurrentUser());
  const [favorites, setFavorites] = useState({
    Praias: [],
    "Passeios Culturais": [],
    Lazer: [],
  });
  const [isLoadingFavorites, setIsLoadingFavorites] = useState(false);

  const loadFavorites = useCallback(async () => {
    if (!user) {
      setFavorites({ Praias: [], "Passeios Culturais": [], Lazer: [] });
      return;
    }

    try {
      setIsLoadingFavorites(true);
      console.log("Carregando favoritos do banco...");
      const data = await getFavoritos();
      const newFavorites = data.categorias || { Praias: [], "Passeios Culturais": [], Lazer: [] };
      
      setFavorites(newFavorites);
    } catch (err) {
      console.error("Erro ao carregar favoritos:", err);
      if (err.response?.status === 401) {
        authService.logout();
        setUser(null);
      }
    } finally {
      setIsLoadingFavorites(false);
    }
  }, [user]);

  useEffect(() => {
    loadFavorites();
  }, [loadFavorites]);

  const toggleFavorite = async (lugar) => {
    if (!user) {
      localStorage.setItem("redirectAfterLogin", window.location.pathname);
      navigate("/login", { state: { message: "Você precisa estar logado!" } });
      return;
    }

    const categoriaId = lugar.categoria?._id || lugar.categoria?.$oid || lugar.categoria;
    const categoria = categoriaMap[categoriaId];
    const itemId = lugar._id || lugar.id;

    if (!categoria) {
      console.error("Categoria não encontrada para:", categoriaId);
      return;
    }

    try {
      const isFav = favorites[categoria]?.includes(itemId);

      let newFavorites;

      if (isFav) {

        await removeFavorito(categoria, itemId);
        newFavorites = {
          ...favorites,
          [categoria]: favorites[categoria].filter((id) => id !== itemId),
        };
      } else {
        await addFavorito(categoria, itemId);
        newFavorites = {
          ...favorites,
          [categoria]: [...(favorites[categoria] || []), itemId],
        };
      }

      setFavorites(newFavorites);

    } catch (err) {
      console.error("Erro ao toggle favorito:", err);
      if (err.response?.status === 401) {
        authService.logout();
        setUser(null);
      }
      await loadFavorites();
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
    setFavorites({ Praias: [], "Passeios Culturais": [], Lazer: [] });
  };

  return (
    <AppContext.Provider value={{ 
      user, 
      setUser, 
      favorites, 
      setFavorites, 
      toggleFavorite, 
      isFavorite, 
      logout, 
      menuOpen, 
      setMenuOpen,
      isLoadingFavorites,
      loadFavorites
    }}>
      {children}
    </AppContext.Provider>
  );
};