const MAWAQIT_SLUG = "afghanisch-islamischer-kulturverein-wiesbaden-65197-germany";

export type PrayerTimes = {
  fajr: string;
  shuruq: string;
  dhuhr: string;
  asr: string;
  maghrib: string;
  isha: string;
  jumua: string | null;
  tomorrowFajr: string;
  timezone: string;
};

function extractJsonObject(source: string, startIndex: number): string | null {
  let depth = 0;
  let end = -1;
  for (let i = startIndex; i < source.length; i++) {
    if (source[i] === "{") depth++;
    else if (source[i] === "}") {
      depth--;
      if (depth === 0) {
        end = i + 1;
        break;
      }
    }
  }
  if (end === -1) return null;
  return source.slice(startIndex, end);
}

export async function getMawaqitPrayerTimes(): Promise<PrayerTimes | null> {
  try {
    const res = await fetch(`https://mawaqit.net/en/w/${MAWAQIT_SLUG}`, {
      next: { revalidate: 3600 },
      headers: { "User-Agent": "Mozilla/5.0" },
    });
    if (!res.ok) return null;

    const html = await res.text();
    const marker = "confData = ";
    const markerIndex = html.indexOf(marker);
    if (markerIndex === -1) return null;

    const jsonStart = markerIndex + marker.length;
    const jsonText = extractJsonObject(html, jsonStart);
    if (!jsonText) return null;

    const data = JSON.parse(jsonText) as {
      times?: string[];
      shuruq?: string;
      jumua?: string | null;
      calendar?: Record<string, string[]>[];
      timezone?: string;
    };

    if (!data.times || data.times.length < 5 || !data.shuruq) return null;

    const now = new Date();
    const tomorrow = new Date(now.getTime() + 24 * 60 * 60 * 1000);
    const tomorrowDay = String(tomorrow.getDate());
    const tomorrowMonth = tomorrow.getMonth();
    const monthCalendar = data.calendar?.[tomorrowMonth];
    const tomorrowFajr = monthCalendar?.[tomorrowDay]?.[0] ?? data.times[0];

    return {
      fajr: data.times[0],
      shuruq: data.shuruq,
      dhuhr: data.times[1],
      asr: data.times[2],
      maghrib: data.times[3],
      isha: data.times[4],
      jumua: data.jumua ?? null,
      tomorrowFajr,
      timezone: data.timezone || "Europe/Berlin",
    };
  } catch {
    return null;
  }
}
