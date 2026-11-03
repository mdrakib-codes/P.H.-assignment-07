"use client";

export default function ErrorPage({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <main className="flex min-h-screen items-center justify-center bg-[#F8FAF5] px-4 py-12">
      <div className="w-full max-w-lg rounded-3xl bg-white p-8 text-center shadow-sm sm:p-12">
        <h1 className="text-2xl font-extrabold text-gray-900">
          তথ্য লোড করা যায়নি
        </h1>
        <p className="mt-3 text-sm text-gray-600">
          অনুগ্রহ করে সংযোগ পরীক্ষা করে আবার চেষ্টা করুন।
        </p>
        <button
          type="button"
          onClick={reset}
          className="mt-6 rounded-xl bg-emerald-800 px-5 py-3 font-bold text-white hover:bg-emerald-900"
        >
          আবার চেষ্টা করুন
        </button>
      </div>
    </main>
  );
}
