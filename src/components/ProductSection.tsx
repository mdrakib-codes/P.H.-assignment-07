"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import ProductCard from "@/components/ProductCard";
import { getProducts } from "@/lib/api";
import type { Product } from "@/lib/api";

function ProductSkeleton() {
  return (
    <div className="animate-pulse overflow-hidden rounded-2xl border border-gray-100 bg-white">
      <div className="h-36 bg-gray-200 sm:h-44" />
      <div className="space-y-3 p-4">
        <div className="h-3 w-1/3 rounded bg-gray-200" />
        <div className="h-5 w-3/4 rounded bg-gray-200" />
        <div className="h-7 w-1/2 rounded bg-gray-200" />
      </div>
    </div>
  );
}

function ProductGrid({ products }: { products: Product[] }) {
  if (products.length === 0) {
    return (
      <div className="col-span-full rounded-2xl border border-dashed border-gray-300 bg-white p-8 text-center">
        <p className="text-3xl">🛒</p>
        <p className="mt-3 font-bold text-gray-700">
          এই মুহূর্তে কোনো পণ্য পাওয়া যায়নি।
        </p>
      </div>
    );
  }

  return (
    <>
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </>
  );
}

export default function ProductSection() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let active = true;

    async function loadProducts() {
      try {
        setLoading(true);
        setError("");

        const data = await getProducts();

        if (active) {
          setProducts(data);
        }
      } catch {
        if (active) {
          setError(
            "পণ্যের তথ্য লোড করা যায়নি। কিছুক্ষণ পরে আবার চেষ্টা করুন।"
          );
        }
      } finally {
        if (active) {
          setLoading(false);
        }
      }
    }

    loadProducts();

    return () => {
      active = false;
    };
  }, []);

  const risers = products
    .filter((product) => product.change.dir === "up")
    .sort((a, b) => b.change.pct - a.change.pct)
    .slice(0, 6);

  const fallers = products
    .filter((product) => product.change.dir === "down")
    .sort((a, b) => b.change.pct - a.change.pct)
    .slice(0, 6);

  return (
    <div className="bg-[#F8FAF5]">
      {error && (
        <div className="mx-auto max-w-7xl px-4 pt-6 sm:px-6 lg:px-8">
          <div
            role="alert"
            className="flex flex-col justify-between gap-3 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700 sm:flex-row sm:items-center"
          >
            <p>{error}</p>
            <button
              onClick={() => window.location.reload()}
              className="w-fit rounded-lg bg-red-600 px-4 py-2 font-bold text-white hover:bg-red-700"
            >
              আবার চেষ্টা করুন
            </button>
          </div>
        </div>
      )}

      <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="mb-6">
          <p className="text-sm font-bold text-red-600">
            ▲ আজ দাম বেড়েছে
          </p>
          <h2 className="mt-2 text-2xl font-extrabold text-gray-900 sm:text-3xl">
            যেসব পণ্যের দাম বেড়েছে
          </h2>
          <p className="mt-2 text-sm text-gray-500">
            আজকের বাজারে দাম বৃদ্ধির তালিকা দেখুন।
          </p>
        </div>

        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-5 lg:grid-cols-6">
          {loading ? (
            Array.from({ length: 6 }, (_, index) => (
              <ProductSkeleton key={index} />
            ))
          ) : (
            <ProductGrid products={risers} />
          )}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="mb-6">
          <p className="text-sm font-bold text-emerald-700">
            ▼ আজ দাম কমেছে
          </p>
          <h2 className="mt-2 text-2xl font-extrabold text-gray-900 sm:text-3xl">
            যেসব পণ্যের দাম কমেছে
          </h2>
          <p className="mt-2 text-sm text-gray-500">
            আজকের বাজারে দাম হ্রাসের তালিকা দেখুন।
          </p>
        </div>

        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-5 lg:grid-cols-6">
          {loading ? (
            Array.from({ length: 6 }, (_, index) => (
              <ProductSkeleton key={index} />
            ))
          ) : (
            <ProductGrid products={fallers} />
          )}
        </div>
      </section>

      <section
        id="সব-পণ্য"
        className="mx-auto max-w-7xl scroll-mt-32 px-4 py-10 sm:px-6 lg:px-8"
      >
        <div className="mb-7 flex flex-col justify-between gap-3 sm:flex-row sm:items-end">
          <div>
            <p className="text-sm font-bold text-emerald-700">
              আপনার নিত্যপ্রয়োজনীয় পণ্য
            </p>
            <h2 className="mt-2 text-2xl font-extrabold text-gray-900 sm:text-3xl">
              সব পণ্য
            </h2>
            <p className="mt-2 text-sm text-gray-500">
              এক জায়গায় সব পণ্যের বর্তমান বাজারদর।
            </p>
          </div>

          <span className="text-sm font-semibold text-gray-500">
            মোট পণ্য: {products.length.toLocaleString("bn-BD")}
          </span>
        </div>

        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-5 lg:grid-cols-4 xl:grid-cols-5">
          {loading ? (
            Array.from({ length: 10 }, (_, index) => (
              <ProductSkeleton key={index} />
            ))
          ) : (
            <ProductGrid products={products} />
          )}
        </div>

        {!loading && products.length > 0 && (
          <div className="mt-8 text-center">
            <Link
              href="/categories"
              className="inline-flex rounded-xl border border-emerald-200 bg-white px-6 py-3 text-sm font-bold text-emerald-800 transition hover:bg-emerald-50"
            >
              সব ক্যাটাগরি দেখুন →
            </Link>
          </div>
        )}
      </section>
    </div>
  );
}