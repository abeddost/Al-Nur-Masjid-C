import { useTranslations } from "next-intl";

export default function SiteNoticePage() {
  const t = useTranslations("pages.siteNotice");

  return (
    <section className="mx-auto max-w-[1120px] px-5 py-16">
      <h1 className="font-serif text-4xl font-bold text-brand-900">
        {t("title")}
      </h1>
      <div className="mt-8 max-w-2xl space-y-2 text-brand-600">
        {t.raw("body").map((line: string) => (
          <p key={line}>{line}</p>
        ))}
      </div>
    </section>
  );
}
