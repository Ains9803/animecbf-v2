import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import AnimeGrid from '../anime/AnimeGrid';
import { buttonPress } from '../../utils/animations';
import './FeaturedSection.css';

/**
 * FeaturedSection component displays featured series and movies
 * @param {Object} props
 * @param {string} props.title - Section title
 * @param {Array} props.animes - Array of anime objects
 * @param {boolean} props.loading - Loading state
 * @param {string} props.viewAllLink - Link for "View All" button
 */
function FeaturedSection({ title, animes = [], loading = false, viewAllLink }) {
  const navigate = useNavigate();

  const handleAnimeClick = (anime) => {
    navigate(`/anime/${anime.id}`);
  };

  const handleViewAll = () => {
    if (viewAllLink) {
      navigate(viewAllLink);
    }
  };

  return (
    <motion.section
      className="featured-section"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ duration: 0.6 }}
    >
      <div className="featured-header">
        <h2 className="featured-title">{title}</h2>
        {viewAllLink && (
          <motion.button 
            className="featured-view-all" 
            onClick={handleViewAll}
            aria-label={`Ver todos los ${title.toLowerCase()}`}
            type="button"
            variants={buttonPress}
            initial="rest"
            whileHover="hover"
            whileTap="tap"
          >
            Ver Todos
          </motion.button>
        )}
      </div>

      <AnimeGrid
        animes={animes}
        loading={loading}
        onAnimeClick={handleAnimeClick}
      />
    </motion.section>
  );
}

export default FeaturedSection;
