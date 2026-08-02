"use client";

import { useState } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { navItems } from "@/config/nav";
import HeaderCtaButtons from "./HeaderCtaButtons";

export default function Header({ overlay = false }: { overlay?: boolean }) {
  const t = useTranslations();
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);

  const linkClass = overlay
    ? "text-sm font-semibold text-white hover:text-white/70"
    : "text-sm font-semibold text-brand-800 hover:text-brand-600";

  return (
    <header
      className={
        overlay
          ? "bg-transparent"
          : "border-b border-brand-100 bg-white"
      }
    >
      <div className="mx-auto flex max-w-[1120px] items-center justify-between gap-6 px-5 py-4">
        <Link href="/" className="shrink-0">
          <Image
            src={
              overlay
                ? "/images/logo-an-nur-base-en-neg.svg"
                : "/images/logo-an-nur-base-en.svg"
            }
            alt="Mosque An-Nur"
            width={180}
            height={46}
            priority
          />
        </Link>

        <nav className="hidden items-center gap-6 xl:flex">
          {navItems.map((item) => {
            if (item.type === "link") {
              return (
                <Link key={item.href} href={item.href} className={linkClass}>
                  {t(item.labelKey)}
                </Link>
              );
            }
            const isOpen = openDropdown === item.labelKey;
            return (
              <div
                key={item.labelKey}
                className="relative"
                onMouseEnter={() => setOpenDropdown(item.labelKey)}
                onMouseLeave={() => setOpenDropdown(null)}
              >
                <button
                  type="button"
                  className={`flex items-center gap-1 ${linkClass}`}
                  onClick={() =>
                    setOpenDropdown(isOpen ? null : item.labelKey)
                  }
                  aria-expanded={isOpen}
                >
                  {t(item.labelKey)}
                  <span aria-hidden className="text-xs">
                    ▾
                  </span>
                </button>
                {isOpen && (
                  <ul className="absolute left-0 top-full z-20 min-w-[240px] rounded-lg border border-brand-100 bg-white py-2 shadow-lg">
                    {item.items.map((sub) => (
                      <li key={sub.href}>
                        <Link
                          href={sub.href}
                          className="block px-4 py-2 text-sm text-brand-800 hover:bg-brand-50 hover:text-brand-700"
                        >
                          {t(sub.labelKey)}
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            );
          })}
        </nav>

        <HeaderCtaButtons className="hidden xl:flex" overlay={overlay} />

        <button
          type="button"
          className={
            overlay
              ? "flex items-center justify-center rounded-md border border-white/40 p-2 xl:hidden"
              : "flex items-center justify-center rounded-md border border-brand-200 p-2 xl:hidden"
          }
          onClick={() => setMobileOpen((v) => !v)}
          aria-expanded={mobileOpen}
          aria-label="Toggle menu"
        >
          <span
            className={
              overlay
                ? "block h-0.5 w-5 bg-white relative before:absolute before:-top-2 before:h-0.5 before:w-5 before:bg-white after:absolute after:top-2 after:h-0.5 after:w-5 after:bg-white"
                : "block h-0.5 w-5 bg-brand-800 relative before:absolute before:-top-2 before:h-0.5 before:w-5 before:bg-brand-800 after:absolute after:top-2 after:h-0.5 after:w-5 after:bg-brand-800"
            }
          />
        </button>
      </div>

      {mobileOpen && (
        <nav
          className={
            overlay
              ? "border-t border-white/20 bg-brand-900/95 px-5 py-4 backdrop-blur-sm xl:hidden"
              : "border-t border-brand-100 px-5 py-4 xl:hidden"
          }
        >
          <HeaderCtaButtons
            className="mb-4 flex-wrap"
            onNavigate={() => setMobileOpen(false)}
            overlay={overlay}
          />
          {navItems.map((item) => {
            if (item.type === "link") {
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`block py-2 text-sm font-semibold ${overlay ? "text-white" : "text-brand-800"}`}
                  onClick={() => setMobileOpen(false)}
                >
                  {t(item.labelKey)}
                </Link>
              );
            }
            return (
              <div key={item.labelKey} className="py-2">
                <p
                  className={`text-sm font-semibold ${overlay ? "text-white" : "text-brand-900"}`}
                >
                  {t(item.labelKey)}
                </p>
                <ul
                  className={`mt-1 space-y-1 border-l pl-3 ${overlay ? "border-white/20" : "border-brand-100"}`}
                >
                  {item.items.map((sub) => (
                    <li key={sub.href}>
                      <Link
                        href={sub.href}
                        className={`block py-1 text-sm ${overlay ? "text-white/80" : "text-brand-700"}`}
                        onClick={() => setMobileOpen(false)}
                      >
                        {t(sub.labelKey)}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </nav>
      )}
    </header>
  );
}
