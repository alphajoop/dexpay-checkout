"use client";

import Autoplay from "embla-carousel-autoplay";
import {
  ArrowRight,
  Flame,
  Search,
  ShoppingBag,
  Star,
  TrendingUp,
} from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  type CarouselApi,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { Input } from "@/components/ui/input";

import { PRODUCTS } from "@/data/products";
import { formatFcfa } from "@/lib/utils";
import { useCartStore } from "@/store/cart-store";

export default function Hero() {
  const [searchQuery, setSearchQuery] = useState("");
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);

  const addItem = useCartStore((state) => state.addItem);

  const featuredProducts = PRODUCTS.filter((product) => product.trending);

  useEffect(() => {
    if (!api) return;

    setCurrent(api.selectedScrollSnap());

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap());
    });
  }, [api]);

  return (
    <section className="from-background to-accent/20 relative bg-linear-to-b">
      <div className="container relative mx-auto px-4 py-16 md:px-8 lg:px-12 lg:py-20">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
          {/* LEFT */}
          <div className="space-y-8">
            <Badge variant="outline" className="rounded-full px-4 py-2">
              <TrendingUp className="mr-1 size-4!" />
              Nouvelle Collection 2025
            </Badge>

            <h1 className="text-5xl font-bold leading-tight md:text-6xl lg:text-7xl">
              Découvrez Votre Style Parfait
            </h1>

            <p className="text-muted-foreground max-w-lg text-xl">
              Explorez notre collection sélectionnée de produits premium.
            </p>

            <div className="relative max-w-md">
              <Input
                type="search"
                placeholder="Rechercher des produits..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="h-14 rounded-full pl-12 pr-4 text-lg"
              />
              <Search className="text-muted-foreground absolute left-4 top-1/2 size-5 -translate-y-1/2" />
              <Button
                size="lg"
                className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full px-6"
              >
                Rechercher
              </Button>
            </div>

            <div className="flex gap-4">
              <Button size="lg" className="gap-2 rounded-full px-8">
                Acheter Maintenant <ArrowRight className="size-4" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="gap-2 rounded-full px-8"
              >
                <ShoppingBag className="size-4" />
                Voir le Catalogue
              </Button>
            </div>
          </div>

          {/* RIGHT – CAROUSEL */}
          <div className="flex flex-col gap-6">
            <Carousel
              setApi={setApi}
              opts={{ loop: true }}
              plugins={[
                Autoplay({
                  delay: 5000,
                  stopOnInteraction: false,
                }),
              ]}
              className="w-full"
            >
              <CarouselContent>
                {featuredProducts.map((product) => (
                  <CarouselItem key={product.id}>
                    <Card className="relative h-128 overflow-hidden">
                      <CardContent className="p-0">
                        <Image
                          src={product.image || ""}
                          alt={product.name}
                          fill
                          className="object-cover"
                          sizes="(max-width: 768px) 100vw, 50vw"
                        />

                        <div className="from-background/90 via-background/40 absolute inset-0 bg-linear-to-t to-transparent" />

                        <div className="absolute inset-0 flex flex-col justify-end p-8">
                          <Badge className="mb-3 w-fit rounded-full">
                            {product.tag}
                          </Badge>

                          <h2 className="text-4xl font-bold">{product.name}</h2>

                          <p className="mt-2 text-lg text-muted-foreground">
                            {product.description}
                          </p>

                          <div className="mt-4 flex items-center gap-4">
                            <Button
                              size="lg"
                              className="rounded-full"
                              onClick={() => addItem(product)}
                            >
                              Ajouter au Panier
                            </Button>

                            <div className="flex items-center gap-1">
                              <Star className="size-5 fill-current" />
                              <span className="font-medium">
                                {product.rating}
                              </span>
                              <span className="text-muted-foreground">
                                ({product.reviews} avis)
                              </span>
                            </div>
                          </div>

                          <div className="mt-3 text-2xl font-bold">
                            {formatFcfa(product.price)}
                          </div>
                        </div>

                        {product.trending && (
                          <div className="absolute right-6 top-6 flex items-center gap-1 rounded-full bg-background/70 px-3 py-1 text-sm backdrop-blur">
                            <Flame className="size-4" /> Tendance
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  </CarouselItem>
                ))}
              </CarouselContent>
            </Carousel>

            {/* DOTS */}
            <div className="flex justify-center gap-3">
              {featuredProducts.map((product, index) => (
                <button
                  type="button"
                  key={product.id}
                  onClick={() => api?.scrollTo(index)}
                  aria-label={`Aller au slide ${index + 1}`}
                  className={`h-3 w-3 rounded-full transition-all ${
                    current === index
                      ? "bg-primary"
                      : "bg-foreground/20 hover:bg-foreground/40"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
