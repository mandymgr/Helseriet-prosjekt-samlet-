export const spacing = {
  // Base spacing units (8px system)
  1: '0.25rem',   // 4px
  2: '0.5rem',    // 8px
  3: '0.75rem',   // 12px
  4: '1rem',      // 16px
  5: '1.25rem',   // 20px
  6: '1.5rem',    // 24px
  8: '2rem',      // 32px
  10: '2.5rem',   // 40px
  12: '3rem',     // 48px
  16: '4rem',     // 64px
  20: '5rem',     // 80px
  24: '6rem',     // 96px
  32: '8rem',     // 128px
  40: '10rem',    // 160px

  // Component-specific tokens
  component: {
    cardInner: '1.5rem',      // 24px
    cardGap: '2rem',          // 32px
    section: '5rem',          // 80px
    sectionLg: '8rem',        // 128px
    content: '4rem',          // 64px
    pageHeader: '4rem',       // 64px
  },
} as const;

export const radius = {
  none: '0',
  sm: '0.25rem',    // 4px
  DEFAULT: '0.5rem', // 8px
  md: '0.75rem',    // 12px
  lg: '1rem',       // 16px
  xl: '1.5rem',     // 24px
  '2xl': '2rem',    // 32px
  organic: '32px 8px 32px 8px', // Helseriet's signature organic border
  full: '9999px',
} as const;

export type SpacingKeys = keyof typeof spacing;
export type RadiusKeys = keyof typeof radius;