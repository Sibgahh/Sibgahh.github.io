"use client";

import { ArrowLeft, ArrowRight } from "lucide-react";
import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";

export interface Gallery4Item {
  id: string;
  title: string;
  description: string;
  href: string;
  image: string;
}

export interface Gallery4Props {
  title?: string;
  description?: string;
  items: Gallery4Item[];
}

const Gallery4 = ({
  title = "Case Studies",
  description = "A curated selection of my recent work — interfaces, motion, and brand systems shipped for real clients and products.",
  items = [],
}: Gallery4Props) => {
  const [carouselApi, setCarouselApi] = useState<CarouselApi | null>(null);
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);

  useEffect(() => {
    if (!carouselApi) return;
    const update = () => {
      setCanScrollPrev(carouselApi.canScrollPrev());
      setCanScrollNext(carouselApi.canScrollNext());
    };
    update();
    carouselApi.on("reInit", update);
    carouselApi.on("select", update);
    return () => {
      carouselApi.off("select", update);
    };
  }, [carouselApi]);

  return (
    <section className="py-24 sm:py-32 bg-[var(--bg)]">
      <div className="container mx-auto px-6 lg:max-w-7xl">
        <div className="mb-12 flex items-end justify-between gap-6 md:mb-16">
          <div className="flex flex-col gap-3 max-w-2xl">
            <h2 className="text-4xl font-semibold tracking-tight md:text-5xl text-white font-[var(--font-display)]">
              {title}
            </h2>
            <p className="text-white/60 text-base leading-relaxed md:text-lg">
              {description}
            </p>
          </div>
          <div className="hidden md:flex gap-2">
            <Button
              onClick={() => carouselApi?.scrollPrev()}
              disabled={!canScrollPrev}
              size="icon"
              variant="ghost"
              className="h-10 w-10 rounded-full border border-white/15 bg-white/5 text-white hover:bg-white/10 hover:border-white/30 disabled:opacity-30"
              aria-label="Previous project"
            >
              <ArrowLeft className="h-4 w-4" />
            </Button>
            <Button
              onClick={() => carouselApi?.scrollNext()}
              disabled={!canScrollNext}
              size="icon"
              variant="ghost"
              className="h-10 w-10 rounded-full border border-white/15 bg-white/5 text-white hover:bg-white/10 hover:border-white/30 disabled:opacity-30"
              aria-label="Next project"
            >
              <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      <div className="w-full">
        <Carousel
          setApi={setCarouselApi}
          opts={{
            breakpoints: {
              "(max-width: 768px)": { dragFree: true },
            },
          }}
          className="relative w-full overflow-hidden"
        >
          <CarouselContent className="md:px-12">
            {items.map((item) => (
              <CarouselItem
                key={item.id}
                className="basis-[85%] sm:basis-1/2 lg:basis-1/3 xl:basis-1/4"
              >
                <a href={item.href} className="group block">
                  <div className="relative aspect-[4/5] overflow-hidden rounded-2xl border border-white/10 bg-white/5">
                    <div className="absolute inset-0 z-10 bg-gradient-to-t from-black/80 via-black/0 to-black/0 transition-opacity duration-500 group-hover:opacity-90" />
                    <img
                      src={item.image}
                      alt={item.title}
                      className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                    />

                    <div className="absolute inset-x-0 bottom-0 z-20 p-6">
                      <div className="mb-2 text-xs font-medium uppercase tracking-widest text-white/60 transition-colors duration-500 group-hover:text-white/80">
                        View Project →
                      </div>
                      <div className="text-xl font-semibold tracking-tight text-white md:text-2xl">
                        {item.title}
                      </div>
                    </div>
                  </div>

                  <div className="mt-5 px-1">
                    <div className="text-sm font-medium text-white/80 md:text-base">
                      {item.title}
                    </div>
                    <div className="mt-1 line-clamp-2 text-sm text-white/50">
                      {item.description}
                    </div>
                  </div>
                </a>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </div>
    </section>
  );
};

export { Gallery4 };
export type { Gallery4Item as Gallery4ItemType };
