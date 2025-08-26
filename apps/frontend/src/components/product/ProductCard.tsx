import React from 'react';
import { Link } from 'react-router';
import type { Product, ProductImage } from '../../services/api';
import { CompactRating } from './RatingDisplay';

interface ProductCardProps {
  product: Product;
  showFullName?: boolean;
  showDescription?: boolean;
  showRating?: boolean;
  showBadges?: boolean;
  orientation?: 'vertical' | 'horizontal';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  onAddToCart?: (productId: string) => void;
  onFavorite?: (productId: string) => void;
  isFavorite?: boolean;
  animationDelay?: number;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  showFullName = true,
  showDescription = false,
  showRating = true,
  showBadges = true,
  orientation = 'vertical',
  size = 'md',
  className = '',
  onAddToCart,
  onFavorite,
  isFavorite = false,
  animationDelay = 0
}) => {
  // Get primary product image
  const getPrimaryImage = (): ProductImage | null => {
    if (!product.images || product.images.length === 0) return null;
    
    // Find front image with lowest sort order
    return product.images.find(img => img.sortOrder === 0) || product.images[0];
  };

  // Clean product name for display
  const getDisplayName = (): string => {
    if (!showFullName) {
      return product.name
        .replace(/^(SYNERGY|ORGANIXX|SHAKTI) - /, '')
        .replace(/\.(webp|jpg|jpeg|png)$/i, '')
        .replace(/_/g, ' ');
    }
    return product.name;
  };

  // Get brand from product name
  const getBrand = (): string | null => {
    if (product.name.includes('SYNERGY')) return 'PURE SYNERGY';
    if (product.name.includes('ORGANIXX')) return 'ORGANIXX';
    if (product.name.includes('SHAKTI')) return 'SHAKTI';
    return null;
  };

  // Calculate savings
  const getSavings = () => {
    if (!product.comparePrice) return null;
    
    const savings = product.comparePrice - product.price;
    const percentage = Math.round((savings / product.comparePrice) * 100);
    
    return { savings, percentage };
  };


  const primaryImage = getPrimaryImage();
  const displayName = getDisplayName();
  const brand = getBrand();
  const savings = getSavings();

  const sizeClasses = {
    sm: 'text-sm',
    md: 'text-base',
    lg: 'text-lg'
  };

  const cardClasses = orientation === 'horizontal' 
    ? 'flex flex-row' 
    : 'flex flex-col';

  return (
    <div 
      className={`bg-white minimal-shadow organic-border subtle-hover relative overflow-hidden ${cardClasses} ${className}`}
      style={{ animationDelay: `${animationDelay}s` }}
    >
      {/* Badges */}
      {showBadges && (
        <div className="absolute top-6 right-6 z-10 flex flex-col gap-2">
          {product.isBundle && (
            <span className="text-xs font-medium px-2 py-1 rounded-full bg-terracotta text-white shadow-lg">
              PAKKE
            </span>
          )}
          {savings && (
            <span className="text-xs font-medium px-2 py-1 rounded-full bg-sage text-white shadow-lg">
              -{savings.percentage}%
            </span>
          )}
          {product.isFeatured && (
            <span className="text-xs font-medium px-2 py-1 rounded-full bg-charcoal text-white shadow-lg">
              ANBEFALT
            </span>
          )}
        </div>
      )}

      {/* Favorite Button */}
      {onFavorite && (
        <button
          onClick={(e) => {
            e.preventDefault();
            onFavorite(product.id);
          }}
          className="absolute top-6 left-6 z-10 w-8 h-8 rounded-full bg-white/80 backdrop-blur-sm flex items-center justify-center hover:bg-white transition-colors"
          aria-label={isFavorite ? 'Fjern fra favoritter' : 'Legg til favoritter'}
        >
          <svg 
            className={`w-4 h-4 ${isFavorite ? 'text-red-500 fill-current' : 'text-charcoal/60'}`} 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth="2" 
              d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" 
            />
          </svg>
        </button>
      )}

      <Link 
        to={`/produkt/${product.id}`}
        className={`block ${orientation === 'horizontal' ? 'flex flex-row' : ''}`}
      >
        {/* Product Image */}
        <div className={`bg-cream p-6 relative overflow-hidden ${
          orientation === 'horizontal' ? 'w-32 h-32 flex-shrink-0' : 'aspect-square'
        }`}>
          {primaryImage ? (
            <img
              src={primaryImage.url}
              alt={primaryImage.altText || displayName}
              className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300"
              loading="lazy"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <svg className="w-12 h-12 text-sage/40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
              </svg>
            </div>
          )}
        </div>

        {/* Product Info */}
        <div className="card-inner flex-1">
          {brand && (
            <div className="mb-2">
              <span className="text-xs font-medium text-sage bg-sage/10 px-2 py-1 rounded-full">
                {brand}
              </span>
            </div>
          )}
          
          <h3 className={`font-light text-charcoal mb-2 group-hover:text-sage_dark transition-colors line-clamp-2 ${sizeClasses[size]}`}>
            {displayName}
          </h3>

          {showDescription && product.shortDescription && (
            <p className="text-sm text-charcoal/60 mb-3 line-clamp-2">
              {product.shortDescription}
            </p>
          )}

          {showRating && (
            <div className="mb-3">
              <CompactRating 
                rating={product.avgRating || 0}
                reviewCount={product.reviewCount || 0}
              />
            </div>
          )}

          {/* Pricing */}
          <div className="flex items-center gap-2 mb-4">
            <span className={`font-medium text-charcoal ${
              size === 'lg' ? 'text-2xl' : size === 'md' ? 'text-xl' : 'text-lg'
            }`}>
              {product.price} kr
            </span>
            {product.comparePrice && (
              <span className="text-sm text-charcoal/50 line-through">
                {product.comparePrice} kr
              </span>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex gap-2">
            <button 
              className="btn-ghost flex-1 text-sm font-medium"
              onClick={(e) => {
                e.preventDefault();
                // Navigate to product page - handled by Link wrapper
              }}
            >
              {product.isBundle ? 'Se pakke' : 'Se produkt'}
            </button>
            
            {onAddToCart && (
              <button
                onClick={(e) => {
                  e.preventDefault();
                  onAddToCart(product.id);
                }}
                className="bg-sage text-white px-4 py-2 organic-border hover:bg-sage/90 transition-colors text-sm font-medium"
                aria-label={`Legg ${displayName} i handlekurv`}
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5 5M7 13l2.5 5m6-5v6a2 2 0 11-4 0v-6m4 0V9a2 2 0 10-4 0v4.01" />
                </svg>
              </button>
            )}
          </div>
        </div>
      </Link>
    </div>
  );
};