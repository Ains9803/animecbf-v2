import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import './Carousel.css';

/**
 * Carousel component for displaying anime in a 3D carousel
 * @param {Object} props
 * @param {Array} props.items - Array of anime objects
 * @param {boolean} props.autoPlay - Enable auto-play
 * @param {number} props.interval - Auto-play interval in ms
 */
function Carousel({ items = [], autoPlay = true, interval = 5000 }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const navigate = useNavigate();

  const goToNext = useCallback(() => {
    setDirection(1);
    setCurrentIndex((prevIndex) => (prevIndex + 1) % items.length);
  }, [items.length]);

  const goToPrev = useCallback(() => {
    setDirection(-1);
    setCurrentIndex((prevIndex) => (prevIndex - 1 + items.length) % items.length);
  }, [items.length]);

  const goToSlide = (index) => {
    setDirection(index > currentIndex ? 1 : -1);
    setCurrentIndex(index);
  };

  // Auto-play functionality
  useEffect(() => {
    if (!autoPlay || items.length === 0) return;

    const timer = setInterval(goToNext, interval);
    return () => clearInterval(timer);
  }, [autoPlay, interval, goToNext, items.length]);

  const handleAnimeClick = (anime) => {
    navigate(`/anime/${anime.id}`);
  };

  if (items.length === 0) {
    return (
      <div className="carousel-empty">
        <p>Cargando últimos estrenos...</p>
      </div>
    );
  }

  const currentAnime = items[currentIndex];

  const slideVariants = {
    enter: (direction) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
      scale: 0.8,
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
      scale: 1,
    },
    exit: (direction) => ({
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
      scale: 0.8,
    }),
  };

  return (
    <div className="carousel">
      <div className="carousel-container">
        <button
          className="carousel-button carousel-button-prev"
          onClick={goToPrev}
          aria-label="Diapositiva anterior"
          type="button"
        >
          <FaChevronLeft aria-hidden="true" />
        </button>

        <div className="carousel-content">
          <AnimatePresence initial={false} custom={direction} mode="wait">
            <motion.div
              key={currentIndex}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{
                x: { type: 'spring', stiffness: 300, damping: 30 },
                opacity: { duration: 0.2 },
                scale: { duration: 0.2 },
              }}
              className="carousel-slide"
              onClick={() => handleAnimeClick(currentAnime)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  handleAnimeClick(currentAnime);
                }
              }}
              aria-label={`Ver detalles de ${currentAnime.attributes.canonicalTitle}`}
            >
              <div className="carousel-image-wrapper">
                <LazyLoadImage
                  src={currentAnime.attributes.posterImage?.large || currentAnime.attributes.posterImage?.medium}
                  alt={currentAnime.attributes.canonicalTitle}
                  effect="blur"
                  className="carousel-image"
                />
                <div className="carousel-overlay">
                  <h3 className="carousel-title">{currentAnime.attributes.canonicalTitle}</h3>
                  <p className="carousel-info">
                    {currentAnime.attributes.subtype} • {currentAnime.attributes.status}
                  </p>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        <button
          className="carousel-button carousel-button-next"
          onClick={goToNext}
          aria-label="Siguiente diapositiva"
          type="button"
        >
          <FaChevronRight aria-hidden="true" />
        </button>
      </div>

      <div className="carousel-indicators" role="group" aria-label="Carousel navigation">
        {items.map((_, index) => (
          <button
            key={index}
            className={`carousel-indicator ${index === currentIndex ? 'active' : ''}`}
            onClick={() => goToSlide(index)}
            aria-label={`Ir a diapositiva ${index + 1}`}
            aria-current={index === currentIndex ? 'true' : 'false'}
            type="button"
          />
        ))}
      </div>
    </div>
  );
}

export default Carousel;
