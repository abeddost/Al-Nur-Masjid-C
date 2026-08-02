import Image from "next/image";

export default function ContentPage({
  eyebrow,
  title,
  subtitle,
  body,
  image,
}: {
  eyebrow: string;
  title: string;
  subtitle: string;
  body: string[];
  image?: { src: string; alt: string };
}) {
  return (
    <section className="mx-auto max-w-[1120px] px-5 py-16">
      <p className="text-sm font-semibold uppercase tracking-wide text-brand-500">
        {eyebrow}
      </p>
      <h1 className="mt-3 max-w-2xl font-serif text-4xl font-bold text-brand-900 sm:text-5xl">
        {title}
      </h1>
      <p className="mt-4 max-w-xl text-brand-600">{subtitle}</p>

      {image && (
        <div className="relative mt-10 aspect-[16/9] w-full overflow-hidden rounded-2xl">
          <Image src={image.src} alt={image.alt} fill className="object-cover" />
        </div>
      )}

      <div className="mt-10 max-w-2xl space-y-4 text-brand-600">
        {body.map((p) => (
          <p key={p}>{p}</p>
        ))}
      </div>
    </section>
  );
}
