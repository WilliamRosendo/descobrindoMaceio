/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import { getCategorias, getLugaresByCategoria } from "../services/destination.service";
import Carousel from "../components/common/Carousel";
import WeatherTideWidget from "../components/features/WeatherTideWid";
import { Compass, Loader2 } from "lucide-react";
import "../styles/home.css";
import "../components/common/Carousel.css";
import { useNavigate } from "react-router-dom";

function HomePage() {
  const navigate = useNavigate();
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

  if (loading) {
    return (
      <div className="loading-container">
        <Loader2 className="loading-icon" size={48} />
        <p className="loading-text">Carregando destinos incríveis...</p>
      </div>
    );
  }

  return (
    <div className="home-page">

      <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
        <WeatherTideWidget />
      </div>

      <div className="categories-container">
        {categorias.map((cat) => {
          const lugares = lugaresPorCategoria[cat._id] || [];
          const temLugares = lugares.length > 0;

          return (
            <section key={cat._id} className="category-section">

              <div className="category-header">
                <div>
                  <h2 className="category-title">{cat.nome_categoria}</h2>
                  <p className="category-count">
                    {lugares.length} {lugares.length === 1 ? 'lugar' : 'lugares'}
                  </p>
                </div>
              </div>

              {temLugares ? (
                <Carousel 
                  items={lugares.filter(Boolean)} 
                  onItemClick={(lugar) => {
                    navigate(`/detalhes/${lugar._id}`);
                  }}
                />
              ) : (
                <div className="empty-category">
                  <p className="empty-text">
                    Nenhum lugar encontrado nesta categoria ainda.
                  </p>
                </div>
              )}
            </section>
          );
        })}
      </div>
    </div>
  );
}

export default HomePage;