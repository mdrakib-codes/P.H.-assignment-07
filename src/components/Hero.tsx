
import Link from "next/link";

export default function Hero() {
  return (
    <section className="overflow-hidden bg-[#F8FAF5]">
      <div className="mx-auto grid max-w-6xl items-center gap-10 px-4 py-12 sm:px-6 sm:py-16 lg:grid-cols-2 lg:gap-14 lg:py-20">
        <div>
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-[#DCEAD5] bg-white px-4 py-2 text-sm font-semibold text-[#285D35]">
            <span className="h-2 w-2 rounded-full bg-green-600" />
            বাংলাদেশের নিত্যপ্রয়োজনীয় বাজারদর
          </div>

          <h1 className="max-w-xl text-4xl font-extrabold leading-tight tracking-tight text-[#203C26] sm:text-5xl lg:text-6xl">
            প্রতিদিনের বাজারদর,
            <span className="mt-2 block text-[#47834A]">
              এখন আপনার হাতেই
            </span>
          </h1>

          <p className="mt-6 max-w-lg text-base leading-8 text-[#687568] sm:text-lg">
            চাল, ডাল, তেল, মাছ, মাংস ও সবজির দাম এক নজরে দেখুন।
            বাজারে যাওয়ার আগেই জেনে নিন প্রয়োজনীয় পণ্যের সম্ভাব্য দাম।
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-4">
            <Link
              href="/#সব-পণ্য"
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#285D35] px-6 py-3.5 text-sm font-bold text-white shadow-lg shadow-green-900/10 transition hover:-translate-y-0.5 hover:bg-[#1E4728]"
            >
              সব পণ্যের দাম দেখুন
              <span aria-hidden="true">→</span>
            </Link>

            <div className="text-sm text-[#718071]">
              <p className="font-bold text-[#304432]">
                সহজ · দ্রুত · এক নজরে
              </p>
              <p className="mt-1">আপনার বাজার পরিকল্পনার সঙ্গী</p>
            </div>
          </div>
        </div>

        <div className="relative mx-auto w-full max-w-lg">
          <div className="absolute inset-8 rounded-full bg-[#E6F1DE] blur-3xl" />

          <div className="relative overflow-hidden rounded-[2rem] border border-[#E5EDE0] bg-white p-6 shadow-xl shadow-green-950/5 sm:p-8">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-[#718071]">
                  আপনার প্রতিদিনের বাজার
                </p>
                <h2 className="mt-1 text-xl font-extrabold text-[#24452B]">
                  বাজারের ঝুড়ি
                </h2>
              </div>

              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#EDF5E9] text-2xl">
                🛒
              </div>
            </div>

            <div className="mt-7 grid grid-cols-3 gap-3">
              <div className="rounded-2xl bg-[#F6F8F2] p-4 text-center">
                <span className="text-4xl">🍚</span>
                <p className="mt-3 text-sm font-bold text-[#304432]">চাল</p>
              </div>

              <div className="rounded-2xl bg-[#F6F8F2] p-4 text-center">
                <span className="text-4xl">🥔</span>
                <p className="mt-3 text-sm font-bold text-[#304432]">আলু</p>
              </div>

              <div className="rounded-2xl bg-[#F6F8F2] p-4 text-center">
                <span className="text-4xl">🧅</span>
                <p className="mt-3 text-sm font-bold text-[#304432]">পেঁয়াজ</p>
              </div>

              <div className="rounded-2xl bg-[#F6F8F2] p-4 text-center">
                <span className="text-4xl">🥚</span>
                <p className="mt-3 text-sm font-bold text-[#304432]">ডিম</p>
              </div>

              <div className="rounded-2xl bg-[#F6F8F2] p-4 text-center">
                <span className="text-4xl">🐟</span>
                <p className="mt-3 text-sm font-bold text-[#304432]">মাছ</p>
              </div>

              <div className="rounded-2xl bg-[#F6F8F2] p-4 text-center">
                <span className="text-4xl">🥬</span>
                <p className="mt-3 text-sm font-bold text-[#304432]">সবজি</p>
              </div>
            </div>

            <div className="mt-5 flex items-center gap-3 rounded-2xl bg-[#EDF5E9] p-4">
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-white text-xl">
                📊
              </span>

              <div>
                <p className="text-sm font-bold text-[#285D35]">
                  বাজারদর জানুন সহজেই
                </p>
                <p className="mt-1 text-xs text-[#718071]">
                  কেনাকাটার আগে পরিকল্পনা করুন
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

