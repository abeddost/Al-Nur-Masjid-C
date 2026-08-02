"use client";

import { useEffect, useState } from "react";
import { useTranslations, useLocale } from "next-intl";
import type { PrayerTimes } from "@/lib/mawaqit";

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

  const prayers = [
    { key: "fajr", label: t("fajr"), time: data.fajr },
    { key: "dhuhr", label: t("dhuhr"), time: data.dhuhr },
    ...(data.jumua
      ? [{ key: "jumua", label: t("jumua"), time: data.jumua }]
      : []),
    { key: "asr", label: t("asr"), time: data.asr },
    { key: "maghrib", label: t("maghrib"), time: data.maghrib },
    { key: "isha", label: t("isha"), time: data.isha },
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
    <div className="w-full max-w-md rounded-2xl border border-white/15 bg-brand-900/70 p-5 shadow-xl backdrop-blur-md sm:p-6">
      <div className="flex items-center justify-between gap-3">
        <p className="text-xs font-semibold uppercase tracking-wide text-white/70">
          {t("eyebrow")}
        </p>
        <p className="text-xs text-white/60">{dateLabel}</p>
      </div>

      <p className="mt-2 text-sm text-white/70">
        {t("nextPrayerLabel")}{" "}
        <span className="font-semibold text-gold-400">
          {next ? next.label : " "}
        </span>{" "}
        <span className="tabular-nums text-white">
          {diffMs !== null ? formatCountdown(diffMs) : "--:--:--"}
        </span>
      </p>

      <div className="mt-4 grid grid-cols-3 gap-x-2 gap-y-4 sm:grid-cols-6">
        {prayers.map((p) => {
          const isNext = next !== null && p.key === next.key;
          return (
            <div key={p.key} className="text-center">
              <p
                className={`text-[11px] font-semibold uppercase tracking-wide ${
                  isNext ? "text-gold-400" : "text-white/60"
                }`}
              >
                {p.label}
              </p>
              <p className="mt-1 font-serif text-lg font-semibold tabular-nums text-white">
                {p.time}
              </p>
              {isNext && (
                <span className="mx-auto mt-1 block h-0.5 w-6 rounded-full bg-gold-400" />
              )}
            </div>
          );
        })}
      </div>

      <a
        href={data.fullTimetableUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-5 flex items-center justify-center gap-1 border-t border-white/10 pt-4 text-sm font-semibold text-white hover:text-gold-400"
      >
        {t("viewFullTimetable")}
        <span aria-hidden>→</span>
      </a>
    </div>
  );
}
