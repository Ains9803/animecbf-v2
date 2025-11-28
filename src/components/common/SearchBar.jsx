import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useDebounce } from '../../hooks/useDebounce';
import { FiSearch, FiX, FiLoader } from 'react-icons/fi';
import { buttonPress } from '../../utils/animations';
import './SearchBar.css';

/**
 * SearchBar component with debounced search functionality
 * @param {Object} props
 * @param {Function} props.onSearch - Callback function called with debounced search query
 * @param {string} props.placeholder - Placeholder text for the input
 * @param {number} props.debounceDelay - Debounce delay in milliseconds (default: 500ms)
 */
function SearchBar({ onSearch, placeholder = 'Buscar anime...', debounceDelay = 500 }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const debouncedQuery = useDebounce(searchQuery, debounceDelay);

  // Call onSearch when debounced query changes
  useEffect(() => {
    if (onSearch) {
      setIsSearching(true);
      onSearch(debouncedQuery);
      // Reset searching state after a short delay
      const timer = setTimeout(() => setIsSearching(false), 300);
      return () => clearTimeout(timer);
    }
  }, [debouncedQuery, onSearch]);

  const handleInputChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleClear = () => {
    setSearchQuery('');
    if (onSearch) {
      onSearch('');
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (onSearch) {
      onSearch(searchQuery);
    }
  };

  const showClearButton = searchQuery.length > 0;
  const showLoadingIndicator = searchQuery.length > 0 && isSearching;

  return (
    <form className="search-bar" onSubmit={handleSubmit} role="search">
      <label htmlFor="anime-search-input" className="search-bar__label">
        Buscar anime
      </label>
      <div className="search-bar__container">
        <FiSearch className="search-bar__icon search-bar__icon--search" aria-hidden="true" />
        
        <input
          id="anime-search-input"
          type="text"
          className="search-bar__input"
          placeholder={placeholder}
          value={searchQuery}
          onChange={handleInputChange}
          autoComplete="off"
        />

        {showLoadingIndicator && (
          <FiLoader
            className="search-bar__icon search-bar__icon--loading"
            aria-label="Searching"
          />
        )}

        {showClearButton && !showLoadingIndicator && (
          <motion.button
            type="button"
            className="search-bar__clear"
            onClick={handleClear}
            aria-label="Clear search"
            title="Clear"
            variants={buttonPress}
            initial="rest"
            whileHover="hover"
            whileTap="tap"
          >
            <FiX className="search-bar__icon" aria-hidden="true" />
          </motion.button>
        )}
      </div>
    </form>
  );
}

export default SearchBar;
