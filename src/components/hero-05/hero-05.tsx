import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowUpRight, CirclePlay } from "lucide-react";
import { SiInstagram } from "@icons-pack/react-simple-icons";
import { client } from "@/src/sanity/client";
import { HeroImageCarousel } from "@/src/components/hero-05/HeroImageCarousel";

async function getData() {
  const query = "*[_type == 'heroImage'][0]";
  const data = await client.fetch(query);
  return data;
}

export default async function Hero05() {
  const data = await getData();

  const images = [data.image1, data.image2].filter(Boolean); // solo incluye si existen

  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center py-6 lg:py-0">
      <div className="w-full mx-auto grid lg:grid-cols-2 gap-12 items-center">
        <div>
          <Badge className="rounded-full py-1 border-none">
            Temporada invierno 2025
          </Badge>
          <h1 className="mt-6 max-w-[17ch] text-4xl md:text-5xl lg:text-[2.75rem] xl:text-5xl font-bold !leading-[1.2] tracking-tight">
            La mejor ropa de Argentina
          </h1>
          <p className="mt-6 max-w-[60ch] text-lg">
            Nuestra tienda es más que moda: es una experiencia de estilo donde
            cada prenda está pensada para acompañarte, inspirarte y expresarte.
          </p>
          <div className="mt-12 flex lg:flex-row flex-col items-center gap-4">
            <Button size="lg" className="rounded-full text-base">
              Contactar por WhatsApp <ArrowUpRight className="h-5 w-5" />
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="rounded-full text-base shadow-none"
            >
              <SiInstagram className="h-5 w-5" /> Seguinos en Instagram
            </Button>
          </div>
        </div>

        <HeroImageCarousel images={images} />
      </div>
    </div>
  );
}
