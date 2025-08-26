import React from 'react';

interface LoadingStateProps {
  size?: 'sm' | 'md' | 'lg';
  text?: string;
  type?: 'spinner' | 'skeleton' | 'dots';
}

interface ErrorStateProps {
  type?: 'field' | 'page' | 'toast';
  message: string;
  action?: {
    label: string;
    onClick: () => void;
  };
}

interface EmptyStateProps {
  icon?: React.ReactNode;
  title: string;
  description?: string;
  action?: {
    label: string;
    href?: string;
    onClick?: () => void;
  };
}

interface SuccessStateProps {
  message: string;
  type?: 'toast' | 'inline' | 'page';
  duration?: number;
}

// Loading States
export const LoadingState: React.FC<LoadingStateProps> = ({ 
  size = 'md', 
  text = 'Laster...', 
  type = 'spinner' 
}) => {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-6 h-6', 
    lg: 'w-8 h-8'
  };

  if (type === 'skeleton') {
    return (
      <div className="animate-pulse">
        <div className="h-4 bg-sage/20 rounded-full mb-3"></div>
        <div className="h-4 bg-sage/20 rounded-full mb-3 w-5/6"></div>
        <div className="h-4 bg-sage/20 rounded-full w-3/4"></div>
      </div>
    );
  }

  if (type === 'dots') {
    return (
      <div className="flex items-center gap-1">
        <div className="w-2 h-2 bg-sage rounded-full animate-bounce" style={{animationDelay: '0ms'}}></div>
        <div className="w-2 h-2 bg-sage rounded-full animate-bounce" style={{animationDelay: '150ms'}}></div>
        <div className="w-2 h-2 bg-sage rounded-full animate-bounce" style={{animationDelay: '300ms'}}></div>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-3 text-charcoal/70">
      <svg 
        className={`${sizeClasses[size]} animate-spin`} 
        fill="none" 
        viewBox="0 0 24 24"
        aria-hidden="true"
      >
        <circle 
          className="opacity-25" 
          cx="12" 
          cy="12" 
          r="10" 
          stroke="currentColor" 
          strokeWidth="4"
        />
        <path 
          className="opacity-75" 
          fill="currentColor" 
          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
        />
      </svg>
      <span className="text-sm font-medium">{text}</span>
    </div>
  );
};

// Product Card Skeleton
export const ProductCardSkeleton: React.FC = () => (
  <div className="bg-white minimal-shadow organic-border p-8 animate-pulse">
    <div className="w-full h-48 bg-sage/10 rounded-xl mb-6"></div>
    <div className="h-6 bg-sage/20 rounded-full mb-3"></div>
    <div className="h-4 bg-sage/20 rounded-full mb-3 w-3/4"></div>
    <div className="h-4 bg-sage/20 rounded-full mb-6 w-1/2"></div>
    <div className="h-10 bg-sage/20 rounded-2xl"></div>
  </div>
);

// Error States
export const ErrorState: React.FC<ErrorStateProps> = ({ 
  type = 'field', 
  message, 
  action 
}) => {
  const baseClasses = "flex items-start gap-3 text-red-700";
  
  const typeClasses = {
    field: "text-sm mt-1",
    page: "p-6 bg-red-50 border border-red-200 rounded-2xl",
    toast: "p-4 bg-red-50 border border-red-200 rounded-xl shadow-lg"
  };

  return (
    <div className={`${baseClasses} ${typeClasses[type]}`} role="alert">
      <svg 
        className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" 
        fill="currentColor" 
        viewBox="0 0 24 24"
        aria-hidden="true"
      >
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
      </svg>
      <div className="flex-1">
        <p className="font-medium">{message}</p>
        {action && (
          <button 
            onClick={action.onClick}
            className="mt-2 text-sm text-red-600 hover:text-red-800 underline transition-colors duration-250"
          >
            {action.label}
          </button>
        )}
      </div>
    </div>
  );
};

// Empty States
export const EmptyState: React.FC<EmptyStateProps> = ({ 
  icon, 
  title, 
  description, 
  action 
}) => (
  <div className="text-center py-12">
    {icon && (
      <div className="w-16 h-16 bg-sage/10 rounded-full flex items-center justify-center mx-auto mb-6">
        {icon}
      </div>
    )}
    <h3 className="text-xl font-light text-charcoal mb-2">{title}</h3>
    {description && (
      <p className="text-charcoal/60 mb-6 max-w-md mx-auto leading-relaxed">
        {description}
      </p>
    )}
    {action && (
      action.href ? (
        <a 
          href={action.href}
          className="btn-organic inline-flex items-center gap-2"
        >
          {action.label}
        </a>
      ) : (
        <button 
          onClick={action.onClick}
          className="btn-organic inline-flex items-center gap-2"
        >
          {action.label}
        </button>
      )
    )}
  </div>
);

// Success States
export const SuccessState: React.FC<SuccessStateProps> = ({ 
  message, 
  type = 'inline' 
}) => {
  const typeClasses = {
    toast: "p-4 bg-sage/10 border border-sage/20 rounded-xl shadow-lg",
    inline: "flex items-center gap-3 text-sage p-3 bg-sage/5 rounded-lg",
    page: "p-8 bg-sage/5 border border-sage/20 rounded-2xl text-center"
  };

  return (
    <div className={typeClasses[type]} role="status">
      <svg 
        className="w-5 h-5 text-sage flex-shrink-0" 
        fill="currentColor" 
        viewBox="0 0 24 24"
        aria-hidden="true"
      >
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
      </svg>
      <span className="font-medium text-sage">{message}</span>
    </div>
  );
};

// Skip Link for Accessibility
export const SkipLink: React.FC = () => (
  <a 
    href="#main-content"
    className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-sage text-white px-4 py-2 rounded-lg z-50 transition-all duration-250"
  >
    Hopp til hovedinnhold
  </a>
);