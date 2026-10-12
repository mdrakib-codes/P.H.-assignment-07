"use client";

import Link from "next/link";
import { FormEvent, useState } from "react";

export default function SignInPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!email.trim() || !password) {
      setMessage("ইমেইল ও পাসওয়ার্ড পূরণ করুন।");
      return;
    }

    setMessage(
      "ফর্মটি সঠিকভাবে পূরণ হয়েছে। প্রকৃত লগইনের জন্য authentication API সংযুক্ত করতে হবে।"
    );
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

          <form onSubmit={handleSubmit} className="mt-8 space-y-5">
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
              className="w-full rounded-xl bg-green-700 px-5 py-3 font-semibold text-white transition hover:bg-green-800"
            >
              সাইন ইন
            </button>

            {message && (
              <p
                aria-live="polite"
                className="rounded-lg bg-green-50 p-3 text-sm text-green-800"
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