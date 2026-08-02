import { useTranslations } from "next-intl";
import ContentPage from "@/components/ContentPage";

export default function OurOrganisationPage() {
  const t = useTranslations("pages.ourOrganisation");

  return (
    <ContentPage
      eyebrow={t("eyebrow")}
      title={t("title")}
      subtitle={t("subtitle")}
      body={t.raw("body")}
      image={{
        src: "/images/vorstand-afghanisch-islamischer-kulturverein-wiesbaden-ev.webp",
        alt: "Board of the Afghan Islamic Cultural Association Wiesbaden",
      }}
    />
  );
}
