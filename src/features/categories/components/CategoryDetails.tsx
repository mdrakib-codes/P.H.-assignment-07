"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCategoryProducts, useCategories } from "@/lib/api/queries";
import EmptyState from "@/components/ui/EmptyState";
import QueryError from "@/components/ui/QueryError";
import Navbar from "@/components/navigation/Navbar";
import ProductCard from "@/features/products/components/ProductCard";

type CategoryDetailsProps = {
  slug: string;
  sort?: string;
};

export default function CategoryDetails({ slug, sort }: CategoryDetailsProps) {
  const router = useRouter();
  const categoriesQuery = useCategories();
  const productsQuery = useCategoryProducts(slug);
  const category = categoriesQuery.data?.find(
    (item) => item.slug === slug || item.id === slug,
  );
  const products = productsQuery.data ?? [];
  const sortedProducts =
    sort === "asc" || sort === "desc"
      ? [...products].sort((a, b) => {
          if (a.today === undefined) return b.today === undefined ? 0 : 1;
          if (b.today === undefined) return -1;
          return sort === "asc" ? a.today - b.today : b.today - a.today;
        })
      : products;

  function updateSort(value: string) {
    const query = value === "default" ? "" : `?sort=${value}`;
    router.replace(`/categories/${encodeURIComponent(slug)}${query}`);
  }

  return (
    <main className="min-h-screen bg-[#F8FAF5]">
      <Navbar />
      <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <Link
          href="/categories"
          className="text-sm font-semibold text-emerald-800 hover:underline"
        >
          ← সব ক্যাটাগরি
        </Link>

        {categoriesQuery.isError || productsQuery.isError ? (
          <div className="mt-6">
            <QueryError
              message="ক্যাটাগরির তথ্য লোড করা যায়নি।"
              onRetry={() => {
                if (categoriesQuery.isError) void categoriesQuery.refetch();
                if (productsQuery.isError) void productsQuery.refetch();
              }}
            />
          </div>
        ) : categoriesQuery.isLoading || productsQuery.isLoading ? (
          <p role="status" className="mt-6 text-gray-600">
            ক্যাটাগরির পণ্য লোড হচ্ছে...
          </p>
        ) : !category ? (
          <div className="mt-6">
            <EmptyState
              title="ক্যাটাগরি পাওয়া যায়নি।"
              description="ক্যাটাগরিটি API-তে নেই বা সরানো হয়েছে।"
            />
          </div>
        ) : (
          <>
            <div className="mt-5 rounded-3xl bg-gradient-to-r from-emerald-100 to-green-50 p-6 sm:p-10">
              <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-center">
                <div>
                  <p className="text-sm font-semibold text-emerald-800">
                    বাজারদর ক্যাটাগরি
                  </p>
                  <h1 className="mt-2 text-3xl font-extrabold text-gray-900 sm:text-4xl">
                    {category.icon && `${category.icon} `}
                    {category.nameBn}
                  </h1>
                </div>
                <div className="rounded-2xl bg-white px-5 py-4 shadow-sm">
                  <p className="text-sm text-gray-500">মোট পণ্য</p>
                  <p className="mt-1 text-2xl font-extrabold text-emerald-800">
                    {products.length.toLocaleString("bn-BD")}
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
              <h2 className="text-xl font-extrabold text-gray-900">
                {category.nameBn} পণ্যের তালিকা
              </h2>
              <div>
                <label
                  htmlFor="sort"
                  className="mr-2 text-sm font-semibold text-gray-600"
                >
                  সাজান:
                </label>
                <select
                  id="sort"
                  value={sort ?? "default"}
                  onChange={(event) => updateSort(event.target.value)}
                  className="rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm font-semibold text-gray-700 outline-none focus:border-emerald-600"
                >
                  <option value="default">ডিফল্ট</option>
                  <option value="asc">দাম: কম থেকে বেশি</option>
                  <option value="desc">দাম: বেশি থেকে কম</option>
                </select>
              </div>
            </div>

            {sortedProducts.length > 0 ? (
              <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-5 lg:grid-cols-4 xl:grid-cols-5">
                {sortedProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            ) : (
              <div className="mt-6">
                <EmptyState title="এই ক্যাটাগরিতে পণ্য পাওয়া যায়নি।" />
              </div>
            )}
          </>
        )}
      </section>
    </main>
  );
}
