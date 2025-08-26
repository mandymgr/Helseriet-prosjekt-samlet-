import { useState, useCallback } from 'react';

interface UseAnnouncementOptions {
  initialMessage?: string;
  timeout?: number;
}

interface UseAnnouncementReturn {
  message: string;
  announce: (message: string, timeout?: number) => void;
  clear: () => void;
}

export const useAnnouncement = (options: UseAnnouncementOptions = {}): UseAnnouncementReturn => {
  const { initialMessage = '', timeout: defaultTimeout } = options;
  
  const [message, setMessage] = useState(initialMessage);

  const announce = useCallback((message: string, timeout?: number) => {
    setMessage(message);
    
    const timeoutDuration = timeout || defaultTimeout;
    if (timeoutDuration) {
      setTimeout(() => {
        setMessage('');
      }, timeoutDuration);
    }
  }, [defaultTimeout]);

  const clear = useCallback(() => {
    setMessage('');
  }, []);

  return {
    message,
    announce,
    clear
  };
};