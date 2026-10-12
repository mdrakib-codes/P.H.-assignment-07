import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-[#F8FAF5] px-4 py-12">
      <div className="w-full max-w-lg rounded-3xl border border-gray-100 bg-white p-8 text-center shadow-sm sm:p-12">
        <div className="text-7xl">🛒</div>

        <p className="mt-6 text-sm font-bold uppercase tracking-widest text-emerald-700">
          Error 404
        </p>

        <h1 className="mt-3 text-3xl font-extrabold text-gray-900">
          পেজটি খুঁজে পাওয়া যায়নি
        </h1>

        <p className="mt-4 text-sm leading-7 text-gray-500">
          দুঃখিত! আপনি যে পেজটি খুঁজছেন সেটি নেই অথবা ঠিকানাটি ভুল।
          হোম পেজে ফিরে গিয়ে পণ্য খুঁজে দেখতে পারেন।
        </p>

        <Link
          href="/"
          className="mt-7 inline-flex rounded-xl bg-emerald-800 px-6 py-3 font-bold text-white transition hover:bg-emerald-900"
        >
          হোম পেজে ফিরে যান
        </Link>
      </div>
    </main>
  );
}