import React from 'react';
import { Heart, MapPin } from 'lucide-react';
import { useApp } from '../../hooks/useApp';

const DestinationCard = ({ destino, onClick }) => {
  const { favorites, toggleFavorite } = useApp();
  const isFavorite = favorites.includes(destino._id);

  return (
    <div
      onClick={() => onClick(destino)}
      className="relative rounded-2xl overflow-hidden shadow-lg cursor-pointer transform hover:scale-105 transition-all group"
    >
      <img
        src={destino.image}
        alt={destino.name}
        className="w-full h-64 object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent"></div>

      <button
        onClick={(e) => {
          e.stopPropagation();
          toggleFavorite(destino._id);
        }}
        className="absolute top-4 right-4 w-12 h-12 bg-white/90 backdrop-blur rounded-full flex items-center justify-center hover:bg-white transition shadow-lg z-10"
      >
        <Heart
          size={22}
          className={isFavorite ? 'fill-red-500 text-red-500' : 'text-gray-600'}
        />
      </button>

      <div className="absolute bottom-0 left-0 right-0 p-5">
        <h3 className="text-white font-bold text-xl mb-1">{destino.name}</h3>
        <p className="text-white/90 text-sm flex items-center gap-1">
          <MapPin size={14} />
          {destino.location} • {destino.distance}
        </p>
      </div>
    </div>
  );
};

export default DestinationCard;