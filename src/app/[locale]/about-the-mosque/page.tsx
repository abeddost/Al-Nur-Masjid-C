import Image from "next/image";
import { useTranslations } from "next-intl";

export default function AboutMosquePage() {
  const t = useTranslations("pages.aboutMosque");

  return (
    <>
      <section className="mx-auto max-w-[1120px] px-5 pt-16">
        <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
          <div>
            <h1 className="font-serif text-4xl font-bold text-brand-900 sm:text-5xl">
              {t("title")}
            </h1>
            <p className="mt-4 max-w-md text-brand-600">{t("subtitle")}</p>
          </div>
          <div className="relative aspect-[4/3] overflow-hidden rounded-2xl">
            <Image
              src="/images/freitagspredigt-moschee-wiesbaden-768x512.webp"
              alt="Friday sermon at Mosque An-Nur, Wiesbaden"
              fill
              className="object-cover"
            />
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-[1120px] px-5 py-16">
        <div className="grid gap-6 lg:grid-cols-[1fr_2fr]">
          <h2 className="font-serif text-3xl font-bold text-brand-900">
            {t("homeTitle")}
          </h2>
          <p className="text-brand-600">{t("homeIntro")}</p>
        </div>

        <div className="mt-10 grid gap-4 sm:grid-cols-2">
          <div className="relative aspect-[4/3] overflow-hidden rounded-2xl">
            <Image
              src="/images/mullah-predigt-768x512.webp"
              alt="Imam of Mosque An-Nur"
              fill
              className="object-cover"
            />
          </div>
          <div className="relative aspect-[4/3] overflow-hidden rounded-2xl">
            <Image
              src="/images/moschee-mitglied-768x512.webp"
              alt="Member of the congregation"
              fill
              className="object-cover"
            />
          </div>
        </div>

        <div className="mt-4 grid gap-4 sm:grid-cols-3">
          <div className="relative aspect-square overflow-hidden rounded-2xl">
            <Image
              src="/images/vorstand-afghanisch-islamischer-kulturverein-wiesbaden-ev-768x512.webp"
              alt="Board of the Afghan Islamic Cultural Association Wiesbaden"
              fill
              className="object-cover"
            />
          </div>
          <div className="relative aspect-square overflow-hidden rounded-2xl">
            <Image
              src="/images/glaeubige-beim-beten-768x512.webp"
              alt="Congregation in prayer"
              fill
              className="object-cover"
            />
          </div>
          <div className="relative aspect-square overflow-hidden rounded-2xl">
            <Image
              src="/images/zuhoerer-der-freitagspredigt.webp"
              alt="Congregation listening to the Friday sermon"
              fill
              className="object-cover"
            />
          </div>
        </div>
      </section>
    </>
  );
}
