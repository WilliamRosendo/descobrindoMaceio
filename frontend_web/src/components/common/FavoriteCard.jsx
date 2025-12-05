import React from 'react';
import { Heart, MapPin, Navigation } from 'lucide-react';
import { useFavorites } from "../../hooks/useFavorites";
import { useNavigate } from "react-router-dom";
import './FavoriteCard.css';

export default function FavoriteCard({ lugar }) {
  const { toggleFavorite } = useFavorites();
  const navigate = useNavigate();

  const handleViewMap = (e) => {
    e.stopPropagation();
    navigate(`/mapa?lugar=${lugar._id}`);
  };

  const handleRemoveFavorite = (e) => {
    e.stopPropagation();
    toggleFavorite(lugar);
  };

  const handleCardClick = () => {
    navigate(`/detalhes/${lugar._id}`);
  };

  return (
    <div className="favorite-card" onClick={handleCardClick}>

      <div className="favorite-image-container">
        <img
          src={lugar.imagem}
          alt={lugar.nome}
          className="favorite-image"
        />
        <div className="image-badge">
          <Heart size={14} className="badge-icon" />
        </div>
      </div>

      <div className="favorite-content">
        <h2 className="favorite-title">{lugar.nome}</h2>
        
        <div className="favorite-info">
          <div className="info-item">
            <MapPin size={16} className="info-icon" />
            <span className="info-text">{lugar.distancia} km</span>
          </div>
        </div>

        <div className="favorite-actions">
          <button
            className="action-btn primary"
            onClick={handleViewMap}
          >
            <Navigation size={16} />
            <span>Ver no Mapa</span>
          </button>

          <button
            className="action-btn secondary"
            onClick={handleRemoveFavorite}
            aria-label="Remover dos favoritos"
          >
            <Heart size={18} className="heart-filled" />
          </button>
        </div>
      </div>
    </div>
  );
}