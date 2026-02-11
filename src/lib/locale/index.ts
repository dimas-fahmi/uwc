export const SUPPORTED_LOCALES = ["en", "id"] as const;
export type SupportedLocaleType = (typeof SUPPORTED_LOCALES)[number];

export const DEFAULT_LOCALE: SupportedLocaleType = "en";
