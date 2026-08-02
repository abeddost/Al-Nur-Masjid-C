import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import FeatureList from "@/components/FeatureList";
import PrayerTimesPanel from "@/components/PrayerTimesPanel";
import TeaserSection from "@/components/TeaserSection";
import MapSection from "@/components/MapSection";
import { getMawaqitPrayerTimes } from "@/lib/mawaqit";
import { MAPS_DIRECTIONS_URL } from "@/config/location";

export default async function HomePage() {
  const t = await getTranslations("pages.home");
  const prayerTimes = await getMawaqitPrayerTimes();
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
  return (
    <>
      <section className="relative flex min-h-[640px] flex-col overflow-hidden">
        <Image
          src="/hero-section.png"
          alt="Prayer hall at Mosque An-Nur"
          fill
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-brand-900 via-brand-900/85 to-brand-900/40" />
        <div className="absolute inset-0 bg-gradient-to-t from-brand-900/90 via-brand-900/20 to-transparent" />
        <div className="absolute inset-0 bg-black/15" />

        <div className="relative z-10 mx-auto flex w-full max-w-[1120px] flex-1 flex-col justify-center px-5 py-24 sm:py-28">
          <div className="max-w-xl">
            <p className="text-xs font-semibold uppercase tracking-wide text-gold-600">
              {t("hero.eyebrow")}
            </p>
            <h1 className="mt-4 font-serif text-4xl font-bold leading-tight text-white sm:text-5xl">
              {t("hero.headlineLead")}{" "}
              <span className="text-gold-600">{t("hero.headlineHighlight")}</span>
            </h1>
            <p className="mt-4 text-white/80">{t("hero.subtitle")}</p>

            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href={MAPS_DIRECTIONS_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full bg-gold-500 px-6 py-3 text-sm font-semibold text-brand-900 hover:bg-gold-400"
              >
                {t("hero.primaryCta")}
              </a>
              <Link
                href="/quran-school"
                className="rounded-full border border-white/40 px-6 py-3 text-sm font-semibold text-white hover:bg-white/10"
              >
                {t("hero.secondaryCta")}
              </Link>
            </div>
          </div>

          <div className="mt-10 flex justify-start lg:justify-end">
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
