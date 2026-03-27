import Image from "next/image";
import { urlFor } from "@/sanity/image";

interface PageHeroProps {
  title: string;
  subtitle?: string;
  backgroundImage?: { asset: { _ref: string } };
}

export function PageHero({ title, subtitle, backgroundImage }: PageHeroProps) {
  return (
    <section className="relative bg-ch-primary-dark text-ch-white py-16 md:py-24 overflow-hidden">
      {backgroundImage && (
        <Image
          src={urlFor(backgroundImage).width(1920).height(600).url()}
          alt=""
          fill
          className="object-cover opacity-30"
          priority
          sizes="100vw"
        />
      )}
      <div className="relative max-w-[1200px] mx-auto px-4 text-center">
        <h1 className="font-heading text-3xl md:text-5xl font-bold mb-3">
          {title}
        </h1>
        {subtitle && (
          <p className="text-lg md:text-xl text-ch-white/80 max-w-2xl mx-auto">
            {subtitle}
          </p>
        )}
      </div>
    </section>
  );
}
