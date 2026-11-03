"use client";

import Link from "next/link";
import { formatPrice, formatUnit } from "@/lib/api/format";
import type { Product } from "@/lib/api/types";
import ProductArtwork from "@/components/ui/ProductArtwork";

export default function PriceTicker({ products }: { products: Product[] }) {
  if (products.length === 0) return null;

  return (
    <div className="overflow-hidden border-y border-emerald-100 bg-white">
      <div className="flex h-12 items-center">
        <div className="z-10 flex h-full shrink-0 items-center bg-emerald-800 px-4 text-xs font-bold text-white sm:px-5 sm:text-sm">
          <span className="mr-2">📊</span>
          বাজারদর
        </div>
        <div className="min-w-0 flex-1 overflow-hidden">
          <div className="price-ticker-track">
            {[...products, ...products].map((product, index) => (
              <Link
                key={`${product.id}-${index}`}
                href={`/products/${encodeURIComponent(product.slug)}`}
                className="mx-4 flex shrink-0 items-center gap-2 text-xs sm:mx-6 sm:text-sm"
              >
                <ProductArtwork
                  image={product.image}
                  fallback={product.categoryIcon}
                  alt={product.nameBn}
                  className="h-6 w-6 object-contain"
                />
                <span className="font-semibold text-gray-700">
                  {product.nameBn}
                </span>
                <span className="font-bold text-emerald-800">
                  {formatPrice(product.today)}
                  {product.unit ? `/${formatUnit(product.unit)}` : ""}
                </span>
                {product.change && (
                  <span className="font-bold text-gray-500">
                    {product.change.dir === "up"
                      ? "▲"
                      : product.change.dir === "down"
                        ? "▼"
                        : "—"}{" "}
                    {product.change.pct?.toLocaleString("bn-BD") ?? ""}
                    {product.change.pct === undefined ? "" : "%"}
                  </span>
                )}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
