import { useContext } from 'react';
import AppContext from '../context/AppContext';

export const useFavorites = () => {
  const context = useContext(AppContext);

  if (!context) {
    throw new Error('useFavorites deve ser usado dentro de um AppProvider');
  }

  const { favorites, toggleFavorite, isFavorite, user } = context;

  const isAuthenticated = () => !!user;

  return {
    favorites,
    toggleFavorite,
    isFavorite,
    isAuthenticated,
  };
};
