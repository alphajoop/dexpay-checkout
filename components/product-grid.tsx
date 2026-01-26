"use client";

import { Flame, Heart, ShoppingCart, Star, TrendingUp } from "lucide-react";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { PRODUCTS } from "@/data/products";
import { formatFcfa } from "@/lib/utils";
import { useCartStore } from "@/store/cart-store";

export default function ProductGrid() {
  const addItem = useCartStore((state) => state.addItem);

  const handleAddToCart = (product: (typeof PRODUCTS)[0]) => {
    addItem(product);
  };

  return (
    <section className="from-background to-accent/20 relative bg-linear-to-b">
      <div className="relative container mx-auto px-4 py-16 md:px-8 lg:px-12 lg:py-20">
        <div className="mb-12">
          <Badge
            variant="outline"
            className="rounded-full px-4 py-2 mb-4 w-fit"
          >
            <TrendingUp className="mr-1 size-4!" />
            Collection Complète
          </Badge>
          <h2 className="text-balance text-4xl font-bold tracking-tight sm:text-5xl mb-4">
            Découvrez nos produits
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl">
            Sélectionnez vos articles et ajoutez-les à votre panier. Chaque
            produit est choisi pour sa qualité et son style exceptionnel.
          </p>
        </div>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4">
          {PRODUCTS.map((product) => (
            <div key={product.id} className="group relative">
              <div className="relative h-full overflow-hidden rounded-2xl bg-linear-to-br from-background/80 to-background/40 backdrop-blur-xl shadow-md transition-all duration-100">
                {/* Image container */}
                <div className="relative h-80 overflow-hidden">
                  <Image
                    src={product.image || ""}
                    alt={product.name}
                    className="h-full w-full object-cover transition-all duration-100 group-hover:scale-110 group-hover:brightness-110"
                    fill
                    loading="lazy"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, (max-width: 1536px) 33vw, 25vw"
                  />

                  {/* Gradient overlay */}
                  <div className="absolute inset-0 bg-linear-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

                  {/* Floating badges */}
                  <div className="absolute top-4 left-4 flex flex-wrap gap-2 z-20">
                    {product.trending && (
                      <Badge className="bg-linear-to-r from-orange-500 to-red-500 text-white border-0 shadow-lg animate-pulse backdrop-blur-sm">
                        <Flame className="mr-1 size-3" />
                        Tendance
                      </Badge>
                    )}
                    {product.tag && (
                      <Badge className="bg-background/90 backdrop-blur-md border-0 shadow-lg text-foreground">
                        {product.tag}
                      </Badge>
                    )}
                  </div>

                  {/* Quick actions */}
                  <div className="absolute top-4 right-4 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-x-4 group-hover:translate-x-0 z-20">
                    <Button
                      size="sm"
                      variant="secondary"
                      className="rounded-full h-10 w-10 p-0"
                    >
                      <Heart className="size-4" />
                    </Button>
                    <Button
                      size="sm"
                      className="rounded-full h-10 w-10 p-0"
                      onClick={() => handleAddToCart(product)}
                    >
                      <ShoppingCart className="size-4" />
                    </Button>
                  </div>

                  {/* Product info overlay on hover */}
                  <div className="absolute bottom-0 left-0 right-0 p-6 transform translate-y-full group-hover:translate-y-0 transition-transform duration-700 z-10">
                    <div className="space-y-3">
                      <h3 className="text-background font-bold text-xl drop-shadow-lg">
                        {product.name}
                      </h3>
                      <p className="text-background/90 text-sm drop-shadow line-clamp-2">
                        {product.description}
                      </p>
                      <div className="flex items-center justify-between">
                        <div className="text-background font-bold text-2xl drop-shadow-lg">
                          {formatFcfa(product.price)}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Content area */}
                <div className="p-6 space-y-4">
                  {/* Product title */}
                  <div className="space-y-2">
                    <h3 className="font-bold text-lg leading-tight group-hover:text-primary transition-colors duration-100">
                      {product.name}
                    </h3>
                    <p className="text-muted-foreground text-sm line-clamp-2 leading-relaxed">
                      {product.description}
                    </p>
                  </div>

                  {/* Rating */}
                  {product.rating && (
                    <div className="flex items-center gap-3">
                      <div className="flex items-center gap-1">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={`star-${product.id}-${i}`}
                            className={`size-4 transition-colors ${
                              i < Math.floor(product.rating || 0)
                                ? "fill-yellow-400 text-yellow-400"
                                : "fill-muted text-muted"
                            }`}
                          />
                        ))}
                        <span className="ml-2 font-medium text-sm">
                          {product.rating}
                        </span>
                      </div>
                      {product.reviews && (
                        <span className="text-muted-foreground text-xs">
                          ({product.reviews} avis)
                        </span>
                      )}
                    </div>
                  )}

                  {/* Price and action */}
                  <div className="flex items-center justify-between pt-4 border-t border-border/30">
                    <div className="space-y-1">
                      <div className="text-2xl font-bold tracking-tight bg-linear-to-r from-foreground to-foreground/70 bg-clip-text">
                        {formatFcfa(product.price)}
                      </div>
                      <div className="text-muted-foreground text-xs uppercase tracking-wider">
                        {product.currency}
                      </div>
                    </div>

                    <Button
                      className="rounded-full px-6"
                      onClick={() => handleAddToCart(product)}
                    >
                      <ShoppingCart className="size-4 mr-2" />
                      Ajouter
                    </Button>
                  </div>
                </div>

                {/* Shine effect on hover */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none">
                  <div className="absolute inset-0 bg-linear-to-r from-transparent via-white/10 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-100" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
