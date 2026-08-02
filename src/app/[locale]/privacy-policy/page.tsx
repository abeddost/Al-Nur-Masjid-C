import { useTranslations } from "next-intl";

export default function PrivacyPolicyPage() {
  const t = useTranslations("pages.privacyPolicy");

  return (
    <section className="mx-auto max-w-[1120px] px-5 py-16">
      <h1 className="font-serif text-4xl font-bold text-brand-900">
        {t("title")}
      </h1>
      <div className="mt-8 max-w-2xl space-y-4 text-brand-600">
        {t.raw("body").map((p: string) => (
          <p key={p}>{p}</p>
        ))}
      </div>
    </section>
  );
}
