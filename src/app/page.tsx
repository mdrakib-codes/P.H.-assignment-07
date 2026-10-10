// src/app/page.tsx

import { getProducts } from "@/lib/api";

type Product = {
  id?: string | number;
  name?: string;
  title?: string;
  productName?: string;
  price?: string | number;
  currentPrice?: string | number;
  image?: string;
  imageUrl?: string;
  category?: string;
  unit?: string;
};

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function getString(
  value: unknown
): string | undefined {
  return typeof value === "string" || typeof value === "number"
    ? String(value)
    : undefined;
}

function normalizeProducts(data: unknown): Product[] {
  let items: unknown[] = [];

  if (Array.isArray(data)) {
    items = data;
  } else if (isRecord(data)) {
    if (Array.isArray(data.products)) {
      items = data.products;
    } else if (Array.isArray(data.data)) {
      items = data.data;
    } else if (Array.isArray(data.result)) {
      items = data.result;
    }
  }

  return items.filter(isRecord).map((item) => ({
    id: getString(item.id ?? item._id),
    name: getString(item.name),
    title: getString(item.title),
    productName: getString(item.productName),
    price: getString(item.price),
    currentPrice: getString(item.currentPrice),
    image: getString(item.image),
    imageUrl: getString(item.imageUrl),
    category: getString(item.category),
    unit: getString(item.unit),
  }));
}

export default async function Home() {
  const today = new Intl.DateTimeFormat("bn-BD", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date());

  let products: Product[] = [];
  let apiError = false;

  try {
    const data = await getProducts();
    products = normalizeProducts(data);
  } catch (error) {
    console.error("BazarDor Product Error:", error);
    apiError = true;
  }

  return (
    <main className="min-h-screen bg-[#F8FAF5] text-[#1D2B1F]">
      {/* Navbar */}
      <header className="border-b border-gray-200 bg-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-5 py-4">
          <div>
            <h1 className="text-2xl font-extrabold tracking-tight">
              🛒 বাজার দর
            </h1>

            <p className="mt-1 text-sm text-gray-500">
              {today}
            </p>
          </div>

          <div className="flex shrink-0 gap-2">
            <a
              href="/signin"
              className="rounded-lg border border-gray-300 px-3 py-2 text-sm font-semibold transition hover:bg-gray-100 sm:px-4"
            >
              সাইন ইন
            </a>

            <a
              href="/signup"
              className="rounded-lg bg-green-700 px-3 py-2 text-sm font-semibold text-white transition hover:bg-green-800 sm:px-4"
            >
              সাইন আপ
            </a>
          </div>
        </div>

        <nav className="mx-auto flex max-w-7xl flex-wrap justify-center gap-x-6 gap-y-2 px-5 pb-4 text-sm font-semibold text-gray-600">
          <a href="#সব-পণ্য" className="hover:text-green-700">
            সব পণ্য
          </a>

          <a href="#সব-পণ্য" className="hover:text-green-700">
            চাল
          </a>

          <a href="#সব-পণ্য" className="hover:text-green-700">
            ডাল
          </a>

          <a href="#সব-পণ্য" className="hover:text-green-700">
            সবজি
          </a>

          <a href="#সব-পণ্য" className="hover:text-green-700">
            মাছ ও মাংস
          </a>
        </nav>
      </header>

      {/* Hero */}
      <section className="mx-auto grid max-w-7xl items-center gap-10 px-5 py-16 md:grid-cols-2 md:py-24">
        <div>
          <span className="inline-flex rounded-full bg-green-100 px-4 py-2 text-sm font-semibold text-green-800">
            🌿 প্রতিদিনের বাজারের সঙ্গী
          </span>

          <h2 className="mt-6 text-4xl font-extrabold leading-tight sm:text-5xl lg:text-6xl">
            বাজারের দাম জানুন,
            <span className="mt-2 block text-green-700">
              সহজেই এক নজরে
            </span>
          </h2>

          <p className="mt-5 max-w-xl text-base leading-8 text-gray-600 sm:text-lg">
            চাল, ডাল, সবজি, মাছ ও মাংসের দাম এক জায়গায় দেখুন।
            বাজারে যাওয়ার আগেই জেনে নিন আপনার প্রয়োজনীয় পণ্যের দাম।
          </p>

          <a
            href="#সব-পণ্য"
            className="mt-8 inline-flex items-center justify-center rounded-xl bg-green-700 px-7 py-3.5 font-bold text-white shadow-lg shadow-green-700/20 transition hover:-translate-y-0.5 hover:bg-green-800"
          >
            সব পণ্যের দাম দেখুন →
          </a>
        </div>

        <div className="flex min-h-72 items-center justify-center rounded-3xl border border-green-100 bg-gradient-to-br from-green-100 via-yellow-50 to-orange-100 p-8 sm:min-h-96">
          <div className="text-center">
            <div className="text-8xl sm:text-9xl">🧺</div>

            <h3 className="mt-6 text-2xl font-extrabold">
              আপনার প্রতিদিনের বাজার
            </h3>

            <p className="mt-3 text-gray-600">
              প্রয়োজনীয় পণ্যের দাম জানুন সহজেই
            </p>
          </div>
        </div>
      </section>

      {/* Price Ticker */}
      <section className="overflow-hidden border-y border-green-100 bg-white py-5">
        <div className="flex flex-wrap justify-center gap-x-8 gap-y-3 px-5 text-sm font-semibold text-gray-700 sm:text-base">
          <span>🍚 চাল</span>
          <span>🫘 ডাল</span>
          <span>🥔 আলু</span>
          <span>🧅 পেঁয়াজ</span>
          <span>🐟 মাছ</span>
          <span>🍗 মাংস</span>
          <span>🥚 ডিম</span>
          <span>🌶️ মরিচ</span>
        </div>
      </section>

      {/* All Products */}
      <section
        id="সব-পণ্য"
        className="mx-auto max-w-7xl px-5 py-16"
      >
        <div className="mb-8">
          <p className="font-semibold text-green-700">
            আপনার প্রয়োজনীয় পণ্য
          </p>

          <h2 className="mt-2 text-3xl font-extrabold sm:text-4xl">
            সব পণ্য
          </h2>

          <p className="mt-3 text-gray-600">
            বিভিন্ন পণ্যের বাজারদর দেখুন এক জায়গায়।
          </p>
        </div>

        {/* API Error */}
        {apiError ? (
          <div className="rounded-2xl border border-red-200 bg-red-50 p-8 text-center">
            <p className="text-lg font-bold text-red-700">
              পণ্যের তথ্য লোড করা যায়নি।
            </p>

            <p className="mt-2 text-sm text-gray-600">
              API Connection পরীক্ষা করে পেজটি আবার Refresh করো।
            </p>

            <button
              onClick={() => window.location.reload()}
              className="mt-5 rounded-lg bg-green-700 px-5 py-3 font-semibold text-white hover:bg-green-800"
            >
              আবার চেষ্টা করো
            </button>
          </div>
        ) : products.length === 0 ? (
          <div className="rounded-2xl border border-yellow-200 bg-yellow-50 p-8 text-center">
            <div className="text-4xl">🛍️</div>

            <h3 className="mt-4 text-xl font-bold">
              কোনো পণ্যের তথ্য পাওয়া যায়নি
            </h3>

            <p className="mt-3 text-gray-600">
              API-এর Response Structure যাচাই করতে হবে।
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {products.map((product, index) => {
              const productName =
                product.name ??
                product.title ??
                product.productName ??
                "পণ্যের নাম পাওয়া যায়নি";

              const productPrice =
                product.price ?? product.currentPrice;

              const productImage =
                product.image ?? product.imageUrl;

              return (
                <article
                  key={product.id ?? index}
                  className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
                >
                  <div className="flex h-48 items-center justify-center bg-green-50 p-4">
                    {productImage ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={productImage}
                        alt={productName}
                        className="h-full w-full object-contain"
                      />
                    ) : (
                      <span className="text-7xl">🛍️</span>
                    )}
                  </div>

                  <div className="p-5">
                    {product.category && (
                      <p className="text-sm font-semibold text-green-700">
                        {product.category}
                      </p>
                    )}

                    <h3 className="mt-2 text-lg font-bold">
                      {productName}
                    </h3>

                    <p className="mt-3 text-2xl font-extrabold text-green-700">
                      {productPrice !== undefined
                        ? `৳ ${productPrice}`
                        : "দাম পাওয়া যায়নি"}
                    </p>

                    {product.unit && (
                      <p className="mt-1 text-sm text-gray-500">
                        প্রতি {product.unit}
                      </p>
                    )}

                    <button
                      type="button"
                      className="mt-5 w-full rounded-xl bg-green-700 px-4 py-3 font-bold text-white transition hover:bg-green-800"
                    >
                      বিস্তারিত দেখুন
                    </button>
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-200 bg-white">
        <div className="mx-auto flex max-w-7xl flex-col gap-3 px-5 py-7 text-sm text-gray-600 sm:flex-row sm:items-center sm:justify-between">
          <p className="font-bold text-gray-900">
            🛒 বাজার দর — প্রয়োজনীয় পণ্যের দাম এক নজরে।
          </p>

          <p>
            সকল দাম সম্ভাব্য; বাজার অবস্থার ওপর নির্ভর করে পরিবর্তিত হয়।
          </p>
        </div>
      </footer>
    </main>
  );
}