import { useTranslations } from "next-intl";
import ContentPage from "@/components/ContentPage";

export default function QuranSchoolPage() {
  const t = useTranslations("pages.quranSchool");

  return (
    <ContentPage
      eyebrow={t("eyebrow")}
      title={t("title")}
      subtitle={t("subtitle")}
      body={t.raw("body")}
      image={{
        src: "/images/koranunterricht-wiesbaden.webp",
        alt: "Quran lessons at Mosque An-Nur",
      }}
    />
  );
}
