import Image from "next/image";
import { useTranslations } from "next-intl";
import DonationForm from "./DonationForm";

export default function DonationCampaignPage() {
  const t = useTranslations("pages.donation");

  return (
    <section className="mx-auto max-w-[1120px] px-5 py-16">
      <p className="text-sm font-semibold uppercase tracking-wide text-brand-500">
        {t("eyebrow")}
      </p>
      <h1 className="mt-3 max-w-2xl font-serif text-4xl font-bold text-brand-900 sm:text-5xl">
        {t("title")}
      </h1>
      <p className="mt-4 max-w-xl text-brand-600">{t("subtitle")}</p>

      <div className="relative mt-10 aspect-[16/9] w-full overflow-hidden rounded-2xl">
        <Image
          src="/images/koranunterricht-an-nur.webp"
          alt="Mosque An-Nur donation campaign"
          fill
          className="object-cover"
        />
      </div>

      <div className="mt-10 max-w-2xl space-y-4 text-brand-600">
        {t.raw("body").map((p: string) => (
          <p key={p}>{p}</p>
        ))}
      </div>

      <div className="mt-12 grid gap-6 lg:grid-cols-2">
        <div className="rounded-2xl border border-brand-100 bg-brand-50 p-8">
          <h2 className="font-serif text-xl font-semibold text-brand-900">
            {t("bankDetailsTitle")}
          </h2>
          <p className="mt-1 text-xs text-brand-500">
            {t("bankDetailsNote")}
          </p>
          <dl className="mt-5 space-y-3 text-sm">
            <div>
              <dt className="font-semibold text-brand-800">
                {t("bankAccountHolder")}
              </dt>
              <dd className="text-brand-600">
                Afghanisch Islamischer Kulturverein Wiesbaden und Umgebung
                e.V.
              </dd>
            </div>
            <div>
              <dt className="font-semibold text-brand-800">IBAN</dt>
              <dd className="font-mono text-brand-600">
                DE89 3704 0044 0532 0130 00
              </dd>
            </div>
            <div>
              <dt className="font-semibold text-brand-800">BIC</dt>
              <dd className="font-mono text-brand-600">COBADEFFXXX</dd>
            </div>
            <div>
              <dt className="font-semibold text-brand-800">
                {t("bankReference")}
              </dt>
              <dd className="text-brand-600">{t("bankReferenceValue")}</dd>
            </div>
          </dl>
        </div>

        <DonationForm />
      </div>
    </section>
  );
}
