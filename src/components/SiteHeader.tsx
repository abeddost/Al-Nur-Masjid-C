"use client";

import { usePathname } from "@/i18n/navigation";
import AnnouncementBar from "./AnnouncementBar";
import Header from "./Header";

export default function SiteHeader() {
  const pathname = usePathname();
  const isHome = pathname === "/";

  if (!isHome) {
    return (
      <>
        <AnnouncementBar />
        <Header />
      </>
    );
  }

  return (
    <div className="absolute inset-x-0 top-0 z-30">
      <AnnouncementBar overlay />
      <Header overlay />
    </div>
  );
}
