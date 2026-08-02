import Image from "next/image";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import LanguageSwitcher from "./LanguageSwitcher";

export default function Footer() {
  const t = useTranslations();

  return (
    <footer className="bg-brand-700">
      <div className="mx-auto flex max-w-[1120px] flex-col items-center gap-6 px-5 py-16 text-center">
        <Image
          src="/images/logo-an-nur-full-neg.svg"
          alt="Mosque An-Nur"
          width={260}
          height={87}
        />
        <div className="text-white">
          <p className="text-lg font-serif font-semibold">
            {t("footer.orgLine1")}
          </p>
          <p className="mt-1 text-sm text-white/80">{t("footer.orgLine2")}</p>
        </div>

        <div className="w-full border-t border-white/15" />

        <div className="flex w-full flex-col items-center justify-between gap-4 sm:flex-row">
          <ul className="flex gap-6 text-sm text-white/80">
            <li>
              <Link href="/site-notice" className="hover:text-white">
                {t("footer.siteNotice")}
              </Link>
            </li>
            <li>
              <Link href="/privacy-policy" className="hover:text-white">
                {t("footer.privacyPolicy")}
              </Link>
            </li>
          </ul>
          <LanguageSwitcher variant="dark" />
        </div>
      </div>
    </footer>
  );
}
