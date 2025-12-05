/* eslint-disable react-hooks/set-state-in-effect */
import React, { createContext, useState, useEffect, useCallback } from "react";
import { getFavoritos, addFavorito, removeFavorito } from "../services/favoritos.service";
import { useNavigate } from "react-router-dom";
import { authService } from "../services/auth.service.js";
import { getLocalById } from "../services/locais.service";

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

  const [favoritePlaces, setFavoritePlaces] = useState([]);
  const [isLoadingFavorites, setIsLoadingFavorites] = useState(false);

  const loadFavorites = useCallback(async () => {
    if (!user) {
      setFavorites({ Praias: [], "Passeios Culturais": [], Lazer: [] });
      return;
    }

    try {
      setIsLoadingFavorites(true);
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

  const loadFavoritePlaces = useCallback(async () => {
    try {
      const categorias = Object.keys(favorites);
      const resultados = [];

      for (const cat of categorias) {
        for (const id of favorites[cat]) {
          try {
            const res = await getLocalById(id);
            resultados.push(res.data);
          } catch {
            console.warn("Erro ao buscar lugar favorito por ID:", id);
          }
        }
      }

      setFavoritePlaces(resultados);
    } catch (err) {
      console.error("Erro ao carregar lugares favoritos completos", err);
    }
  }, [favorites]);

  useEffect(() => {
    if (user) loadFavoritePlaces();
  }, [favorites, user, loadFavoritePlaces]);

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
    setFavoritePlaces([]);
  };

  return (
    <AppContext.Provider
      value={{
        user,
        setUser,
        favorites,
        favoritePlaces,
        isLoadingFavorites,
        toggleFavorite,
        isFavorite,
        loadFavorites,
        loadFavoritePlaces,
        logout,
        menuOpen,
        setMenuOpen,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
