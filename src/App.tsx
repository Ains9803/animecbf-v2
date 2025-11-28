import { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import { AnimeProvider } from './context/AnimeContext';
import ErrorBoundary from './components/common/ErrorBoundary';
import Layout from './components/layout/Layout';
import Loading from './components/common/Loading';

// Lazy load page components for code splitting
const Home = lazy(() => import('./pages/Home'));
const Series = lazy(() => import('./pages/Series'));
const Movies = lazy(() => import('./pages/Movies'));
const AnimeDetail = lazy(() => import('./pages/AnimeDetail'));
const About = lazy(() => import('./pages/About'));
const NotFound = lazy(() => import('./pages/NotFound'));

/**
 * Main App Component
 * Sets up routing, context providers, and error boundaries
 * Implements lazy loading for optimal performance
 */
function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider>
        <AnimeProvider>
          <Router>
            <Layout>
              <Suspense fallback={<Loading type="spinner" count={1} />}>
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/series" element={<Series />} />
                  <Route path="/movies" element={<Movies />} />
                  <Route path="/anime/:id" element={<AnimeDetail />} />
                  <Route path="/about" element={<About />} />
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </Suspense>
            </Layout>
          </Router>
        </AnimeProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
