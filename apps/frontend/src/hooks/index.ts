// Data fetching hooks
export { useProducts } from './useProducts';
export { useReviews } from './useReviews';

// Filter and search hooks
export { useProductFilters } from './useProductFilters';
export { useSearch } from './useSearch';

// UI state hooks
export { useLoadingState } from './useLoadingState';
export { useAnnouncement } from './useAnnouncement';

// Utility hooks
export { useDebounce } from './useDebounce';
export { useLocalStorage } from './useLocalStorage';

// Complex page hooks
export { useProductPage } from './useProductPage';

// Export hook names for easy reference in documentation
// Note: Type exports removed due to TypeScript module resolution issues
// Type exports are internal to each hook file to avoid circular dependencies