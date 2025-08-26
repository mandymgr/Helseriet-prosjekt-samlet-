import React from 'react';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'outline' | 'danger';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  fullWidth?: boolean;
  children: React.ReactNode;
}

const ButtonVariants = {
  primary: {
    base: `
      bg-gradient-to-r from-sage-500 to-sage-600
      text-white
      hover:from-sage-600 hover:to-sage-700
      focus:ring-sage-500/20
      active:from-sage-700 active:to-sage-800
    `,
    disabled: 'opacity-50 cursor-not-allowed',
  },
  secondary: {
    base: `
      bg-stone-light
      text-charcoal
      hover:bg-stone-DEFAULT
      focus:ring-sage-500/20
      active:bg-stone-dark
    `,
    disabled: 'opacity-50 cursor-not-allowed',
  },
  ghost: {
    base: `
      bg-transparent
      text-charcoal
      hover:bg-sage-50
      focus:ring-sage-500/20
      active:bg-sage-100
    `,
    disabled: 'opacity-50 cursor-not-allowed',
  },
  outline: {
    base: `
      bg-transparent
      text-sage-600
      border border-sage-200
      hover:bg-sage-50 hover:border-sage-300
      focus:ring-sage-500/20
      active:bg-sage-100
    `,
    disabled: 'opacity-50 cursor-not-allowed',
  },
  danger: {
    base: `
      bg-gradient-to-r from-red-500 to-red-600
      text-white
      hover:from-red-600 hover:to-red-700
      focus:ring-red-500/20
      active:from-red-700 active:to-red-800
    `,
    disabled: 'opacity-50 cursor-not-allowed',
  },
} as const;

const ButtonSizes = {
  sm: {
    padding: 'px-3 py-2',
    text: 'text-sm',
    minHeight: 'min-h-[32px]',
    gap: 'gap-2',
  },
  md: {
    padding: 'px-4 py-3',
    text: 'text-base',
    minHeight: 'min-h-[40px]',
    gap: 'gap-2',
  },
  lg: {
    padding: 'px-6 py-4',
    text: 'text-lg',
    minHeight: 'min-h-[48px]',
    gap: 'gap-3',
  },
  xl: {
    padding: 'px-8 py-5',
    text: 'text-xl',
    minHeight: 'min-h-[56px]',
    gap: 'gap-3',
  },
} as const;

const LoadingSpinner: React.FC<{ size: 'sm' | 'md' | 'lg' | 'xl' }> = ({ size }) => {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-5 h-5',
    lg: 'w-6 h-6',
    xl: 'w-7 h-7',
  };

  return (
    <svg
      className={`${sizeClasses[size]} animate-spin`}
      fill="none"
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <circle
        className="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="4"
      />
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
      />
    </svg>
  );
};

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({
    variant = 'primary',
    size = 'md',
    isLoading = false,
    leftIcon,
    rightIcon,
    fullWidth = false,
    disabled,
    className = '',
    children,
    type = 'button',
    ...props
  }, ref) => {
    const variantStyles = ButtonVariants[variant];
    const sizeStyles = ButtonSizes[size];
    
    const baseClasses = `
      inline-flex items-center justify-center
      font-medium
      rounded-full
      transition-all duration-200
      focus:outline-none focus:ring-2 focus:ring-offset-2
      disabled:opacity-50 disabled:cursor-not-allowed
      relative
    `;

    const classes = [
      baseClasses,
      variantStyles.base,
      sizeStyles.padding,
      sizeStyles.text,
      sizeStyles.minHeight,
      sizeStyles.gap,
      fullWidth ? 'w-full' : 'w-auto',
      (disabled || isLoading) ? variantStyles.disabled : '',
      className,
    ].filter(Boolean).join(' ');

    return (
      <button
        ref={ref}
        type={type}
        disabled={disabled || isLoading}
        className={classes}
        {...props}
      >
        {isLoading ? (
          <>
            <LoadingSpinner size={size} />
            <span className="opacity-70">{children}</span>
          </>
        ) : (
          <>
            {leftIcon && <span className="flex-shrink-0">{leftIcon}</span>}
            <span>{children}</span>
            {rightIcon && <span className="flex-shrink-0">{rightIcon}</span>}
          </>
        )}
      </button>
    );
  }
);

Button.displayName = 'Button';

export default Button;