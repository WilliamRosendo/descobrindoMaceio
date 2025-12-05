import React from "react";
import { Heart, ArrowRight, MapPin, Navigation } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useFavorites } from "../../hooks/useFavorites";
import "./FavoriteCard.css";

export default function FavoriteCard({ lugar }) {
  const navigate = useNavigate();
  const { toggleFavorite, isFavorite } = useFavorites();

  const favorite = isFavorite(lugar);
  const imageSrc =
    lugar.imagem ||
    lugar.fotos?.[0] ||
    lugar.imagens?.[0] ||
    "/placeholder-image.jpg";

  const handleCardClick = () => {
    navigate(`/detalhes/${lugar._id}`);
  };

  const handleFavoriteClick = (e) => {
    e.stopPropagation();
    toggleFavorite(lugar);
  };

  return (
    <div className="place-card" onClick={handleCardClick}>
      <div className="place-image-wrapper">
        <img src={imageSrc} alt={lugar.nome_local || lugar.nome} className="place-image" />

        <div className="image-overlay"></div>

        
          <div className="hover-overlay">
            <div className="view-details-btn">
              <span>Ver Detalhes</span>
              <ArrowRight size={18} />
            </div>
          </div>

        <button className="favorite-btn" onClick={handleFavoriteClick}>
          <Heart
            size={20}
            className={favorite ? "favorite-active" : "favorite-inactive"}
          />
        </button>

      </div>

      <div className="place-content">
        <h3 className="place-title">{lugar.nome_local || lugar.nome}</h3>

      </div>
    </div>
  );
}
