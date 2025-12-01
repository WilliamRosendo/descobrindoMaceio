/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import { getCategorias, getLugaresByCategoria } from "../services/destination.service";
import DestinationCard from "../components/common/DestinosCard";

export default function HomePage() {
  const [categorias, setCategorias] = useState([]);
  const [lugaresPorCategoria, setLugaresPorCategoria] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const carregarDados = async () => {
      try {
        const cats = await getCategorias();
        setCategorias(cats);

        const result = {};

        for (const categoria of cats) {
          try {
            const lugares = await getLugaresByCategoria(categoria._id);
            // Garante que seja sempre um array
            result[categoria._id] = Array.isArray(lugares) ? lugares : [];
          } catch (err) {
            result[categoria._id] = [];
            console.error("Erro carregando categoria:", categoria.nome_categoria);
          }
        }

        setLugaresPorCategoria(result);
      } catch (error) {
        console.error("Erro ao carregar dados:", error);
      } finally {
        setLoading(false);
      }
    };

    carregarDados();
  }, []);

  if (loading) return <p className="text-center mt-8">Carregando...</p>;

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Categorias</h1>

      {categorias.map((cat) => (
        <div key={cat._id} className="mb-10">
          <h2 className="text-2xl font-semibold mb-4">{cat.nome_categoria}</h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {(lugaresPorCategoria[cat._id] || []).length > 0 ? (
              lugaresPorCategoria[cat._id]
                .filter(Boolean) // remove possíveis undefined
                .map((lugar) => <DestinationCard key={lugar._id} destino={lugar} />)
            ) : (
              <p className="text-gray-500">Nenhum lugar encontrado.</p>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}