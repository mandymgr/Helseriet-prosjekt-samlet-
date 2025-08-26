import React from 'react';
import { ProductCardSkeleton } from '../SkeletonLoader';

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  message?: string;
  className?: string;
}

export const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
  size = 'md',
  message,
  className = ''
}) => {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-8 h-8',
    lg: 'w-12 h-12'
  };

  return (
    <div className={`flex flex-col items-center justify-center ${className}`}>
      <div
        className={`animate-spin rounded-full border-b-2 border-sage ${sizeClasses[size]}`}
        role="status"
        aria-label={message || 'Laster'}
      />
      {message && (
        <p className="mt-2 text-sm text-charcoal/70">{message}</p>
      )}
    </div>
  );
};

interface FullPageLoadingProps {
  message?: string;
}

export const FullPageLoading: React.FC<FullPageLoadingProps> = ({
  message = 'Laster...'
}) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-warm_white to-stone_light/50 pt-32 pb-16">
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex justify-center items-center min-h-[400px]">
          <LoadingSpinner size="lg" message={message} />
        </div>
      </div>
    </div>
  );
};

interface ProductGridSkeletonProps {
  count?: number;
  columns?: 1 | 2 | 3 | 4;
}

export const ProductGridSkeleton: React.FC<ProductGridSkeletonProps> = ({
  count = 6,
  columns = 3
}) => {
  const gridClasses = {
    1: 'grid-cols-1',
    2: 'grid-cols-1 md:grid-cols-2',
    3: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
    4: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'
  };

  return (
    <div className={`grid ${gridClasses[columns]} card-gap`}>
      {Array.from({ length: count }).map((_, index) => (
        <ProductCardSkeleton key={index} />
      ))}
    </div>
  );
};

interface InlineLoadingProps {
  message?: string;
  className?: string;
}

export const InlineLoading: React.FC<InlineLoadingProps> = ({
  message = 'Laster...',
  className = ''
}) => {
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <div className="animate-spin rounded-full w-4 h-4 border-b-2 border-sage" />
      <span className="text-sm text-charcoal/70">{message}</span>
    </div>
  );
};

interface LoadingButtonProps {
  loading: boolean;
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  disabled?: boolean;
  type?: 'button' | 'submit' | 'reset';
}

export const LoadingButton: React.FC<LoadingButtonProps> = ({
  loading,
  children,
  className = '',
  onClick,
  disabled,
  type = 'button'
}) => {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
      className={`relative ${className} ${loading ? 'opacity-75 cursor-not-allowed' : ''}`}
    >
      {loading && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="animate-spin rounded-full w-4 h-4 border-b-2 border-current" />
        </div>
      )}
      <span className={loading ? 'invisible' : 'visible'}>
        {children}
      </span>
    </button>
  );
};