"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { navItems } from "@/config/nav";
import HeaderCtaButtons from "./HeaderCtaButtons";
import LanguageSwitcher from "./LanguageSwitcher";

export default function Header({
  overlay = false,
  isHome = false,
}: {
  overlay?: boolean;
  isHome?: boolean;
}) {
  const t = useTranslations();
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openMobileGroups, setOpenMobileGroups] = useState<Set<string>>(
    new Set()
  );
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  const linkClass = overlay
    ? "text-sm font-semibold text-white hover:text-white/70 transition-colors duration-300"
    : "text-sm font-semibold text-brand-800 hover:text-brand-600 transition-colors duration-300";

  const barColor = mobileOpen
    ? "bg-brand-800"
    : overlay
      ? "bg-white"
      : "bg-brand-800";
  const barClass = `absolute h-0.5 w-5 rounded-full transition-transform duration-300 ease-in-out ${barColor}`;

  const toggleMobileGroup = (key: string) => {
    setOpenMobileGroups((prev) => {
      const next = new Set(prev);
      if (next.has(key)) {
        next.delete(key);
      } else {
        next.add(key);
      }
      return next;
    });
  };

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  useEffect(() => {
    if (!mobileOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMobileOpen(false);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [mobileOpen]);

  useEffect(() => {
    if (mobileOpen) {
      closeButtonRef.current?.focus();
    }
  }, [mobileOpen]);

  return (
    <header
      className={
        overlay
          ? "bg-transparent transition-colors duration-300"
          : "border-b border-brand-100 bg-white shadow-sm transition-colors duration-300"
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
            overlay && !mobileOpen
              ? "flex h-9 w-9 items-center justify-center rounded-md border border-white/40 transition-colors duration-300 xl:hidden"
              : "flex h-9 w-9 items-center justify-center rounded-md border border-brand-200 transition-colors duration-300 xl:hidden"
          }
          onClick={() => setMobileOpen((v) => !v)}
          aria-expanded={mobileOpen}
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
        >
          <span className="relative flex h-5 w-5 flex-col items-center justify-center">
            <span
              className={`${barClass} ${mobileOpen ? "translate-y-0 rotate-45" : "-translate-y-1.5"}`}
            />
            <span
              className={`${barClass} ${mobileOpen ? "opacity-0" : "opacity-100"}`}
            />
            <span
              className={`${barClass} ${mobileOpen ? "translate-y-0 -rotate-45" : "translate-y-1.5"}`}
            />
          </span>
        </button>
      </div>

      <div
        role="dialog"
        aria-modal="true"
        aria-label="Menu"
        className={`fixed inset-0 z-40 flex flex-col bg-white transition-opacity duration-300 xl:hidden ${
          mobileOpen
            ? "translate-y-0 opacity-100 pointer-events-auto"
            : "-translate-y-2 opacity-0 pointer-events-none"
        }`}
      >
        <div className="flex items-center justify-between border-b border-brand-100 px-5 py-4">
          <Link
            href="/"
            className="shrink-0"
            onClick={() => setMobileOpen(false)}
          >
            <Image
              src="/images/logo-an-nur-base-en.svg"
              alt="Mosque An-Nur"
              width={160}
              height={41}
            />
          </Link>
          <button
            type="button"
            ref={closeButtonRef}
            onClick={() => setMobileOpen(false)}
            aria-label="Close menu"
            className="flex h-9 w-9 items-center justify-center rounded-md border border-brand-200"
          >
            <span className="relative flex h-5 w-5 flex-col items-center justify-center">
              <span className="absolute h-0.5 w-5 rotate-45 rounded-full bg-brand-800" />
              <span className="absolute h-0.5 w-5 -rotate-45 rounded-full bg-brand-800" />
            </span>
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-5 py-4">
          {navItems.map((item) => {
            if (item.type === "link") {
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className="block border-b border-brand-100 py-4 text-base font-semibold text-brand-900"
                  onClick={() => setMobileOpen(false)}
                >
                  {t(item.labelKey)}
                </Link>
              );
            }
            const isGroupOpen = openMobileGroups.has(item.labelKey);
            return (
              <div key={item.labelKey} className="border-b border-brand-100">
                <button
                  type="button"
                  className="flex w-full items-center justify-between py-4 text-base font-semibold text-brand-900"
                  onClick={() => toggleMobileGroup(item.labelKey)}
                  aria-expanded={isGroupOpen}
                >
                  {t(item.labelKey)}
                  <span
                    aria-hidden
                    className={`text-sm transition-transform duration-200 ${isGroupOpen ? "rotate-180" : ""}`}
                  >
                    ▾
                  </span>
                </button>
                {isGroupOpen && (
                  <ul className="space-y-1 pb-3 ps-3">
                    {item.items.map((sub) => (
                      <li key={sub.href}>
                        <Link
                          href={sub.href}
                          className="block py-2 text-sm text-brand-700"
                          onClick={() => setMobileOpen(false)}
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

          <HeaderCtaButtons
            layout="stack"
            overlay={false}
            onNavigate={() => setMobileOpen(false)}
            className="mt-6"
          />

          {!isHome && (
            <div className="mt-6 border-t border-brand-100 pt-6">
              <LanguageSwitcher variant="light" />
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
