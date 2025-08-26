export const typography = {
  fonts: {
    sans: '-apple-system, "SF Pro Display", Inter, "Helvetica Neue", system-ui, sans-serif',
    serif: 'ui-serif, Georgia, Cambria, serif',
  },

  sizes: {
    xs: '0.75rem',      // 12px
    sm: '0.875rem',     // 14px
    base: '1rem',       // 16px
    lg: '1.125rem',     // 18px
    xl: '1.25rem',      // 20px
    '2xl': '1.5rem',    // 24px
    '3xl': '1.875rem',  // 30px
    '4xl': '2.25rem',   // 36px
    '5xl': '3rem',      // 48px
    '6xl': '3.75rem',   // 60px
  },

  // Responsive typography
  responsive: {
    hero: 'clamp(2rem, 5vw, 4rem)',              // 32px → 64px
    h1: 'clamp(1.75rem, 4vw, 3rem)',            // 28px → 48px
    h2: 'clamp(1.5rem, 3vw, 2.25rem)',          // 24px → 36px
    h3: 'clamp(1.25rem, 2.5vw, 1.875rem)',      // 20px → 30px
    body: 'clamp(1rem, 1.5vw, 1.125rem)',       // 16px → 18px
    small: 'clamp(0.875rem, 1.25vw, 1rem)',     // 14px → 16px
  },

  weights: {
    thin: 100,
    extralight: 200,
    light: 300,
    normal: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
  },

  lineHeight: {
    tight: 1.1,
    snug: 1.2,
    normal: 1.5,
    relaxed: 1.6,
    loose: 1.8,
  },

  letterSpacing: {
    tighter: '-0.04em',
    tight: '-0.025em',
    normal: '0em',
    wide: '0.025em',
    wider: '0.05em',
  },
} as const;

export type FontKeys = keyof typeof typography.fonts;
export type SizeKeys = keyof typeof typography.sizes;
export type WeightKeys = keyof typeof typography.weights;