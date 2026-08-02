import { useTranslations } from "next-intl";
import MembershipForm from "./MembershipForm";

export default function BecomeMemberPage() {
  const t = useTranslations("membership");

  return (
    <section className="mx-auto max-w-[1120px] px-5 py-16">
      <p className="text-sm font-semibold uppercase tracking-wide text-brand-500">
        {t("eyebrow")}
      </p>
      <h1 className="mt-3 max-w-2xl font-serif text-4xl font-bold text-brand-900 sm:text-5xl">
        {t("title")}
      </h1>
      <p className="mt-4 max-w-xl text-brand-600">{t("subtitle")}</p>

      <div className="mt-10 max-w-xl">
        <MembershipForm />
      </div>
    </section>
  );
}
