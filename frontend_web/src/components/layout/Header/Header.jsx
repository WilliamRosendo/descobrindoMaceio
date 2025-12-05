/* eslint-disable no-unused-vars */
import React from 'react';
import { Home, MapPin, Heart, User, Menu, X } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { useApp } from '../../../hooks/useApp';
import './Header.css';

const Header = () => {
  const { menuOpen, setMenuOpen } = useApp();
  const location = useLocation();

  const navItems = [
    { to: "/", label: "Início", icon: Home },
    { to: "/mapa", label: "Mapa", icon: MapPin },
    { to: "/favoritos", label: "Favoritos", icon: Heart },
    { to: "/perfil", label: "Perfil", icon: User },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <header className="header">
      <div className="header-container">

        <Link to="/" className="logo-section">
          <div className="logo-icon">
            🌴
          </div>
          <div className="logo-text">
            <h1 className="logo-title">Descobrindo Maceió</h1>
            <p className="logo-subtitle">Explore os melhores lugares</p>
          </div>
        </Link>

        <nav className="nav-desktop">
          {navItems.map(({ to, label, icon: Icon }) => (
            <Link
              key={to}
              to={to}
              className={`nav-link ${isActive(to) ? 'active' : ''}`}
            >
              <Icon size={20} />
              <span>{label}</span>
            </Link>
          ))}
        </nav>

        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="menu-toggle"
          aria-label="Toggle menu"
        >
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {menuOpen && (
        <nav className="nav-mobile">
          {navItems.map(({ to, label, icon: Icon }) => (
            <Link
              key={to}
              to={to}
              onClick={() => setMenuOpen(false)}
              className={`nav-mobile-link ${isActive(to) ? 'active' : ''}`}
            >
              <Icon size={20} />
              <span>{label}</span>
            </Link>
          ))}
        </nav>
      )}
    </header>
  );
};

export default Header;