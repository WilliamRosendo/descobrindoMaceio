/* eslint-disable no-unused-vars */
import React from 'react';
import { Home, MapPin, Heart, User, Menu, X } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useApp } from '../../../hooks/useApp';

const Header = () => {
  const { menuOpen, setMenuOpen } = useApp();

  const navItems = [
    { to: "/", label: "Início", icon: Home },
    { to: "/mapa", label: "Mapa", icon: MapPin },
    { to: "/favoritos", label: "Favoritos", icon: Heart },
    { to: "/perfil", label: "Perfil", icon: User },
  ];

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">

          <Link to="/" className="flex items-center gap-3 cursor-pointer">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-cyan-500 rounded-xl flex items-center justify-center shadow-lg text-2xl">
              🌴
            </div>
            <div>
              <h1 className="text-2xl font-bold text-blue-600">Descobrindo Maceió</h1>
              <p className="text-sm text-gray-500">Explore os melhores lugares</p>
            </div>
          </Link>

          <nav className="hidden md:flex items-center gap-6">
            {navItems.map(({ to, label, icon: Icon }) => (
              <Link
                key={to}
                to={to}
                className="flex items-center gap-2 px-4 py-2 rounded-lg text-gray-600 hover:text-blue-600 hover:bg-gray-50 transition"
              >
                <Icon size={20} />
                <span>{label}</span>
              </Link>
            ))}
          </nav>

          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden w-10 h-10 flex items-center justify-center rounded-lg hover:bg-gray-100 transition"
          >
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {menuOpen && (
          <nav className="md:hidden mt-4 pb-4 space-y-2 border-t pt-4">
            {navItems.map(({ to, label, icon: Icon }) => (
              <Link
                key={to}
                to={to}
                onClick={() => setMenuOpen(false)}
                className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-gray-600 hover:bg-gray-50 transition"
              >
                <Icon size={20} />
                <span>{label}</span>
              </Link>
            ))}
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;
