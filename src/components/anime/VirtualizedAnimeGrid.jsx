import { useEffect, useState, useCallback, useMemo } from 'react';
import { List } from 'react-window';
import AnimeCard from './AnimeCard';
import { SkeletonCard } from '../common/Loading';
import './AnimeGrid.css';

/**
 * VirtualizedAnimeGrid component for large lists (>50 items)
 * Uses react-window for performance optimization
 * Renders rows of anime cards in a virtualized list
 * @param {Object} props
 * @param {Array} props.animes - Array of anime objects
 * @param {boolean} props.loading - Loading state
 * @param {Function} props.onAnimeClick - Click handler for anime cards
 */
function VirtualizedAnimeGrid({ animes = [], loading = false, onAnimeClick }) {
  const [dimensions, setDimensions] = useState({
    columnCount: 5,
    rowHeight: 400,
    width: 1200,
    height: 800,
  });

  // Calculate grid dimensions based on window size
  const calculateDimensions = useCallback(() => {
    const width = window.innerWidth;
    const containerWidth = Math.min(width - 40, 1400); // Max width with padding
    
    let columnCount;
    
    // Responsive column count based on breakpoints
    if (width < 768) {
      columnCount = 2; // Mobile: 2 columns
    } else if (width < 1024) {
      columnCount = 3; // Tablet: 3 columns
    } else if (width < 1440) {
      columnCount = 4; // Small desktop: 4 columns
    } else {
      columnCount = 5; // Large desktop: 5 columns
    }

    const rowHeight = 400; // Fixed row height for cards
    const height = Math.min(window.innerHeight - 200, 1200); // Max height

    setDimensions({
      columnCount,
      rowHeight,
      width: containerWidth,
      height,
    });
  }, []);

  // Update dimensions on mount and window resize
  useEffect(() => {
    calculateDimensions();
    window.addEventListener('resize', calculateDimensions);
    return () => window.removeEventListener('resize', calculateDimensions);
  }, [calculateDimensions]);

  // Show skeleton cards during loading
  if (loading && animes.length === 0) {
    return (
      <div className="anime-grid">
        {Array.from({ length: 12 }).map((_, index) => (
          <SkeletonCard key={`skeleton-${index}`} />
        ))}
      </div>
    );
  }

  // Show empty state if no animes
  if (!loading && animes.length === 0) {
    return (
      <div className="anime-grid-empty">
        <p className="empty-message">No se encontraron resultados</p>
      </div>
    );
  }

  // Group animes into rows
  const rows = useMemo(() => {
    const result = [];
    for (let i = 0; i < animes.length; i += dimensions.columnCount) {
      result.push(animes.slice(i, i + dimensions.columnCount));
    }
    return result;
  }, [animes, dimensions.columnCount]);

  // Row renderer component
  const Row = ({ index, style }) => {
    const rowAnimes = rows[index];
    
    return (
      <div style={{ ...style, display: 'flex', gap: '20px', padding: '10px' }}>
        {rowAnimes.map((anime) => (
          <div key={anime.id} style={{ flex: `0 0 calc(${100 / dimensions.columnCount}% - 20px)` }}>
            <AnimeCard
              anime={anime}
              onClick={() => onAnimeClick && onAnimeClick(anime)}
            />
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="anime-grid-virtualized">
      <List
        defaultHeight={dimensions.height}
        defaultWidth={dimensions.width}
        rowCount={rows.length}
        rowHeight={dimensions.rowHeight}
        rowComponent={Row}
        style={{ margin: '0 auto' }}
      />
      
      {loading && animes.length > 0 && (
        <div className="anime-grid-loading-more">
          <p>Cargando más...</p>
        </div>
      )}
    </div>
  );
}

export default VirtualizedAnimeGrid;
