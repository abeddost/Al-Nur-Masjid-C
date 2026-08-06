import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { MAPS_DIRECTIONS_URL } from "@/config/location";

export default function HeaderCtaButtons({
  className = "",
  onNavigate,
  overlay = false,
  layout = "row",
}: {
  className?: string;
  onNavigate?: () => void;
  overlay?: boolean;
  layout?: "row" | "stack";
}) {
  const t = useTranslations("cta");
  const stack = layout === "stack";
  const buttonShape = stack
    ? "w-full justify-center rounded-xl px-5 py-3 text-sm"
    : "whitespace-nowrap rounded-full px-4 py-2 text-xs";

  return (
    <div
      className={`flex ${stack ? "flex-col items-stretch gap-3" : "items-center gap-2"} ${className}`}
    >
      <a
        href={MAPS_DIRECTIONS_URL}
        target="_blank"
        rel="noopener noreferrer"
        className={
          overlay
            ? `flex items-center ${buttonShape} border border-white/40 font-semibold text-white hover:bg-white/10`
            : `flex items-center ${buttonShape} border border-brand-200 font-semibold text-brand-800 hover:bg-brand-50`
        }
      >
        {t("visitUs")}
      </a>
      <Link
        href="/become-member"
        onClick={onNavigate}
        className={
          overlay
            ? `flex items-center ${buttonShape} bg-white/15 font-semibold text-white backdrop-blur-sm hover:bg-white/25`
            : `flex items-center ${buttonShape} bg-brand-700 font-semibold text-white hover:bg-brand-600`
        }
      >
        {t("becomeMember")}
      </Link>
      <Link
        href="/donation-campaign-mosque"
        onClick={onNavigate}
        className={`flex items-center ${buttonShape} bg-gold-500 font-semibold text-brand-900 hover:bg-gold-400`}
      >
        {t("donate")}
      </Link>
    </div>
  );
}
