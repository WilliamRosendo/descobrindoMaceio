import "./App.css"; 
import Header from "./components/layout/Header";
import HomePage from "./pages/HomePage";
import FavoritesPage from "./pages/FavoritesPage";
import { AppProvider } from "./context/AppContext";
import { BrowserRouter, Routes, Route } from "react-router-dom";

export default function App() {
  return (
    <AppProvider>
        <BrowserRouter>
          <Header />

          <div className="app-container">
            <Routes>
              {/* Página Inicial */}
              <Route path="/" element={<HomePage />} />

              {/* Páginas futuras */}
              <Route path="/favoritos" element={<FavoritesPage />} />
              <Route path="/mapa" element={<p>Mapa</p>} />
              <Route path="/categorias" element={<p>Categorias</p>} />
              <Route path="/perfil" element={<p>Perfil</p>} />
            </Routes>
          </div>
      </BrowserRouter>
    </AppProvider>
  );
}
