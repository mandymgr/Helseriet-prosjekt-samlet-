import React from 'react';

interface SkeletonProps {
  className?: string;
  variant?: 'text' | 'circular' | 'rectangular';
  width?: string;
  height?: string;
}

const Skeleton: React.FC<SkeletonProps> = ({ 
  className = '', 
  variant = 'text', 
  width, 
  height 
}) => {
  const baseClasses = "animate-pulse bg-gradient-to-r from-stone_light/50 via-stone/30 to-stone_light/50 bg-[length:200%_100%] animate-[shimmer_2s_ease-in-out_infinite]";
  
  let variantClasses = '';
  switch (variant) {
    case 'circular':
      variantClasses = 'rounded-full';
      break;
    case 'rectangular':
      variantClasses = 'rounded-xl';
      break;
    case 'text':
      variantClasses = 'rounded-md';
      break;
  }

  const style = {
    width: width || undefined,
    height: height || undefined,
  };

  return (
    <div 
      className={`${baseClasses} ${variantClasses} ${className}`}
      style={style}
      aria-hidden="true"
    />
  );
};

// Product Card Skeleton
export const ProductCardSkeleton: React.FC = () => {
  return (
    <div className="bg-white minimal-shadow organic-border card-inner">
      {/* Icon placeholder */}
      <div className="text-center mb-6">
        <Skeleton 
          variant="circular" 
          width="80px" 
          height="80px" 
          className="mx-auto"
        />
      </div>
      
      {/* Title */}
      <Skeleton 
        variant="text" 
        className="h-6 mb-2"
      />
      
      {/* Subtitle */}
      <Skeleton 
        variant="text" 
        width="60%" 
        className="h-4 mb-4 mx-auto"
      />
      
      {/* Rating stars */}
      <div className="flex justify-center gap-1 mb-6">
        {[...Array(5)].map((_, i) => (
          <Skeleton 
            key={i}
            variant="text" 
            width="16px" 
            height="16px"
          />
        ))}
      </div>
      
      {/* Price */}
      <Skeleton 
        variant="text" 
        width="40%" 
        className="h-8 mb-8 mx-auto"
      />
      
      {/* Button */}
      <Skeleton 
        variant="rectangular" 
        className="h-12 w-full rounded-full"
      />
    </div>
  );
};

// Featured Product Skeleton  
export const FeaturedProductSkeleton: React.FC = () => {
  return (
    <div className="bg-white minimal-shadow organic-border card-inner">
      <div className="grid grid-cols-1 lg:grid-cols-2 card-gap items-center h-full">
        {/* Image side */}
        <div className="order-2 lg:order-1 flex justify-center">
          <Skeleton 
            variant="rectangular"
            width="300px"
            height="300px"
          />
        </div>
        
        {/* Content side */}
        <div className="order-1 lg:order-2">
          {/* Title */}
          <Skeleton className="h-8 mb-3" />
          <Skeleton width="40%" className="h-4 mb-4" />
          
          {/* Rating */}
          <div className="flex gap-2 mb-6">
            <div className="flex gap-1">
              {[...Array(5)].map((_, i) => (
                <Skeleton key={i} width="20px" height="20px" />
              ))}
            </div>
            <Skeleton width="100px" className="h-4" />
          </div>
          
          {/* Description */}
          <div className="space-y-2 mb-8">
            <Skeleton className="h-4" />
            <Skeleton className="h-4" />
            <Skeleton width="80%" className="h-4" />
          </div>
          
          {/* Price */}
          <Skeleton width="120px" className="h-10 mb-8" />
          
          {/* Buttons */}
          <div className="flex gap-4">
            <Skeleton className="h-12 flex-1 rounded-full" />
            <Skeleton width="100px" className="h-12 rounded-full" />
          </div>
        </div>
      </div>
    </div>
  );
};

// Category Card Skeleton
export const CategoryCardSkeleton: React.FC = () => {
  return (
    <div className="bg-white minimal-shadow organic-border card-inner hover-float transition-all duration-250 h-full">
      <div className="text-center h-full flex flex-col">
        {/* Icon */}
        <div className="mb-8">
          <Skeleton 
            variant="rectangular"
            width="96px"
            height="96px" 
            className="mx-auto rounded-2xl"
          />
        </div>
        
        {/* Title */}
        <Skeleton className="h-7 mb-4" />
        
        {/* Description */}
        <div className="space-y-2 mb-8 flex-1">
          <Skeleton className="h-4" />
          <Skeleton className="h-4" />
          <Skeleton width="60%" className="h-4 mx-auto" />
        </div>
        
        {/* Product count */}
        <Skeleton width="80px" className="h-6 mx-auto" />
      </div>
    </div>
  );
};

export default Skeleton;