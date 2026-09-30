export const COLORS = {
  background: '#0D1B2A',      // Dark Navy
  card: '#1B2A4A',            // Card container
  cardHover: '#22385E',
  text: '#F5F5F5',            // Text primary
  textMuted: '#A0AEC0',       // Text muted
  accentOrange: '#F4A100',    // Accent Orange
  accentBlue: '#00B4D8',      // Accent Blue
  border: '#2C3E60',
  success: '#10B981',
  warning: '#F59E0B',
  error: '#EF4444',
} as const;

export const FONTS = {
  heading: "'Poppins', sans-serif",
  body: "'Inter', sans-serif",
} as const;

export const SPACING = {
  xs: '0.25rem',  // 4px
  sm: '0.5rem',   // 8px
  md: '1rem',     // 16px
  lg: '1.5rem',   // 24px
  xl: '2rem',     // 32px
  '2xl': '3rem',  // 48px
  '3xl': '4rem',  // 64px
} as const;

export const SHADOWS = {
  glowOrange: '0 0 25px -5px rgba(244, 161, 0, 0.3)',
  glowBlue: '0 0 25px -5px rgba(0, 180, 216, 0.3)',
  glass: '0 8px 32px 0 rgba(0, 0, 0, 0.37)',
} as const;

export const RADII = {
  sm: '0.375rem',
  md: '0.5rem',
  lg: '0.75rem',
  xl: '1rem',
  full: '9999px',
} as const;

export type ThemeColors = typeof COLORS;
export type ThemeSpacing = typeof SPACING;
