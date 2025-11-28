import './ErrorMessage.css';

/**
 * APIError Component
 * Displays an API failure error message with retry button
 * Used when the API returns an error response
 * 
 * @param {Object} props
 * @param {Function} [props.onRetry] - Optional callback function to retry the failed operation
 * @param {string} [props.message] - Optional custom error message
 */
function APIError({ onRetry, message }) {
  return (
    <div className="error-message" role="alert" aria-live="assertive">
      <div className="error-message__content">
        <div className="error-message__icon" aria-hidden="true">
          ⚠️
        </div>
        <h2 className="error-message__title">Error al cargar</h2>
        <p className="error-message__text">
          {message || 'No se pudo cargar el contenido. Intenta de nuevo.'}
        </p>
        {onRetry && (
          <button
            className="error-message__button"
            onClick={onRetry}
            type="button"
            aria-label="Reintentar cargar el contenido"
          >
            Reintentar
          </button>
        )}
      </div>
    </div>
  );
}

export default APIError;
