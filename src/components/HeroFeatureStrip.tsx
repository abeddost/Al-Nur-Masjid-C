import Image from "next/image";

export type HeroFeature = {
  icon: string;
  label: string;
};

export default function HeroFeatureStrip({
  features,
}: {
  features: HeroFeature[];
}) {
  return (
    <div className="flex flex-wrap gap-4 rounded-2xl border border-white/15 bg-brand-900/60 px-5 py-4 backdrop-blur-md sm:gap-6">
      {features.map((f) => (
        <div key={f.label} className="flex items-center gap-2.5">
          <Image src={f.icon} alt="" width={20} height={20} />
          <span className="text-sm font-medium text-white">{f.label}</span>
        </div>
      ))}
    </div>
  );
}
