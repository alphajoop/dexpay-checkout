"use client";

import { Store } from "lucide-react";
import { CartButton } from "@/components/cart-button";
import { ProductCard } from "@/components/product-card";
import type { Product } from "@/types";

const PRODUCTS: Product[] = [
  {
    id: "1",
    name: "Casque Audio Sans Fil",
    description: "Réduction de bruit active, autonomie 30h",
    price: 45000,
    currency: "XOF",
    image:
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&q=80",
  },
  {
    id: "2",
    name: "Montre Connectée",
    description: "Suivi fitness et notifications intelligentes",
    price: 35000,
    currency: "XOF",
    image:
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&q=80",
  },
  {
    id: "3",
    name: "Sac à Dos Design",
    description: "Imperméable avec compartiment laptop",
    price: 25000,
    currency: "XOF",
    image:
      "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800&q=80",
  },
  {
    id: "4",
    name: "Lunettes de Soleil",
    description: "Protection UV400, monture premium",
    price: 15000,
    currency: "XOF",
    image:
      "https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=800&q=80",
  },
  {
    id: "5",
    name: "Sneakers Premium",
    description: "Confort optimal, design minimaliste",
    price: 55000,
    currency: "XOF",
    image:
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&q=80",
  },
  {
    id: "6",
    name: "Appareil Photo",
    description: "Capteur haute résolution, objectif polyvalent",
    price: 85000,
    currency: "XOF",
    image:
      "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=800&q=80",
  },
  {
    id: "7",
    name: "T-Shirt Premium",
    description: "Coton bio, coupe ajustée",
    price: 12000,
    currency: "XOF",
    image:
      "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800&q=80",
  },
  {
    id: "8",
    name: "Parfum Signature",
    description: "Fragrance élégante longue durée",
    price: 28000,
    currency: "XOF",
    image:
      "https://images.unsplash.com/photo-1541643600914-78b084683601?w=800&q=80",
  },
];

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
