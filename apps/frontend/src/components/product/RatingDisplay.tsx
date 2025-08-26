import React from 'react';
import { HiStar, HiOutlineStar } from 'react-icons/hi2';

interface RatingDisplayProps {
  rating: number;
  reviewCount?: number;
  size?: 'sm' | 'md' | 'lg';
  showReviewCount?: boolean;
  showRatingNumber?: boolean;
  className?: string;
  interactive?: boolean;
  onStarClick?: (rating: number) => void;
}

export const RatingDisplay: React.FC<RatingDisplayProps> = ({
  rating,
  reviewCount = 0,
  size = 'md',
  showReviewCount = true,
  showRatingNumber = false,
  className = '',
  interactive = false,
  onStarClick
}) => {
  const sizeClasses = {
    sm: 'w-3 h-3',
    md: 'w-4 h-4',
    lg: 'w-5 h-5'
  };

  const textSizeClasses = {
    sm: 'text-xs',
    md: 'text-sm',
    lg: 'text-base'
  };

  const starSize = sizeClasses[size];
  const textSize = textSizeClasses[size];

  const renderStars = () => {
    return (
      <div className="flex items-center gap-1">
        {[1, 2, 3, 4, 5].map((star) => {
          const isActive = star <= Math.round(rating);
          
          return (
            <button
              key={star}
              type="button"
              onClick={() => interactive && onStarClick && onStarClick(star)}
              disabled={!interactive}
              className={`${
                interactive 
                  ? 'hover:scale-110 transition-transform cursor-pointer focus:outline-none focus:ring-2 focus:ring-sage/50 rounded' 
                  : 'cursor-default'
              } ${isActive ? 'text-terracotta' : 'text-stone_light'}`}
              aria-label={interactive ? `Rate ${star} star${star > 1 ? 's' : ''}` : undefined}
            >
              {isActive ? (
                <HiStar className={starSize} />
              ) : (
                <HiOutlineStar className={starSize} />
              )}
            </button>
          );
        })}
      </div>
    );
  };

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      {renderStars()}
      
      {showRatingNumber && rating > 0 && (
        <span className={`font-medium text-charcoal ${textSize}`}>
          {rating.toFixed(1)}
        </span>
      )}
      
      {showReviewCount && (
        <span className={`text-charcoal/60 ${textSize}`}>
          {reviewCount > 0 ? (
            <span>({reviewCount})</span>
          ) : (
            <span className="italic">Ingen anmeldelser</span>
          )}
        </span>
      )}
    </div>
  );
};

// Compact version for use in cards and lists
interface CompactRatingProps {
  rating: number;
  reviewCount?: number;
  className?: string;
}

export const CompactRating: React.FC<CompactRatingProps> = ({
  rating,
  reviewCount = 0,
  className = ''
}) => {
  if (rating === 0 && reviewCount === 0) {
    return (
      <div className={`flex items-center gap-1 text-xs text-charcoal/50 ${className}`}>
        <div className="flex gap-1">
          {[1, 2, 3, 4, 5].map((star) => (
            <HiOutlineStar key={star} className="w-3 h-3" />
          ))}
        </div>
        <span>Ingen anmeldelser</span>
      </div>
    );
  }

  return (
    <div className={`flex items-center gap-1 ${className}`}>
      <div className="flex gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <div key={star} className={star <= Math.round(rating) ? 'text-terracotta' : 'text-stone_light'}>
            {star <= Math.round(rating) ? (
              <HiStar className="w-3 h-3" />
            ) : (
              <HiOutlineStar className="w-3 h-3" />
            )}
          </div>
        ))}
      </div>
      <span className="text-xs text-charcoal/60">
        {rating.toFixed(1)} ({reviewCount})
      </span>
    </div>
  );
};

// Minimal version showing just average rating
interface MinimalRatingProps {
  rating: number;
  className?: string;
}

export const MinimalRating: React.FC<MinimalRatingProps> = ({
  rating,
  className = ''
}) => {
  if (rating === 0) return null;

  return (
    <div className={`flex items-center gap-1 ${className}`}>
      <HiStar className="w-4 h-4 text-terracotta" />
      <span className="text-sm font-medium text-charcoal">
        {rating.toFixed(1)}
      </span>
    </div>
  );
};