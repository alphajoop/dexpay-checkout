"use client";

import { Store } from "lucide-react";
import { CartButton } from "@/components/cart-button";
import { ProductCard } from "@/components/product-card";
import { PRODUCTS } from "@/data/products";

export default function Home() {
  return (
    <div className="min-h-screen">
      <header className="sticky top-0 z-50 border-b bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <Store className="h-6 w-6" />
            <span className="text-lg font-semibold">Boutique</span>
          </div>
          <CartButton />
        </div>
      </header>

      <main className="container py-8">
        <div className="mb-8">
          <h1 className="text-balance text-3xl font-bold tracking-tight sm:text-4xl">
            Découvrez nos produits
          </h1>
          <p className="mt-2 text-pretty text-muted-foreground">
            Sélectionnez vos articles et ajoutez-les à votre panier
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {PRODUCTS.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </main>
    </div>
  );
}
