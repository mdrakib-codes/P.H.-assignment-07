"use client";

import Link from "next/link";
import Navbar from "@/components/navigation/Navbar";
import EmptyState from "@/components/ui/EmptyState";
import QueryError from "@/components/ui/QueryError";
import ProductGrid from "@/features/products/components/ProductGrid";
import ProductGridSkeleton from "@/features/products/components/ProductGridSkeleton";
import { useProducts } from "@/lib/api/queries";

export default function ProductListing() {
  const { data: products = [], isLoading, isError, refetch } = useProducts();

  return (
    <main className="min-h-screen bg-[#F8FAF5]">
      <Navbar products={products} />
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-10">
        <Link
          href="/"
          className="text-sm font-medium text-green-700 hover:underline"
        >
          ← হোম পেজ
        </Link>
        <div className="mb-8 mt-6">
          <p className="mb-2 text-sm font-medium text-green-700">বাজার দর</p>
          <h1 className="text-3xl font-bold text-[#1D2B1F]">সব পণ্য</h1>
          <p className="mt-2 text-gray-600">
            API থেকে পাওয়া পণ্যের বাজারদর দেখুন।
          </p>
        </div>

        {isError ? (
          <QueryError
            message="পণ্যের তথ্য লোড করা যায়নি।"
            onRetry={() => void refetch()}
          />
        ) : isLoading ? (
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-5 lg:grid-cols-4 xl:grid-cols-5">
            <ProductGridSkeleton count={10} />
          </div>
        ) : products.length === 0 ? (
          <EmptyState title="কোনো পণ্য পাওয়া যায়নি।" />
        ) : (
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-5 lg:grid-cols-4 xl:grid-cols-5">
            <ProductGrid products={products} />
          </div>
        )}
      </div>
    </main>
  );
}
