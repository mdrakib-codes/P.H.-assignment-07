import Link from "next/link";
import { notFound } from "next/navigation";
import Navbar from "@/components/Navbar";
import ProductCard from "@/components/ProductCard";
import {
  getProductsByCategory,
  formatPrice,
} from "@/lib/api";

const categories: Record<
  string,
  { name: string; icon: string }
> = {
  chal: { name: "চাল", icon: "🍚" },
  dal: { name: "ডাল", icon: "🫘" },
  tel: { name: "তেল", icon: "🫙" },
  sobji: { name: "সবজি", icon: "🥬" },
  mach: { name: "মাছ", icon: "🐟" },
  mangsho: { name: "মাংস", icon: "🍗" },
  "dim-dui": { name: "ডিম-দুধ", icon: "🥚" },
  mosla: { name: "মসলা", icon: "🌶️" },
};

type CategoryPageProps = {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ sort?: string }>;
};

export default async function CategoryPage({
  params,
  searchParams,
}: CategoryPageProps) {
  const { slug } = await params;
  const { sort } = await searchParams;

  const category = categories[slug];

  if (!category) {
    notFound();
  }

  let products;

  try {
    products = await getProductsByCategory(slug);
  } catch {
    products = [];
  }

  if (sort === "asc") {
    products.sort((a, b) => a.today - b.today);
  } else if (sort === "desc") {
    products.sort((a, b) => b.today - a.today);
  }

  return (
    <main className="min-h-screen bg-[#F8FAF5]">
      <Navbar />

      <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="rounded-3xl bg-gradient-to-r from-emerald-100 to-green-50 p-6 sm:p-10">
          <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-center">
            <div>
              <p className="text-sm font-semibold text-emerald-800">
                বাজারদর ক্যাটাগরি
              </p>

              <h1 className="mt-2 text-3xl font-extrabold text-gray-900 sm:text-4xl">
                {category.icon} {category.name}
              </h1>

              <p className="mt-3 text-sm text-gray-600">
                এই ক্যাটাগরির পণ্যের বর্তমান বাজারদর দেখুন।
              </p>
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
          <div>
            <h2 className="text-xl font-extrabold text-gray-900">
              {category.name} পণ্যের তালিকা
            </h2>

            <p className="mt-1 text-sm text-gray-500">
              পণ্যের দাম অনুযায়ী সাজিয়ে নিন।
            </p>
          </div>

          <form action={`/category/${slug}`} method="GET">
            <label
              htmlFor="sort"
              className="mr-2 text-sm font-semibold text-gray-600"
            >
              সাজান:
            </label>

            <select
              id="sort"
              name="sort"
              defaultValue={sort ?? "default"}
              className="rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm font-semibold text-gray-700 outline-none focus:border-emerald-600"
            >
              <option value="default">ডিফল্ট</option>
              <option value="asc">দাম: কম থেকে বেশি</option>
              <option value="desc">দাম: বেশি থেকে কম</option>
            </select>

            <button
              type="submit"
              className="ml-2 rounded-xl bg-emerald-800 px-4 py-3 text-sm font-bold text-white hover:bg-emerald-900"
            >
              সাজান
            </button>
          </form>
        </div>

        {products.length > 0 ? (
          <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-5 lg:grid-cols-4 xl:grid-cols-5">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="mt-8 rounded-3xl border border-dashed border-gray-300 bg-white px-5 py-14 text-center">
            <span className="text-5xl">{category.icon}</span>

            <h3 className="mt-4 text-xl font-bold text-gray-800">
              এই ক্যাটাগরিতে পণ্য পাওয়া যায়নি
            </h3>

            <p className="mt-2 text-sm text-gray-500">
              API-এর তথ্য পরীক্ষা করুন অথবা সব পণ্য দেখুন।
            </p>

            <Link
              href="/#সব-পণ্য"
              className="mt-6 inline-flex rounded-xl bg-emerald-800 px-5 py-3 text-sm font-bold text-white hover:bg-emerald-900"
            >
              হোম পেজে ফিরে যান
            </Link>
          </div>
        )}
      </section>
    </main>
  );
}