import { Link } from 'react-router-dom';
import './NotFound.css';

/**
 * NotFound (404) Page Component
 * Displayed when user navigates to a non-existent route
 */
function NotFound() {
  return (
    <div className="not-found-page" role="main">
      <h1 className="not-found-page__title">404</h1>
      <h2 className="not-found-page__subtitle">Página no encontrada</h2>
      <p className="not-found-page__message">
        Lo sentimos, la página que buscas no existe.
      </p>
      <Link 
        to="/" 
        className="not-found-page__button"
        aria-label="Volver a la página de inicio"
      >
        Volver al inicio
      </Link>
    </div>
  );
}

export default NotFound;
