import { useTranslations } from "next-intl";
import { MAPS_EMBED_SRC, MAPS_DIRECTIONS_URL, MOSQUE_ADDRESS } from "@/config/location";

export default function MapSection() {
  const t = useTranslations("pages.home");

  return (
    <section className="mx-auto max-w-[1120px] px-5 py-16">
      <div className="grid gap-8 lg:grid-cols-[1fr_1.4fr] lg:items-center">
        <div>
          <h2 className="font-serif text-3xl font-bold text-brand-900">
            {t("mapTitle")}
          </h2>
          <p className="mt-3 text-brand-600">{t("mapSubtitle")}</p>
          <p className="mt-4 font-medium text-brand-800">{MOSQUE_ADDRESS}</p>
          <a
            href={MAPS_DIRECTIONS_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-5 inline-flex items-center justify-center rounded-full bg-brand-700 px-6 py-3 text-sm font-semibold text-white hover:bg-brand-600"
          >
            {t("visitUsButton")}
          </a>
        </div>
        <div className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-brand-100">
          <iframe
            src={MAPS_EMBED_SRC}
            title="Map"
            loading="lazy"
            className="absolute inset-0 h-full w-full border-0"
          />
        </div>
      </div>
    </section>
  );
}
