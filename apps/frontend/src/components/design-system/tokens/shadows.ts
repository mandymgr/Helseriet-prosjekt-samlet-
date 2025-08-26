export const shadows = {
  none: 'none',
  minimal: '0 2px 20px rgba(44, 42, 38, 0.08)',
  sm: '0 4px 12px rgba(44, 42, 38, 0.15)',
  md: '0 8px 25px rgba(156, 175, 136, 0.4)',
  lg: '0 8px 40px rgba(44, 42, 38, 0.12)',
  xl: '0 25px 50px rgba(0, 0, 0, 0.15), 0 12px 24px rgba(0, 0, 0, 0.1)',
  
  // Context-specific shadows
  card: '0 2px 20px rgba(44, 42, 38, 0.08)',
  hover: '0 4px 12px rgba(44, 42, 38, 0.15)',
  button: '0 8px 25px rgba(156, 175, 136, 0.4)',
  cinema: '0 25px 50px rgba(0, 0, 0, 0.15), 0 12px 24px rgba(0, 0, 0, 0.1)',
  
  // Focus states
  focus: {
    sage: '0 0 0 3px rgba(156, 175, 136, 0.2)',
    error: '0 0 0 3px rgba(248, 113, 113, 0.1)',
    success: '0 0 0 3px rgba(34, 197, 94, 0.2)',
  },
} as const;

export const backdropBlur = {
  none: 'none',
  sm: 'blur(4px)',
  DEFAULT: 'blur(8px)',
  md: 'blur(12px)',
  lg: 'blur(16px)',
  xl: 'blur(24px)',
  '2xl': 'blur(40px)',
} as const;

export type ShadowKeys = keyof typeof shadows;
export type BlurKeys = keyof typeof backdropBlur;