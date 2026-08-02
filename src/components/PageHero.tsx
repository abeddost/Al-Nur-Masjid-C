import Image from "next/image";

export default function PageHero({
  eyebrow,
  title,
  description,
  image,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  image: { src: string; alt: string };
}) {
  return (
    <section className="mx-auto max-w-[1120px] px-5 pt-16">
      <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
        <div>
          {eyebrow && (
            <p className="text-sm font-semibold uppercase tracking-wide text-brand-500">
              {eyebrow}
            </p>
          )}
          <h1 className="mt-3 font-serif text-4xl font-bold text-brand-900 sm:text-5xl">
            {title}
          </h1>
          {description && (
            <p className="mt-4 max-w-md text-brand-600">{description}</p>
          )}
        </div>
        <div className="relative aspect-[4/3] overflow-hidden rounded-2xl">
          <Image
            src={image.src}
            alt={image.alt}
            fill
            className="object-cover"
          />
        </div>
      </div>
    </section>
  );
}
