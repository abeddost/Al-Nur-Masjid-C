"use client";

import { useEffect, useState } from "react";
import { useTranslations, useLocale } from "next-intl";
import type { PrayerTimes } from "@/lib/mawaqit";
import { MOSQUE_ADDRESS } from "@/config/location";

function berlinNow(timezone: string): Date {
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone: timezone,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  }).formatToParts(new Date());

  const get = (type: string) => Number(parts.find((p) => p.type === type)?.value ?? "0");
  return new Date(
    get("year"),
    get("month") - 1,
    get("day"),
    get("hour") % 24,
    get("minute"),
    get("second")
  );
}

function atTime(base: Date, hhmm: string, dayOffset = 0): Date {
  const [h, m] = hhmm.split(":").map(Number);
  const d = new Date(base);
  d.setDate(d.getDate() + dayOffset);
  d.setHours(h, m, 0, 0);
  return d;
}

function formatCountdown(ms: number): string {
  const totalSeconds = Math.max(0, Math.floor(ms / 1000));
  const h = String(Math.floor(totalSeconds / 3600)).padStart(2, "0");
  const m = String(Math.floor((totalSeconds % 3600) / 60)).padStart(2, "0");
  const s = String(totalSeconds % 60).padStart(2, "0");
  return `${h}:${m}:${s}`;
}

type IconType = "moon" | "sun" | "sunrise" | "sunset" | "star";

function PrayerIcon({ type, className }: { type: IconType; className?: string }) {
  const common = { viewBox: "0 0 24 24", fill: "none", className, "aria-hidden": true };
  switch (type) {
    case "moon":
      return (
        <svg {...common}>
          <path
            d="M20 14.5A8.5 8.5 0 1 1 9.5 4a6.8 6.8 0 0 0 10.5 10.5Z"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinejoin="round"
          />
        </svg>
      );
    case "sun":
      return (
        <svg {...common}>
          <circle cx="12" cy="12" r="4.2" stroke="currentColor" strokeWidth="1.6" />
          <path
            d="M12 3v2.2M12 18.8V21M21 12h-2.2M5.2 12H3M18.4 5.6l-1.6 1.6M7.2 16.8l-1.6 1.6M18.4 18.4l-1.6-1.6M7.2 7.2 5.6 5.6"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
          />
        </svg>
      );
    case "sunrise":
      return (
        <svg {...common}>
          <path d="M5 18h14" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
          <path
            d="M7.5 18a4.5 4.5 0 0 1 9 0"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
          />
          <path
            d="M12 8v3M8 11.5l1.4 1.4M16 11.5l-1.4 1.4"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
          />
        </svg>
      );
    case "sunset":
      return (
        <svg {...common}>
          <path d="M5 18h14" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
          <path
            d="M7.5 15a4.5 4.5 0 0 1 9 0"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
          />
          <path
            d="M12 15V8M8 11.5 12 8l4 3.5"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      );
    case "star":
      return (
        <svg {...common} fill="currentColor">
          <path d="M12 2.5 14.4 9l6.6.3-5.2 4.2L17.6 20 12 16.3 6.4 20l1.8-6.5L3 9.3 9.6 9Z" />
        </svg>
      );
  }
}

export default function PrayerTimesPanel({ data }: { data: PrayerTimes | null }) {
  const t = useTranslations("pages.home.prayerTimes");
  const appLocale = useLocale();
  const [mounted, setMounted] = useState(false);
  const [, setTick] = useState(0);

  useEffect(() => {
    setMounted(true);
    const id = setInterval(() => setTick((v) => v + 1), 1000);
    return () => clearInterval(id);
  }, []);

  if (!data) {
    return (
      <div className="w-full max-w-md rounded-2xl border border-white/15 bg-brand-900/70 px-6 py-6 text-center text-white/80 backdrop-blur-md">
        <p>{t("unavailable")}</p>
        <a
          href="https://mawaqit.net"
          target="_blank"
          rel="noopener noreferrer"
          className="mt-2 inline-block text-sm font-semibold text-gold-400 hover:text-gold-300"
        >
          {t("viewOnMawaqit")}
        </a>
      </div>
    );
  }

  // Friday/Jumu'ah detection and "next prayer" both depend on the current
  // instant, which must not be computed during SSR: the server's render
  // time and the client's first paint are a moment apart, so rendering a
  // live clock value during SSR would mismatch on hydration. Everything
  // time-dependent is gated behind `mounted` and only exists client-side.
  const now = mounted ? berlinNow(data.timezone) : null;
  const isFriday = now ? now.getDay() === 5 : false;

  const prayers: { key: string; label: string; time: string; icon: IconType }[] = [
    { key: "fajr", label: t("fajr"), time: data.fajr, icon: "moon" },
    { key: "dhuhr", label: t("dhuhr"), time: data.dhuhr, icon: "sun" },
    ...(data.jumua
      ? [{ key: "jumua", label: t("jumua"), time: data.jumua, icon: "star" as IconType }]
      : []),
    { key: "asr", label: t("asr"), time: data.asr, icon: "sunrise" },
    { key: "maghrib", label: t("maghrib"), time: data.maghrib, icon: "sunset" },
    { key: "isha", label: t("isha"), time: data.isha, icon: "moon" },
  ];

  let next: { key: string; label: string; time: string; at: Date } | null = null;
  if (now) {
    // On Fridays the congregational prayer happens at Jumu'ah time instead
    // of the regular Dhuhr time, so Dhuhr is skipped as a countdown target
    // that day (and vice versa on other days).
    const candidates = prayers
      .filter((p) => (isFriday ? p.key !== "dhuhr" : p.key !== "jumua"))
      .map((p) => ({ ...p, at: atTime(now, p.time) }));
    next =
      candidates.find((p) => p.at.getTime() > now.getTime()) ?? {
        key: "fajr",
        label: t("fajr"),
        time: data.tomorrowFajr,
        at: atTime(now, data.tomorrowFajr, 1),
      };
  }

  const diffMs = next && now ? next.at.getTime() - now.getTime() : null;
  const dateLabel = now
    ? new Intl.DateTimeFormat(appLocale, {
        weekday: "long",
        day: "numeric",
        month: "long",
      }).format(now)
    : "";

  return (
    <div className="w-full max-w-md rounded-2xl border border-white/15 bg-brand-900/70 p-3 shadow-xl backdrop-blur-md sm:p-5">
      <div className="flex items-center justify-between gap-3">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-white/70">
            {t("eyebrow")}
          </p>
          <p className="text-xs text-white/60">{dateLabel}</p>
        </div>
        <a
          href={data.fullTimetableUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="whitespace-nowrap rounded-full border border-white/30 px-3 py-1.5 text-xs font-semibold text-white hover:bg-white/10"
        >
          {t("viewFullTimetable")}
        </a>
      </div>

      <div className="mt-2 flex items-baseline justify-between gap-3 sm:mt-3">
        <p className="text-sm text-white/70">
          {t("nextPrayerLabel")}{" "}
          <span className="font-semibold text-gold-600">
            {next ? next.label : " "}
          </span>
        </p>
        <p className="font-serif text-xl font-bold tabular-nums text-white sm:text-3xl">
          {diffMs !== null ? formatCountdown(diffMs) : "--:--:--"}
        </p>
      </div>

      <div className="mt-2 flex items-center gap-3 sm:mt-3 lg:hidden">
        <span className="h-px flex-1 bg-white/15" />
        <svg viewBox="0 0 20 20" fill="currentColor" className="h-3 w-3 text-gold-600/70">
          <path d="M10 2 11.6 7 17 7.8 13.2 11.4 14.2 17 10 14.3 5.8 17l1-5.6L3 7.8 8.4 7Z" />
        </svg>
        <span className="h-px flex-1 bg-white/15" />
      </div>

      <div className="mt-2 grid grid-cols-3 gap-x-1.5 gap-y-2 sm:mt-3 sm:grid-cols-6 sm:gap-x-2 sm:gap-y-3">
        {prayers.map((p) => {
          const isNext = next !== null && p.key === next.key;
          return (
            <div key={p.key} className="text-center">
              <PrayerIcon
                type={p.icon}
                className={`mx-auto h-4 w-4 sm:h-5 sm:w-5 ${isNext ? "text-gold-600" : "text-white/50"}`}
              />
              <p
                className={`mt-1 text-[10px] font-semibold uppercase tracking-wide sm:text-[11px] ${
                  isNext ? "text-gold-600" : "text-white/60"
                }`}
              >
                {p.label}
              </p>
              <p className="mt-0.5 font-serif text-base font-semibold tabular-nums text-white sm:text-lg">
                {p.time}
              </p>
              {isNext && (
                <span className="mx-auto mt-1 block h-0.5 w-6 rounded-full bg-gold-600" />
              )}
            </div>
          );
        })}
      </div>

      <div className="mt-2 flex items-center justify-center gap-1.5 rounded-full border-t border-white/10 pt-2 text-xs text-white/60 sm:mt-3 sm:pt-3">
        <svg viewBox="0 0 20 20" fill="currentColor" className="h-3.5 w-3.5 shrink-0">
          <path d="M10 2a6 6 0 0 0-6 6c0 4.5 6 10 6 10s6-5.5 6-10a6 6 0 0 0-6-6Zm0 8.2A2.2 2.2 0 1 1 10 5.8a2.2 2.2 0 0 1 0 4.4Z" />
        </svg>
        <span>{MOSQUE_ADDRESS}</span>
      </div>
    </div>
  );
}
