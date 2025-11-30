import { useFavorites } from "../../hooks/useFavorites";

export default function FavoriteCard({ lugar }) {
  const { toggleFavorite } = useFavorites();

  return (
    <div className="bg-white rounded-2xl shadow-md p-4 flex gap-4 items-center border border-gray-100">
      
      {/* IMAGEM */}
      <img
        src={lugar.imagem}
        alt={lugar.nome}
        className="w-20 h-20 rounded-xl object-cover"
      />

      {/* INFO PRINCIPAL */}
      <div className="flex-1">
        <h2 className="text-lg font-semibold">{lugar.nome}</h2>

        <div className="flex items-center mt-1 text-gray-600 gap-1">
          <span>📍</span>
          <span>{lugar.distancia} km</span>
        </div>

        <button
          className="mt-3 bg-blue-600 text-white px-4 py-1 rounded-lg shadow hover:bg-blue-700"
          onClick={() => window.location.href = `/lugar/${lugar._id}`}
        >
          Ver no Mapa
        </button>
      </div>

      {/* FAVORITO (remover) */}
      <button
        className="text-red-500 text-2xl"
        onClick={() => toggleFavorite(lugar)}
      >
        ❤️
      </button>
    </div>
  );
}
