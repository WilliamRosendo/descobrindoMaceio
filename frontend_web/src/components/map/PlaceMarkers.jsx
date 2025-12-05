import { Marker, Popup } from "react-leaflet";
import L from "leaflet";

const placeIcon = new L.Icon({
  iconUrl: "https://cdn-icons-png.flaticon.com/512/684/684908.png",
  iconSize: [32, 32],
});

const PlaceMarkers = ({ places }) => {
  return (
    <>
      {places.map((place) => {
        const [lng, lat] = place.localizacao.coordinates;

        return (
          <Marker key={place._id} position={[lat, lng]} icon={placeIcon}>
            <Popup>
              <strong>{place.nome_local}</strong>
              <br />
              {place.distanceKm
                ? `${place.distanceKm.toFixed(2)} km`
                : "Distância indisponível"}
            </Popup>
          </Marker>
        );
      })}
    </>
  );
};

export default PlaceMarkers;
