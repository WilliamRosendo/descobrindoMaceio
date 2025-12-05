import { Marker, Popup } from "react-leaflet";
import L from "leaflet";

const userIcon = new L.Icon({
  iconUrl: "https://cdn-icons-png.flaticon.com/512/64/64113.png",
  iconSize: [38, 38],
});

const UserLocationMarker = ({ location }) => {
  return (
    <Marker position={[location.lat, location.lng]} icon={userIcon}>
      <Popup>Você está aqui</Popup>
    </Marker>
  );
};

export default UserLocationMarker;
