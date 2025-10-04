import { en } from './en';
import { bn } from './bn';
export { AVAILABLE_LANGUAGES, DEFAULT_LANGUAGE, getLanguageConfig, isLanguageSupported } from './config';
export type { LanguageConfig, SupportedLanguage } from './config';

// Legacy type alias for backward compatibility
export type Language = 'en' | 'bn';

export const translations = {
  en,
  bn,
  // Add new language imports here when adding support
  // Example:
  // hi: () => import('./hi').then(m => m.hi),
};

export type Translation = typeof en;
