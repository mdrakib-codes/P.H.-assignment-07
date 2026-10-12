
import Link from "next/link";
import { getCategories } from "@/lib/api";

type Category = {
  id?: string | number;
  _id?: string;
  name?: string;
  title?: string;
  slug?: string;
};

export default async function CategoriesPage() {
  let categories: Category[] = [];
  let error = false;

  try {
    const response = await getCategories();
    const data = response?.data ?? response;

    categories = Array.isArray(data)
      ? data
      : Array.isArray(data?.categories)
        ? data.categories
        : [];

  } catch {
    error = true;
  }

  return (
    <main className="min-h-screen bg-[#F8FAF5] px-4 py-10 sm:px-6 lg:px-10">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8">
          <p className="mb-2 text-sm font-medium text-green-700">
            বাজার দর
          </p>
          <h1 className="text-3xl font-bold text-[#1D2B1F]">
            সব ক্যাটাগরি
          </h1>
          <p className="mt-2 text-gray-600">
            আপনার প্রয়োজনীয় পণ্যের ক্যাটাগরি বেছে নিন।
          </p>
        </div>

        {error ? (
          <div className="rounded-xl bg-white p-6 text-center text-red-600">
            ক্যাটাগরি লোড করা যায়নি। কিছুক্ষণ পর আবার চেষ্টা করুন।
          </div>
        ) : categories.length === 0 ? (
          <div className="rounded-xl bg-white p-6 text-center text-gray-600">
            কোনো ক্যাটাগরি পাওয়া যায়নি।
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
            {categories.map((category, index) => {
              const name = category.name ?? category.title ?? "ক্যাটাগরি";
              const id = category.id ?? category._id ?? category.slug ?? index;

              return (
                <Link
                  key={String(id)}
                  href={`/categories/${encodeURIComponent(String(id))}`}
                  className="rounded-2xl border border-gray-100 bg-white p-5 transition hover:-translate-y-1 hover:border-green-200 hover:shadow-md"
                >
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-green-50 text-2xl">
                    🛒
                  </div>
                  <h2 className="font-semibold text-[#1D2B1F]">
                    {name}
                  </h2>
                  <p className="mt-2 text-sm text-green-700">
                    পণ্য দেখুন →
                  </p>
                </Link>
              );
            })}
          </div>
        )}
      </div>
    </main>
  );
}

