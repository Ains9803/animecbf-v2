import { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import AnimeGrid from '../components/anime/AnimeGrid';
import SearchBar from '../components/common/SearchBar';
import { NetworkError, APIError } from '../components/common';
import { useInfiniteScroll } from '../hooks/useInfiniteScroll';
import { getSeries, searchAnime, NetworkError as NetworkErrorClass, APIError as APIErrorClass } from '../services/kitsuApi';
import { PAGE_SIZE } from '../utils/constants';
import './Series.css';

/**
 * Series Page Component
 * Displays grid of TV anime series with search and infinite scroll
 */
function Series() {
  const navigate = useNavigate();
  const [series, setSeries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [errorType, setErrorType] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [offset, setOffset] = useState(0);
  const [hasMore, setHasMore] = useState(true);

  // Fetch series from API
  const fetchSeries = useCallback(async (isLoadMore = false) => {
    try {
      if (!isLoadMore) {
        setLoading(true);
        setError(null);
        setErrorType(null);
      }

      const currentOffset = isLoadMore ? offset : 0;
      let response;

      if (searchQuery) {
        // Search with filter for TV series
        response = await searchAnime(searchQuery, PAGE_SIZE, currentOffset);
        // Filter to only TV series
        response.data = response.data.filter(anime => anime.attributes.subtype === 'TV');
      } else {
        response = await getSeries(PAGE_SIZE, currentOffset);
      }

      if (isLoadMore) {
        setSeries(prev => [...prev, ...response.data]);
      } else {
        setSeries(response.data);
        setOffset(0);
      }

      // Check if there are more items to load
      setHasMore(response.data.length === PAGE_SIZE);
      
      if (isLoadMore) {
        setOffset(currentOffset + PAGE_SIZE);
      }
    } catch (err) {
      console.error('Error fetching series:', err);
      
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
    fetchSeries(false);
  }, [searchQuery]);

  // Handle search
  const handleSearch = useCallback((query) => {
    setSearchQuery(query);
    setOffset(0);
    setSeries([]);
  }, []);

  // Handle infinite scroll
  const loadMore = useCallback(async () => {
    if (!loading && hasMore) {
      await fetchSeries(true);
    }
  }, [loading, hasMore, fetchSeries]);

  useInfiniteScroll(loadMore, 200);

  // Handle anime click
  const handleAnimeClick = (anime) => {
    navigate(`/anime/${anime.id}`);
  };

  // Handle retry
  const handleRetry = () => {
    setError(null);
    setErrorType(null);
    fetchSeries(false);
  };

  return (
    <motion.div
      className="series-page"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="series-header">
        <h1 className="series-title">Series de Anime</h1>
        <p className="series-subtitle">Explora nuestro catálogo de series</p>
      </div>

      <div className="series-search">
        <SearchBar onSearch={handleSearch} placeholder="Buscar series..." />
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
            animes={series}
            loading={loading}
            onAnimeClick={handleAnimeClick}
          />

          {!loading && series.length === 0 && (
            <div className="series-empty" role="status" aria-live="polite">
              <p>No se encontraron resultados</p>
            </div>
          )}
        </>
      )}
    </motion.div>
  );
}

export default Series;
