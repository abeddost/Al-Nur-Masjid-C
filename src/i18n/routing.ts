import { defineRouting } from "next-intl/routing";

export const locales = ["de", "en", "fa", "ps"] as const;
export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "de";

export const rtlLocales: ReadonlySet<Locale> = new Set(["fa", "ps"]);

export const localeNames: Record<Locale, string> = {
  de: "Deutsch",
  en: "English",
  fa: "فارسی",
  ps: "پښتو",
};

export const localeFlags: Record<Locale, string> = {
  de: "🇩🇪",
  en: "🇬🇧",
  fa: "🇦🇫",
  ps: "🇦🇫",
};

export const routing = defineRouting({
  locales,
  defaultLocale,
  localePrefix: "always",
});
