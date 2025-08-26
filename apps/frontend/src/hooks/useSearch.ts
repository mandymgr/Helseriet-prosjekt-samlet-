import { useState, useEffect } from 'react';
import { useDebounce } from './useDebounce';
import { useAnnouncement } from './useAnnouncement';
import { useLoadingState } from './useLoadingState';
import type { Product } from '../services/api';

interface UseSearchOptions {
  searchDelay?: number;
  minSearchLength?: number;
  announceResults?: boolean;
}

interface UseSearchReturn {
  searchTerm: string;
  debouncedSearchTerm: string;
  setSearchTerm: (term: string) => void;
  clearSearch: () => void;
  loading: boolean;
  message: string;
  searchResults: Product[];
  performSearch: (products: Product[], searchTerm: string) => Product[];
}

export const useSearch = (options: UseSearchOptions = {}): UseSearchReturn => {
  const {
    searchDelay = 300,
    minSearchLength = 2,
    announceResults = true
  } = options;

  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState<Product[]>([]);
  
  const debouncedSearchTerm = useDebounce(searchTerm, searchDelay);
  const { loading, setLoading, message } = useLoadingState();
  const { announce } = useAnnouncement();

  const performSearch = (products: Product[], term: string): Product[] => {
    if (!term || term.length < minSearchLength) {
      return products;
    }

    const searchLower = term.toLowerCase();
    return products.filter(product => {
      const nameMatch = product.name.toLowerCase().includes(searchLower);
      const descMatch = product.description?.toLowerCase().includes(searchLower);
      
      return nameMatch || descMatch;
    });
  };

  const clearSearch = () => {
    setSearchTerm('');
    setSearchResults([]);
    if (announceResults) {
      announce('Søket ble nullstilt');
    }
  };

  // Effect to handle search when debounced term changes
  useEffect(() => {
    if (debouncedSearchTerm && debouncedSearchTerm.length >= minSearchLength) {
      setLoading(true, 'Søker...');
      
      // Simulate search delay for better UX
      const searchTimeout = setTimeout(() => {
        setLoading(false);
        if (announceResults) {
          announce(`Søket for "${debouncedSearchTerm}" er fullført`);
        }
      }, 100);

      return () => clearTimeout(searchTimeout);
    } else if (debouncedSearchTerm.length === 0) {
      setLoading(false);
      if (announceResults) {
        announce('Viser alle produkter');
      }
    }
  }, [debouncedSearchTerm, minSearchLength, setLoading, announceResults, announce]);

  return {
    searchTerm,
    debouncedSearchTerm,
    setSearchTerm,
    clearSearch,
    loading,
    message,
    searchResults,
    performSearch
  };
};