export const languages = [
  { code: 'en', name: 'English',    nativeName: 'English',          dir: 'ltr' },
  { code: 'es', name: 'Spanish',    nativeName: 'Español',          dir: 'ltr' },
  { code: 'fr', name: 'French',     nativeName: 'Français',         dir: 'ltr' },
  { code: 'pt', name: 'Portuguese', nativeName: 'Português',        dir: 'ltr' },
  { code: 'ar', name: 'Arabic',     nativeName: 'العربية',          dir: 'rtl' },
  { code: 'de', name: 'German',     nativeName: 'Deutsch',          dir: 'ltr' },
  { code: 'hi', name: 'Hindi',      nativeName: 'हिन्दी',            dir: 'ltr' },
  { code: 'zh', name: 'Chinese',    nativeName: '中文',              dir: 'ltr' },
  { code: 'sw', name: 'Swahili',    nativeName: 'Kiswahili',        dir: 'ltr' },
  { code: 'id', name: 'Indonesian', nativeName: 'Bahasa Indonesia', dir: 'ltr' },
  { code: 'ru', name: 'Russian',    nativeName: 'Русский',          dir: 'ltr' },
] as const

export type LanguageCode = typeof languages[number]['code']
export const defaultLanguage: LanguageCode = 'en'
