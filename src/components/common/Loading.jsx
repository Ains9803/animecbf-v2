import './Loading.css';

/**
 * Loading component with spinner and skeleton types
 * @param {Object} props
 * @param {string} props.type - Type of loading indicator: 'spinner' or 'skeleton'
 * @param {number} props.count - Number of skeleton cards to display (only for skeleton type)
 */
function Loading({ type = 'spinner', count = 6 }) {
  if (type === 'skeleton') {
    return (
      <div className="skeleton-grid" role="status" aria-live="polite" aria-label="Cargando contenido">
        {Array.from({ length: count }).map((_, index) => (
          <SkeletonCard key={index} />
        ))}
      </div>
    );
  }

  // Default spinner type
  return (
    <div className="loading-spinner" role="status" aria-live="polite" aria-label="Cargando contenido">
      <div className="spinner" aria-hidden="true"></div>
      <p className="loading-text">Cargando...</p>
    </div>
  );
}

/**
 * SkeletonCard component for loading state of anime cards
 */
export function SkeletonCard() {
  return (
    <div className="skeleton-card" aria-hidden="true">
      <div className="skeleton-card__image skeleton-shimmer"></div>
      <div className="skeleton-card__content">
        <div className="skeleton-card__title skeleton-shimmer"></div>
        <div className="skeleton-card__subtitle skeleton-shimmer"></div>
        <div className="skeleton-card__rating skeleton-shimmer"></div>
      </div>
    </div>
  );
}

export default Loading;
