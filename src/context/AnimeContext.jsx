import { createContext, useContext, useState, useCallback } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';

const AnimeContext = createContext(undefined);

/**
 * AnimeProvider component that manages anime-related state
 * Manages favorites list and anime cache
 * Persists favorites to localStorage
 */
export function AnimeProvider({ children }) {
  const [favorites, setFavorites] = useLocalStorage('favorites', []);
  const [cache, setCache] = useState(new Map());

  /**
   * Add an anime to favorites
   * @param {string} id - The anime ID
   */
  const addFavorite = useCallback((id) => {
    setFavorites((prev) => {
      if (prev.includes(id)) {
        return prev;
      }
      return [...prev, id];
    });
  }, [setFavorites]);

  /**
   * Remove an anime from favorites
   * @param {string} id - The anime ID
   */
  const removeFavorite = useCallback((id) => {
    setFavorites((prev) => prev.filter((favId) => favId !== id));
  }, [setFavorites]);

  /**
   * Check if an anime is in favorites
   * @param {string} id - The anime ID
   * @returns {boolean} True if anime is favorited
   */
  const isFavorite = useCallback((id) => {
    return favorites.includes(id);
  }, [favorites]);

  /**
   * Add an anime to the cache
   * @param {Object} anime - The anime object
   */
  const addToCache = useCallback((anime) => {
    if (anime && anime.id) {
      setCache((prev) => {
        const newCache = new Map(prev);
        newCache.set(anime.id, anime);
        return newCache;
      });
    }
  }, []);

  /**
   * Get an anime from the cache
   * @param {string} id - The anime ID
   * @returns {Object|undefined} The cached anime or undefined
   */
  const getFromCache = useCallback((id) => {
    return cache.get(id);
  }, [cache]);

  /**
   * Clear the anime cache
   */
  const clearCache = useCallback(() => {
    setCache(new Map());
  }, []);

  const value = {
    favorites,
    addFavorite,
    removeFavorite,
    isFavorite,
    cache,
    addToCache,
    getFromCache,
    clearCache,
  };

  return (
    <AnimeContext.Provider value={value}>
      {children}
    </AnimeContext.Provider>
  );
}

/**
 * Custom hook to use anime context
 * @returns {Object} Anime context value
 */
export function useAnime() {
  const context = useContext(AnimeContext);
  if (context === undefined) {
    throw new Error('useAnime must be used within an AnimeProvider');
  }
  return context;
}
