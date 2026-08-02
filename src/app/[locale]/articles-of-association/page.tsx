import { useTranslations } from "next-intl";

export default function ArticlesOfAssociationPage() {
  const t = useTranslations("pages.articlesOfAssociation");
  const sections: { heading: string; body: string }[] = t.raw("sections");

  return (
    <section className="mx-auto max-w-[1120px] px-5 py-16">
      <p className="text-sm font-semibold uppercase tracking-wide text-brand-500">
        {t("eyebrow")}
      </p>
      <h1 className="mt-3 max-w-2xl font-serif text-4xl font-bold text-brand-900 sm:text-5xl">
        {t("title")}
      </h1>
      <p className="mt-4 max-w-xl text-brand-600">{t("subtitle")}</p>

      <div className="mt-10 max-w-2xl divide-y divide-brand-100 border-t border-brand-100">
        {sections.map((section) => (
          <div key={section.heading} className="py-6">
            <h2 className="font-serif text-xl font-semibold text-brand-900">
              {section.heading}
            </h2>
            <p className="mt-2 text-brand-600">{section.body}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
