import React, { useEffect, useState } from 'react';

export interface ToastProps {
  id: string;
  type?: 'success' | 'error' | 'warning' | 'info';
  title?: string;
  message: string;
  duration?: number;
  isVisible?: boolean;
  onClose: (id: string) => void;
  position?: 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left' | 'top-center' | 'bottom-center';
}

const ToastTypes = {
  success: {
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
      </svg>
    ),
    colors: 'bg-green-50 border-green-200 text-green-800',
    iconColor: 'text-green-500',
  },
  error: {
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"/>
      </svg>
    ),
    colors: 'bg-red-50 border-red-200 text-red-800',
    iconColor: 'text-red-500',
  },
  warning: {
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M1 21h22L12 2 1 21zm12-3h-2v-2h2v2zm0-4h-2v-4h2v4z"/>
      </svg>
    ),
    colors: 'bg-yellow-50 border-yellow-200 text-yellow-800',
    iconColor: 'text-yellow-500',
  },
  info: {
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z"/>
      </svg>
    ),
    colors: 'bg-blue-50 border-blue-200 text-blue-800',
    iconColor: 'text-blue-500',
  },
} as const;

export const Toast: React.FC<ToastProps> = ({
  id,
  type = 'info',
  title,
  message,
  duration = 5000,
  isVisible = true,
  onClose,
}) => {
  const [isExiting, setIsExiting] = useState(false);
  
  const typeConfig = ToastTypes[type];

  useEffect(() => {
    if (duration && duration > 0) {
      const timer = setTimeout(() => {
        handleClose();
      }, duration);
      
      return () => clearTimeout(timer);
    }
  }, [duration, id]);

  const handleClose = () => {
    setIsExiting(true);
    setTimeout(() => {
      onClose(id);
    }, 300); // Match transition duration
  };

  if (!isVisible && !isExiting) return null;

  return (
    <div
      className={`
        flex items-start gap-3 p-4 rounded-2xl border shadow-lg
        backdrop-blur-sm transition-all duration-300 ease-out
        max-w-md w-full
        ${typeConfig.colors}
        ${isExiting 
          ? 'transform translate-x-full opacity-0' 
          : 'transform translate-x-0 opacity-100'
        }
      `}
      role="alert"
      aria-live="polite"
    >
      {/* Icon */}
      <div className={`flex-shrink-0 ${typeConfig.iconColor}`}>
        {typeConfig.icon}
      </div>
      
      {/* Content */}
      <div className="flex-1 min-w-0">
        {title && (
          <h4 className="text-sm font-medium mb-1">
            {title}
          </h4>
        )}
        <p className="text-sm leading-relaxed">
          {message}
        </p>
      </div>
      
      {/* Close button */}
      <button
        onClick={handleClose}
        className={`
          flex-shrink-0 p-1 rounded-lg
          hover:bg-black/5 focus:outline-none focus:ring-2 focus:ring-offset-1
          transition-colors duration-200
          ${typeConfig.iconColor} focus:ring-current
        `}
        aria-label="Lukk melding"
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    </div>
  );
};

// Toast container with positioning
export interface ToastContainerProps {
  toasts: ToastProps[];
  position?: 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left' | 'top-center' | 'bottom-center';
}

const PositionClasses = {
  'top-right': 'top-4 right-4',
  'top-left': 'top-4 left-4', 
  'bottom-right': 'bottom-4 right-4',
  'bottom-left': 'bottom-4 left-4',
  'top-center': 'top-4 left-1/2 transform -translate-x-1/2',
  'bottom-center': 'bottom-4 left-1/2 transform -translate-x-1/2',
} as const;

export const ToastContainer: React.FC<ToastContainerProps> = ({
  toasts,
  position = 'top-right',
}) => {
  if (toasts.length === 0) return null;

  return (
    <div 
      className={`fixed z-50 ${PositionClasses[position]} max-w-md`}
      aria-live="polite" 
      aria-label="Meldinger"
    >
      <div className="space-y-3">
        {toasts.map((toast) => (
          <Toast key={toast.id} {...toast} />
        ))}
      </div>
    </div>
  );
};

// Hook for managing toasts
export interface UseToastReturn {
  toasts: ToastProps[];
  addToast: (toast: Omit<ToastProps, 'id' | 'onClose'>) => string;
  removeToast: (id: string) => void;
  clearAllToasts: () => void;
}

export const useToast = (): UseToastReturn => {
  const [toasts, setToasts] = useState<ToastProps[]>([]);

  const addToast = (toast: Omit<ToastProps, 'id' | 'onClose'>): string => {
    const id = Math.random().toString(36).substring(2, 9);
    
    const newToast: ToastProps = {
      ...toast,
      id,
      onClose: removeToast,
    };
    
    setToasts(current => [...current, newToast]);
    return id;
  };

  const removeToast = (id: string) => {
    setToasts(current => current.filter(toast => toast.id !== id));
  };

  const clearAllToasts = () => {
    setToasts([]);
  };

  return {
    toasts,
    addToast,
    removeToast, 
    clearAllToasts,
  };
};

// Helper functions for common toast types
export const createSuccessToast = (message: string, title?: string) => ({
  type: 'success' as const,
  message,
  title,
});

export const createErrorToast = (message: string, title?: string) => ({
  type: 'error' as const,
  message,
  title,
  duration: 0, // Don't auto-dismiss errors
});

export const createWarningToast = (message: string, title?: string) => ({
  type: 'warning' as const,
  message,
  title,
});

export const createInfoToast = (message: string, title?: string) => ({
  type: 'info' as const,
  message,
  title,
});

export default Toast;