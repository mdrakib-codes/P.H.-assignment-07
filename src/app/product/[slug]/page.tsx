import Link from "next/link";
import { notFound } from "next/navigation";
import Navbar from "@/components/Navbar";
import { getProductById, formatPrice, formatUnit } from "@/lib/api";

type ProductDetailsPageProps = {
  params: Promise<{ slug: string }>;
};

export default async function ProductDetailsPage({
  params,
}: ProductDetailsPageProps) {
  const { slug } = await params;

  let product;

  try {
    product = await getProductById(slug);
  } catch {
    product = null;
  }

  if (!product) {
    notFound();
  }

  const marketPrices = product.markets ?? [];

  const minimumPrice =
    marketPrices.length > 0
      ? Math.min(...marketPrices.map((market) => market.min))
      : product.today;

  const maximumPrice =
    marketPrices.length > 0
      ? Math.max(...marketPrices.map((market) => market.max))
      : product.today;

  const averagePrice =
    marketPrices.length > 0
      ? marketPrices.reduce(
          (total, market) => total + (market.min + market.max) / 2,
          0
        ) / marketPrices.length
      : product.today;

  return (
    <main className="min-h-screen bg-[#F8FAF5]">
      <Navbar />

      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <Link
          href="/#সব-পণ্য"
          className="text-sm font-semibold text-emerald-800 hover:underline"
        >
          ← সব পণ্যে ফিরে যান
        </Link>

        <section className="mt-6 grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="flex min-h-72 items-center justify-center rounded-3xl bg-gradient-to-br from-emerald-100 to-green-50 p-8 sm:min-h-96">
            <span className="text-8xl sm:text-9xl">
              {product.image || product.categoryIcon || "🛒"}
            </span>
          </div>

          <div className="rounded-3xl border border-gray-100 bg-white p-6 shadow-sm sm:p-8">
            <p className="text-sm font-semibold text-emerald-700">
              {product.categoryIcon} {product.categoryNameBn}
            </p>

            <h1 className="mt-3 text-3xl font-extrabold leading-tight text-gray-900 sm:text-4xl">
              {product.nameBn}
            </h1>

            <p className="mt-3 text-sm leading-7 text-gray-500">
              {product.nameBn} পণ্যের বর্তমান বাজারদর এবং বিভিন্ন বাজারে
              এর সম্ভাব্য দামের তুলনা দেখুন।
            </p>

            <div className="mt-7 rounded-2xl bg-emerald-50 p-5">
              <p className="text-sm font-semibold text-gray-600">
                আজকের দাম
              </p>

              <p className="mt-2 text-4xl font-extrabold text-emerald-800">
                {formatPrice(product.today)}
              </p>

              <p className="mt-2 text-sm text-gray-500">
                প্রতি {formatUnit(product.unit)}
              </p>

              <span
                className={`mt-4 inline-flex rounded-full px-3 py-1.5 text-sm font-bold ${
                  product.change.dir === "up"
                    ? "bg-red-100 text-red-700"
                    : product.change.dir === "down"
                      ? "bg-emerald-100 text-emerald-800"
                      : "bg-gray-100 text-gray-600"
                }`}
              >
                {product.change.dir === "up"
                  ? "▲ দাম বেড়েছে"
                  : product.change.dir === "down"
                    ? "▼ দাম কমেছে"
                    : "— দাম অপরিবর্তিত"}{" "}
                {product.change.pct.toLocaleString("bn-BD")}%
              </span>
            </div>

            <div className="mt-6 grid grid-cols-3 gap-3">
              <div className="rounded-xl border border-gray-100 p-3">
                <p className="text-xs text-gray-500">সর্বনিম্ন</p>
                <p className="mt-2 text-sm font-extrabold text-emerald-800 sm:text-lg">
                  {formatPrice(minimumPrice)}
                </p>
              </div>

              <div className="rounded-xl border border-gray-100 p-3">
                <p className="text-xs text-gray-500">গড় দাম</p>
                <p className="mt-2 text-sm font-extrabold text-gray-800 sm:text-lg">
                  {formatPrice(Math.round(averagePrice))}
                </p>
              </div>

              <div className="rounded-xl border border-gray-100 p-3">
                <p className="text-xs text-gray-500">সর্বোচ্চ</p>
                <p className="mt-2 text-sm font-extrabold text-red-600 sm:text-lg">
                  {formatPrice(maximumPrice)}
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="mt-10">
          <div className="mb-5">
            <h2 className="text-2xl font-extrabold text-gray-900">
              বিভিন্ন বাজারে {product.nameBn}-এর দাম
            </h2>

            <p className="mt-2 text-sm text-gray-500">
              API-তে পাওয়া বাজারভিত্তিক সর্বনিম্ন ও সর্বোচ্চ দাম।
            </p>
          </div>

          {marketPrices.length > 0 ? (
            <div className="overflow-hidden rounded-2xl border border-gray-100 bg-white">
              <div className="overflow-x-auto">
                <table className="w-full min-w-[540px] text-left text-sm">
                  <thead className="bg-emerald-50 text-gray-700">
                    <tr>
                      <th className="px-5 py-4 font-bold">বাজার</th>
                      <th className="px-5 py-4 font-bold">বিভাগ</th>
                      <th className="px-5 py-4 font-bold">সর্বনিম্ন</th>
                      <th className="px-5 py-4 font-bold">সর্বোচ্চ</th>
                    </tr>
                  </thead>

                  <tbody>
                    {marketPrices.map((market, index) => (
                      <tr
                        key={`${market.market}-${index}`}
                        className="border-t border-gray-100"
                      >
                        <td className="px-5 py-4 font-semibold text-gray-800">
                          {market.market}
                        </td>

                        <td className="px-5 py-4 text-gray-600">
                          {market.division || "—"}
                        </td>

                        <td className="px-5 py-4 font-bold text-emerald-800">
                          {formatPrice(market.min)}
                        </td>

                        <td className="px-5 py-4 font-bold text-red-600">
                          {formatPrice(market.max)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          ) : (
            <div className="rounded-2xl bg-white p-8 text-center text-sm text-gray-500">
              এই পণ্যের জন্য আলাদা বাজারভিত্তিক তথ্য পাওয়া যায়নি।
            </div>
          )}
        </section>
      </div>
    </main>
  );
}