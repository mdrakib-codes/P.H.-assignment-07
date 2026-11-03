"use client";

import Link from "next/link";
import EmptyState from "@/components/ui/EmptyState";
import PriceValue from "@/components/ui/PriceValue";
import ProductArtwork from "@/components/ui/ProductArtwork";
import QueryError from "@/components/ui/QueryError";
import Navbar from "@/components/navigation/Navbar";
import { formatUnit } from "@/lib/api/format";
import { useProduct } from "@/lib/api/queries";

export default function ProductDetails({ slug }: { slug: string }) {
  const { data: product, isLoading, isError, refetch } = useProduct(slug);
  const markets = product?.markets ?? [];
  const minimumPrice =
    markets.length > 0
      ? Math.min(...markets.map((market) => market.min))
      : undefined;
  const maximumPrice =
    markets.length > 0
      ? Math.max(...markets.map((market) => market.max))
      : undefined;
  const averagePrice =
    markets.length > 0
      ? Math.round(
          markets.reduce(
            (total, market) => total + (market.min + market.max) / 2,
            0,
          ) / markets.length,
        )
      : undefined;

  return (
    <main className="min-h-screen bg-[#F8FAF5]">
      <Navbar />
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <Link
          href="/products"
          className="text-sm font-semibold text-emerald-800 hover:underline"
        >
          ← সব পণ্য
        </Link>

        {isError ? (
          <div className="mt-6">
            <QueryError
              message="পণ্যের তথ্য লোড করা যায়নি।"
              onRetry={() => void refetch()}
            />
          </div>
        ) : isLoading ? (
          <div
            role="status"
            className="mt-6 h-96 animate-pulse rounded-3xl bg-gray-200"
          >
            <span className="sr-only">পণ্যের তথ্য লোড হচ্ছে...</span>
          </div>
        ) : !product ? (
          <div className="mt-6">
            <EmptyState
              title="পণ্য পাওয়া যায়নি।"
              description="পণ্যটি আর API-তে নেই বা এর ঠিকানা ভুল।"
            />
          </div>
        ) : (
          <>
            <section className="mt-6 grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
              <div className="flex min-h-72 items-center justify-center rounded-3xl bg-gradient-to-br from-emerald-100 to-green-50 p-8 sm:min-h-96">
                <ProductArtwork
                  image={product.image}
                  fallback={product.categoryIcon}
                  alt={product.nameBn}
                  className="max-h-80 max-w-full object-contain text-8xl sm:text-9xl"
                />
              </div>
              <div className="rounded-3xl border border-gray-100 bg-white p-6 shadow-sm sm:p-8">
                {product.categoryNameBn && (
                  <p className="text-sm font-semibold text-emerald-700">
                    {product.categoryIcon} {product.categoryNameBn}
                  </p>
                )}
                <h1 className="mt-3 text-3xl font-extrabold leading-tight text-gray-900 sm:text-4xl">
                  {product.nameBn}
                </h1>
                <div className="mt-7 rounded-2xl bg-emerald-50 p-5">
                  <p className="text-sm font-semibold text-gray-600">
                    আজকের দাম
                  </p>
                  <PriceValue
                    value={product.today}
                    className="mt-2 block text-4xl font-extrabold text-emerald-800"
                  />
                  {product.unit && (
                    <p className="mt-2 text-sm text-gray-500">
                      প্রতি {formatUnit(product.unit)}
                    </p>
                  )}
                  {product.change && (
                    <p className="mt-4 inline-flex rounded-full bg-white px-3 py-1.5 text-sm font-bold text-gray-700">
                      {product.change.dir === "up"
                        ? "▲ দাম বেড়েছে"
                        : product.change.dir === "down"
                          ? "▼ দাম কমেছে"
                          : "— দাম অপরিবর্তিত"}
                      {product.change.pct === undefined
                        ? ""
                        : ` ${product.change.pct.toLocaleString("bn-BD")}%`}
                    </p>
                  )}
                </div>

                {markets.length > 0 && (
                  <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-3">
                    <PriceSummary label="সর্বনিম্ন" value={minimumPrice} />
                    <PriceSummary label="গড় দাম" value={averagePrice} />
                    <PriceSummary label="সর্বোচ্চ" value={maximumPrice} />
                  </div>
                )}
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
              {markets.length > 0 ? (
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
                        {markets.map((market, index) => (
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
                              <PriceValue value={market.min} />
                            </td>
                            <td className="px-5 py-4 font-bold text-red-600">
                              <PriceValue value={market.max} />
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              ) : (
                <EmptyState title="এই পণ্যের জন্য বাজারভিত্তিক তথ্য পাওয়া যায়নি।" />
              )}
            </section>
          </>
        )}
      </div>
    </main>
  );
}

function PriceSummary({ label, value }: { label: string; value?: number }) {
  return (
    <div className="rounded-xl border border-gray-100 p-3">
      <p className="text-xs text-gray-500">{label}</p>
      <PriceValue
        value={value}
        className="mt-2 block text-sm font-extrabold text-emerald-800 sm:text-lg"
      />
    </div>
  );
}
