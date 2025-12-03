import { getDistance } from "geolib";

export const calcularDistanciaKm = (userCoords, lugarCoords) => {
  const metros = getDistance(
    { latitude: userCoords.lat, longitude: userCoords.lng },
    { latitude: lugarCoords[1], longitude: lugarCoords[0] }
  );
  return Number((metros / 1000).toFixed(2));
};

export const calcularTempo = (distanciaKm) => {
  const velocidadeMedia = 40;
  const horas = distanciaKm / velocidadeMedia;
  return Math.round(horas * 60);
};
