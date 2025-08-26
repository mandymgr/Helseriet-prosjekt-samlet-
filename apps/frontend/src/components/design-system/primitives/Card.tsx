import React from 'react';

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'elevated' | 'outlined' | 'glass' | 'organic';
  padding?: 'none' | 'sm' | 'md' | 'lg' | 'xl';
  hover?: boolean;
  interactive?: boolean;
  children: React.ReactNode;
}

const CardVariants = {
  default: {
    base: 'bg-white border border-sage-100',
    shadow: 'shadow-minimal',
    hover: 'hover:shadow-hover',
  },
  elevated: {
    base: 'bg-white border-0',
    shadow: 'shadow-lg',
    hover: 'hover:shadow-xl',
  },
  outlined: {
    base: 'bg-white border-2 border-sage-200',
    shadow: 'shadow-none',
    hover: 'hover:border-sage-300 hover:shadow-sm',
  },
  glass: {
    base: 'backdrop-blur-xl bg-warm_white/80 border border-white/30',
    shadow: 'shadow-lg',
    hover: 'hover:bg-warm_white/90',
  },
  organic: {
    base: 'bg-white border border-sage-100',
    shadow: 'shadow-minimal',
    hover: 'hover:shadow-hover',
  },
} as const;

const CardPadding = {
  none: '',
  sm: 'p-4',
  md: 'p-6', 
  lg: 'p-8',
  xl: 'p-12',
} as const;

export const Card = React.forwardRef<HTMLDivElement | HTMLButtonElement, CardProps>(
  ({
    variant = 'default',
    padding = 'md',
    hover = false,
    interactive = false,
    className = '',
    children,
    ...props
  }, ref) => {
    const variantStyles = CardVariants[variant];
    const paddingStyles = CardPadding[padding];
    
    const baseClasses = 'relative transition-all duration-300';
    
    const borderRadius = variant === 'organic' 
      ? 'rounded-[32px_8px_32px_8px]' 
      : 'rounded-2xl';
    
    const interactiveClasses = interactive 
      ? 'cursor-pointer focus:outline-none focus:ring-2 focus:ring-sage-500/20 focus:ring-offset-2'
      : '';
    
    const hoverClasses = (hover || interactive) ? variantStyles.hover : '';

    const classes = [
      baseClasses,
      variantStyles.base,
      variantStyles.shadow,
      borderRadius,
      paddingStyles,
      interactiveClasses,
      hoverClasses,
      className,
    ].filter(Boolean).join(' ');

    if (interactive) {
      return (
        <button
          ref={ref as React.Ref<HTMLButtonElement>}
          className={classes}
          type="button"
        >
          {children}
        </button>
      );
    }

    return (
      <div
        ref={ref as React.Ref<HTMLDivElement>}
        className={classes}
        {...props}
      >
        {children}
      </div>
    );
  }
);

Card.displayName = 'Card';

// Compound components for common card patterns
export const CardHeader: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({
  className = '',
  children,
  ...props
}) => (
  <div
    className={`pb-4 border-b border-sage-100 ${className}`}
    {...props}
  >
    {children}
  </div>
);

export const CardBody: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({
  className = '',
  children,
  ...props
}) => (
  <div
    className={`py-4 ${className}`}
    {...props}
  >
    {children}
  </div>
);

export const CardFooter: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({
  className = '',
  children,
  ...props
}) => (
  <div
    className={`pt-4 border-t border-sage-100 ${className}`}
    {...props}
  >
    {children}
  </div>
);

export const CardTitle: React.FC<React.HTMLAttributes<HTMLHeadingElement> & {
  level?: 1 | 2 | 3 | 4 | 5 | 6;
}> = ({
  level = 3,
  className = '',
  children,
  ...props
}) => {
  const Component = `h${level}` as 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
  const sizeClasses = {
    1: 'text-3xl',
    2: 'text-2xl', 
    3: 'text-xl',
    4: 'text-lg',
    5: 'text-base',
    6: 'text-sm',
  };
  
  return (
    <Component
      className={`font-light text-charcoal ${sizeClasses[level]} ${className}`}
      style={{ fontFamily: 'ui-serif, Georgia, Cambria, serif' }}
      {...props}
    >
      {children}
    </Component>
  );
};

export const CardDescription: React.FC<React.HTMLAttributes<HTMLParagraphElement>> = ({
  className = '',
  children,
  ...props
}) => (
  <p
    className={`text-charcoal/70 leading-relaxed ${className}`}
    {...props}
  >
    {children}
  </p>
);

// Specialized card components
export const ProductCard: React.FC<{
  image?: string;
  title: string;
  description?: string;
  price?: string;
  action?: React.ReactNode;
  className?: string;
}> = ({
  image,
  title,
  description,
  price,
  action,
  className = '',
}) => (
  <Card variant="organic" hover interactive className={className}>
    {image && (
      <div className="aspect-square mb-4 overflow-hidden rounded-xl">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
        />
      </div>
    )}
    <CardTitle level={4} className="mb-2">{title}</CardTitle>
    {description && (
      <CardDescription className="mb-3 text-sm">{description}</CardDescription>
    )}
    {price && (
      <div className="text-sage-600 font-medium text-lg mb-4">{price}</div>
    )}
    {action}
  </Card>
);

export default Card;