/**
 * Language Configuration
 * Add new languages here to make them available in the app
 */

export interface LanguageConfig {
  code: string;
  name: string;
  nativeName: string;
  direction: 'ltr' | 'rtl';
  flag: string;
}

export const AVAILABLE_LANGUAGES: LanguageConfig[] = [
  {
    code: 'bn',
    name: 'Bengali',
    nativeName: 'বাংলা',
    direction: 'ltr',
    flag: '🇧🇩',
  },
  {
    code: 'en',
    name: 'English',
    nativeName: 'English',
    direction: 'ltr',
    flag: '🇬🇧',
  },
  // Add more languages here following the same pattern:
  // {
  //   code: 'hi',
  //   name: 'Hindi',
  //   nativeName: 'हिन्दी',
  //   direction: 'ltr',
  //   flag: '🇮🇳',
  // },
];

export const DEFAULT_LANGUAGE = 'bn';

// Automatically generate SupportedLanguage type from AVAILABLE_LANGUAGES
export type SupportedLanguage = typeof AVAILABLE_LANGUAGES[number]['code'];

// Helper function to get language config
export const getLanguageConfig = (code: string): LanguageConfig | undefined => {
  return AVAILABLE_LANGUAGES.find(lang => lang.code === code);
};

// Helper function to check if language is supported
export const isLanguageSupported = (code: string): code is SupportedLanguage => {
  return AVAILABLE_LANGUAGES.some(lang => lang.code === code);
};
