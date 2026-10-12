import Link from "next/link";
import { getProductById } from "@/lib/api";

type Product = {
  id?: string | number;
  _id?: string;
  name?: string;
  title?: string;
  productName?: string;
  description?: string;
  image?: string;
  imageUrl?: string;
  thumbnail?: string;
  price?: number | string;
  currentPrice?: number | string;
  previousPrice?: number | string;
  unit?: string;
  category?: string;
  categoryName?: string;
};

function formatPrice(value?: number | string) {
  if (value === undefined || value === null || value === "") {
    return "দাম পাওয়া যায়নি";
  }

  return `৳${value}`;
}

export default async function ProductDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  let product: Product | null = null;
  let error = false;

  try {
    const response = await getProductById(id);

    const data = response?.data ?? response;

    product = data?.product ?? data?.item ?? data;

    if (
      !product ||
      typeof product !== "object" ||
      Array.isArray(product)
    ) {
      product = null;
    }
  } catch {
    error = true;
  }

  const name =
    product?.name ??
    product?.title ??
    product?.productName ??
    "পণ্যের বিস্তারিত";

  const image =
    product?.image ??
    product?.imageUrl ??
    product?.thumbnail;

  return (
    <main className="min-h-screen bg-[#F8FAF5] px-4 py-8 sm:px-6 lg:px-10">
      <div className="mx-auto max-w-6xl">
        <Link
          href="/"
          className="inline-block text-sm font-medium text-green-700 hover:underline"
        >
          ← হোম পেজে ফিরে যান
        </Link>

        {error ? (
          <div className="mt-8 rounded-2xl bg-white p-8 text-center">
            <h1 className="text-xl font-bold text-red-600">
              পণ্যের তথ্য লোড করা যায়নি
            </h1>

            <p className="mt-3 text-gray-600">
              API সংযোগ পরীক্ষা করে আবার চেষ্টা করুন।
            </p>

            <Link
              href="/"
              className="mt-5 inline-block rounded-lg bg-green-700 px-5 py-3 text-white"
            >
              হোম পেজ
            </Link>
          </div>
        ) : !product ? (
          <div className="mt-8 rounded-2xl bg-white p-8 text-center">
            <h1 className="text-xl font-bold text-[#1D2B1F]">
              পণ্য পাওয়া যায়নি
            </h1>

            <p className="mt-3 text-gray-600">
              পণ্যের ID অথবা API response পরীক্ষা করুন।
            </p>
          </div>
        ) : (
          <div className="mt-8 grid gap-8 rounded-3xl bg-white p-5 shadow-sm sm:p-8 md:grid-cols-2">
            <div className="flex min-h-72 items-center justify-center rounded-2xl bg-[#F8FAF5] p-5 sm:min-h-96">
              {image ? (
                <img
                  src={image}
                  alt={name}
                  className="max-h-80 w-full object-contain"
                />
              ) : (
                <span className="text-8xl">🛍️</span>
              )}
            </div>

            <div className="flex flex-col justify-center">
              <p className="mb-3 text-sm font-medium text-green-700">
                {product.categoryName ?? product.category ?? "বাজারের পণ্য"}
              </p>

              <h1 className="text-3xl font-bold text-[#1D2B1F] sm:text-4xl">
                {name}
              </h1>

              {product.description && (
                <p className="mt-5 leading-7 text-gray-600">
                  {product.description}
                </p>
              )}

              <div className="mt-7 rounded-2xl bg-green-50 p-5">
                <p className="text-sm text-gray-600">বর্তমান দাম</p>

                <p className="mt-2 text-3xl font-bold text-green-800">
                  {formatPrice(
                    product.currentPrice ?? product.price
                  )}
                </p>

                {product.previousPrice !== undefined && (
                  <p className="mt-2 text-sm text-gray-500">
                    আগের দাম: {formatPrice(product.previousPrice)}
                  </p>
                )}

                {product.unit && (
                  <p className="mt-2 text-sm text-gray-600">
                    একক: {product.unit}
                  </p>
                )}
              </div>

              <Link
                href="/categories"
                className="mt-6 inline-flex justify-center rounded-xl bg-green-700 px-6 py-3 font-semibold text-white transition hover:bg-green-800"
              >
                অন্যান্য পণ্য দেখুন
              </Link>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}