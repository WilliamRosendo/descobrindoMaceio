import React from 'react';
import { Heart, Search } from 'lucide-react';
import { useApp } from "../hooks/useApp";
import { useDestinations } from '../hooks/useDestination';
import DestinationCard from '../components/common/DestinosCard';
import { useNavigate } from "react-router-dom";

const FavoritesPage = () => {
  const { favorites, setCurrentPage, setSelectedDestination } = useApp();
  const { destinations } = useDestinations();
  const navigate = useNavigate();

  const allDestinations = [
    ...destinations.praias,
    ...destinations.cultura,
    ...destinations.lazer
  ];

  const favoriteDestinations = allDestinations.filter(d => 
    favorites.includes(d.id)
  );

  const handleDestinationClick = (destination) => {
    setSelectedDestination(destination);
    setCurrentPage('details');
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-8 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-800">
          Meus Favoritos
        </h1>
        <button className="w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center hover:bg-gray-200 transition">
          <Search size={22} className="text-gray-600" />
        </button>
      </div>

      {/* Empty State */}
      {favoriteDestinations.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <div className="w-32 h-32 bg-gray-100 rounded-full flex items-center justify-center mb-6">
            <Heart size={64} className="text-gray-300" />
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            Nenhum favorito ainda
          </h2>
          <p className="text-gray-500 text-lg mb-6">
            Comece a explorar e salve seus lugares favoritos!
          </p>
          <button
            onClick={() => navigate("/")}
            className="bg-blue-500 text-white px-8 py-3 rounded-xl font-medium hover:bg-blue-600 transition shadow-lg"
          >
            Explorar Lugares
          </button>
        </div>
      ) : (
        <>
          {/* Stats */}
          <div className="bg-gradient-to-r from-blue-50 to-cyan-50 rounded-2xl p-6">
            <p className="text-gray-600">
              Você tem <span className="font-bold text-blue-600">{favoriteDestinations.length}</span> {favoriteDestinations.length === 1 ? 'lugar favorito' : 'lugares favoritos'}
            </p>
          </div>

          {/* Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {favoriteDestinations.map(destination => (
              <DestinationCard
                key={destination.id}
                destination={destination}
                onClick={handleDestinationClick}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default FavoritesPage;