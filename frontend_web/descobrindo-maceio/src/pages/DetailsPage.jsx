/* eslint-disable no-unused-vars */
import { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getLocalById } from "../services/locais.service";
import { Heart, ArrowLeft, MapPin, Clock, Phone, ChevronRight, ChevronLeft } from "lucide-react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import AppContext from "../context/AppContext";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import "../styles/details.css";

const defaultIcon = L.icon({
  iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png",
});
L.Marker.prototype.options.icon = defaultIcon;

const DetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toggleFavorite, isFavorite } = useContext(AppContext);

  const [local, setLocal] = useState(null);
  const [loading, setLoading] = useState(true);
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);

  useEffect(() => {
    const carregar = async () => {
      try {
        const response = await getLocalById(id);
        setLocal(response.data);
      } catch (err) {
        console.error("Erro ao carregar detalhes:", err);
      } finally {
        setLoading(false);
      }
    };

    carregar();
  }, [id]);

  if (loading) {
    return (
      <div className="details-loading">
        <div className="loading-spinner"></div>
        <p>Carregando...</p>
      </div>
    );
  }

  if (!local) {
    return (
      <div className="details-error">
        <p>Local não encontrado.</p>
        <button onClick={() => navigate(-1)} className="back-btn">
          Voltar
        </button>
      </div>
    );
  }

  const latitude = local?.localizacao?.coordinates?.[1];
  const longitude = local?.localizacao?.coordinates?.[0];
  const hasCoords = latitude !== undefined && longitude !== undefined && !isNaN(latitude) && !isNaN(longitude);
  const allPhotos = local.fotos || [];
  const carouselImages = local.fotos?.slice(1) || [];

  const favorite = isFavorite(local);

  const handleFavoriteClick = () => {
    toggleFavorite(local);
  };

  const nextPhoto = () => {
    setCurrentPhotoIndex((prev) => 
      prev === allPhotos.length - 1 ? 0 : prev + 1
    );
  };

  const prevPhoto = () => {
    setCurrentPhotoIndex((prev) => 
      prev === 0 ? allPhotos.length - 1 : prev - 1
    );
  };

  return (
    <div className="details-page">
 
      <div className="hero-image-container">
        <img
          src={allPhotos[currentPhotoIndex]}
          alt={`${local.nome_local} - foto ${currentPhotoIndex + 1}`}
          className="hero-image"
        />
        
        <div className="hero-overlay"></div>

        <button onClick={() => navigate(-1)} className="floating-btn back-button">
          <ArrowLeft size={20} />
        </button>

        <button 
          onClick={handleFavoriteClick} 
          className="floating-btn favorite-button"
          aria-label={favorite ? 'Remover dos favoritos' : 'Adicionar aos favoritos'}
        >
          <Heart 
            size={20}
            className={favorite ? 'filled' : ''}
            fill={favorite ? 'currentColor' : 'none'}
          />
        </button>

        {allPhotos.length > 1 && (
          <>
            <button 
              onClick={prevPhoto} 
              className="carousel-nav-btn carousel-nav-prev"
              aria-label="Foto anterior"
            >
              <ChevronLeft size={28} />
            </button>

            <button 
              onClick={nextPhoto} 
              className="carousel-nav-btn carousel-nav-next"
              aria-label="Próxima foto"
            >
              <ChevronRight size={28} />
            </button>

            <div className="photo-indicators">
              {allPhotos.map((_, index) => (
                <button
                  key={index}
                  className={`photo-indicator ${index === currentPhotoIndex ? 'active' : ''}`}
                  onClick={() => {/* no futuro abrir modal ou zoom, mas NÃO trocar foto principal */}}
                />
              ))}
            </div>
          </>
        )}

        <div className="hero-title-container">
          <h1 className="hero-title">{local.nome_local}</h1>
        </div>
      </div>

      <div className="content-container">

        {carouselImages.length > 0 && (
          <section className="section">
            <div className="section-header">
              <h2 className="section-title">Galeria de Fotos</h2>

            </div>

            <div className="gallery-scroll-container">
              <button className="gallery-scroll-btn gallery-scroll-prev" 
                onClick={() => {
                  const box = document.getElementById("gallery-scroll-box");
                  box.scrollLeft -= 300;
                }}
              >
                <ChevronLeft size={22} />
              </button>

              <button className="gallery-scroll-btn gallery-scroll-next"
                onClick={() => {
                  const box = document.getElementById("gallery-scroll-box");
                  box.scrollLeft += 300;
                }}
              >
                <ChevronRight size={22} />
              </button>

              <div id="gallery-scroll-box" className="photos-carousel">
                {carouselImages.map((img, index) => (
                  <div 
                    key={index} 
                    className="carousel-item"
                  >
                    <img
                      src={img}
                      alt={`${local.nome_local} - foto ${index + 2}`}
                      className="carousel-image"
                    />
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        <section className="section">
          <h2 className="section-title">Sobre o Local</h2>
          <p className="description-text">{local.descricao}</p>
        </section>

        <section className="section">
          <h2 className="section-title">Localização</h2>
          
          {!hasCoords ? (
            <div className="map-unavailable">
              <MapPin size={48} />
              <p>Coordenadas não disponíveis</p>
            </div>
          ) : (
            <div className="map-container">
              <MapContainer
                center={[latitude, longitude]}
                zoom={15}
                scrollWheelZoom={false}
                style={{ width: "100%", height: "100%" }}
              >
                <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                <Marker position={[latitude, longitude]}>
                  <Popup>{local.nome_local}</Popup>
                </Marker>
              </MapContainer>
            </div>
          )}
        </section>

        <section className="section">
          <h2 className="section-title">Informações Úteis</h2>
          
          <div className="info-card">
            <div className="info-item">
              <div className="info-icon-wrapper">
                <MapPin size={20} />
              </div>
              <div className="info-content">
                <span className="info-label">Endereço</span>
                <span className="info-value">{local.endereco}</span>
              </div>
            </div>

            {local.funcionamento && (
              <div className="info-item">
                <div className="info-icon-wrapper">
                  <Clock size={20} />
                </div>
                <div className="info-content">
                  <span className="info-label">Funcionamento</span>
                  <span className="info-value">{local.funcionamento}</span>
                </div>
              </div>
            )}

            {local.contato && (
              <div className="info-item">
                <div className="info-icon-wrapper">
                  <Phone size={20} />
                </div>
                <div className="info-content">
                  <span className="info-label">Contato</span>
                  <span className="info-value">{local.contato}</span>
                </div>
              </div>
            )}
          </div>
        </section>
      </div>
    </div>
  );
};

export default DetailsPage;