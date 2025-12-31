import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000";

export const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Types
export interface Product {
  id: string;
  name: string;
  description?: string;
  price: number;
  currency: string;
  type: "ONE_TIME" | "RECURRING";
  billing_period?: string;
  is_active: boolean;
  image_url?: string;
}

export interface CheckoutSession {
  reference: string;
  payment_url: string;
  amount: number;
  currency: string;
}

// Products
export const productsApi = {
  list: async () => {
    const { data } = await api.get("/products");
    return data;
  },
  create: async (product: Partial<Product>) => {
    const { data } = await api.post("/products", product);
    return data;
  },
};

// Checkout
export const checkoutApi = {
  createSession: async (params: {
    reference: string;
    item_name: string;
    amount: number;
    currency: string;
    success_url: string;
    failure_url: string;
    webhook_url: string;
    metadata?: {
      order_id: string;
      user_email: string;
    };
  }) => {
    const { data } = await api.post("/checkout/sessions", params);
    return data;
  },
  createPaymentAttempt: async (
    reference: string,
    params: {
      payment_method: string;
      operator: string;
      countryISO: string;
      customer: {
        name: string;
        phone: string;
        email: string;
      };
    },
  ) => {
    const { data } = await api.post(
      `/checkout/sessions/${reference}/payment-attempt`,
      params,
    );
    return data;
  },
};
