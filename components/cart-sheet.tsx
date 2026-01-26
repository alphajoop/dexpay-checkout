"use client";

import { Minus, Plus, ShoppingBag, Trash2 } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { formatFcfa } from "@/lib/utils";
import { useCartStore } from "@/store/cart-store";
import { CheckoutModal } from "./checkout-modal";

interface CartSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function CartSheet({ open, onOpenChange }: CartSheetProps) {
  const { items, updateQuantity, removeItem, getTotalPrice } = useCartStore();
  const [checkoutOpen, setCheckoutOpen] = useState(false);

  const handleCheckout = () => {
    onOpenChange(false);
    setCheckoutOpen(true);
  };

  return (
    <>
      <Sheet open={open} onOpenChange={onOpenChange}>
        <SheetContent className="flex w-full flex-col sm:max-w-lg px-4 pb-4 bg-background/95 backdrop-blur-xl">
          <SheetHeader className="border-b border-border/50 pb-4">
            <SheetTitle className="flex items-center gap-2">
              <ShoppingBag className="h-5 w-5" />
              Panier
              {items.length > 0 && (
                <Badge variant="secondary" className="ml-2">
                  {items.length}
                </Badge>
              )}
            </SheetTitle>
          </SheetHeader>

          {items.length === 0 ? (
            <div className="flex flex-1 flex-col items-center justify-center gap-4 text-center py-12">
              <div className="flex items-center gap-2 rounded-full bg-primary/10 p-4">
                <ShoppingBag className="h-8 w-8 text-primary" />
              </div>
              <div className="space-y-2">
                <h3 className="font-semibold text-lg">Votre panier est vide</h3>
                <p className="text-sm text-muted-foreground max-w-xs">
                  Découvrez nos produits premium et ajoutez-les à votre panier
                </p>
              </div>
              <Button
                variant="outline"
                className="rounded-full px-6"
                onClick={() => onOpenChange(false)}
              >
                Continuer vos achats
              </Button>
            </div>
          ) : (
            <>
              <div className="flex-1 overflow-auto py-4">
                <div className="space-y-4">
                  {items.map((item) => (
                    <div
                      key={item.id}
                      className="flex gap-4 p-3 rounded-xl bg-background/50 border border-border/30"
                    >
                      <div className="relative h-20 w-20 overflow-hidden rounded-lg bg-muted/50">
                        {item.image && (
                          <Image
                            src={item.image || "/placeholder.svg"}
                            alt={item.name}
                            fill
                            className="object-cover transition-transform hover:scale-105 duration-300"
                          />
                        )}
                      </div>

                      <div className="flex flex-1 flex-col gap-2">
                        <div className="flex items-start justify-between gap-2">
                          <div className="flex-1">
                            <h4 className="font-medium leading-tight text-sm">
                              {item.name}
                            </h4>
                            <p className="mt-1 text-sm font-bold text-primary">
                              {formatFcfa(item.price)}
                            </p>
                          </div>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-8 w-8 rounded-full hover:bg-destructive/10 hover:text-destructive transition-colors"
                            onClick={() => removeItem(item.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>

                        <div className="flex items-center gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            className="h-8 w-8 rounded-full bg-background/50 border-border/50 hover:bg-background/80"
                            onClick={() =>
                              updateQuantity(item.id, item.quantity - 1)
                            }
                          >
                            <Minus className="h-3 w-3" />
                          </Button>
                          <span className="w-8 text-center text-sm font-medium">
                            {item.quantity}
                          </span>
                          <Button
                            variant="outline"
                            size="sm"
                            className="h-8 w-8 rounded-full bg-background/50 border-border/50 hover:bg-background/80"
                            onClick={() =>
                              updateQuantity(item.id, item.quantity + 1)
                            }
                          >
                            <Plus className="h-3 w-3" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-4 border-t border-border/50 pt-4">
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Sous-total</span>
                    <span>{formatFcfa(getTotalPrice())}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Livraison</span>
                    <span className="text-green-600">Gratuite</span>
                  </div>
                  <div className="flex items-center justify-between font-medium">
                    <span>Total</span>
                    <span className="text-lg font-bold text-primary">
                      {formatFcfa(getTotalPrice())}
                    </span>
                  </div>
                </div>
                <Button
                  className="w-full rounded-full px-6 py-3 bg-linear-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary transition-all duration-300 hover:scale-105"
                  size="lg"
                  onClick={handleCheckout}
                >
                  Commander
                </Button>
                <Button
                  variant="outline"
                  className="w-full rounded-full"
                  onClick={() => onOpenChange(false)}
                >
                  Continuer vos achats
                </Button>
              </div>
            </>
          )}
        </SheetContent>
      </Sheet>

      <CheckoutModal open={checkoutOpen} onOpenChange={setCheckoutOpen} />
    </>
  );
}
