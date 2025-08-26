import { Component } from 'react';
import type { ErrorInfo, ReactNode } from 'react';
import type { ApiError } from '../../services/api';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
  errorInfo: ErrorInfo | null;
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null
    };
  }

  static getDerivedStateFromError(error: Error): Partial<State> {
    return {
      hasError: true,
      error
    };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo);
    
    this.setState({
      error,
      errorInfo
    });

    // In production, you'd send this to an error reporting service
    if (import.meta.env.PROD) {
      // Example: Send to error tracking service
      // errorTrackingService.captureException(error, { extra: errorInfo });
    }
  }

  render() {
    if (this.state.hasError) {
      // Use custom fallback if provided
      if (this.props.fallback) {
        return this.props.fallback;
      }

      // Default error UI
      return (
        <div className="min-h-screen bg-warm_white flex items-center justify-center px-4">
          <div className="max-w-md w-full bg-white organic-border minimal-shadow p-8 text-center">
            <div className="mb-6">
              <svg 
                className="w-16 h-16 mx-auto text-terracotta mb-4" 
                fill="currentColor" 
                viewBox="0 0 20 20"
              >
                <path 
                  fillRule="evenodd" 
                  d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" 
                  clipRule="evenodd" 
                />
              </svg>
              <h1 className="text-responsive-h2 text-charcoal mb-2">
                Noe gikk galt
              </h1>
              <p className="text-responsive-body text-charcoal/70">
                Beklager, det oppstod en uventet feil. Vi har blitt informert og jobber med å løse problemet.
              </p>
            </div>

            <div className="space-y-3">
              <button
                onClick={() => window.location.reload()}
                className="w-full bg-sage text-white px-6 py-3 organic-border hover:bg-sage/90 transition-colors"
              >
                Last siden på nytt
              </button>
              
              <button
                onClick={() => window.history.back()}
                className="w-full btn-ghost"
              >
                Gå tilbake
              </button>
            </div>

            {import.meta.env.DEV && this.state.error && (
              <details className="mt-6 text-left">
                <summary className="cursor-pointer text-sm text-charcoal/60 hover:text-charcoal">
                  Vis feildetaljer (kun i utvikling)
                </summary>
                <div className="mt-2 p-3 bg-stone_light organic-border text-xs font-mono">
                  <p className="font-bold mb-2">Error:</p>
                  <p className="mb-2">{this.state.error.message}</p>
                  
                  {this.state.error.stack && (
                    <>
                      <p className="font-bold mb-2">Stack trace:</p>
                      <pre className="whitespace-pre-wrap break-all">
                        {this.state.error.stack}
                      </pre>
                    </>
                  )}
                  
                  {this.state.errorInfo && (
                    <>
                      <p className="font-bold mb-2 mt-4">Component stack:</p>
                      <pre className="whitespace-pre-wrap break-all">
                        {this.state.errorInfo.componentStack}
                      </pre>
                    </>
                  )}
                </div>
              </details>
            )}
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

// Hook for handling API errors
export const useErrorHandler = () => {
  const handleError = (error: any) => {
    console.error('API Error:', error);

    // Handle different types of errors
    if (error.response?.data && isApiError(error.response.data)) {
      const apiError = error.response.data as ApiError;
      
      // Show user-friendly message based on error code
      getUserFriendlyMessage(apiError);
      
      // You could show a toast notification here
      // toast.error(userMessage);
      
      return apiError;
    } else if (error.message) {
      // Network or other errors
      const fallbackMessage = 'Det oppstod en forbindelsesfeil. Sjekk internett-tilkoblingen din.';
      // toast.error(fallbackMessage);
      
      return {
        success: false,
        message: fallbackMessage,
        code: 'NETWORK_ERROR',
        errors: [{ message: error.message }],
        timestamp: new Date().toISOString()
      } as ApiError;
    }
    
    return null;
  };

  return { handleError };
};

// Type guard for API errors
const isApiError = (obj: any): obj is ApiError => {
  return obj && 
    typeof obj === 'object' &&
    obj.success === false &&
    typeof obj.message === 'string' &&
    typeof obj.code === 'string' &&
    Array.isArray(obj.errors);
};

// Get user-friendly error messages
const getUserFriendlyMessage = (error: ApiError): string => {
  switch (error.code) {
    case 'VALIDATION_ERROR':
      return 'Vennligst sjekk at alle feltene er fylt ut riktig.';
    case 'UNAUTHORIZED':
      return 'Du må logge inn for å fortsette.';
    case 'FORBIDDEN':
      return 'Du har ikke tilgang til denne ressursen.';
    case 'NOT_FOUND':
      return 'Den forespurte siden eller ressursen ble ikke funnet.';
    case 'CONFLICT':
      return 'Denne informasjonen eksisterer allerede.';
    case 'RATE_LIMITED':
      return 'For mange forespørsler. Vennligst vent litt før du prøver igjen.';
    case 'INSUFFICIENT_STOCK':
      return 'Beklager, det er ikke nok varer på lager.';
    case 'PAYMENT_FAILED':
      return 'Betalingen feilet. Vennligst prøv igjen eller bruk et annet betalingsmiddel.';
    case 'DATABASE_ERROR':
    case 'INTERNAL_SERVER_ERROR':
      return 'En teknisk feil oppstod. Vi jobber med å løse problemet.';
    default:
      return error.message || 'En uventet feil oppstod.';
  }
};

export default ErrorBoundary;