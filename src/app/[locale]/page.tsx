import Image from "next/image";
import { getTranslations, getLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import FeatureList from "@/components/FeatureList";
import PrayerTimesPanel from "@/components/PrayerTimesPanel";
import HeroFeatureStrip from "@/components/HeroFeatureStrip";
import TeaserSection from "@/components/TeaserSection";
import MapSection from "@/components/MapSection";
import { getMawaqitPrayerTimes } from "@/lib/mawaqit";
import { MAPS_DIRECTIONS_URL } from "@/config/location";
import { rtlLocales, type Locale } from "@/i18n/routing";

export default async function HomePage() {
  const t = await getTranslations("pages.home");
  const locale = await getLocale();
  const prayerTimes = await getMawaqitPrayerTimes();
  const heroImageSrc = rtlLocales.has(locale as Locale)
    ? "/hero-section-rtl.png"
    : "/hero-section-ltr.png";
  const icons = [
    "/images/koran.svg",
    "/images/veranstaltungen.svg",
    "/images/spende.svg",
    "/images/beratung.svg",
    "/images/mitglieder.svg",
  ];
  const features = t
    .raw("features")
    .map((f: { title: string; description: string }, i: number) => ({
      ...f,
      icon: icons[i],
    }));
  const heroFeatures = t.raw("hero.features") as {
    label: string;
    icon: string;
  }[];

  return (
    <>
      <section className="relative flex min-h-[600px] flex-col justify-end overflow-hidden lg:h-screen">
        <Image
          src="/hero-section-mobile.png"
          alt="Prayer hall at Mosque An-Nur"
          fill
          priority
          className="block object-cover object-[center_70%] lg:hidden"
        />
        <Image
          src={heroImageSrc}
          alt="Prayer hall at Mosque An-Nur"
          fill
          priority
          className="hidden object-cover object-[center_70%] lg:block"
        />

        <div className="relative z-10 mx-auto w-full max-w-[1120px] px-5 pb-8 pt-24 sm:pt-28">
          <div className="max-w-xl">
            <p className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-gold-600">
              <svg
                aria-hidden
                viewBox="0 0 20 20"
                fill="currentColor"
                className="h-3.5 w-3.5 shrink-0 lg:hidden"
              >
                <path d="M17 12.5A6.5 6.5 0 0 1 7.5 3a7 7 0 1 0 9.5 9.5Z" />
                <path d="m16.2 2 .5 1.3L18 3.8l-1.3.5-.5 1.3-.5-1.3L14.4 3.8l1.3-.5.5-1.3Z" />
              </svg>
              {t("hero.eyebrow")}
            </p>
            <h1 className="mt-3 font-serif text-4xl font-bold leading-tight text-white sm:text-5xl">
              {t("hero.headlineLead")}{" "}
              <span className="text-gold-600">{t("hero.headlineHighlight")}</span>
            </h1>
            <span className="mt-3 block h-0.5 w-14 rounded-full bg-gold-600" />
            <p className="mt-3 text-white/80">{t("hero.subtitle")}</p>

            <div className="mt-6 flex flex-wrap gap-3">
              <a
                href={MAPS_DIRECTIONS_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 rounded-xl bg-brand-700 px-6 py-3 text-sm font-semibold text-white hover:bg-brand-600 lg:rounded-full lg:bg-gold-500 lg:text-brand-900 lg:hover:bg-gold-400"
              >
                <svg
                  aria-hidden
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  className="h-4 w-4"
                >
                  <path d="M10 2a5 5 0 0 0-5 5c0 4 5 11 5 11s5-7 5-11a5 5 0 0 0-5-5Zm0 7a2 2 0 1 1 0-4 2 2 0 0 1 0 4Z" />
                </svg>
                {t("hero.primaryCta")}
              </a>
              <Link
                href="/quran-school"
                className="flex items-center gap-2 rounded-xl border border-gold-500/70 px-6 py-3 text-sm font-semibold text-gold-500 hover:bg-white/10 lg:rounded-full lg:border-white/40 lg:text-white"
              >
                <svg
                  aria-hidden
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  className="h-4 w-4"
                >
                  <path d="M10 3 2 6.5 10 10l8-3.5L10 3Zm-6.5 6 1 .44V13c0 1.4 2.5 3 5.5 3s5.5-1.6 5.5-3V9.44l1-.44v4.56a1 1 0 1 0 2 0V8.2a1 1 0 0 0-.6-.92L10.4 3.1a1 1 0 0 0-.8 0L1.6 6.5a1 1 0 0 0 0 1.83l1.9.84V9Z" />
                </svg>
                {t("hero.secondaryCta")}
              </Link>
            </div>
          </div>

          <div className="mt-8 flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between">
            <HeroFeatureStrip features={heroFeatures} className="hidden lg:flex" />
            <PrayerTimesPanel data={prayerTimes} />
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-[1120px] px-5 py-16">
        <div className="grid gap-12 lg:grid-cols-2">
          <div>
            <h1 className="font-serif text-3xl font-bold text-brand-900 sm:text-4xl">
              {t("introTitle")}
            </h1>
            <div className="mt-6 space-y-4 text-brand-600">
              {t.raw("introParagraphs").map((p: string) => (
                <p key={p}>{p}</p>
              ))}
            </div>
          </div>
          <FeatureList features={features} />
        </div>
      </section>

      <TeaserSection
        eyebrow={t("quranSchoolTeaser.eyebrow")}
        title={t("quranSchoolTeaser.title")}
        text={t("quranSchoolTeaser.text")}
        image={{
          src: "/images/koranunterricht-wiesbaden.webp",
          alt: "Quran lessons at Mosque An-Nur",
        }}
        href="/quran-school"
        cta={t("quranSchoolTeaser.cta")}
      />

      <TeaserSection
        eyebrow={t("newsTeaser.eyebrow")}
        title={t("newsTeaser.title")}
        text={t("newsTeaser.text")}
        image={{
          src: "/images/ramadan-2026-1447-hero.webp",
          alt: "Ramadan programme at Mosque An-Nur",
        }}
        reverse
      />

      <section className="mx-auto max-w-[1120px] px-5 py-16">
        <div className="grid gap-6 lg:grid-cols-[1fr_2fr]">
          <h2 className="font-serif text-3xl font-bold text-brand-900">
            {t("communityTitle")}
          </h2>
          <p className="text-brand-600">{t("communityIntro")}</p>
        </div>

        <div className="mt-10 grid gap-4 lg:grid-cols-[1fr_1.3fr_1fr]">
          <div className="flex flex-col gap-3">
            <div className="relative aspect-[4/3] overflow-hidden rounded-2xl">
              <Image
                src="/images/glaeubige-beim-beten-768x512.webp"
                alt="Congregation in prayer at Mosque An-Nur"
                fill
                className="object-cover"
              />
            </div>
            <div>
              <p className="font-serif text-lg font-semibold text-brand-900">
                {t("galleryCaption1Title")}
              </p>
              <p className="mt-1 text-sm text-brand-600">
                {t("galleryCaption1Text")}
              </p>
            </div>
          </div>

          <div className="relative aspect-[4/5] overflow-hidden rounded-2xl">
            <Image
              src="/images/mullah-predigt.webp"
              alt="Imam of Mosque An-Nur"
              fill
              className="object-cover"
            />
          </div>

          <div className="flex flex-col gap-4">
            <div>
              <p className="font-serif text-lg font-semibold text-brand-900">
                {t("galleryCaption2Title")}
              </p>
              <p className="mt-1 text-sm text-brand-600">
                {t("galleryCaption2Text")}
              </p>
            </div>
            <div className="relative aspect-[4/3] overflow-hidden rounded-2xl">
              <Image
                src="/images/zuhoerer-der-freitagspredigt.webp"
                alt="Congregation listening to the Friday sermon"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      <MapSection />
    </>
  );
}
