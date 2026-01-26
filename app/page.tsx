"use client";

import { Menu, Search, Store, X } from "lucide-react";
import { useState } from "react";
import { CartButton } from "@/components/cart-button";
import Hero from "@/components/hero";
import ProductGrid from "@/components/product-grid";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function Home() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div className="min-h-screen">
      <header className="sticky top-0 z-50 border-b border-border/50 bg-background/90 backdrop-blur-xl supports-backdrop-filter:bg-background/80">
        <div className="relative container mx-auto px-4 md:px-8 lg:px-12">
          <div className="flex h-16 items-center justify-between">
            {/* Logo Section */}
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2 rounded-full bg-primary/10 p-2">
                <Store className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h1 className="text-lg font-bold tracking-tight">Boutique</h1>
                <p className="text-xs text-muted-foreground">
                  Collection Premium
                </p>
              </div>
            </div>

            {/* Search Bar - Desktop */}
            <div className="hidden md:flex flex-1 max-w-md mx-8">
              <div className="relative w-full">
                <Search className="text-muted-foreground absolute left-3 top-1/2 size-4 -translate-y-1/2" />
                <Input
                  type="search"
                  placeholder="Rechercher des produits..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="h-10 rounded-full pl-10 pr-4 bg-background/50 border-border/50 focus:border-primary/50"
                />
              </div>
            </div>

            {/* Navigation & Actions */}
            <div className="flex items-center gap-4">
              {/* Desktop Navigation */}
              <nav className="hidden lg:flex items-center gap-6">
                <Button
                  variant="ghost"
                  className="rounded-full px-4 py-2 h-auto"
                >
                  Nouveautés
                </Button>
                <Button
                  variant="ghost"
                  className="rounded-full px-4 py-2 h-auto"
                >
                  Tendance
                  <Badge variant="secondary" className="ml-2 text-xs">
                    Hot
                  </Badge>
                </Button>
                <Button
                  variant="ghost"
                  className="rounded-full px-4 py-2 h-auto"
                >
                  Promos
                </Button>
              </nav>

              {/* Cart Button */}
              <CartButton />

              {/* Mobile Menu Toggle */}
              <Button
                variant="ghost"
                size="sm"
                className="lg:hidden rounded-full"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                {isMenuOpen ? (
                  <X className="h-5 w-5" />
                ) : (
                  <Menu className="h-5 w-5" />
                )}
              </Button>
            </div>
          </div>

          {/* Mobile Menu */}
          {isMenuOpen && (
            <div className="md:hidden border-t border-border/50 py-4">
              {/* Mobile Search */}
              <div className="relative mb-4">
                <Search className="text-muted-foreground absolute left-3 top-1/2 size-4 -translate-y-1/2" />
                <Input
                  type="search"
                  placeholder="Rechercher des produits..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="h-10 rounded-full pl-10 pr-4 bg-background/50 border-border/50"
                />
              </div>

              {/* Mobile Navigation */}
              <nav className="flex flex-col gap-2">
                <Button
                  variant="ghost"
                  className="justify-start rounded-full px-4 py-2 h-auto"
                >
                  Nouveautés
                </Button>
                <Button
                  variant="ghost"
                  className="justify-start rounded-full px-4 py-2 h-auto"
                >
                  Tendance
                  <Badge variant="secondary" className="ml-auto text-xs">
                    Hot
                  </Badge>
                </Button>
                <Button
                  variant="ghost"
                  className="justify-start rounded-full px-4 py-2 h-auto"
                >
                  Promos
                </Button>
              </nav>
            </div>
          )}
        </div>
      </header>

      <Hero />

      <ProductGrid />
    </div>
  );
}
