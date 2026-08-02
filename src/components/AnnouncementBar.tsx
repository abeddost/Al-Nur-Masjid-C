import LanguageSwitcher from "./LanguageSwitcher";

export default function AnnouncementBar({
  overlay = false,
}: {
  overlay?: boolean;
}) {
  return (
    <div className={`hidden lg:block ${overlay ? "bg-transparent" : "bg-brand-700"}`}>
      <div
        dir="ltr"
        className="mx-auto flex max-w-[1120px] items-center justify-end gap-4 px-5 py-2"
      >
        <LanguageSwitcher variant="dark" />
      </div>
    </div>
  );
}
