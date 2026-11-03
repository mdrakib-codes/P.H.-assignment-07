import ProductGrid from "@/features/products/components/ProductGrid";
import ProductGridSkeleton from "@/features/products/components/ProductGridSkeleton";
import type { Product } from "@/lib/api/types";

type ProductSectionProps = {
  products: Product[];
};

export default function ProductSection({
  products,
  isLoading = false,
  error,
  onRetry,
}: ProductSectionProps & {
  isLoading?: boolean;
  error?: string;
  onRetry?: () => void;
}) {
  const risers = products
    .filter((product) => product.change?.dir === "up")
    .sort((a, b) => (b.change?.pct ?? 0) - (a.change?.pct ?? 0))
    .slice(0, 6);
  const fallers = products
    .filter((product) => product.change?.dir === "down")
    .sort((a, b) => (b.change?.pct ?? 0) - (a.change?.pct ?? 0))
    .slice(0, 6);

  return (
    <div className="bg-[#F8FAF5]">
      {error && (
        <div
          role="alert"
          className="mx-auto mt-6 flex max-w-7xl flex-col justify-between gap-3 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700 sm:flex-row sm:items-center"
        >
          <p>{error}</p>
          {onRetry && (
            <button
              type="button"
              onClick={onRetry}
              className="w-fit rounded-lg bg-red-600 px-4 py-2 font-bold text-white hover:bg-red-700"
            >
              আবার চেষ্টা করুন
            </button>
          )}
        </div>
      )}
      <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="mb-6">
          <p className="text-sm font-bold text-red-600">▲ আজ দাম বেড়েছে</p>
          <h2 className="mt-2 text-2xl font-extrabold text-gray-900 sm:text-3xl">
            যেসব পণ্যের দাম বেড়েছে
          </h2>
        </div>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-5 lg:grid-cols-6">
          {isLoading ? <ProductGridSkeleton /> : <ProductGrid products={risers} />}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="mb-6">
          <p className="text-sm font-bold text-emerald-700">▼ আজ দাম কমেছে</p>
          <h2 className="mt-2 text-2xl font-extrabold text-gray-900 sm:text-3xl">
            যেসব পণ্যের দাম কমেছে
          </h2>
        </div>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-5 lg:grid-cols-6">
          {isLoading ? <ProductGridSkeleton /> : <ProductGrid products={fallers} />}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="mb-7 flex flex-col justify-between gap-3 sm:flex-row sm:items-end">
          <div>
            <p className="text-sm font-bold text-emerald-700">
              আপনার নিত্যপ্রয়োজনীয় পণ্য
            </p>
            <h2 className="mt-2 text-2xl font-extrabold text-gray-900 sm:text-3xl">
              সব পণ্য
            </h2>
          </div>
          <span className="text-sm font-semibold text-gray-500">
            মোট পণ্য: {products.length.toLocaleString("bn-BD")}
          </span>
        </div>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-5 lg:grid-cols-4 xl:grid-cols-5">
          {isLoading ? <ProductGridSkeleton count={10} /> : <ProductGrid products={products} />}
        </div>
      </section>
    </div>
  );
}
