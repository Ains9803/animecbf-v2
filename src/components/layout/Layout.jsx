import { useEffect } from 'react';
import { useTheme } from '../../context/ThemeContext';
import Header from './Header';
import Footer from './Footer';
import './Layout.css';

/**
 * Layout component that wraps all pages
 * Provides consistent structure with Header, main content area, and Footer
 * Applies global theme styles
 * 
 * @param {Object} props
 * @param {React.ReactNode} props.children - Page content to render
 */
function Layout({ children }) {
  const { effectiveTheme } = useTheme();

  // Apply theme class to body for global styling
  useEffect(() => {
    document.body.className = `theme-${effectiveTheme}`;
  }, [effectiveTheme]);

  return (
    <div className="layout">
      <Header />
      
      <main className="layout__main" id="main-content" role="main">
        {children}
      </main>
      
      <Footer />
    </div>
  );
}

export default Layout;
