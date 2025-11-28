import './ErrorMessage.css';

/**
 * NetworkError Component
 * Displays a network connectivity error message with retry button
 * Used when there are connection issues
 * 
 * @param {Object} props
 * @param {Function} [props.onRetry] - Optional callback function to retry the failed operation
 */
function NetworkError({ onRetry }) {
  return (
    <div className="error-message" role="alert" aria-live="assertive">
      <div className="error-message__content">
        <div className="error-message__icon" aria-hidden="true">
          🌐
        </div>
        <h2 className="error-message__title">Error de conexión</h2>
        <p className="error-message__text">
          Error de conexión. Verifica tu internet.
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

export default NetworkError;
