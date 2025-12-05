import React, { useContext } from 'react';
import { Heart, ArrowRight } from 'lucide-react';
import AppContext from '../../context/AppContext';
import { useNavigate } from 'react-router-dom';
import './DestinosCard.css';

export default function DestinosCard({ destino, onClick }) {
  const { toggleFavorite, isFavorite } = useContext(AppContext);
  const navigate = useNavigate();
  const favorite = isFavorite(destino);

  const handleFavoriteClick = (e) => {
    e.stopPropagation();

    toggleFavorite(destino);
  };

  const handleCardClick = () => {
    if (onClick) {
      onClick(destino);
    } else {
      navigate(`/detalhes/${destino._id}`);
    }
  };

  return (
    <div className="destination-card" onClick={handleCardClick}>
      <div className="destination-image-wrapper">
        <img
          src={destino.imagem || destino.imagens?.[0] || '/placeholder-image.jpg'}
          alt={destino.nome_local || destino.nome}
          className="destination-image"
        />
        <div className="image-overlay"></div>
        <div className="hover-overlay">
          <div
            className="view-details-btn"
            onClick={(e) => {
              e.stopPropagation();
              navigate(`/detalhes/${destino._id}`);
            }}
          >
            <span>Ver Detalhes</span>
            <ArrowRight size={18} />
          </div>
        </div>
        <button
          className="favorite-btn"
          onClick={handleFavoriteClick}
          aria-label={favorite ? 'Remover dos favoritos' : 'Adicionar aos favoritos'}
        >
          <Heart
            size={20}
            className={favorite ? 'favorite-active' : 'favorite-inactive'}
          />
        </button>
      </div>
      <div className="destination-content">
        <h3 className="destination-title">{destino.nome_local || destino.nome}</h3>
      </div>
    </div>
  );
}