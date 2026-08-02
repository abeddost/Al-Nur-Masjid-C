import Image from "next/image";
import { Link } from "@/i18n/navigation";

export default function TeaserSection({
  eyebrow,
  title,
  text,
  image,
  href,
  cta,
  reverse = false,
}: {
  eyebrow: string;
  title: string;
  text: string;
  image: { src: string; alt: string };
  href?: string;
  cta?: string;
  reverse?: boolean;
}) {
  return (
    <section className="mx-auto max-w-[1120px] px-5 py-10">
      <div
        className={`grid gap-8 rounded-2xl border border-brand-100 bg-brand-50 p-8 lg:grid-cols-2 lg:items-center ${
          reverse ? "lg:[&>*:first-child]:order-2" : ""
        }`}
      >
        <div className="relative aspect-[16/10] overflow-hidden rounded-xl">
          <Image src={image.src} alt={image.alt} fill className="object-cover" />
        </div>
        <div>
          <p className="text-sm font-semibold uppercase tracking-wide text-brand-500">
            {eyebrow}
          </p>
          <h2 className="mt-2 font-serif text-2xl font-bold text-brand-900 sm:text-3xl">
            {title}
          </h2>
          <p className="mt-3 text-brand-600">{text}</p>
          {href && cta && (
            <Link
              href={href}
              className="mt-5 inline-flex items-center justify-center rounded-full bg-brand-700 px-6 py-3 text-sm font-semibold text-white hover:bg-brand-600"
            >
              {cta}
            </Link>
          )}
        </div>
      </div>
    </section>
  );
}
