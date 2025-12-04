import React, { useContext, useEffect, useState } from 'react';
import { Heart, Sparkles, Loader2 } from 'lucide-react';
import AppContext from '../context/AppContext';
import { getAllPlaces } from "../services/place.service";
import DestinosCard from '../components/common/DestinosCard';
import PageTitle from '../components/common/PageTitle';
import { useNavigate } from "react-router-dom";
import "../styles/favorites.css";

const FavoritesPage = () => {
  const { favorites, user } = useContext(AppContext);
  const [lugares, setLugares] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate('/login', { 
        state: { message: 'Você precisa estar logado para ver seus favoritos!' } 
      });
      return;
    }

    const loadPlaces = async () => {
      try {
        setLoading(true);
        const allPlaces = await getAllPlaces();
        setLugares(allPlaces);
      } catch (error) {
        console.error('Erro ao carregar lugares:', error);
      } finally {
        setLoading(false);
      }
    };

    loadPlaces();
  }, [user, navigate]);

  const favoriteDestinations = lugares.filter(lugar => {
    const categoria = lugar.categoria?.nome_categoria || lugar.categoria;
    const itemId = lugar._id;

    return favorites[categoria]?.includes(itemId);
  });

  if (loading) {
    return (
      <div className="favorites-page">
        <PageTitle title="Meus Favoritos" icon={Heart} />
        <div className="loading-container">
          <Loader2 className="loading-icon" size={48} />
          <p className="loading-text">Carregando favoritos...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="favorites-page">
      <PageTitle title="Meus Favoritos" icon={Heart} />

      {favoriteDestinations.length === 0 ? (
        <div className="empty-state">
          <div className="empty-icon-wrapper">
            <Heart size={80} className="empty-icon" />
            <Sparkles size={32} className="sparkle-icon" />
          </div>
          <h2 className="empty-title">Nenhum favorito ainda</h2>
          <p className="empty-description">
            Comece a explorar Maceió e salve seus lugares favoritos para visitá-los depois!
          </p>
          <button
            onClick={() => navigate("/")}
            className="explore-btn"
          >
            <Sparkles size={20} />
            Explorar Lugares
          </button>
        </div>
      ) : (
        <>
          <div className="stats-card">
            <div className="stats-content">
              <Heart className="stats-icon" size={24} />
              <p className="stats-text">
                Você tem <span className="stats-number">{favoriteDestinations.length}</span> {favoriteDestinations.length === 1 ? 'lugar favorito' : 'lugares favoritos'}
              </p>
            </div>
          </div>

          <div className="favorites-grid">
            {favoriteDestinations.map(destino => (
              <DestinosCard key={destino._id} destino={destino} />
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default FavoritesPage;
