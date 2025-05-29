"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { urlFor } from "@/src/sanity/client";
import { ChevronLeft, ChevronRight } from "lucide-react";

export function HeroImageCarousel({ images }: { images: any[] }) {
  const [index, setIndex] = useState(0);

  const goTo = (i: number) => setIndex(i);
  const next = () => setIndex((prev) => (prev + 1) % images.length);
  const prev = () =>
    setIndex((prev) => (prev - 1 + images.length) % images.length);

  useEffect(() => {
    const interval = setInterval(() => {
      next();
    }, 2500);

    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <div className="relative w-full flex flex-col items-center">
      {/* Imagen */}
      <Image
        src={urlFor(images[index]).url()}
        alt={`Hero image ${index + 1}`}
        className="object-cover w-full h-auto max-h-[600px] rounded-lg transition-opacity duration-500"
        width={500}
        height={500}
        priority
      />

      {/* Flechas */}
      <button
        onClick={prev}
        className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/70 rounded-full p-2 shadow-lg hover:bg-white"
        aria-label="Anterior"
      >
        <ChevronLeft className="w-6 h-6 text-primary" />
      </button>

      <button
        onClick={next}
        className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/70 rounded-full p-2 shadow-lg hover:bg-white"
        aria-label="Siguiente"
      >
        <ChevronRight className="w-6 h-6 text-primary" />
      </button>

      {/* Indicadores dots */}
      <div className="flex gap-2 mt-4">
        {images.map((_, i) => (
          <button
            key={i}
            onClick={() => goTo(i)}
            className={`h-2 w-2 rounded-full transition-all ${
              index === i ? "bg-primary" : "bg-gray-300"
            }`}
            aria-label={`Ir a imagen ${i + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
