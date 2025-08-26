import React from 'react';

interface ErrorMessageProps {
  message: string;
  className?: string;
  onRetry?: () => void;
  retryText?: string;
}

export const ErrorMessage: React.FC<ErrorMessageProps> = ({
  message,
  className = '',
  onRetry,
  retryText = 'Prøv igjen'
}) => {
  return (
    <div
      className={`empty-state fade-scale active ${className}`}
      role="status"
      aria-live="polite"
    >
      <div className="empty-state-icon">
        <svg
          className="w-8 h-8 text-red-500"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.732-.833-2.5 0L4.268 13.5c-.77.833.192 2.5 1.732 2.5z"
          />
        </svg>
      </div>
      <h3
        className="text-responsive-h3 text-charcoal mb-4"
        style={{ fontFamily: 'ui-serif, Georgia, Cambria, serif' }}
      >
        Noe gikk galt
      </h3>
      <p className="text-responsive-body mb-6 leading-relaxed">
        {message}
      </p>
      {onRetry && (
        <button onClick={onRetry} className="btn-ghost scale-hover">
          {retryText}
        </button>
      )}
    </div>
  );
};

interface FullPageErrorProps {
  title?: string;
  message: string;
  onRetry?: () => void;
  retryText?: string;
}

export const FullPageError: React.FC<FullPageErrorProps> = ({
  title = 'Feil ved lasting',
  message,
  onRetry,
  retryText = 'Prøv igjen'
}) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-warm_white to-stone_light/50 pt-32 pb-16">
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex justify-center items-center min-h-[400px]">
          <div className="bg-white organic-border minimal-shadow card-inner max-w-md text-center">
            <div className="mb-6">
              <svg
                className="w-16 h-16 mx-auto text-red-500 mb-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.732-.833-2.5 0L4.268 13.5c-.77.833.192 2.5 1.732 2.5z"
                />
              </svg>
              <h1
                className="text-responsive-h2 text-charcoal mb-2"
                style={{ fontFamily: 'ui-serif, Georgia, Cambria, serif' }}
              >
                {title}
              </h1>
              <p className="text-responsive-body text-charcoal/70">
                {message}
              </p>
            </div>
            {onRetry && (
              <button onClick={onRetry} className="btn-ghost">
                {retryText}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

interface NetworkErrorProps {
  onRetry?: () => void;
  className?: string;
}

export const NetworkError: React.FC<NetworkErrorProps> = ({
  onRetry,
  className = ''
}) => {
  return (
    <ErrorMessage
      message="Kan ikke koble til serveren. Sjekk internett-tilkoblingen din og prøv igjen."
      onRetry={onRetry}
      className={className}
    />
  );
};

interface NotFoundProps {
  title?: string;
  message?: string;
  onGoHome?: () => void;
  homeText?: string;
  className?: string;
}

export const NotFound: React.FC<NotFoundProps> = ({
  title = 'Siden ble ikke funnet',
  message = 'Beklager, vi kunne ikke finne siden du leter etter.',
  onGoHome,
  homeText = 'Gå til forsiden',
  className = ''
}) => {
  return (
    <div
      className={`empty-state fade-scale active ${className}`}
      role="status"
      aria-live="polite"
    >
      <div className="empty-state-icon">
        <svg
          className="w-8 h-8 text-charcoal/40"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6-4h6m2 5.291A7.962 7.962 0 0112 15c-2.34 0-4.291-1.007-5.714-2.64C7.714 10.006 9.66 9 12 9s4.286 1.007 5.714 2.36A7.962 7.962 0 0112 15z"
          />
        </svg>
      </div>
      <h3
        className="text-responsive-h3 text-charcoal mb-4"
        style={{ fontFamily: 'ui-serif, Georgia, Cambria, serif' }}
      >
        {title}
      </h3>
      <p className="text-responsive-body mb-6 leading-relaxed">
        {message}
      </p>
      {onGoHome && (
        <button onClick={onGoHome} className="btn-ghost scale-hover">
          {homeText}
        </button>
      )}
    </div>
  );
};

interface NoResultsProps {
  title?: string;
  message?: string;
  onReset?: () => void;
  resetText?: string;
  className?: string;
  icon?: React.ReactNode;
}

export const NoResults: React.FC<NoResultsProps> = ({
  title = 'Ingen resultater funnet',
  message = 'Prøv å endre søkekriteriene eller filteret ditt.',
  onReset,
  resetText = 'Nullstill filtre',
  className = '',
  icon
}) => {
  const defaultIcon = (
    <svg
      className="w-8 h-8 text-sage"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
      />
    </svg>
  );

  return (
    <div
      className={`empty-state fade-scale active ${className}`}
      role="status"
      aria-live="polite"
    >
      <div className="empty-state-icon">
        {icon || defaultIcon}
      </div>
      <h3
        className="text-responsive-h3 text-charcoal mb-4"
        style={{ fontFamily: 'ui-serif, Georgia, Cambria, serif' }}
      >
        {title}
      </h3>
      <p className="text-responsive-body mb-6 leading-relaxed">
        {message}
      </p>
      {onReset && (
        <button onClick={onReset} className="btn-ghost scale-hover">
          {resetText}
        </button>
      )}
    </div>
  );
};