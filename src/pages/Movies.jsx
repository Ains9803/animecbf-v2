import { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import AnimeGrid from '../components/anime/AnimeGrid';
import SearchBar from '../components/common/SearchBar';
import { NetworkError, APIError } from '../components/common';
import { useInfiniteScroll } from '../hooks/useInfiniteScroll';
import { getMovies, searchAnime, NetworkError as NetworkErrorClass, APIError as APIErrorClass } from '../services/kitsuApi';
import { PAGE_SIZE } from '../utils/constants';
import './Movies.css';

/**
 * Movies Page Component
 * Displays grid of anime movies with search and infinite scroll
 */
function Movies() {
  const navigate = useNavigate();
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [errorType, setErrorType] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [offset, setOffset] = useState(0);
  const [hasMore, setHasMore] = useState(true);

  // Fetch movies from API
  const fetchMovies = useCallback(async (isLoadMore = false) => {
    try {
      if (!isLoadMore) {
        setLoading(true);
        setError(null);
        setErrorType(null);
      }

      const currentOffset = isLoadMore ? offset : 0;
      let response;

      if (searchQuery) {
        // Search with filter for movies
        response = await searchAnime(searchQuery, PAGE_SIZE, currentOffset);
        // Filter to only movies - validate data exists
        response.data = Array.isArray(response.data) 
          ? response.data.filter(anime => anime?.attributes?.subtype === 'movie')
          : [];
      } else {
        response = await getMovies(PAGE_SIZE, currentOffset);
      }

      // Validate response has data array
      if (!response || !Array.isArray(response.data)) {
        throw new Error('Respuesta inválida del servidor');
      }

      if (isLoadMore) {
        setMovies(prev => [...prev, ...response.data]);
      } else {
        setMovies(response.data);
        setOffset(0);
      }

      // Check if there are more items to load
      setHasMore(response.data.length === PAGE_SIZE);
      
      if (isLoadMore) {
        setOffset(currentOffset + PAGE_SIZE);
      }
    } catch (err) {
      console.error('Error fetching movies:', err);
      
      // Determine error type
      if (err instanceof NetworkErrorClass) {
        setErrorType('network');
      } else if (err instanceof APIErrorClass) {
        setErrorType('api');
      } else {
        setErrorType('api');
      }
      
      setError(err.message || 'No se pudo cargar el contenido. Intenta de nuevo.');
    } finally {
      setLoading(false);
    }
  }, [offset, searchQuery]);

  // Initial load
  useEffect(() => {
    fetchMovies(false);
  }, [searchQuery]);

  // Handle search
  const handleSearch = useCallback((query) => {
    setSearchQuery(query);
    setOffset(0);
    setMovies([]);
  }, []);

  // Handle infinite scroll
  const loadMore = useCallback(async () => {
    if (!loading && hasMore) {
      await fetchMovies(true);
    }
  }, [loading, hasMore, fetchMovies]);

  useInfiniteScroll(loadMore, 200);

  // Handle anime click
  const handleAnimeClick = (anime) => {
    navigate(`/anime/${anime.id}`);
  };

  // Handle retry
  const handleRetry = () => {
    setError(null);
    setErrorType(null);
    fetchMovies(false);
  };

  return (
    <motion.div
      className="movies-page"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="movies-header">
        <h1 className="movies-title">Películas de Anime</h1>
        <p className="movies-subtitle">Explora nuestro catálogo de películas</p>
      </div>

      <div className="movies-search">
        <SearchBar onSearch={handleSearch} placeholder="Buscar películas..." />
      </div>

      {error && errorType === 'network' && (
        <NetworkError onRetry={handleRetry} />
      )}

      {error && errorType === 'api' && (
        <APIError onRetry={handleRetry} message={error} />
      )}

      {!error && (
        <>
          <AnimeGrid
            animes={movies}
            loading={loading}
            onAnimeClick={handleAnimeClick}
          />

          {!loading && movies.length === 0 && (
            <div className="movies-empty" role="status" aria-live="polite">
              <p>No se encontraron resultados</p>
            </div>
          )}
        </>
      )}
    </motion.div>
  );
}

export default Movies;
