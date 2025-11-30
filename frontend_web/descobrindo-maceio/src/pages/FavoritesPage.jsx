import { useFavorites } from "../../context/FavoritesContext";
import FavoriteCard from "../components/common/FavoriteCard";

export default function FavoritesPage() {
  const { favorites } = useFavorites();

  return (
    <div className="px-6 py-6">
      <h1 className="text-2xl font-bold mb-6 flex items-center gap-2">
        <span className="text-red-500 text-3xl">❤️</span>
        Meus Favoritos
      </h1>

      {favorites.length === 0 ? (
        <p className="text-gray-500 text-lg">
          Você ainda não adicionou favoritos.
        </p>
      ) : (
        <div className="flex flex-col gap-4">
          {favorites.map((lugar) => (
            <FavoriteCard key={lugar._id} lugar={lugar} />
          ))}
        </div>
      )}
    </div>
  );
}
