"use client";

import { usePathname, useParams } from "next/navigation";
import Link from "next/link";
import { locales, localeNames, localeFlags, type Locale } from "@/i18n/routing";

function swapLocale(pathname: string, current: string, next: Locale) {
  const segments = pathname.split("/");
  segments[1] = next;
  return segments.join("/") || "/";
}

export default function LanguageSwitcher({
  variant = "light",
}: {
  variant?: "light" | "dark";
}) {
  const pathname = usePathname();
  const params = useParams();
  const current = (params?.locale as string) ?? "de";

  return (
    <ul className="flex items-center gap-3 text-sm">
      {locales.map((locale) => {
        const isActive = locale === current;
        return (
          <li key={locale}>
            <Link
              href={swapLocale(pathname, current, locale)}
              className={
                "flex items-center gap-1.5 " +
                (isActive
                  ? "font-semibold text-gold-500"
                  : variant === "dark"
                    ? "text-white/80 hover:text-white"
                    : "text-brand-700/80 hover:text-brand-700")
              }
            >
              <span aria-hidden>{localeFlags[locale]}</span>
              {localeNames[locale]}
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
