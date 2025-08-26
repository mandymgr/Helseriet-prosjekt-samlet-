import { useState } from 'react';
import type { Product } from '../services/api';

interface FilterState {
  category: string;
  brand: string;
  type: string;
  healthArea: string;
  priceRange: string;
  search: string;
  sortBy: string;
}

interface UseProductFiltersOptions {
  initialFilters?: Partial<FilterState>;
}

interface UseProductFiltersReturn {
  filters: FilterState;
  updateFilter: <K extends keyof FilterState>(key: K, value: FilterState[K]) => void;
  resetFilters: () => void;
  applyFilters: (products: Product[]) => Product[];
  applySorting: (products: Product[]) => Product[];
  filteredAndSortedProducts: (products: Product[]) => Product[];
  getResultsCount: (products: Product[]) => {
    total: number;
    bundles: number;
    individual: number;
  };
}

const defaultFilters: FilterState = {
  category: 'all',
  brand: 'all',
  type: 'all',
  healthArea: 'all',
  priceRange: 'all',
  search: '',
  sortBy: 'name'
};

export const useProductFilters = (options: UseProductFiltersOptions = {}): UseProductFiltersReturn => {
  const { initialFilters = {} } = options;
  
  const [filters, setFilters] = useState<FilterState>({
    ...defaultFilters,
    ...initialFilters
  });

  const updateFilter = <K extends keyof FilterState>(key: K, value: FilterState[K]) => {
    setFilters(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const resetFilters = () => {
    setFilters({ ...defaultFilters, ...initialFilters });
  };

  // Helper function to determine health area from product
  const getHealthArea = (product: Product): string => {
    const name = product.name.toLowerCase();
    const description = (product.description || '').toLowerCase();
    
    if (name.includes('immune') || name.includes('rapid rescue') || description.includes('immunforsvar')) return 'immune';
    if (name.includes('mood') || name.includes('stress') || name.includes('humør') || description.includes('stress')) return 'mood-stress';
    if (name.includes('brain') || name.includes('choline') || name.includes('hjerne') || name.includes('mental')) return 'brain';
    if (name.includes('heart') || name.includes('hjerte')) return 'heart';
    if (name.includes('eye') || name.includes('øye')) return 'eye';
    if (name.includes('bone') || name.includes('bein')) return 'bone';
    if (name.includes('cell protector') || name.includes('anti-aging') || name.includes('levetid')) return 'anti-aging';
    if (name.includes('superfood') || name.includes('algae') || name.includes('grass') || name.includes('berry')) return 'superfood';
    if (name.includes('vitamin') || name.includes('multivitamin') || name.includes('vita-min')) return 'vitamins';
    if (name.includes('astaxanthin') || name.includes('hud') || name.includes('glow')) return 'skin';
    if (name.includes('women') || name.includes('men') || name.includes('kvinner') || name.includes('menn') || name.includes('overgang')) return 'gender-specific';
    return 'other';
  };

  // Helper function to get price category
  const getPriceCategory = (price: number): string => {
    if (price < 500) return 'under-500';
    if (price < 1000) return '500-1000';
    return 'over-1000';
  };

  // Apply filters to product list
  const applyFilters = (products: Product[]): Product[] => {
    return products.filter(product => {
      // Category filter (for legacy string format)
      if (filters.category !== 'all') {
        const categoryMatch = typeof product.category === 'string' 
          ? product.category === filters.category
          : product.category?.slug === filters.category;
        if (!categoryMatch) return false;
      }

      // Brand filter
      if (filters.brand !== 'all') {
        if (filters.brand === 'synergy' && !product.name.includes('SYNERGY')) return false;
        if (filters.brand === 'organixx' && !product.name.includes('ORGANIXX')) return false;
        if (filters.brand === 'shakti' && !product.name.includes('SHAKTI')) return false;
      }

      // Type filter (bundles vs individual)
      if (filters.type === 'bundles' && !product.isBundle) return false;
      if (filters.type === 'individual' && product.isBundle) return false;

      // Health area filter
      if (filters.healthArea !== 'all' && getHealthArea(product) !== filters.healthArea) return false;

      // Price range filter
      if (filters.priceRange !== 'all' && getPriceCategory(product.price) !== filters.priceRange) return false;

      // Search filter
      if (filters.search) {
        const searchLower = filters.search.toLowerCase();
        const nameMatch = product.name.toLowerCase().includes(searchLower);
        const descMatch = product.description?.toLowerCase().includes(searchLower);
        
        if (!nameMatch && !descMatch) return false;
      }

      return true;
    });
  };

  // Apply sorting to product list
  const applySorting = (products: Product[]): Product[] => {
    return [...products].sort((a, b) => {
      switch (filters.sortBy) {
        case 'price-low':
          return a.price - b.price;
        case 'price-high':
          return b.price - a.price;
        case 'name':
          return a.name.localeCompare(b.name);
        case 'popularity':
        case 'rating':
          return (b.avgRating || 0) - (a.avgRating || 0);
        case 'featured':
        case 'newest':
        default:
          return a.name.localeCompare(b.name); // Fallback to name sorting
      }
    });
  };

  // Combined filter and sort function
  const filteredAndSortedProducts = (products: Product[]): Product[] => {
    const filtered = applyFilters(products);
    return applySorting(filtered);
  };

  // Get results count breakdown
  const getResultsCount = (products: Product[]) => {
    const filtered = applyFilters(products);
    const bundles = filtered.filter(p => p.isBundle).length;
    const individual = filtered.filter(p => !p.isBundle).length;
    
    return {
      total: filtered.length,
      bundles,
      individual
    };
  };

  return {
    filters,
    updateFilter,
    resetFilters,
    applyFilters,
    applySorting,
    filteredAndSortedProducts,
    getResultsCount
  };
};