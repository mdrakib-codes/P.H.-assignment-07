import Link from "next/link";

const profileFeatures = [
  {
    title: "পণ্যের দাম",
    description: "বাজারের বিভিন্ন পণ্যের দাম দেখুন।",
    href: "/categories",
    icon: "🛒",
  },
  {
    title: "সব ক্যাটাগরি",
    description: "আপনার প্রয়োজনীয় ক্যাটাগরি খুঁজুন।",
    href: "/categories",
    icon: "📦",
  },
];

export default function ProfilePage() {
  return (
    <main className="min-h-screen bg-[#F8FAF5] px-4 py-8 sm:px-6 lg:px-10">
      <div className="mx-auto max-w-5xl">
        <Link
          href="/"
          className="text-sm font-medium text-green-700 hover:underline"
        >
          ← হোম পেজ
        </Link>

        <section className="mt-7 overflow-hidden rounded-3xl bg-white shadow-sm">
          <div className="bg-green-800 px-6 py-10 text-white sm:px-10">
            <div className="flex flex-col items-start gap-5 sm:flex-row sm:items-center">
              <div className="flex h-20 w-20 items-center justify-center rounded-full bg-white/15 text-4xl">
                👤
              </div>

              <div>
                <p className="text-sm text-green-100">
                  বাজার দর
                </p>

                <h1 className="mt-2 text-3xl font-bold">
                  আমার প্রোফাইল
                </h1>

                <p className="mt-2 text-green-100">
                  আপনার অ্যাকাউন্টের তথ্য দেখুন।
                </p>
              </div>
            </div>
          </div>

          <div className="p-6 sm:p-10">
            <h2 className="text-xl font-bold text-[#1D2B1F]">
              অ্যাকাউন্টের তথ্য
            </h2>

            <div className="mt-5 rounded-2xl border border-gray-100 bg-[#F8FAF5] p-5">
              <p className="font-semibold text-[#1D2B1F]">
                ব্যবহারকারীর তথ্য
              </p>

              <p className="mt-2 text-sm leading-6 text-gray-600">
                প্রকৃত নাম, ইমেইল ও অ্যাকাউন্টের তথ্য দেখাতে authentication
                ব্যবস্থা সংযুক্ত করতে হবে।
              </p>
            </div>

            <h2 className="mt-9 text-xl font-bold text-[#1D2B1F]">
              দ্রুত প্রবেশ
            </h2>

            <div className="mt-5 grid gap-4 sm:grid-cols-2">
              {profileFeatures.map((feature) => (
                <Link
                  key={feature.title}
                  href={feature.href}
                  className="rounded-2xl border border-gray-100 p-5 transition hover:border-green-200 hover:shadow-md"
                >
                  <span className="text-3xl">
                    {feature.icon}
                  </span>

                  <h3 className="mt-4 font-bold text-[#1D2B1F]">
                    {feature.title}
                  </h3>

                  <p className="mt-2 text-sm leading-6 text-gray-600">
                    {feature.description}
                  </p>

                  <span className="mt-4 inline-block text-sm font-semibold text-green-700">
                    দেখুন →
                  </span>
                </Link>
              ))}
            </div>

            <div className="mt-8">
              <Link
                href="/sign-in"
                className="inline-flex rounded-xl border border-green-700 px-5 py-3 font-semibold text-green-800 transition hover:bg-green-50"
              >
                সাইন ইন পেজ
              </Link>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}