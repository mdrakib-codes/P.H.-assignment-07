
import Link from "next/link";
import { getProductsByCategory } from "@/lib/api";

type Product = {
  id?: string | number;
  _id?: string;
  name?: string;
  title?: string;
  productName?: string;
  price?: number | string;
  currentPrice?: number | string;
  image?: string;
  imageUrl?: string;
  thumbnail?: string;
  unit?: string;
};

export default async function CategoryDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  let products: Product[] = [];
  let error = false;

  try {
    const response = await getProductsByCategory(
      decodeURIComponent(id)
    );

    const data = response?.data ?? response;

    products = Array.isArray(data)
      ? data
      : Array.isArray(data?.products)
        ? data.products
        : [];

  } catch {
    error = true;
  }

  return (
    <main className="min-h-screen bg-[#F8FAF5] px-4 py-10 sm:px-6 lg:px-10">
      <div className="mx-auto max-w-7xl">
        <Link
          href="/categories"
          className="mb-6 inline-block text-sm font-medium text-green-700 hover:underline"
        >
          ← সব ক্যাটাগরি
        </Link>

        <h1 className="mb-2 text-3xl font-bold text-[#1D2B1F]">
          ক্যাটাগরির পণ্য
        </h1>

        <p className="mb-8 text-gray-600">
          নির্বাচিত ক্যাটাগরির পণ্য ও দাম দেখুন।
        </p>

        {error ? (
          <div className="rounded-xl bg-white p-6 text-center text-red-600">
            পণ্য লোড করা যায়নি। আবার চেষ্টা করুন।
          </div>
        ) : products.length === 0 ? (
          <div className="rounded-xl bg-white p-6 text-center text-gray-600">
            এই ক্যাটাগরিতে কোনো পণ্য পাওয়া যায়নি।
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
            {products.map((product, index) => {
              const productId = product.id ?? product._id ?? index;
              const name =
                product.name ??
                product.title ??
                product.productName ??
                "পণ্য";

              const price =
                product.price ?? product.currentPrice;

              const image =
                product.image ??
                product.imageUrl ??
                product.thumbnail;

              return (
                <Link
                  key={String(productId)}
                  href={`/products/${encodeURIComponent(String(productId))}`}
                  className="overflow-hidden rounded-2xl border border-gray-100 bg-white transition hover:shadow-md"
                >
                  <div className="flex h-36 items-center justify-center bg-gray-50 p-3 sm:h-44">
                    {image ? (
                      <img
                        src={image}
                        alt={name}
                        className="h-full w-full object-contain"
                      />
                    ) : (
                      <span className="text-5xl">🛍️</span>
                    )}
                  </div>

                  <div className="p-4">
                    <h2 className="line-clamp-2 font-semibold text-[#1D2B1F]">
                      {name}
                    </h2>

                    <p className="mt-3 font-bold text-green-700">
                      {price !== undefined
                        ? `৳${price}`
                        : "দাম পাওয়া যায়নি"}
                    </p>

                    <p className="mt-1 text-sm text-gray-500">
                      {product.unit ?? ""}
                    </p>
                  </div>
                </Link>
              );
            })}
          </div>
        )}
      </div>
    </main>
  );
}

