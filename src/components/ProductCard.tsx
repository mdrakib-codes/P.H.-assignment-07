
import ProductDetailsLink from "@/components/ProductDetailsLink";
import type { Product } from "@/lib/api";
import { formatPrice, formatUnit } from "@/lib/api";

type ProductCardProps = {
  product: Product;
};

export default function ProductCard({ product }: ProductCardProps) {
  const isUp = product.change.dir === "up";
  const isDown = product.change.dir === "down";
  const isFlat = product.change.dir === "flat";

  const badgeClass = isUp
    ? "bg-red-50 text-red-600"
    : isDown
      ? "bg-emerald-50 text-emerald-700"
      : "bg-gray-100 text-gray-600";

  const changeLabel = isUp ? "▲" : isDown ? "▼" : "—";

  const changeText = isFlat
    ? "স্থিতিশীল"
    : `${product.change.pct.toLocaleString("bn-BD")}%`;

  return (
    <article className="group h-full overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:border-emerald-200 hover:shadow-lg">
      <ProductDetailsLink
        slug={product.slug}
        className="block h-full w-full text-left"
      >
        <div className="relative flex h-36 items-center justify-center bg-[#F3F8EF] sm:h-44">
          <span className="text-6xl transition duration-300 group-hover:scale-110 sm:text-7xl">
            {product.image || product.categoryIcon || "🛒"}
          </span>

          <span
            className={`absolute right-3 top-3 rounded-full px-2.5 py-1 text-xs font-bold ${badgeClass}`}
          >
            {changeLabel} {changeText}
          </span>
        </div>

        <div className="p-4">
          <p className="text-xs font-medium text-emerald-700">
            {product.categoryIcon} {product.categoryNameBn}
          </p>

          <h3 className="mt-2 min-h-12 text-base font-bold leading-6 text-gray-800">
            {product.nameBn}
          </h3>

          <p className="mt-1 text-xs text-gray-500">
            প্রতি {formatUnit(product.unit)}
          </p>

          <div className="mt-4 flex items-end justify-between gap-2">
            <div>
              <p className="text-xs text-gray-500">আজকের দাম</p>

              <p className="mt-1 text-xl font-extrabold text-emerald-800">
                {formatPrice(product.today)}
              </p>
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

