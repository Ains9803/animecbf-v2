/**
 * Demo file to showcase layout components
 * This file can be used for manual testing and removed later
 */
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from '../../context/ThemeContext';
import Layout from './Layout';

function LayoutDemo() {
  return (
    <BrowserRouter>
      <ThemeProvider>
        <Layout>
          <div style={{ padding: '2rem' }}>
            <h1>Layout Components Demo</h1>
            
            <section style={{ marginBottom: '3rem' }}>
              <h2>Layout Structure</h2>
              <p>
                The Layout component wraps the entire application with:
              </p>
              <ul>
                <li><strong>Header:</strong> Navigation, logo, search bar, and theme toggle</li>
                <li><strong>Main Content:</strong> This area (where page content goes)</li>
                <li><strong>Footer:</strong> Contact information and links</li>
              </ul>
            </section>

            <section style={{ marginBottom: '3rem' }}>
              <h2>Features</h2>
              <ul>
                <li>Sticky header that stays at the top when scrolling</li>
                <li>Responsive design with hamburger menu on mobile</li>
                <li>Integrated search functionality</li>
                <li>Theme toggle (light/dark/system)</li>
                <li>Contact links in footer</li>
              </ul>
            </section>

            <section style={{ marginBottom: '3rem' }}>
              <h2>Responsive Breakpoints</h2>
              <ul>
                <li><strong>Mobile:</strong> &lt; 768px - Hamburger menu</li>
                <li><strong>Tablet:</strong> 768px - 1024px - Horizontal navigation</li>
                <li><strong>Desktop:</strong> &gt; 1024px - Full layout with all features</li>
              </ul>
            </section>

            <section>
              <h2>Usage</h2>
              <pre style={{ 
                backgroundColor: 'var(--color-bg-secondary)', 
                padding: '1rem', 
                borderRadius: '0.5rem',
                overflow: 'auto'
              }}>
{`import { Layout } from './components/layout';

function App() {
  return (
    <Layout>
      <YourPageContent />
    </Layout>
  );
}`}
              </pre>
            </section>
          </div>
        </Layout>
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default LayoutDemo;
