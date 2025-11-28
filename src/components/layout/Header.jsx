import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import SearchBar from '../common/SearchBar';
import ThemeToggle from '../common/ThemeToggle';
import { FiMenu, FiX } from 'react-icons/fi';
import './Header.css';

/**
 * Header component with navigation, search, and theme toggle
 * Features sticky position and responsive hamburger menu for mobile
 */
function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  const handleSearch = (query) => {
    if (query.trim()) {
      navigate(`/series?search=${encodeURIComponent(query)}`);
      closeMobileMenu();
    }
  };

  const navLinks = [
    { to: '/', label: 'Inicio' },
    { to: '/series', label: 'Series' },
    { to: '/movies', label: 'Películas' },
    { to: '/about', label: 'Acerca de' },
  ];

  return (
    <header className="header">
      <div className="header__container">
        {/* Logo */}
        <Link to="/" className="header__logo" onClick={closeMobileMenu}>
          <span className="header__logo-text">AnimeCBF</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="header__nav header__nav--desktop" aria-label="Main navigation">
          <ul className="header__nav-list">
            {navLinks.map((link) => (
              <li key={link.to} className="header__nav-item">
                <Link to={link.to} className="header__nav-link">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Search Bar - Desktop */}
        <div className="header__search header__search--desktop">
          <SearchBar onSearch={handleSearch} placeholder="Buscar anime..." />
        </div>

        {/* Theme Toggle - Desktop */}
        <div className="header__theme header__theme--desktop">
          <ThemeToggle />
        </div>

        {/* Mobile Menu Button */}
        <button
          className="header__menu-button"
          onClick={toggleMobileMenu}
          aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={isMobileMenuOpen}
          aria-controls="mobile-menu"
        >
          {isMobileMenuOpen ? (
            <FiX className="header__menu-icon" aria-hidden="true" />
          ) : (
            <FiMenu className="header__menu-icon" aria-hidden="true" />
          )}
        </button>
      </div>

      {/* Mobile Menu */}
      <div
        id="mobile-menu"
        className={`header__mobile-menu ${isMobileMenuOpen ? 'header__mobile-menu--open' : ''}`}
        aria-hidden={!isMobileMenuOpen}
      >
        {/* Mobile Navigation */}
        <nav className="header__nav header__nav--mobile" aria-label="Mobile navigation">
          <ul className="header__nav-list">
            {navLinks.map((link) => (
              <li key={link.to} className="header__nav-item">
                <Link to={link.to} className="header__nav-link" onClick={closeMobileMenu}>
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Search Bar - Mobile */}
        <div className="header__search header__search--mobile">
          <SearchBar onSearch={handleSearch} placeholder="Buscar anime..." />
        </div>

        {/* Theme Toggle - Mobile */}
        <div className="header__theme header__theme--mobile">
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}

export default Header;
