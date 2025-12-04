import "./App.css"; 
import Header from "./components/layout/Header";
import HomePage from "./pages/HomePage";
import FavoritesPage from "./pages/FavoritesPage";
import DetailsPage from "./pages/DetailsPage";
import { AppProvider } from "./context/AppContext";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import MapPage from "./pages/MapPage";
import ProfilePage from "./pages/ProfilePage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";

export default function App() {
  return (
    <BrowserRouter>
      <AppProvider>
        <Header />

        <div className="app-container">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/detalhes/:id" element={<DetailsPage />} />
            <Route path="/favoritos" element={<FavoritesPage />} />
            <Route path="/mapa" element={<MapPage />} />
            <Route path="/perfil" element={<ProfilePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/cadastro" element={<RegisterPage />} />
          </Routes>
        </div>
      </AppProvider>
    </BrowserRouter>
  );
}
