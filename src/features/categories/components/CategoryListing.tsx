"use client";

import Link from "next/link";
import Navbar from "@/components/navigation/Navbar";
import EmptyState from "@/components/ui/EmptyState";
import QueryError from "@/components/ui/QueryError";
import { useCategories } from "@/lib/api/queries";

export default function CategoryListing() {
  const { data: categories = [], isLoading, isError, refetch } = useCategories();

  return (
    <main className="min-h-screen bg-[#F8FAF5]">
      <Navbar />
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-10">
        <div className="mb-8">
          <p className="mb-2 text-sm font-medium text-green-700">বাজার দর</p>
          <h1 className="text-3xl font-bold text-[#1D2B1F]">
            সব ক্যাটাগরি
          </h1>
          <p className="mt-2 text-gray-600">
            আপনার প্রয়োজনীয় পণ্যের ক্যাটাগরি বেছে নিন।
          </p>
        </div>

        {isError ? (
          <QueryError
            message="ক্যাটাগরি লোড করা যায়নি।"
            onRetry={() => void refetch()}
          />
        ) : isLoading ? (
          <p role="status" className="text-gray-600">
            ক্যাটাগরি লোড হচ্ছে...
          </p>
        ) : categories.length === 0 ? (
          <EmptyState title="কোনো ক্যাটাগরি পাওয়া যায়নি।" />
        ) : (
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
            {categories.map((category) => (
              <Link
                key={category.id}
                href={`/categories/${encodeURIComponent(category.slug)}`}
                className="rounded-2xl border border-gray-100 bg-white p-5 transition hover:-translate-y-1 hover:border-green-200 hover:shadow-md"
              >
                {category.icon && (
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-green-50 text-2xl">
                    {category.icon}
                  </div>
                )}
                <h2 className="font-semibold text-[#1D2B1F]">
                  {category.nameBn}
                </h2>
                {category.productCount !== undefined && (
                  <p className="mt-2 text-sm text-gray-500">
                    {category.productCount.toLocaleString("bn-BD")} পণ্য
                  </p>
                )}
                <p className="mt-2 text-sm text-green-700">পণ্য দেখুন →</p>
              </Link>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
