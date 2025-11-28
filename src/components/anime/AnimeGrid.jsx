import { lazy, Suspense } from 'react';
import { motion } from 'framer-motion';
import AnimeCard from './AnimeCard';
import { SkeletonCard } from '../common/Loading';
import { staggerContainer, staggerItem } from '../../utils/animations';
import './AnimeGrid.css';

// Lazy load virtualized grid for performance
const VirtualizedAnimeGrid = lazy(() => import('./VirtualizedAnimeGrid'));

// Threshold for using virtualization
const VIRTUALIZATION_THRESHOLD = 50;

/**
 * AnimeGrid component displays a responsive grid of anime cards
 * Automatically uses virtualization for lists with >50 items
 * @param {Object} props
 * @param {Array} props.animes - Array of anime objects
 * @param {boolean} props.loading - Loading state
 * @param {Function} props.onAnimeClick - Click handler for anime cards
 * @param {Function} props.onLoadMore - Optional callback for infinite scroll
 */
function AnimeGrid({ animes = [], loading = false, onAnimeClick, onLoadMore }) {
  // Show skeleton cards during loading
  if (loading && animes.length === 0) {
    return (
      <div className="anime-grid" role="status" aria-live="polite" aria-label="Cargando anime">
        {Array.from({ length: 12 }).map((_, index) => (
          <SkeletonCard key={`skeleton-${index}`} />
        ))}
      </div>
    );
  }

  // Show empty state if no animes
  if (!loading && animes.length === 0) {
    return (
      <div className="anime-grid-empty" role="status" aria-live="polite">
        <p className="empty-message">No se encontraron resultados</p>
      </div>
    );
  }

  // Use virtualized grid for large lists (>50 items)
  if (animes.length > VIRTUALIZATION_THRESHOLD) {
    return (
      <Suspense fallback={
        <div className="anime-grid">
          {Array.from({ length: 12 }).map((_, index) => (
            <SkeletonCard key={`skeleton-${index}`} />
          ))}
        </div>
      }>
        <VirtualizedAnimeGrid
          animes={animes}
          loading={loading}
          onAnimeClick={onAnimeClick}
        />
      </Suspense>
    );
  }

  // Use regular grid for smaller lists
  return (
    <motion.div
      className="anime-grid"
      role="list"
      aria-label="Lista de anime"
      variants={staggerContainer}
      initial="hidden"
      animate="visible"
    >
      {animes.map((anime) => (
        <motion.div key={anime.id} variants={staggerItem}>
          <AnimeCard
            anime={anime}
            onClick={() => onAnimeClick && onAnimeClick(anime)}
          />
        </motion.div>
      ))}
      {loading && animes.length > 0 && (
        <div role="status" aria-live="polite" aria-label="Cargando más anime">
          {Array.from({ length: 6 }).map((_, index) => (
            <SkeletonCard key={`skeleton-loading-${index}`} />
          ))}
        </div>
      )}
    </motion.div>
  );
}

export default AnimeGrid;
