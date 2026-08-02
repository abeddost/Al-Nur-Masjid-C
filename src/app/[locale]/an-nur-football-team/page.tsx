import Image from "next/image";
import { useTranslations } from "next-intl";

const gallery = [1, 2, 3, 4, 5].map(
  (n) => `/images/fussballgruppe-0${n}-768x512.webp`
);

export default function FootballTeamPage() {
  const t = useTranslations("pages.footballTeam");

  return (
    <section className="mx-auto max-w-[1120px] px-5 py-16">
      <p className="text-sm font-semibold uppercase tracking-wide text-brand-500">
        {t("eyebrow")}
      </p>
      <h1 className="mt-3 max-w-2xl font-serif text-4xl font-bold text-brand-900 sm:text-5xl">
        {t("title")}
      </h1>
      <p className="mt-4 max-w-xl text-brand-600">{t("subtitle")}</p>

      <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {gallery.map((src) => (
          <div
            key={src}
            className="relative aspect-[4/3] overflow-hidden rounded-2xl"
          >
            <Image
              src={src}
              alt="An-Nur football team"
              fill
              className="object-cover"
            />
          </div>
        ))}
      </div>

      <div className="mt-10 max-w-2xl space-y-4 text-brand-600">
        {t.raw("body").map((p: string) => (
          <p key={p}>{p}</p>
        ))}
      </div>
    </section>
  );
}
