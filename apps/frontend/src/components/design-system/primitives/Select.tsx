import React from 'react';

export interface SelectProps extends Omit<React.SelectHTMLAttributes<HTMLSelectElement>, 'size'> {
  label?: string;
  helperText?: string;
  error?: string;
  success?: string;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'default' | 'filled' | 'outlined';
  placeholder?: string;
  options: Array<{ value: string; label: string; disabled?: boolean }>;
  fullWidth?: boolean;
}

const SelectSizes = {
  sm: {
    select: 'px-3 py-2 text-sm pr-8',
    height: 'min-h-[36px]',
    icon: 'w-4 h-4',
  },
  md: {
    select: 'px-4 py-3 text-base pr-10',
    height: 'min-h-[44px]',
    icon: 'w-5 h-5',
  },
  lg: {
    select: 'px-6 py-4 text-lg pr-12',
    height: 'min-h-[52px]',
    icon: 'w-6 h-6',
  },
} as const;

const SelectVariants = {
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

const ChevronIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg
    className={className}
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
    aria-hidden="true"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M19 9l-7 7-7-7"
    />
  </svg>
);

export const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  ({
    label,
    helperText,
    error,
    success,
    size = 'md',
    variant = 'default',
    placeholder,
    options,
    fullWidth = false,
    disabled,
    required,
    className = '',
    ...props
  }, ref) => {
    const hasError = !!error;
    const hasSuccess = !!success;
    
    const sizeStyles = SelectSizes[size];
    const variantStyles = SelectVariants[variant];

    let stateStyles = variantStyles.base + ' ' + variantStyles.focus;
    if (hasError) {
      stateStyles = variantStyles.error;
    } else if (hasSuccess) {
      stateStyles = variantStyles.success;
    } else if (disabled) {
      stateStyles = variantStyles.disabled;
    }

    const selectClasses = [
      'w-full rounded-2xl transition-all duration-200 appearance-none',
      'focus:outline-none',
      sizeStyles.select,
      sizeStyles.height,
      stateStyles,
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
          <select
            ref={ref}
            disabled={disabled}
            required={required}
            className={selectClasses}
            aria-invalid={hasError}
            aria-describedby={messageText ? `${props.id || 'select'}-message` : undefined}
            {...props}
          >
            {placeholder && (
              <option value="" disabled>
                {placeholder}
              </option>
            )}
            {options.map((option) => (
              <option
                key={option.value}
                value={option.value}
                disabled={option.disabled}
              >
                {option.label}
              </option>
            ))}
          </select>
          
          <div className="absolute right-4 top-1/2 -translate-y-1/2 text-charcoal/50 pointer-events-none">
            <ChevronIcon className={sizeStyles.icon} />
          </div>
        </div>

        {messageText && (
          <p
            id={`${props.id || 'select'}-message`}
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

Select.displayName = 'Select';

export default Select;