export { colors, type ColorKeys, type ColorValue } from './colors';
export { spacing, radius, type SpacingKeys, type RadiusKeys } from './spacing';
export { typography, type FontKeys, type SizeKeys, type WeightKeys } from './typography';
export { shadows, backdropBlur, type ShadowKeys, type BlurKeys } from './shadows';

export const transitions = {
  micro: 'all 150ms cubic-bezier(0.25, 0.46, 0.45, 0.94)',
  standard: 'all 250ms cubic-bezier(0.25, 0.46, 0.45, 0.94)',
  complex: 'all 350ms cubic-bezier(0.25, 0.46, 0.45, 0.94)',
  hover: 'all 0.3s ease',
  cinema: 'all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
} as const;

export const animations = {
  durations: {
    fast: '150ms',
    normal: '250ms',
    slow: '350ms',
    slower: '500ms',
  },
  
  easings: {
    ease: 'ease',
    linear: 'linear',
    easeIn: 'ease-in',
    easeOut: 'ease-out',
    easeInOut: 'ease-in-out',
    spring: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
    bounce: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
  },
} as const;