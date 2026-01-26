"use client";

import { ShoppingCart } from "lucide-react";
import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useCartStore } from "@/store/cart-store";
import { CartSheet } from "./cart-sheet";

export function CartButton() {
  const [open, setOpen] = useState(false);
  const totalItems = useCartStore((state) => state.getTotalItems());

  return (
    <>
      <Button
        variant="ghost"
        size="sm"
        className="relative h-10 w-10 rounded-full bg-background/50 backdrop-blur-sm border border-border/50 hover:bg-background/80 hover:border-primary/50 transition-all duration-300"
        onClick={() => setOpen(true)}
      >
        <ShoppingCart className="h-5 w-5" />
        {totalItems > 0 && (
          <Badge
            variant="secondary"
            className="absolute -right-1 -top-1 h-5 w-5 flex items-center justify-center rounded-full bg-primary text-primary-foreground text-[10px] font-medium p-0 border-2 border-background"
          >
            {totalItems > 99 ? "99+" : totalItems}
          </Badge>
        )}
      </Button>
      <CartSheet open={open} onOpenChange={setOpen} />
    </>
  );
}
