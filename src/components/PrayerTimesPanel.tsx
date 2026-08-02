"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
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
  const [mounted, setMounted] = useState(false);
  const [, setTick] = useState(0);

  useEffect(() => {
    setMounted(true);
    const id = setInterval(() => setTick((v) => v + 1), 1000);
    return () => clearInterval(id);
  }, []);

  if (!data) {
    return (
      <div className="mt-10 rounded-2xl border border-white/15 bg-white/5 px-6 py-8 text-center text-white/80">
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
    { key: "shuruq", label: t("shuruq"), time: data.shuruq, isMarker: true },
    {
      key: "dhuhr",
      label: isFriday && data.jumua ? t("jumua") : t("dhuhr"),
      time: isFriday && data.jumua ? data.jumua : data.dhuhr,
    },
    { key: "asr", label: t("asr"), time: data.asr },
    { key: "maghrib", label: t("maghrib"), time: data.maghrib },
    { key: "isha", label: t("isha"), time: data.isha },
  ];

  let next: { key: string; label: string; time: string; at: Date } | null = null;
  if (now) {
    const candidates = prayers
      .filter((p) => !p.isMarker)
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

  return (
    <div className="mt-10">
      <div className="text-center">
        <p className="text-xs font-semibold uppercase tracking-wide text-white/60">
          {t("eyebrow")}
        </p>
        <p className="mt-2 text-sm text-white/70">
          {t("nextPrayerLabel")}{" "}
          <span className="font-semibold text-gold-400">
            {next ? next.label : " "}
          </span>
        </p>
        <p className="mt-1 font-serif text-5xl font-bold tabular-nums text-white sm:text-6xl">
          {diffMs !== null ? formatCountdown(diffMs) : "--:--:--"}
        </p>
      </div>

      <div className="mt-8 flex flex-wrap justify-center gap-2 sm:gap-3">
        {prayers.map((p) => {
          const isNext = next !== null && p.key === next.key && !p.isMarker;
          return (
            <div
              key={p.key}
              className={`rounded-xl px-4 py-3 text-center ${
                isNext
                  ? "bg-gold-500 text-brand-900"
                  : p.isMarker
                    ? "border border-white/10 text-white/50"
                    : "border border-white/20 text-white"
              }`}
            >
              <p className="text-[11px] font-semibold uppercase tracking-wide opacity-80">
                {p.label}
              </p>
              <p className="mt-1 font-serif text-lg font-semibold tabular-nums">
                {p.time}
              </p>
            </div>
          );
        })}
      </div>

      <p className="mt-6 text-center text-xs text-white/50">{t("poweredBy")}</p>
    </div>
  );
}
