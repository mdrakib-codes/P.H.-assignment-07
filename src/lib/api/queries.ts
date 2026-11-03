"use client";

import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getCategories } from "./categories";
import {
  getProductById,
  getProducts,
  getProductsByCategory,
} from "./products";
import type { Product } from "./types";

const STALE_TIME = 60_000;

export const apiQueryKeys = {
  categories: ["categories"] as const,
  products: ["products"] as const,
  categoryProducts: (category: string) =>
    ["products", "category", category] as const,
  product: (slug: string) => ["products", "detail", slug] as const,
};

export function useCategories() {
  return useQuery({
    queryKey: apiQueryKeys.categories,
    queryFn: ({ signal }) => getCategories(signal),
    staleTime: STALE_TIME,
  });
}

export function useProducts() {
  return useQuery({
    queryKey: apiQueryKeys.products,
    queryFn: ({ signal }) => getProducts(signal),
    staleTime: STALE_TIME,
  });
}

export function useCategoryProducts(category: string) {
  return useQuery({
    queryKey: apiQueryKeys.categoryProducts(category),
    queryFn: ({ signal }) => getProductsByCategory(category, signal),
    enabled: category.length > 0,
    staleTime: STALE_TIME,
  });
}

export function useProduct(slug: string) {
  const queryClient = useQueryClient();

  return useQuery({
    queryKey: apiQueryKeys.product(slug),
    queryFn: async ({ signal }) => {
      const cachedProducts =
        queryClient.getQueryData<Product[]>(apiQueryKeys.products);
      const cachedProduct = cachedProducts?.find(
        (product) => product.slug === slug || product.id === slug,
      );

      return cachedProduct ?? getProductById(slug, signal);
    },
    enabled: slug.length > 0,
    staleTime: STALE_TIME,
  });
}
