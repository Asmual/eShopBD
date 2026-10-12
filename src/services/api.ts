import axios from "axios";
import { Product } from "@/types/products";
import { ALL_PRODUCTS } from "@/data/products";

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";

export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 6000,
  headers: {
    "Content-Type": "application/json",
  },
});

export interface FetchProductsParams {
  category?: string;
  search?: string;
  sortBy?: string;
  page?: number;
  limit?: number;
}

export interface ProductsResponse {
  products: Product[];
  total: number;
  isLiveDb: boolean;
}

/**
 * Fetch products with seamless fallback:
 * 1. Attempts to fetch live data from Neon PostgreSQL via eShopBD-Server.
 * 2. If the backend server is unreachable (e.g. offline during local frontend dev),
 *    gracefully falls back to the local product catalog so the UI never breaks.
 */
export async function fetchProducts(
  params: FetchProductsParams = {}
): Promise<ProductsResponse> {
  try {
    const res = await apiClient.get("/products", {
      params: {
        category: params.category,
        search: params.search,
        sortBy: params.sortBy,
        page: params.page,
        limit: params.limit,
      },
    });

    if (res.data?.success && Array.isArray(res.data.data)) {
      return {
        products: res.data.data,
        total: res.data.meta?.total ?? res.data.data.length,
        isLiveDb: true,
      };
    }
  } catch {
    // Backend offline / connecting fallback
  }

  // Graceful offline fallback using static dataset
  let result = [...ALL_PRODUCTS];

  if (params.category && params.category !== "all") {
    result = result.filter(
      (p) =>
        p.category === params.category ||
        (params.category === "toys-kids" &&
          (p.category === "toys-kids" ||
            p.category === "toys-games" ||
            p.category === "kids"))
    );
  }

  if (params.search?.trim()) {
    const q = params.search.toLowerCase();
    result = result.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.description?.toLowerCase().includes(q)
    );
  }

  if (params.sortBy) {
    if (params.sortBy === "price-low") {
      result.sort((a, b) => a.price - b.price);
    } else if (params.sortBy === "price-high") {
      result.sort((a, b) => b.price - a.price);
    } else if (params.sortBy === "rating") {
      result.sort((a, b) => b.rating - a.rating);
    } else if (params.sortBy === "popular") {
      result.sort((a, b) => b.soldCount - a.soldCount);
    }
  }

  return {
    products: result,
    total: result.length,
    isLiveDb: false,
  };
}

/**
 * Fetch a single product by slug
 */
export async function fetchProductBySlug(
  slug: string
): Promise<Product | null> {
  try {
    const res = await apiClient.get(`/products/${slug}`);
    if (res.data?.success && res.data.data) {
      return res.data.data;
    }
  } catch {
    // Fallback
  }

  return ALL_PRODUCTS.find((p) => p.slug === slug) || null;
}
