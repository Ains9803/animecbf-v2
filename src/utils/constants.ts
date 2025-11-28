// API Constants
export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'https://kitsu.io/api/edge';
export const APP_NAME = import.meta.env.VITE_APP_NAME || 'AnimeCBF';

// Pagination
export const PAGE_SIZE = 20;

// Debounce
export const SEARCH_DEBOUNCE_MS = 500;

// Breakpoints
export const BREAKPOINTS = {
  mobile: 768,
  tablet: 1024,
} as const;

// Theme
export const THEMES = {
  LIGHT: 'light',
  DARK: 'dark',
  SYSTEM: 'system',
} as const;

// Local Storage Keys
export const STORAGE_KEYS = {
  THEME: 'animecbf-theme',
  FAVORITES: 'animecbf-favorites',
} as const;
