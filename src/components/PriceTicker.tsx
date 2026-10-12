"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { formatPrice, formatUnit, getProducts } from "@/lib/api";
import type { Product } from "@/lib/api";

export default function PriceTicker() {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    let active = true;

    getProducts()
      .then((data) => {
        if (active) {
          setProducts(data);
        }
      })
      .catch(() => {
        if (active) {
          setProducts([]);
        }
      });

    return () => {
      active = false;
    };
  }, []);

  if (products.length === 0) {
    return null;
  }

  const items = [...products, ...products];

  return (
    <div className="overflow-hidden border-y border-emerald-100 bg-white">
      <div className="flex h-12 items-center">
        <div className="z-10 flex h-full shrink-0 items-center bg-emerald-800 px-4 text-xs font-bold text-white sm:px-5 sm:text-sm">
          <span className="mr-2">📊</span>
          বাজারদর
        </div>

        <div className="min-w-0 flex-1 overflow-hidden">
          <div className="price-marquee flex w-max items-center">
            {items.map((product, index) => (
              <Link
                key={`${product.id}-${index}`}
                href={`/product/${encodeURIComponent(product.slug)}`}
                className="mx-4 flex shrink-0 items-center gap-2 text-xs sm:mx-6 sm:text-sm"
              >
                <span>{product.image || "🛒"}</span>

                <span className="font-semibold text-gray-700">
                  {product.nameBn}
                </span>

                <span className="font-bold text-emerald-800">
                  {formatPrice(product.today)}/{formatUnit(product.unit)}
                </span>

                <span
                  className={
                    product.change.dir === "up"
                      ? "font-bold text-red-600"
                      : product.change.dir === "down"
                        ? "font-bold text-emerald-700"
                        : "font-bold text-gray-500"
                  }
                >
                  {product.change.dir === "up"
                    ? "▲"
                    : product.change.dir === "down"
                      ? "▼"
                      : "—"}{" "}
                  {product.change.pct.toLocaleString("bn-BD")}%
                </span>
              </Link>
            ))}
          </div>
        </div>
      </div>

      <style jsx>{`
        .price-marquee {
          animation: price-marquee 55s linear infinite;
        }

        .price-marquee:hover {
          animation-play-state: paused;
        }

        @keyframes price-marquee {
          from {
            transform: translateX(0);
          }

          to {
            transform: translateX(-50%);
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .price-marquee {
            animation: none;
          }
        }
      `}</style>
    </div>
  );
}