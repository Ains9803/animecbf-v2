import { motion } from 'framer-motion';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
import { fadeIn, slideUp, staggerContainer, staggerItem } from '../utils/animations';
import './About.css';

/**
 * About Page Component
 * Information about AnimeCBF platform, mission, and vision
 */
function About() {
  return (
    <motion.div
      className="about-page"
      variants={fadeIn}
      initial="hidden"
      animate="visible"
      exit="exit"
    >
      <div className="about-container">
        {/* Logo Section */}
        <motion.div
          className="about-logo-section"
          variants={fadeIn}
          initial="hidden"
          animate="visible"
        >
          <LazyLoadImage
            src="/logo.png" 
            alt="AnimeCBF Logo" 
            effect="blur"
            className="about-logo"
          />
        </motion.div>

        {/* Title Section */}
        <motion.div
          className="about-header"
          variants={slideUp}
          initial="hidden"
          animate="visible"
        >
          <h1 className="about-title">Acerca de AnimeCBF</h1>
          <p className="about-subtitle">Tu plataforma de descubrimiento de anime</p>
        </motion.div>

        {/* Description Section */}
        <motion.section
          className="about-section about-description"
          variants={slideUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
        >
          <h2 className="about-section-title">¿Qué es AnimeCBF?</h2>
          <p className="about-text">
            AnimeCBF es una plataforma web moderna diseñada para los amantes del anime. 
            Ofrecemos una experiencia intuitiva y atractiva para descubrir, explorar y 
            disfrutar de series y películas de anime de todo el mundo. Nuestra plataforma 
            integra información actualizada de la API de Kitsu, proporcionando acceso a 
            un catálogo extenso con detalles completos, sinopsis, ratings y mucho más.
          </p>
        </motion.section>

        {/* Mission Section */}
        <motion.section
          className="about-section about-mission"
          variants={slideUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
        >
          <h2 className="about-section-title">Nuestra Misión</h2>
          <p className="about-text">
            Proporcionar una plataforma moderna, accesible y fácil de usar para que los 
            fans del anime puedan descubrir, explorar y disfrutar de su contenido favorito. 
            Nos comprometemos a ofrecer una experiencia de usuario excepcional con diseño 
            responsive, búsqueda intuitiva y navegación fluida en todos los dispositivos.
          </p>
        </motion.section>

        {/* Vision Section */}
        <motion.section
          className="about-section about-vision"
          variants={slideUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
        >
          <h2 className="about-section-title">Nuestra Visión</h2>
          <p className="about-text">
            Ser la plataforma de referencia para la comunidad hispanohablante de anime, 
            ofreciendo una experiencia de usuario excepcional, contenido actualizado y 
            herramientas innovadoras que conecten a los fans con el anime que aman. 
            Aspiramos a crear una comunidad vibrante donde los usuarios puedan descubrir 
            nuevas series, compartir sus favoritos y mantenerse al día con las últimas 
            tendencias del mundo del anime.
          </p>
        </motion.section>

        {/* Features Section */}
        <motion.section
          className="about-section about-features"
          variants={slideUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
        >
          <h2 className="about-section-title">Características</h2>
          <motion.div
            className="about-features-grid"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-50px' }}
          >
            <motion.div className="about-feature-card" variants={staggerItem}>
              <div className="about-feature-icon">🎬</div>
              <h3 className="about-feature-title">Catálogo Extenso</h3>
              <p className="about-feature-text">
                Acceso a miles de series y películas de anime con información detallada
              </p>
            </motion.div>
            <motion.div className="about-feature-card" variants={staggerItem}>
              <div className="about-feature-icon">🔍</div>
              <h3 className="about-feature-title">Búsqueda Inteligente</h3>
              <p className="about-feature-text">
                Encuentra rápidamente el anime que buscas con nuestra búsqueda en tiempo real
              </p>
            </motion.div>
            <motion.div className="about-feature-card" variants={staggerItem}>
              <div className="about-feature-icon">🌙</div>
              <h3 className="about-feature-title">Modo Oscuro</h3>
              <p className="about-feature-text">
                Disfruta de una experiencia visual cómoda con nuestro sistema de temas
              </p>
            </motion.div>
            <motion.div className="about-feature-card" variants={staggerItem}>
              <div className="about-feature-icon">📱</div>
              <h3 className="about-feature-title">Diseño Responsive</h3>
              <p className="about-feature-text">
                Navega desde cualquier dispositivo con una experiencia optimizada
              </p>
            </motion.div>
          </motion.div>
        </motion.section>
      </div>
    </motion.div>
  );
}

export default About;
