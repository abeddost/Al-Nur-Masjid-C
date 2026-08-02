import { useTranslations } from "next-intl";

export default function ContactPage() {
  const t = useTranslations("pages.contact");
  const c = useTranslations("common");

  return (
    <section className="mx-auto max-w-[1120px] px-5 py-16">
      <p className="text-sm font-semibold uppercase tracking-wide text-brand-500">
        {t("eyebrow")}
      </p>
      <h1 className="mt-3 max-w-2xl font-serif text-4xl font-bold text-brand-900 sm:text-5xl">
        {t("title")}
      </h1>
      <p className="mt-4 max-w-xl text-brand-600">{t("subtitle")}</p>

      <div className="mt-10 grid gap-10 lg:grid-cols-2">
        <div className="space-y-4 text-brand-600">
          {t.raw("body").map((p: string) => (
            <p key={p}>{p}</p>
          ))}
        </div>

        <div className="rounded-2xl border border-brand-100 bg-brand-50 p-8">
          <p className="font-serif text-lg font-semibold text-brand-900">
            {t("addressLine1")}
          </p>
          <p className="text-brand-600">{t("addressLine2")}</p>

          <dl className="mt-6 space-y-3 text-sm">
            <div className="flex gap-2">
              <dt className="font-semibold text-brand-800">
                {c("email")}:
              </dt>
              <dd>
                <a
                  href="mailto:info@afgkv.de"
                  className="text-brand-600 hover:text-brand-800"
                >
                  info@afgkv.de
                </a>
              </dd>
            </div>
            <div className="flex gap-2">
              <dt className="font-semibold text-brand-800">
                {c("phone")}:
              </dt>
              <dd className="text-brand-600">+49 176 30501624</dd>
            </div>
          </dl>
        </div>
      </div>
    </section>
  );
}
