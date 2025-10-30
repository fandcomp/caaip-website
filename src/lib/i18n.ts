// Simple i18n utility for locale handling
export const locales = ['id', 'en'];

export function getLocaleFromPath(path: string): string {
  const segments = path.split('/').filter(Boolean);
  return segments[0] === 'en' ? 'en' : 'id';
}

export function switchLocale(path: string, targetLocale: string): string {
  const currentLocale = getLocaleFromPath(path);
  if (currentLocale === targetLocale) return path;
  const withoutLocale = path.replace(/^\/(id|en)/, '') || '/';
  return targetLocale === 'id' ? withoutLocale : `/${targetLocale}${withoutLocale}`;
}