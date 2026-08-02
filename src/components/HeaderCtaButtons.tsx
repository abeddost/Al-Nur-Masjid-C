import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { MAPS_DIRECTIONS_URL } from "@/config/location";

export default function HeaderCtaButtons({
  className = "",
  onNavigate,
}: {
  className?: string;
  onNavigate?: () => void;
}) {
  const t = useTranslations("cta");

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <a
        href={MAPS_DIRECTIONS_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="whitespace-nowrap rounded-full border border-brand-200 px-4 py-2 text-xs font-semibold text-brand-800 hover:bg-brand-50"
      >
        {t("visitUs")}
      </a>
      <Link
        href="/become-member"
        onClick={onNavigate}
        className="whitespace-nowrap rounded-full bg-brand-700 px-4 py-2 text-xs font-semibold text-white hover:bg-brand-600"
      >
        {t("becomeMember")}
      </Link>
      <Link
        href="/donation-campaign-mosque"
        onClick={onNavigate}
        className="whitespace-nowrap rounded-full bg-gold-500 px-4 py-2 text-xs font-semibold text-brand-900 hover:bg-gold-400"
      >
        {t("donate")}
      </Link>
    </div>
  );
}
