"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import ProductArtwork from "@/components/ui/ProductArtwork";
import { useAuthSession, useSignOutMutation } from "@/lib/auth/queries";

const profileFeatures = [
  {
    title: "পণ্যের দাম",
    description: "বাজারের বিভিন্ন পণ্যের দাম দেখুন।",
    href: "/products",
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
  const router = useRouter();

  const {
    data: session,
    isPending,
    isError,
  } = useAuthSession();
  const signOut = useSignOutMutation();
  const [signOutError, setSignOutError] = useState("");

  const user = session?.user;

  useEffect(() => {
    if (!isPending && !isError && !session) {
      router.replace("/sign-in");
    }
  }, [isPending, isError, session, router]);

  const handleSignOut = async () => {
    setSignOutError("");

    try {
      await signOut.mutateAsync();
      router.replace("/");
      router.refresh();
    } catch {
      setSignOutError("সাইন আউট করা যায়নি। আবার চেষ্টা করুন।");
    }
  };

  if (isPending) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#F8FAF5]">
        <p className="font-semibold text-green-800">
          প্রোফাইল লোড হচ্ছে...
        </p>
      </main>
    );
  }

  if (isError) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#F8FAF5] px-4">
        <p role="alert" className="font-semibold text-red-700">
          প্রোফাইল লোড করা যায়নি। সংযোগ পরীক্ষা করে আবার চেষ্টা করুন।
        </p>
      </main>
    );
  }

  if (!session) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#F8FAF5]">
        <p className="font-semibold text-green-800">সাইন ইন পেজে নেওয়া হচ্ছে...</p>
      </main>
    );
  }

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
                <ProductArtwork
                  image={user?.image ?? undefined}
                  alt={user?.name || "Profile"}
                  fallback="👤"
                  className="h-full w-full rounded-full object-cover"
                />
              </div>

              <div>
                <p className="text-sm text-green-100">
                  বাজার দর
                </p>

                <h1 className="mt-2 text-3xl font-bold">
                  {user?.name || "ব্যবহারকারী"}
                </h1>

                <p className="mt-2 text-green-100">
                  আপনার ব্যক্তিগত প্রোফাইল।
                </p>
              </div>
            </div>
          </div>

          <div className="p-6 sm:p-10">
            <h2 className="text-xl font-bold text-[#1D2B1F]">
              অ্যাকাউন্টের তথ্য
            </h2>

            <div className="mt-5 grid gap-4 sm:grid-cols-2">
              <div className="rounded-2xl border border-gray-100 bg-[#F8FAF5] p-5">
                <p className="text-sm text-gray-500">
                  সম্পূর্ণ নাম
                </p>

                <p className="mt-2 break-words font-bold text-[#1D2B1F]">
                  {user?.name || "নাম পাওয়া যায়নি"}
                </p>
              </div>

              <div className="rounded-2xl border border-gray-100 bg-[#F8FAF5] p-5">
                <p className="text-sm text-gray-500">
                  ইমেইল ঠিকানা
                </p>

                <p className="mt-2 break-all font-bold text-[#1D2B1F]">
                  {user?.email || "ইমেইল পাওয়া যায়নি"}
                </p>
              </div>

              <div className="rounded-2xl border border-gray-100 bg-[#F8FAF5] p-5">
                <p className="text-sm text-gray-500">
                  অ্যাকাউন্ট তৈরি
                </p>

                <p className="mt-2 font-bold text-[#1D2B1F]">
                  {user?.createdAt
                    ? new Date(user.createdAt).toLocaleDateString(
                        "bn-BD",
                        {
                          day: "numeric",
                          month: "long",
                          year: "numeric",
                        }
                      )
                    : "তথ্য পাওয়া যায়নি"}
                </p>
              </div>
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

            <div className="mt-8 border-t border-gray-100 pt-6">
              <button
                type="button"
                onClick={handleSignOut}
                disabled={signOut.isPending}
                className="inline-flex rounded-xl bg-red-600 px-5 py-3 font-semibold text-white transition hover:bg-red-700 disabled:opacity-60"
              >
                {signOut.isPending ? "সাইন আউট হচ্ছে..." : "↪ সাইন আউট"}
              </button>
              {signOutError && (
                <p role="alert" className="mt-3 text-sm text-red-700">
                  {signOutError}
                </p>
              )}
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}