import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Hero from '../components/home/Hero';
import Carousel from '../components/home/Carousel';
import FeaturedSection from '../components/home/FeaturedSection';
import NewsSection from '../components/home/NewsSection';
import { getAnime, getSeries, getMovies } from '../services/kitsuApi';
import './Home.css';

/**
 * Home Page Component
 * Main landing page with hero, carousel, featured sections, and news
 */
function Home() {
  const [trendingAnimes, setTrendingAnimes] = useState([]);
  const [featuredSeries, setFeaturedSeries] = useState([]);
  const [featuredMovies, setFeaturedMovies] = useState([]);
  const [loadingTrending, setLoadingTrending] = useState(true);
  const [loadingSeries, setLoadingSeries] = useState(true);
  const [loadingMovies, setLoadingMovies] = useState(true);

  // Fetch trending animes for carousel
  useEffect(() => {
    const fetchTrending = async () => {
      try {
        setLoadingTrending(true);
        const response = await getAnime({ limit: 10 });
        setTrendingAnimes(response.data);
      } catch (error) {
        console.error('Error fetching trending animes:', error);
      } finally {
        setLoadingTrending(false);
      }
    };

    fetchTrending();
  }, []);

  // Fetch featured series
  useEffect(() => {
    const fetchSeries = async () => {
      try {
        setLoadingSeries(true);
        const response = await getSeries(12);
        setFeaturedSeries(response.data);
      } catch (error) {
        console.error('Error fetching series:', error);
      } finally {
        setLoadingSeries(false);
      }
    };

    fetchSeries();
  }, []);

  // Fetch featured movies
  useEffect(() => {
    const fetchMovies = async () => {
      try {
        setLoadingMovies(true);
        const response = await getMovies(12);
        setFeaturedMovies(response.data);
      } catch (error) {
        console.error('Error fetching movies:', error);
      } finally {
        setLoadingMovies(false);
      }
    };

    fetchMovies();
  }, []);

  return (
    <motion.div
      className="home-page"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <Hero />
      
      {!loadingTrending && trendingAnimes.length > 0 && (
        <section className="home-carousel-section">
          <div className="home-section-header">
            <h2 className="home-section-title">Últimos Estrenos</h2>
          </div>
          <Carousel items={trendingAnimes} autoPlay={true} interval={5000} />
        </section>
      )}

      <FeaturedSection
        title="Series Recomendadas"
        animes={featuredSeries}
        loading={loadingSeries}
        viewAllLink="/series"
      />

      <FeaturedSection
        title="Películas Recomendadas"
        animes={featuredMovies}
        loading={loadingMovies}
        viewAllLink="/movies"
      />

      <NewsSection />
    </motion.div>
  );
}

export default Home;
