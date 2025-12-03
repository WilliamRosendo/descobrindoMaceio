import { useEffect, useState, useMemo } from "react";
import MapContainer from "../components/map/MapaContainer";
import CategoryTabs from "../components/map/CategoryTabs";
import { getAllPlaces } from "../services/place.service";
import { calcularDistanciaKm, calcularTempo } from "../services/distance.service";
import "leaflet/dist/leaflet.css";
import "../styles/map.css";

const MapPage = () => {
  const [places, setPlaces] = useState([]);
  const [category, setCategory] = useState("praia");
  const [userLocation, setUserLocation] = useState(null);
  const [loading, setLoading] = useState(true);

  const categoryMap = {
    praia: "Praias",
    cultura: "Passeios Culturais",
    lazer: "Lazer",
  };

  useEffect(() => {
    const fetchPlaces = async () => {
      try {
        const response = await getAllPlaces();
        setPlaces(response);
      } catch (err) {
        console.error("Erro ao buscar lugares:", err);
      }
    };
    fetchPlaces();
  }, []);

  useEffect(() => {
    if (!navigator.geolocation) {
      console.warn("Geolocalização não suportada");
      Promise.resolve().then(() => setLoading(false));
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setUserLocation({
          lat: pos.coords.latitude,
          lng: pos.coords.longitude,
        });
        setLoading(false);
      },
      (err) => {
        console.error("Erro ao obter localização:", err);
        setLoading(false);
      },
      { enableHighAccuracy: true }
    );
  }, []);

  const placesWithDistance = useMemo(() => {
    if (!userLocation) return places.map(p => ({ ...p, distanceKm: null, tempoMin: null }));

    return places.map((place) => {
      const distanciaKm = calcularDistanciaKm(
        userLocation,
        place.localizacao.coordinates
      );
      const tempoMin = calcularTempo(distanciaKm);
      return { ...place, distanceKm: distanciaKm, tempoMin };
    });
  }, [places, userLocation]);

  const filteredPlaces = placesWithDistance.filter(
    (p) => p.categoria.nome_categoria === categoryMap[category]
  );

  const handleCategoryChange = (cat) => {
    setCategory(cat);
  };

  return (
    <div className="map-page">
      <h1 className="map-title">Mapa</h1>

      <CategoryTabs selected={category} onSelect={handleCategoryChange} />

      <MapContainer
        places={filteredPlaces}
        userLocation={userLocation}
        loading={loading}
      />

      <div className="places-list">
        {filteredPlaces.map((place) => (
          <div key={place._id} className="place-card">
            <h3 className="place-card-title">{place.nome_local}</h3>

            <p className="place-card-info place-card-distance">
              Distância: {place.distanceKm?.toFixed(2)} km
            </p>

            <p className="place-card-info place-card-time">
              Tempo estimado: {place.tempoMin} min
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MapPage;
