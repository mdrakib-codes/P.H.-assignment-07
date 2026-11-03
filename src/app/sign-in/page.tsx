"use client";

import Link from "next/link";
import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { useSignInMutation } from "@/lib/auth/queries";

function getSafeCallbackUrl(value: string | null): string {
  if (!value) return "/";

  try {
    const url = new URL(value, window.location.origin);
    return url.origin === window.location.origin
      ? `${url.pathname}${url.search}`
      : "/";
  } catch {
    return "/";
  }
}

export default function SignInPage() {
  const router = useRouter();
  const signIn = useSignInMutation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setMessage("");

    if (!email.trim() || !password) {
      setMessage("ইমেইল ও পাসওয়ার্ড পূরণ করুন।");
      return;
    }

    try {
      await signIn.mutateAsync({
        email: email.trim(),
        password,
      });

      const callbackUrl = new URLSearchParams(window.location.search).get(
        "callbackUrl",
      );
      router.replace(getSafeCallbackUrl(callbackUrl));
      router.refresh();
    } catch (error) {
      setMessage(
        error instanceof Error
          ? error.message
          : "সাইন ইন করা যায়নি। আবার চেষ্টা করুন।",
      );
    }
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-[#F8FAF5] px-4 py-10">
      <div className="grid w-full max-w-5xl overflow-hidden rounded-3xl bg-white shadow-lg md:grid-cols-2">
        <div className="hidden flex-col justify-center bg-green-800 p-12 text-white md:flex">
          <div className="text-5xl">🛒</div>

          <h1 className="mt-6 text-4xl font-bold">
            বাজার দর
          </h1>

          <p className="mt-5 leading-8 text-green-50">
            নিত্যপ্রয়োজনীয় পণ্যের দাম জানুন এবং বাজার সম্পর্কে সচেতন থাকুন।
          </p>
        </div>

        <div className="p-6 sm:p-10 lg:p-12">
          <Link
            href="/"
            className="text-sm font-medium text-green-700 hover:underline"
          >
            ← হোম পেজ
          </Link>

          <h2 className="mt-8 text-3xl font-bold text-[#1D2B1F]">
            সাইন ইন
          </h2>

          <p className="mt-2 text-gray-600">
            আপনার অ্যাকাউন্টে প্রবেশ করুন।
          </p>

          <form onSubmit={onSubmit} className="mt-8 space-y-5">
            <div>
              <label
                htmlFor="email"
                className="mb-2 block text-sm font-medium text-gray-700"
              >
                ইমেইল
              </label>

              <input
                id="email"
                type="email"
                autoComplete="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                placeholder="আপনার ইমেইল লিখুন"
                required
                className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none transition focus:border-green-600 focus:ring-2 focus:ring-green-100"
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="mb-2 block text-sm font-medium text-gray-700"
              >
                পাসওয়ার্ড
              </label>

              <input
                id="password"
                type="password"
                autoComplete="current-password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                placeholder="আপনার পাসওয়ার্ড লিখুন"
                required
                className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none transition focus:border-green-600 focus:ring-2 focus:ring-green-100"
              />
            </div>

            <button
              type="submit"
              disabled={signIn.isPending}
              className="w-full rounded-xl bg-green-700 px-5 py-3 font-semibold text-white transition hover:bg-green-800 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {signIn.isPending ? "সাইন ইন হচ্ছে..." : "সাইন ইন"}
            </button>

            {message && (
              <p
                aria-live="polite"
                className="rounded-lg bg-red-50 p-3 text-sm text-red-700"
              >
                {message}
              </p>
            )}
          </form>

          <p className="mt-6 text-center text-sm text-gray-600">
            অ্যাকাউন্ট নেই?{" "}
            <Link
              href="/sign-up"
              className="font-semibold text-green-700 hover:underline"
            >
              সাইন আপ করুন
            </Link>
          </p>
        </div>
      </div>
    </main>
  );
}