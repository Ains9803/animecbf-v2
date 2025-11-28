import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import './Hero.css';

/**
 * Hero component for the home page
 * Displays welcome message with CTA button
 */
function Hero() {
  const navigate = useNavigate();

  const handleCTAClick = () => {
    navigate('/series');
  };

  return (
    <motion.section
      className="hero"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div className="hero-content">
        <motion.h1
          className="hero-title"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          Bienvenido a AnimeCBF
        </motion.h1>
        
        <motion.p
          className="hero-subtitle"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          Descubre las mejores series y películas de anime
        </motion.p>
        
        <motion.button
          className="hero-cta"
          onClick={handleCTAClick}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          aria-label="Explorar series de anime"
          type="button"
        >
          Explorar Series
        </motion.button>
      </div>
    </motion.section>
  );
}

export default Hero;
