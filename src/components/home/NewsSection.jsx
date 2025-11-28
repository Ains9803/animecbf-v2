import { motion } from 'framer-motion';
import { FaNewspaper, FaTrophy, FaCalendarAlt } from 'react-icons/fa';
import './NewsSection.css';

/**
 * NewsSection component displays static news cards
 */
function NewsSection() {
  const newsItems = [
    {
      id: 1,
      icon: <FaNewspaper aria-hidden="true" />,
      title: 'Nuevos Estrenos',
      description: 'Descubre las últimas series y películas de anime que acaban de llegar.',
      color: '#667eea',
    },
    {
      id: 2,
      icon: <FaTrophy aria-hidden="true" />,
      title: 'Más Populares',
      description: 'Explora los animes más vistos y mejor valorados por la comunidad.',
      color: '#f093fb',
    },
    {
      id: 3,
      icon: <FaCalendarAlt aria-hidden="true" />,
      title: 'Próximos Lanzamientos',
      description: 'Mantente al día con los animes que se estrenarán próximamente.',
      color: '#4facfe',
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
      },
    },
  };

  return (
    <section className="news-section">
      <motion.div
        className="news-container"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-100px' }}
        variants={containerVariants}
      >
        <motion.h2 className="news-title" variants={itemVariants}>
          Novedades
        </motion.h2>

        <div className="news-grid">
          {newsItems.map((item) => (
            <motion.div
              key={item.id}
              className="news-card"
              variants={itemVariants}
              whileHover={{ y: -8, transition: { duration: 0.2 } }}
            >
              <div className="news-icon" style={{ color: item.color }}>
                {item.icon}
              </div>
              <h3 className="news-card-title">{item.title}</h3>
              <p className="news-card-description">{item.description}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}

export default NewsSection;
