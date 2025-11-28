import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
import { getAnimeById, NetworkError as NetworkErrorClass, APIError as APIErrorClass, NotFoundError as NotFoundErrorClass } from '../services/kitsuApi';
import { useAnime } from '../context/AnimeContext';
import { formatDate } from '../utils/helpers';
import { NetworkError, APIError } from '../components/common';
import Loading from '../components/common/Loading';
import { fadeIn, slideUp, buttonPress } from '../utils/animations';
import './AnimeDetail.css';

/**
 * AnimeDetail Page Component
 * Displays detailed information about a specific anime
 * Includes poster, synopsis, trailer, and favorite button
 */
function AnimeDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { isFavorite, addFavorite, removeFavorite, getFromCache, addToCache } = useAnime();
  
  const [anime, setAnime] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [errorType, setErrorType] = useState(null);

  useEffect(() => {
    const fetchAnimeDetail = async () => {
      if (!id) {
        setError('ID de anime no válido');
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError(null);
        setErrorType(null);

        // Check cache first
        const cachedAnime = getFromCache(id);
        if (cachedAnime) {
          setAnime(cachedAnime);
          setLoading(false);
          return;
        }

        // Fetch from API
        const data = await getAnimeById(id);
        setAnime(data);
        addToCache(data);
      } catch (err) {
        console.error('Error fetching anime detail:', err);
        
        // Determine error type
        if (err instanceof NetworkErrorClass) {
          setErrorType('network');
        } else if (err instanceof NotFoundErrorClass) {
          setErrorType('notfound');
        } else if (err instanceof APIErrorClass) {
          setErrorType('api');
        } else {
          setErrorType('api');
        }
        
        setError(err.message || 'No se pudo cargar el contenido. Intenta de nuevo.');
      } finally {
        setLoading(false);
      }
    };

    fetchAnimeDetail();
  }, [id, getFromCache, addToCache]);

  const handleGoBack = () => {
    navigate(-1);
  };

  const handleRetry = () => {
    setError(null);
    setErrorType(null);
    // Re-trigger the useEffect by forcing a re-render
    setLoading(true);
    const fetchAnimeDetail = async () => {
      try {
        setError(null);
        setErrorType(null);

        // Fetch from API
        const data = await getAnimeById(id);
        setAnime(data);
        addToCache(data);
      } catch (err) {
        console.error('Error fetching anime detail:', err);
        
        // Determine error type
        if (err instanceof NetworkErrorClass) {
          setErrorType('network');
        } else if (err instanceof NotFoundErrorClass) {
          setErrorType('notfound');
        } else if (err instanceof APIErrorClass) {
          setErrorType('api');
        } else {
          setErrorType('api');
        }
        
        setError(err.message || 'No se pudo cargar el contenido. Intenta de nuevo.');
      } finally {
        setLoading(false);
      }
    };
    fetchAnimeDetail();
  };

  const handleToggleFavorite = () => {
    if (!anime) return;
    
    if (isFavorite(anime.id)) {
      removeFavorite(anime.id);
    } else {
      addFavorite(anime.id);
    }
  };

  // Loading state
  if (loading) {
    return (
      <div className="anime-detail-page">
        <div className="anime-detail-skeleton">
          <div className="anime-detail-hero-skeleton skeleton-shimmer"></div>
          <div className="anime-detail-content-skeleton">
            <div className="skeleton-title skeleton-shimmer"></div>
            <div className="skeleton-text skeleton-shimmer"></div>
            <div className="skeleton-text skeleton-shimmer"></div>
            <div className="skeleton-text skeleton-shimmer"></div>
          </div>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="anime-detail-page">
        {errorType === 'network' && <NetworkError onRetry={handleRetry} />}
        {errorType === 'api' && <APIError onRetry={handleRetry} message={error} />}
        {errorType === 'notfound' && (
          <div className="anime-detail-error">
            <h2 className="anime-detail-error-title">No encontrado</h2>
            <p className="anime-detail-error-message">{error}</p>
            <button 
              className="anime-detail-error-button"
              onClick={handleGoBack}
              aria-label="Volver a la página anterior"
              type="button"
            >
              Volver
            </button>
          </div>
        )}
      </div>
    );
  }

  // No anime found
  if (!anime) {
    return (
      <div className="anime-detail-page">
        <div className="anime-detail-error">
          <h2 className="anime-detail-error-title">No encontrado</h2>
          <p className="anime-detail-error-message">No se encontró el anime solicitado.</p>
          <button 
            className="anime-detail-error-button"
            onClick={handleGoBack}
            aria-label="Volver a la página anterior"
            type="button"
          >
            Volver
          </button>
        </div>
      </div>
    );
  }

  const { attributes } = anime;
  const posterUrl = attributes.posterImage?.large || attributes.posterImage?.original;
  const coverUrl = attributes.coverImage?.large || attributes.coverImage?.original;

  return (
    <motion.div
      className="anime-detail-page"
      variants={fadeIn}
      initial="hidden"
      animate="visible"
      exit="exit"
    >
      {/* Hero Section */}
      <motion.div 
        className="anime-detail-hero"
        style={{
          backgroundImage: coverUrl ? `url(${coverUrl})` : 'none'
        }}
        variants={fadeIn}
        initial="hidden"
        animate="visible"
      >
        <div className="anime-detail-hero-overlay"></div>
        <motion.div
          className="anime-detail-hero-content"
          variants={slideUp}
          initial="hidden"
          animate="visible"
        >
          <LazyLoadImage
            src={posterUrl} 
            alt={attributes.canonicalTitle}
            effect="blur"
            className="anime-detail-poster"
          />
          <h1 className="anime-detail-title">{attributes.canonicalTitle}</h1>
        </motion.div>
      </motion.div>

      {/* Content Section */}
      <motion.div
        className="anime-detail-content"
        variants={slideUp}
        initial="hidden"
        animate="visible"
      >
        <div className="anime-detail-main">
          {/* Synopsis */}
          <motion.section
            className="anime-detail-section"
            aria-labelledby="synopsis-heading"
            variants={slideUp}
            initial="hidden"
            animate="visible"
          >
            <h2 id="synopsis-heading" className="anime-detail-section-title">Sinopsis</h2>
            <p className="anime-detail-synopsis">
              {attributes.synopsis || 'No hay sinopsis disponible.'}
            </p>
          </motion.section>

          {/* Trailer */}
          {attributes.youtubeVideoId && (
            <section className="anime-detail-section" aria-labelledby="trailer-heading">
              <h2 id="trailer-heading" className="anime-detail-section-title">Trailer</h2>
              <div className="anime-detail-trailer">
                <iframe
                  width="100%"
                  height="400"
                  src={`https://www.youtube.com/embed/${attributes.youtubeVideoId}`}
                  title={`Trailer de ${attributes.canonicalTitle}`}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  aria-label={`Video trailer de ${attributes.canonicalTitle}`}
                ></iframe>
              </div>
            </section>
          )}
        </div>

        {/* Sidebar */}
        <motion.aside
          className="anime-detail-sidebar"
          variants={slideUp}
          initial="hidden"
          animate="visible"
        >
          {/* Favorite Button */}
          <motion.button 
            className={`anime-detail-favorite-button ${isFavorite(anime.id) ? 'is-favorite' : ''}`}
            onClick={handleToggleFavorite}
            aria-label={isFavorite(anime.id) ? 'Quitar de favoritos' : 'Agregar a favoritos'}
            aria-pressed={isFavorite(anime.id)}
            type="button"
            variants={buttonPress}
            initial="rest"
            whileHover="hover"
            whileTap="tap"
          >
            <span className="favorite-icon" aria-hidden="true">
              {isFavorite(anime.id) ? '❤️' : '🤍'}
            </span>
            {isFavorite(anime.id) ? 'En Favoritos' : 'Agregar a Favoritos'}
          </motion.button>

          {/* Information */}
          <div className="anime-detail-info" role="complementary" aria-labelledby="info-heading">
            <h3 id="info-heading" className="anime-detail-info-title">Información</h3>
            
            <div className="anime-detail-info-item">
              <span className="info-label">Tipo:</span>
              <span className="info-value">{attributes.subtype || 'N/A'}</span>
            </div>

            <div className="anime-detail-info-item">
              <span className="info-label">Estado:</span>
              <span className="info-value">
                {attributes.status === 'current' && 'En emisión'}
                {attributes.status === 'finished' && 'Finalizado'}
                {attributes.status === 'upcoming' && 'Próximamente'}
              </span>
            </div>

            <div className="anime-detail-info-item">
              <span className="info-label">Episodios:</span>
              <span className="info-value">
                {attributes.episodeCount || 'Desconocido'}
              </span>
            </div>

            <div className="anime-detail-info-item">
              <span className="info-label">Fecha de estreno:</span>
              <span className="info-value">{formatDate(attributes.startDate)}</span>
            </div>

            {attributes.averageRating && (
              <div className="anime-detail-info-item">
                <span className="info-label">Rating:</span>
                <span className="info-value">{attributes.averageRating}%</span>
              </div>
            )}
          </div>
        </motion.aside>
      </motion.div>
    </motion.div>
  );
}

export default AnimeDetail;
