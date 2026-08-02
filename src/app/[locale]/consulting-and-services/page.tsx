import { useTranslations } from "next-intl";
import ContentPage from "@/components/ContentPage";

export default function ConsultingPage() {
  const t = useTranslations("pages.consulting");

  return (
    <ContentPage
      eyebrow={t("eyebrow")}
      title={t("title")}
      subtitle={t("subtitle")}
      body={t.raw("body")}
      image={{
        src: "/images/islam-beratung.webp",
        alt: "Consulting and services at Mosque An-Nur",
      }}
    />
  );
}
