import { useState, useCallback } from 'react';

interface UseLoadingStateOptions {
  initialState?: boolean;
  defaultMessage?: string;
}

interface UseLoadingStateReturn {
  loading: boolean;
  message: string;
  setLoading: (loading: boolean, message?: string) => void;
  withLoading: <T>(
    asyncFn: () => Promise<T>,
    loadingMessage?: string,
    successMessage?: string
  ) => Promise<T>;
  reset: () => void;
}

export const useLoadingState = (options: UseLoadingStateOptions = {}): UseLoadingStateReturn => {
  const { initialState = false, defaultMessage = 'Laster...' } = options;
  
  const [loading, setLoadingState] = useState(initialState);
  const [message, setMessage] = useState(defaultMessage);

  const setLoading = useCallback((loading: boolean, message?: string) => {
    setLoadingState(loading);
    if (message) {
      setMessage(message);
    } else if (!loading) {
      setMessage(defaultMessage);
    }
  }, [defaultMessage]);

  const withLoading = useCallback(async <T>(
    asyncFn: () => Promise<T>,
    loadingMessage?: string,
    successMessage?: string
  ): Promise<T> => {
    try {
      setLoading(true, loadingMessage);
      const result = await asyncFn();
      if (successMessage) {
        setMessage(successMessage);
      }
      return result;
    } finally {
      setLoadingState(false);
    }
  }, [setLoading]);

  const reset = useCallback(() => {
    setLoadingState(initialState);
    setMessage(defaultMessage);
  }, [initialState, defaultMessage]);

  return {
    loading,
    message,
    setLoading,
    withLoading,
    reset
  };
};