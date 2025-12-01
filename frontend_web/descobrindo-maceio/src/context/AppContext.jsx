import React, { createContext, useState, useEffect } from 'react';

const AppContext = createContext();
export default AppContext;

export const AppProvider = ({ children }) => {
  const [currentPage, setCurrentPage] = useState('home');
  const [selectedDestination, setSelectedDestination] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);

  const [favorites, setFavorites] = useState(() => {
    const saved = localStorage.getItem("favorites");
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('favorites', JSON.stringify(favorites));
  }, [favorites]);

  const toggleFavorite = (id) => {
    setFavorites(prev => 
      prev.includes(id) ? prev.filter(f => f !== id) : [...prev, id]
    );
  };

  const value = {
    currentPage,
    setCurrentPage,
    selectedDestination,
    setSelectedDestination,
    favorites,
    toggleFavorite,
    menuOpen,
    setMenuOpen
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};
