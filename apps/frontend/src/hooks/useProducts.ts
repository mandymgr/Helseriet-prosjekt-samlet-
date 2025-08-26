import { useState, useEffect } from 'react';
import { productService } from '../services/api';
import type { Product } from '../services/api';

interface UseProductsOptions {
  initialFilters?: {
    category?: string;
    featured?: boolean;
    limit?: number;
    offset?: number;
    isBundle?: boolean;
  };
  autoFetch?: boolean;
}

interface UseProductsReturn {
  products: Product[];
  loading: boolean;
  error: string | null;
  fetchProducts: () => Promise<void>;
  refetch: () => Promise<void>;
}

export const useProducts = (options: UseProductsOptions = {}): UseProductsReturn => {
  const { initialFilters = {}, autoFetch = true } = options;
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await productService.getAll(initialFilters);
      
      if (response.success && response.data) {
        // Handle different response formats
        const apiProducts = Array.isArray(response.data) 
          ? response.data 
          : ((response.data as any).products || []);
        
        setProducts(apiProducts);
      } else {
        setError('Kunne ikke laste produkter');
      }
    } catch (err: any) {
      console.error('Error fetching products:', err);
      
      // Handle different error types
      if (err.response?.data?.message) {
        setError(err.response.data.message);
      } else if (err.message) {
        setError('Kan ikke koble til serveren. Sjekk at backend kjører.');
      } else {
        setError('En uventet feil oppstod ved lasting av produkter');
      }
    } finally {
      setLoading(false);
    }
  };

  const refetch = async () => {
    await fetchProducts();
  };

  useEffect(() => {
    if (autoFetch) {
      fetchProducts();
    }
  }, [autoFetch]);

  return {
    products,
    loading,
    error,
    fetchProducts,
    refetch
  };
};