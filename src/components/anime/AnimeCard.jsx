import { motion } from 'framer-motion';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
import { hoverLift } from '../../utils/animations';
import './AnimeCard.css';

/**
 * AnimeCard component displays a preview card for an anime
 * @param {Object} props
 * @param {Object} props.anime - Anime object from Kitsu API
 * @param {Function} props.onClick - Optional click handler
 */
function AnimeCard({ anime, onClick }) {
  const {
    canonicalTitle,
    posterImage,
    status,
    averageRating,
  } = anime.attributes;

  const imageUrl = posterImage?.medium || posterImage?.small || posterImage?.original;
  const rating = averageRating ? parseFloat(averageRating).toFixed(1) : null;

  const handleClick = () => {
    if (onClick) {
      onClick();
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleClick();
    }
  };

  return (
    <motion.div
      className="anime-card"
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      role="button"
      tabIndex={0}
      aria-label={`Ver detalles de ${canonicalTitle}`}
      variants={hoverLift}
      initial="rest"
      whileHover="hover"
      whileTap={{ scale: 0.98 }}
    >
      <div className="anime-card__image-container">
        <LazyLoadImage
          src={imageUrl}
          alt={canonicalTitle}
          effect="blur"
          className="anime-card__image"
          wrapperClassName="anime-card__image-wrapper"
        />
        <div className="anime-card__badge">
          <span className={`badge badge--${status}`}>
            {status === 'current' ? 'En emisión' : status === 'finished' ? 'Finalizado' : 'Próximamente'}
          </span>
        </div>
      </div>
      <div className="anime-card__content">
        <h3 className="anime-card__title" title={canonicalTitle}>
          {canonicalTitle}
        </h3>
        {rating && (
          <div className="anime-card__rating">
            <span className="rating-star">⭐</span>
            <span className="rating-value">{rating}</span>
          </div>
        )}
      </div>
    </motion.div>
  );
}

export default AnimeCard;
