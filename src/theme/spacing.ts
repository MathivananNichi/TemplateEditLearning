/**
 * Obsidian Violet Spacing and Border Radius Tokens
 */

export const spacing = {
  none: 0,
  xxs: 4, // 0.25rem
  xs: 8, // 0.5rem
  sm: 12, // 0.75rem
  md: 16, // 1rem
  lg: 20, // 1.25rem
  xl: 24, // 1.5rem
  xxl: 32, // 2rem
  xxxl: 40,
  gutter: 16, // 1rem
  marginScreen: 16, // 1rem
  margin_screen: 16,
};

export const rounded = {
  none: 0,
  sm: 4, // 0.25rem
  DEFAULT: 8, // 0.5rem
  default: 8,
  md: 12, // 0.75rem
  lg: 16, // 1rem
  xl: 24, // 1.5rem
  full: 9999, // 9999px
  pill: 9999,
  // Backward compatibility aliases
  xs: 4,
  xxl: 24,
};

export const borderRadius = rounded;

export type Spacing = typeof spacing;
export type Rounded = typeof rounded;
export type BorderRadius = typeof borderRadius;
