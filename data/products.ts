import type { Product } from "@/types";

export const PRODUCTS: Product[] = [
  {
    id: "1",
    name: "Casque Audio Sans Fil",
    description: "Réduction de bruit active, autonomie 30h",
    price: 45000,
    currency: "XOF",
    image:
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&q=80",
    rating: 4.9,
    reviews: 128,
    trending: true,
    tag: "Best Seller",
  },
  {
    id: "2",
    name: "Montre Connectée",
    description: "Suivi fitness et notifications intelligentes",
    price: 35000,
    currency: "XOF",
    image:
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&q=80",
    rating: 4.8,
    reviews: 256,
    trending: true,
    tag: "Nouveauté",
  },
  {
    id: "3",
    name: "Chargeur Rapide USB-C",
    description: "Chargeur 65W avec compatibilité PD 3.0",
    price: 250,
    currency: "XOF",
    image:
      "https://images.unsplash.com/photo-1618911138919-dcabd0bd6108?w=800&q=80",
    rating: 4.7,
    reviews: 189,
    trending: true,
    tag: "Premium",
  },
  {
    id: "4",
    name: "Cable USB-C à USB-A",
    description: "Cable de charge 2m, revêtement tressé",
    price: 2500,
    currency: "XOF",
    image:
      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80",
    rating: 4.6,
    reviews: 95,
    trending: false,
    tag: "Accessoire",
  },
  {
    id: "5",
    name: "Housse de Protection Smartphone",
    description: "Silicone souple, anti-chocs",
    price: 1500,
    currency: "XOF",
    image:
      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80",
    rating: 4.5,
    reviews: 67,
    trending: false,
    tag: "Protection",
  },
];
