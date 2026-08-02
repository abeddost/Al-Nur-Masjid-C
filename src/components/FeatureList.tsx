import Image from "next/image";

export type Feature = {
  icon: string;
  title: string;
  description: string;
};

export default function FeatureList({ features }: { features: Feature[] }) {
  return (
    <ul className="divide-y divide-brand-100 border-t border-brand-100">
      {features.map((feature) => (
        <li key={feature.title} className="flex items-start gap-4 py-5">
          <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-brand-700">
            <Image src={feature.icon} alt="" width={22} height={22} />
          </span>
          <div>
            <p className="font-serif text-lg font-semibold text-brand-900">
              {feature.title}
            </p>
            <p className="mt-1 text-sm text-brand-600">
              {feature.description}
            </p>
          </div>
        </li>
      ))}
    </ul>
  );
}
