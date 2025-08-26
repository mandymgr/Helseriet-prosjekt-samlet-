import React from 'react';

export interface InputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> {
  label?: string;
  helperText?: string;
  error?: string;
  success?: string;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'default' | 'filled' | 'outlined';
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  isLoading?: boolean;
  fullWidth?: boolean;
}

const InputSizes = {
  sm: {
    input: 'px-3 py-2 text-sm',
    height: 'min-h-[36px]',
    icon: 'w-4 h-4',
    iconPadding: 'pl-9',
  },
  md: {
    input: 'px-4 py-3 text-base',
    height: 'min-h-[44px]',
    icon: 'w-5 h-5',
    iconPadding: 'pl-11',
  },
  lg: {
    input: 'px-6 py-4 text-lg',
    height: 'min-h-[52px]',
    icon: 'w-6 h-6',
    iconPadding: 'pl-14',
  },
} as const;

const InputVariants = {
  default: {
    base: 'border border-sage-200 bg-white',
    focus: 'focus:border-sage-500 focus:ring-2 focus:ring-sage-500/20',
    error: 'border-red-300 focus:border-red-500 focus:ring-red-500/20',
    success: 'border-green-300 focus:border-green-500 focus:ring-green-500/20',
    disabled: 'bg-stone-50 border-stone-200 cursor-not-allowed',
  },
  filled: {
    base: 'border border-transparent bg-stone-50',
    focus: 'focus:bg-white focus:border-sage-200 focus:ring-2 focus:ring-sage-500/20',
    error: 'bg-red-50 border-red-200 focus:border-red-500 focus:ring-red-500/20',
    success: 'bg-green-50 border-green-200 focus:border-green-500 focus:ring-green-500/20',
    disabled: 'bg-stone-100 border-stone-200 cursor-not-allowed',
  },
  outlined: {
    base: 'border-2 border-sage-200 bg-transparent',
    focus: 'focus:border-sage-500 focus:ring-2 focus:ring-sage-500/10',
    error: 'border-red-300 focus:border-red-500 focus:ring-red-500/10',
    success: 'border-green-300 focus:border-green-500 focus:ring-green-500/10',
    disabled: 'bg-stone-25 border-stone-200 cursor-not-allowed',
  },
} as const;

const LoadingSpinner: React.FC<{ className?: string }> = ({ className }) => (
  <svg
    className={`animate-spin ${className}`}
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

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({
    label,
    helperText,
    error,
    success,
    size = 'md',
    variant = 'default',
    leftIcon,
    rightIcon,
    isLoading = false,
    fullWidth = false,
    disabled,
    required,
    className = '',
    ...props
  }, ref) => {
    const hasError = !!error;
    const hasSuccess = !!success;
    
    const sizeStyles = InputSizes[size];
    const variantStyles = InputVariants[variant];

    let stateStyles = variantStyles.base + ' ' + variantStyles.focus;
    if (hasError) {
      stateStyles = variantStyles.error;
    } else if (hasSuccess) {
      stateStyles = variantStyles.success;
    } else if (disabled) {
      stateStyles = variantStyles.disabled;
    }

    const inputClasses = [
      'w-full rounded-2xl transition-all duration-200',
      'placeholder:text-charcoal/50',
      'focus:outline-none',
      sizeStyles.input,
      sizeStyles.height,
      stateStyles,
      leftIcon ? sizeStyles.iconPadding : '',
      rightIcon || isLoading ? 'pr-11' : '',
      className,
    ].filter(Boolean).join(' ');

    const wrapperClasses = [
      'relative',
      fullWidth ? 'w-full' : 'w-auto',
    ].filter(Boolean).join(' ');

    const messageText = error || success || helperText;
    const messageType = hasError ? 'error' : hasSuccess ? 'success' : 'helper';
    
    const messageClasses = {
      error: 'text-red-600',
      success: 'text-green-600', 
      helper: 'text-charcoal/60',
    };

    return (
      <div className={wrapperClasses}>
        {label && (
          <label className="block text-sm font-medium text-charcoal mb-2">
            {label}
            {required && <span className="text-red-500 ml-1" aria-label="required">*</span>}
          </label>
        )}
        
        <div className="relative">
          {leftIcon && (
            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-charcoal/50">
              <div className={sizeStyles.icon}>{leftIcon}</div>
            </div>
          )}
          
          <input
            ref={ref}
            disabled={disabled}
            required={required}
            className={inputClasses}
            aria-invalid={hasError}
            aria-describedby={messageText ? `${props.id || 'input'}-message` : undefined}
            {...props}
          />
          
          {(rightIcon || isLoading) && (
            <div className="absolute right-4 top-1/2 -translate-y-1/2 text-charcoal/50">
              {isLoading ? (
                <LoadingSpinner className={sizeStyles.icon} />
              ) : (
                <div className={sizeStyles.icon}>{rightIcon}</div>
              )}
            </div>
          )}
        </div>

        {messageText && (
          <p
            id={`${props.id || 'input'}-message`}
            className={`mt-2 text-sm ${messageClasses[messageType]}`}
            role={hasError ? 'alert' : undefined}
          >
            {messageText}
          </p>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';

export default Input;