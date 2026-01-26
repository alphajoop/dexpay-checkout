"use client";

import { useRouter } from "next/navigation";
import type React from "react";
import { useState } from "react";
import { toast } from "sonner";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Spinner } from "@/components/ui/spinner";
import { formatFcfa } from "@/lib/utils";
import { useCartStore } from "@/store/cart-store";

interface CheckoutModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function CheckoutModal({ open, onOpenChange }: CheckoutModalProps) {
  const { items, getTotalPrice, clearCart } = useCartStore();
  const [loading, setLoading] = useState(false);
  const [customerInfo, setCustomerInfo] = useState({
    name: "",
    email: "",
    phone: "",
  });
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const reference = `ORDER-${Date.now()}`;
      const itemNames = items
        .map((item) => `${item.name} (x${item.quantity})`)
        .join(", ");

      const response = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          reference,
          item_name: itemNames,
          amount: getTotalPrice(),
          currency: "XOF",
          customer: customerInfo,
          metadata: {
            customer_email: customerInfo.email,
          },
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Erreur lors du paiement");
      }

      clearCart();
      onOpenChange(false);
      router.push(data.payment_url);
    } catch (error) {
      toast.error("Erreur", {
        description:
          error instanceof Error ? error.message : "Erreur lors du paiement",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md h-[calc(100vh-10rem)] overflow-y-auto bg-background/95 backdrop-blur-xl border-border/50">
        <DialogHeader className="border-b border-border/50 pb-4">
          <DialogTitle className="flex items-center gap-2">
            Informations de paiement
            <Badge variant="secondary" className="text-xs">
              Sécurisé
            </Badge>
          </DialogTitle>
          <DialogDescription>
            Veuillez remplir vos informations pour continuer
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Order Summary */}
          {items.length > 0 && (
            <div className="space-y-3 p-4 rounded-xl bg-background/50 border border-border/30">
              <h4 className="font-medium text-sm">
                Récapitulatif de la commande
              </h4>
              <div className="space-y-2">
                {items.slice(0, 3).map((item) => (
                  <div key={item.id} className="flex justify-between text-sm">
                    <span className="text-muted-foreground">
                      {item.name} x{item.quantity}
                    </span>
                    <span className="font-medium">
                      {formatFcfa(item.price * item.quantity)}
                    </span>
                  </div>
                ))}
                {items.length > 3 && (
                  <div className="text-sm text-muted-foreground">
                    +{items.length - 3} autres articles
                  </div>
                )}
              </div>
              <div className="flex items-center justify-between pt-2 border-t border-border/50">
                <span className="font-medium">Total</span>
                <span className="text-lg font-bold text-primary">
                  {formatFcfa(getTotalPrice())}
                </span>
              </div>
            </div>
          )}

          {/* Form Fields */}
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name" className="text-sm font-medium">
                Nom complet
              </Label>
              <Input
                id="name"
                placeholder="Jean Dupont"
                value={customerInfo.name}
                onChange={(e) =>
                  setCustomerInfo({ ...customerInfo, name: e.target.value })
                }
                className="rounded-full bg-background/50 border-border/50 focus:border-primary/50"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email" className="text-sm font-medium">
                Email
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="jean@example.com"
                value={customerInfo.email}
                onChange={(e) =>
                  setCustomerInfo({ ...customerInfo, email: e.target.value })
                }
                className="rounded-full bg-background/50 border-border/50 focus:border-primary/50"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone" className="text-sm font-medium">
                Téléphone
              </Label>
              <Input
                id="phone"
                type="tel"
                placeholder="+221 XX XXX XX XX"
                value={customerInfo.phone}
                onChange={(e) =>
                  setCustomerInfo({ ...customerInfo, phone: e.target.value })
                }
                className="rounded-full bg-background/50 border-border/50 focus:border-primary/50"
                required
              />
            </div>
          </div>

          {/* Security Badge */}
          <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground">
            <div className="h-4 w-4 rounded-full bg-green-500" />
            Paiement sécurisé via DexPay
          </div>

          {/* Submit Button */}
          <Button
            type="submit"
            className="w-full rounded-full px-6 py-3 bg-linear-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary transition-all duration-300 hover:scale-105"
            disabled={loading}
          >
            {loading && <Spinner className="mr-2" />}
            Payer {formatFcfa(getTotalPrice())}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
