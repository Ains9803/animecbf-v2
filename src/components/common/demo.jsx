/**
 * Demo file to showcase common components
 * This file can be used for manual testing and removed later
 */
import ErrorBoundary from './ErrorBoundary';
import Loading, { SkeletonCard } from './Loading';
import ThemeToggle from './ThemeToggle';
import SearchBar from './SearchBar';

function ComponentsDemo() {
  const handleSearch = (query) => {
    console.log('Search query:', query);
  };

  return (
    <div style={{ padding: '2rem' }}>
      <h1>Common Components Demo</h1>

      <section style={{ marginBottom: '3rem' }}>
        <h2>ThemeToggle</h2>
        <ThemeToggle />
      </section>

      <section style={{ marginBottom: '3rem' }}>
        <h2>SearchBar</h2>
        <SearchBar onSearch={handleSearch} />
      </section>

      <section style={{ marginBottom: '3rem' }}>
        <h2>Loading - Spinner</h2>
        <Loading type="spinner" />
      </section>

      <section style={{ marginBottom: '3rem' }}>
        <h2>Loading - Skeleton Cards</h2>
        <Loading type="skeleton" count={6} />
      </section>

      <section style={{ marginBottom: '3rem' }}>
        <h2>ErrorBoundary</h2>
        <p>ErrorBoundary wraps components and catches errors. See ErrorBoundary.jsx for usage.</p>
      </section>
    </div>
  );
}

export default ComponentsDemo;
