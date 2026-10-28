import Link from "next/link";
import Navbar from "@/components/Navbar";
import ProductSection from "@/components/ProductSection";

const categories = [
  { name: "চাল", icon: "🍚", href: "/category/chal" },
  { name: "ডাল", icon: "🫘", href: "/category/dal" },
  { name: "তেল", icon: "🫙", href: "/category/tel" },
  { name: "সবজি", icon: "🥬", href: "/category/sobji" },
  { name: "মাছ", icon: "🐟", href: "/category/mach" },
  { name: "মাংস", icon: "🍗", href: "/category/mangsho" },
  { name: "ডিম-দুধ", icon: "🥚", href: "/category/dim-dui" },
  { name: "মসলা", icon: "🌶️", href: "/category/mosla" },
];

export default function Home() {
  return (
    <main className="min-h-screen bg-[#F8FAF5] text-[#1D2B1F]">
      <Navbar />

      <section className="overflow-hidden bg-gradient-to-br from-[#E9F5E8] via-[#F8FAF5] to-[#DCEED9]">
        <div className="mx-auto grid max-w-7xl items-center gap-10 px-4 py-12 sm:px-6 sm:py-16 md:grid-cols-2 lg:px-8 lg:py-20">
          <div>
            <span className="inline-flex rounded-full border border-emerald-200 bg-white px-4 py-2 text-sm font-semibold text-emerald-800">
              🇧🇩 বাংলাদেশের প্রতিদিনের বাজারদর
            </span>

            <h1 className="mt-6 text-4xl font-extrabold leading-tight sm:text-5xl lg:text-6xl">
              বাজারের সঠিক তথ্য
              <span className="mt-2 block text-emerald-700">
                এবার হাতের মুঠোয়
              </span>
            </h1>

            <p className="mt-5 max-w-xl text-base leading-8 text-gray-600 sm:text-lg">
              চাল, ডাল, তেল, মাছ, মাংস, সবজি এবং নিত্যপ্রয়োজনীয় পণ্যের
              বাজারদর এক জায়গায় দেখুন। বাজারে যাওয়ার আগেই জেনে নিন
              পণ্যের দাম।
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="#সব-পণ্য"
                className="rounded-xl bg-emerald-800 px-6 py-3.5 text-sm font-bold text-white transition hover:bg-emerald-900"
              >
                বাজারদর দেখুন →
              </Link>

              <Link
                href="#categories"
                className="rounded-xl border border-emerald-200 bg-white px-6 py-3.5 text-sm font-bold text-emerald-800 transition hover:bg-emerald-50"
              >
                ক্যাটাগরি দেখুন
              </Link>
            </div>

            <div className="mt-8 flex flex-wrap gap-5 text-sm text-gray-600">
              <span>✓ পণ্যের দাম</span>
              <span>✓ দাম পরিবর্তনের তথ্য</span>
              <span>✓ বিভিন্ন ক্যাটাগরি</span>
            </div>
          </div>

          <div className="mx-auto w-full max-w-lg">
            <div className="rounded-[2rem] border border-white bg-white/90 p-5 shadow-xl sm:p-8">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500">
                    আপনার দৈনিক বাজার
                  </p>
                  <h2 className="mt-1 text-xl font-extrabold sm:text-2xl">
                    বাজার করুন সহজে
                  </h2>
                </div>

                <span className="text-3xl">🌿</span>
              </div>

              <div className="my-7 flex items-center justify-center">
                <div className="flex h-52 w-52 items-center justify-center rounded-full bg-[#ebf3e8] sm:h-64 sm:w-64">
                  <span className="text-8xl sm:text-9xl">🧺</span>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                {categories.slice(0, 3).map((category) => (
                  <Link
                    key={category.href}
                    href={category.href}
                    className="rounded-xl bg-[#F5F8F2] px-2 py-3 text-center transition hover:bg-emerald-50"
                  >
                    <span className="text-2xl">{category.icon}</span>
                    <p className="mt-2 text-sm font-bold">
                      {category.name}
                    </p>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section
        id="categories"
        className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8"
      >
        <div className="mb-7">
          <p className="text-sm font-semibold text-emerald-700">
            আপনার পছন্দের পণ্য
          </p>

          <h2 className="mt-2 text-2xl font-extrabold sm:text-3xl">
            ক্যাটাগরি অনুযায়ী বাজার
          </h2>

          <p className="mt-2 text-sm text-gray-500">
            আপনার প্রয়োজনীয় ক্যাটাগরি নির্বাচন করুন।
          </p>
        </div>

        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-8">
          {categories.map((category) => (
            <Link
              key={category.href}
              href={category.href}
              className="group flex flex-col items-center rounded-2xl border border-gray-100 bg-white px-3 py-5 shadow-sm transition hover:-translate-y-1 hover:border-emerald-200 hover:shadow-md"
            >
              <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#F0F7EC] text-3xl">
                {category.icon}
              </span>

              <span className="mt-3 text-sm font-bold">
                {category.name}
              </span>

              <span className="mt-1 text-xs text-gray-400">
                দেখুন →
              </span>
            </Link>
          ))}
        </div>
      </section>

      <ProductSection />

      <section className="mx-auto max-w-7xl px-4 pb-12 sm:px-6 lg:px-8">
        <div className="rounded-3xl bg-emerald-800 px-6 py-10 text-center text-white sm:px-12 sm:py-14">
          <span className="text-4xl">🛒</span>

          <h2 className="mt-4 text-2xl font-extrabold sm:text-3xl">
            আপনার প্রতিদিনের বাজার হোক আরও সহজ
          </h2>

          <p className="mx-auto mt-3 max-w-2xl text-sm leading-7 text-emerald-50 sm:text-base">
            বাজারে যাওয়ার আগে পণ্যের দাম জেনে নিন এবং আপনার
            দৈনন্দিন কেনাকাটার পরিকল্পনা করুন।
          </p>

          <Link
            href="#সব-পণ্য"
            className="mt-6 inline-block rounded-xl bg-emerald-600 px-6 py-3 font-bold text-emerald-800 transition hover:bg-emerald-500"
          >
            পণ্যের তালিকা দেখুন
          </Link>
        </div>
      </section>

      <footer className="border-t border-gray-200 bg-white">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 px-4 py-6 text-center sm:flex-row sm:px-6 sm:text-left lg:px-8">
          <Link
            href="/"
            className="text-xl font-extrabold text-emerald-800"
          >
            🛒 বাজার দর
          </Link>

          <p className="text-sm text-gray-500">
            বাজার দর — প্রয়োজনীয় পণ্যের দাম এক নজরে।
          </p>

          <p className="max-w-sm text-xs leading-5 text-gray-400">
            সকল দাম সম্ভাব্য; বাজার অবস্থার ওপর নির্ভর করে পরিবর্তিত হয়।
          </p>
        </div>
      </footer>
    </main>
  );
}