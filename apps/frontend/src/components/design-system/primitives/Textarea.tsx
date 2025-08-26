import React from 'react';

export interface TextareaProps extends Omit<React.TextareaHTMLAttributes<HTMLTextAreaElement>, 'size'> {
  label?: string;
  helperText?: string;
  error?: string;
  success?: string;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'default' | 'filled' | 'outlined';
  resize?: 'none' | 'vertical' | 'horizontal' | 'both';
  fullWidth?: boolean;
  autoResize?: boolean;
}

const TextareaSizes = {
  sm: {
    textarea: 'px-3 py-2 text-sm min-h-[80px]',
    minHeight: 'min-h-[80px]',
  },
  md: {
    textarea: 'px-4 py-3 text-base min-h-[100px]',
    minHeight: 'min-h-[100px]',
  },
  lg: {
    textarea: 'px-6 py-4 text-lg min-h-[120px]',
    minHeight: 'min-h-[120px]',
  },
} as const;

const TextareaVariants = {
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

const ResizeClasses = {
  none: 'resize-none',
  vertical: 'resize-y',
  horizontal: 'resize-x',
  both: 'resize',
} as const;

export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({
    label,
    helperText,
    error,
    success,
    size = 'md',
    variant = 'default',
    resize = 'vertical',
    fullWidth = false,
    autoResize = false,
    disabled,
    required,
    className = '',
    onChange,
    ...props
  }, ref) => {
    const hasError = !!error;
    const hasSuccess = !!success;
    
    const sizeStyles = TextareaSizes[size];
    const variantStyles = TextareaVariants[variant];

    let stateStyles = variantStyles.base + ' ' + variantStyles.focus;
    if (hasError) {
      stateStyles = variantStyles.error;
    } else if (hasSuccess) {
      stateStyles = variantStyles.success;
    } else if (disabled) {
      stateStyles = variantStyles.disabled;
    }

    const textareaClasses = [
      'w-full rounded-2xl transition-all duration-200',
      'placeholder:text-charcoal/50',
      'focus:outline-none',
      sizeStyles.textarea,
      stateStyles,
      ResizeClasses[resize],
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

    // Auto-resize handler
    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      if (autoResize) {
        const target = e.target;
        target.style.height = 'auto';
        target.style.height = `${target.scrollHeight}px`;
      }
      
      if (onChange) {
        onChange(e);
      }
    };

    return (
      <div className={wrapperClasses}>
        {label && (
          <label className="block text-sm font-medium text-charcoal mb-2">
            {label}
            {required && <span className="text-red-500 ml-1" aria-label="required">*</span>}
          </label>
        )}
        
        <textarea
          ref={ref}
          disabled={disabled}
          required={required}
          className={textareaClasses}
          aria-invalid={hasError}
          aria-describedby={messageText ? `${props.id || 'textarea'}-message` : undefined}
          onChange={handleChange}
          {...props}
        />

        {messageText && (
          <p
            id={`${props.id || 'textarea'}-message`}
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

Textarea.displayName = 'Textarea';

export default Textarea;