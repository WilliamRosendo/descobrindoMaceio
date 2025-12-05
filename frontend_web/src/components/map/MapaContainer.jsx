import { MapContainer as LeafletMap, TileLayer } from "react-leaflet";
import PlaceMarkers from "./PlaceMarkers";
import UserLocationMarker from "./UserLocationMarker";

const MapContainer = ({ places, userLocation, loading }) => {
  const defaultCenter = [-9.6658, -35.7353]; 

  return (
    <div className="map-wrapper">
      <LeafletMap
        center={userLocation || defaultCenter}
        zoom={userLocation ? 13 : 12}
        style={{ width: "100%", height: "70vh", borderRadius: "15px"}}
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

        {!loading && userLocation && <UserLocationMarker location={userLocation} />}

        <PlaceMarkers places={places} />
      </LeafletMap>
    </div>
  );
};

export default MapContainer;
