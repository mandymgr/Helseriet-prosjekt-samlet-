export const colors = {
  // Brand Colors
  sage: {
    50: '#f4f6f2',
    100: '#e8eee3', 
    200: '#d1ddc7',
    300: '#B8C9A6', // sage_light
    400: '#9caf88',
    500: '#9CAF88', // Primary sage
    600: '#7A8F6B', // sage_dark
    700: '#617051',
    800: '#4f5b42',
    900: '#424c37',
  },

  charcoal: '#2C2A26',
  terracotta: {
    50: '#fef3e2',
    100: '#fde4b8',
    200: '#fbd08b',
    300: '#f9bc5e',
    400: '#f7a832',
    500: '#D4A574', // Primary terracotta
    600: '#b8935f',
    700: '#9c814a',
    800: '#806f35',
    900: '#645d20',
  },

  // Background/Stone colors
  stone: {
    light: '#F5F1E8',
    DEFAULT: '#E8E2D5',
    dark: '#D4C8B8',
  },

  warm_white: '#FDFCF7',

  // Semantic colors
  semantic: {
    success: {
      50: '#d1fae5',
      100: '#a7f3d0',
      500: '#10b981',
      600: '#059669',
      700: '#047857',
    },
    error: {
      50: '#fee2e2',
      100: '#fecaca',
      500: '#ef4444',
      600: '#dc2626',
      700: '#b91c1c',
    },
    warning: {
      50: '#fef3c7',
      100: '#fed7aa',
      500: '#f59e0b',
      600: '#d97706',
      700: '#b45309',
    },
    info: {
      50: '#eff6ff',
      100: '#dbeafe',
      500: '#3b82f6',
      600: '#2563eb',
      700: '#1d4ed8',
    },
  },
} as const;

export type ColorKeys = keyof typeof colors;
export type ColorValue = string | Record<string, string>;