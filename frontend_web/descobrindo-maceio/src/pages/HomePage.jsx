import { useEffect, useState } from "react";
import { api } from "../services/api";
import DestinationCard from "../components/common/DestinosCard";

export default function HomePage() {
  const [destination, setDestinos] = useState([]);
  const [categorias, setCategorias] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const destinosRes = await api.get("/api/lugares");
        const categoriasRes = await api.get("/api/categorias");

        setDestinos(destinosRes.data);
        setCategorias(categoriasRes.data);

      } catch (err) {
        console.error("Erro ao carregar dados", err);
      }
    }

    fetchData();
  }, []);

  return (
    <div className="pt-24 max-w-6xl mx-auto px-4">

      {/* Título */}
      <h1 className="text-2xl font-semibold mb-4">
        Explore Maceió 🌴
      </h1>

      {/* Categorias */}
      <div className="flex gap-3 overflow-x-auto pb-4">
        {categorias.map((cat) => (
          <button
            key={cat._id}
            className="px-4 py-2 bg-blue-500 text-white rounded-full whitespace-nowrap hover:bg-blue-600"
          >
            {cat.nome}
          </button>
        ))}
      </div>


      <h2 className="text-xl font-semibold mt-6 mb-3">Locais em destaque</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {destination.map((destination) => (
          <DestinationCard key={destination._id} destination={destination} />
        ))}
      </div>
    </div>
  );
}
