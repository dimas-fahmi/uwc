import {
  DEFAULT_LOCALE,
  SUPPORTED_LOCALES,
  type SupportedLocaleType,
} from "../locale";

export const isSupportedLocale = (locale?: string | null): boolean => {
  return SUPPORTED_LOCALES.some((l) => l === locale);
};

export const getFallbackLocale = (locale?: string): SupportedLocaleType => {
  return isSupportedLocale(locale)
    ? (locale as SupportedLocaleType)
    : DEFAULT_LOCALE;
};

export const getSupportedLocale = (localeString?: string) => {
  if (typeof localeString !== "string") {
    return DEFAULT_LOCALE;
  }
  const [languageCode] = localeString.split("-");
  if (isSupportedLocale(languageCode)) {
    return languageCode;
  }
  return DEFAULT_LOCALE;
};

export const getLocaleFromPathname = (pathname: string) => {
  const paths = pathname.split("/").filter((m) => m);
  if (isSupportedLocale(paths[0])) {
    return paths[0];
  }
  return undefined;
};

export const stripLocaleFromPathname = (pathname: string) => {
  const locale = getLocaleFromPathname(pathname);
  if (!locale || !isSupportedLocale(locale)) return pathname;
  return pathname.replace(`/${locale}`, "") || "/";
};
