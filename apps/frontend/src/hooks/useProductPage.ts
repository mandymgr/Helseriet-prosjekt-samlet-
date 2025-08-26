import { useState, useEffect } from 'react';
import { useProducts } from './useProducts';
import { useProductFilters } from './useProductFilters';
import { useSearch } from './useSearch';
import { useAnnouncement } from './useAnnouncement';
import { useAppActions } from '../context/AppContext';
import type { Product } from '../services/api';

interface UseProductPageOptions {
  initialFilters?: {
    category?: string;
    brand?: string;
    type?: string;
    isBundle?: boolean;
  };
  enableSearch?: boolean;
  enableFilters?: boolean;
  autoFetch?: boolean;
}

interface UseProductPageReturn {
  // Products data
  products: Product[];
  filteredProducts: Product[];
  loading: boolean;
  error: string | null;
  
  // Search functionality
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  searchLoading: boolean;
  
  // Filter functionality
  filters: any;
  updateFilter: (key: string, value: any) => void;
  resetFilters: () => void;
  resultsCount: {
    total: number;
    bundles: number;
    individual: number;
  };
  
  // UI state
  announceMessage: string;
  
  // Actions
  refetchProducts: () => Promise<void>;
  handleCategoryChange: (categoryId: string) => void;
  handleAddToCart: (productId: string) => void;
  handleFavorite: (productId: string) => void;
}

export const useProductPage = (options: UseProductPageOptions = {}): UseProductPageReturn => {
  const {
    initialFilters = {},
    enableSearch = true,
    enableFilters = true,
    autoFetch = true
  } = options;

  // Core hooks
  const { products, loading, error, refetch } = useProducts({
    initialFilters,
    autoFetch
  });
  
  const {
    filters,
    updateFilter,
    resetFilters,
    filteredAndSortedProducts,
    getResultsCount
  } = useProductFilters({
    initialFilters
  });

  const {
    searchTerm,
    setSearchTerm,
    loading: searchLoading,
    performSearch
  } = useSearch({
    announceResults: true
  });

  const { message: announceMessage, announce } = useAnnouncement();
  const { addToCart, addToFavorites, addNotification } = useAppActions();

  // State for managing filtered products
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);

  // Effect to apply filters and search when products or filters change
  useEffect(() => {
    if (!products.length) {
      setFilteredProducts([]);
      return;
    }

    let result = products;

    // Apply search if enabled and has search term
    if (enableSearch && searchTerm) {
      result = performSearch(result, searchTerm);
    }

    // Apply filters if enabled
    if (enableFilters) {
      result = filteredAndSortedProducts(result);
    }

    setFilteredProducts(result);
  }, [products, filters, searchTerm, enableSearch, enableFilters, filteredAndSortedProducts, performSearch]);

  // Get results count
  const resultsCount = getResultsCount(products);

  // Handler for category changes with loading simulation
  const handleCategoryChange = (categoryId: string) => {
    updateFilter('category', categoryId);
    announce(`Laster produkter for kategori...`);
    
    // Simulate loading for better UX
    setTimeout(() => {
      const count = filteredProducts.length;
      announce(`${count} produkter funnet`);
    }, 300);
  };

  // Handler for adding to cart
  const handleAddToCart = (productId: string) => {
    const product = products.find(p => p.id === productId);
    if (!product) return;

    try {
      // Create cart item (simplified - real implementation would handle quantities etc.)
      const cartItem = {
        id: `${productId}-${Date.now()}`,
        productId: product.id,
        quantity: 1,
        price: product.price,
        product: product
      };

      addToCart(cartItem);
      addNotification({
        type: 'success',
        message: `${product.name} ble lagt til i handlekurven`
      });
    } catch (error) {
      addNotification({
        type: 'error',
        message: 'Kunne ikke legge produktet i handlekurven'
      });
    }
  };

  // Handler for favorites
  const handleFavorite = (productId: string) => {
    const product = products.find(p => p.id === productId);
    if (!product) return;

    try {
      // This would need to check current favorites state
      // For now, just add (real implementation would toggle)
      addToFavorites(productId);
      addNotification({
        type: 'success',
        message: `${product.name} ble lagt til i favoritter`
      });
    } catch (error) {
      addNotification({
        type: 'error',
        message: 'Kunne ikke legge til favoritter'
      });
    }
  };

  return {
    // Products data
    products,
    filteredProducts,
    loading,
    error,
    
    // Search functionality
    searchTerm,
    setSearchTerm,
    searchLoading,
    
    // Filter functionality
    filters,
    updateFilter: (key: string, value: any) => updateFilter(key as any, value),
    resetFilters,
    resultsCount,
    
    // UI state
    announceMessage,
    
    // Actions
    refetchProducts: refetch,
    handleCategoryChange,
    handleAddToCart,
    handleFavorite
  };
};