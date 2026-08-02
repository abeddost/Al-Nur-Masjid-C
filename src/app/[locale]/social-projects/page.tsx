import { useTranslations } from "next-intl";
import ContentPage from "@/components/ContentPage";

export default function SocialProjectsPage() {
  const t = useTranslations("pages.socialProjects");

  return (
    <ContentPage
      eyebrow={t("eyebrow")}
      title={t("title")}
      subtitle={t("subtitle")}
      body={t.raw("body")}
      image={{
        src: "/images/soziale-projekte-hand.webp",
        alt: "Social projects of Mosque An-Nur",
      }}
    />
  );
}
