"use client";

import { usePathname } from "@/i18n/navigation";
import { useScrolled } from "@/hooks/useScrolled";
import AnnouncementBar from "./AnnouncementBar";
import Header from "./Header";

export default function SiteHeader() {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const isScrolled = useScrolled();

  // Inner pages: header is already in normal flow, so `sticky` pins it on
  // scroll with no extra spacer needed. Home page: header must reserve zero
  // layout space to float transparently over the hero photo, so it needs
  // `fixed` instead (the hero's own top padding already clears its height).
  if (!isHome) {
    return (
      <div className="sticky top-0 z-30">
        <AnnouncementBar />
        <Header isHome={false} />
      </div>
    );
  }

  return (
    <div className="fixed inset-x-0 top-0 z-30">
      <AnnouncementBar overlay={!isScrolled} />
      <Header overlay={!isScrolled} isHome />
    </div>
  );
}
