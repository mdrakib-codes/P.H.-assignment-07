import type { Product } from "@/lib/api";
import { formatUnit } from "@/lib/api/format";
import ProductArtwork from "@/components/ui/ProductArtwork";
import PriceValue from "@/components/ui/PriceValue";
import ProductDetailsLink from "@/features/products/components/ProductDetailsLink";

type ProductCardProps = {
  product: Product;
};

export default function ProductCard({ product }: ProductCardProps) {
  const changeClass =
    product.change?.dir === "up"
      ? "bg-red-50 text-red-600"
      : product.change?.dir === "down"
        ? "bg-emerald-50 text-emerald-700"
        : "bg-gray-100 text-gray-600";
  const changeLabel =
    product.change?.dir === "up"
      ? "▲"
      : product.change?.dir === "down"
        ? "▼"
        : "—";

  return (
    <article className="group h-full overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:border-emerald-200 hover:shadow-lg">
      <ProductDetailsLink
        slug={product.slug}
        className="block h-full w-full text-left"
      >
        <div className="relative flex h-36 items-center justify-center bg-[#F3F8EF] sm:h-44">
          <ProductArtwork
            image={product.image}
            fallback={product.categoryIcon}
            alt={product.nameBn}
            className="max-h-full max-w-full object-contain text-6xl transition duration-300 group-hover:scale-110 sm:text-7xl"
          />

          {product.change && (
            <span
              className={`absolute right-3 top-3 rounded-full px-2.5 py-1 text-xs font-bold ${changeClass}`}
            >
              {changeLabel}{" "}
              {product.change.dir === "flat"
                ? "স্থিতিশীল"
                : product.change.pct === undefined
                  ? ""
                  : `${product.change.pct.toLocaleString("bn-BD")}%`}
            </span>
          )}
        </div>

        <div className="p-4">
          {product.categoryNameBn && (
            <p className="text-xs font-medium text-emerald-700">
              {product.categoryIcon} {product.categoryNameBn}
            </p>
          )}

          <h2 className="mt-2 min-h-12 text-base font-bold leading-6 text-gray-800">
            {product.nameBn}
          </h2>

          {product.unit && (
            <p className="mt-1 text-xs text-gray-500">
              প্রতি {formatUnit(product.unit)}
            </p>
          )}

          <div className="mt-4 flex items-end justify-between gap-2">
            <div>
              <p className="text-xs text-gray-500">আজকের দাম</p>
              <PriceValue
                value={product.today}
                className="mt-1 block text-xl font-extrabold text-emerald-800"
              />
            </div>
            <span className="text-sm font-bold text-emerald-700">
              বিস্তারিত →
            </span>
          </div>
        </div>
      </ProductDetailsLink>
    </article>
  );
}
