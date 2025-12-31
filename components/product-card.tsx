"use client";

import { Plus } from "lucide-react";
import Image from "next/image";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { formatFcfa } from "@/lib/utils";
import { useCartStore } from "@/store/cart-store";
import type { Product } from "@/types";

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const addItem = useCartStore((state) => state.addItem);

  const handleAddToCart = () => {
    addItem(product);
    toast.success("Ajouté au panier", {
      description: `${product.name} a été ajouté à votre panier`,
    });
  };

  return (
    <Card className="group py-0 overflow-hidden transition-all hover:shadow-md">
      <CardHeader className="p-0">
        <div className="relative aspect-video w-full overflow-hidden bg-muted">
          {product.image && (
            <Image
              src={product.image || "/placeholder.svg"}
              alt={product.name}
              fill
              className="h-full w-full object-cover transition-transform group-hover:scale-105"
            />
          )}
        </div>
      </CardHeader>
      <CardContent className="p-4">
        <CardTitle className="text-lg">{product.name}</CardTitle>
        <CardDescription className="mt-1 text-sm">
          {product.description}
        </CardDescription>
        <p className="mt-3 text-xl font-bold">{formatFcfa(product.price)}</p>
      </CardContent>
      <CardFooter className="p-4 pt-0">
        <Button className="w-full gap-2" onClick={handleAddToCart}>
          <Plus className="h-4 w-4" />
          Ajouter au panier
        </Button>
      </CardFooter>
    </Card>
  );
}
