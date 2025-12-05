import React, { useContext, useEffect, useState } from 'react';
import { Heart, Sparkles, Loader2 } from 'lucide-react';
import { useNavigate } from "react-router-dom";
import AppContext from '../context/AppContext';
import { getAllPlaces } from "../services/place.service";
import DestinosCard from '../components/common/DestinosCard';
import PageTitle from '../components/common/PageTitle';
import "../styles/favorites.css";

const FavoritesPage = () => {
  const { favorites, user, loadFavorites, isLoadingFavorites } = useContext(AppContext);
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

    const loadData = async () => {
      try {
        setLoading(true);
        
        await loadFavorites();
        
        const allPlaces = await getAllPlaces();

        setLugares(allPlaces);
      } catch (error) {
        console.error('Erro ao carregar dados:', error);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [user, navigate, loadFavorites]);

  const favoriteDestinations = lugares.filter(lugar => {
    const categoriaId = lugar.categoria?._id || lugar.categoria?.$oid || lugar.categoria;
    
    const categoriaMap = {
      "691249111d398fea080b5482": "Praias",
      "691249581d398fea080b5485": "Passeios Culturais",
      "691249831d398fea080b5487": "Lazer",
    };
    
    const categoriaNome = categoriaMap[categoriaId];
    const itemId = lugar._id;

    const isFav = categoriaNome && favorites[categoriaNome]?.includes(itemId);
    
    if (isFav) {
      console.log("Favorito encontrado:", lugar.nome_local, "| Categoria:", categoriaNome);
    }
    
    return isFav;
  });

  if (loading || isLoadingFavorites) {
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