"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import type { Product } from "@/lib/api";
import PriceTicker from "@/features/products/components/PriceTicker";
import { useAuthSession, useSignOutMutation } from "@/lib/auth/queries";

const navigation = [
  { name: "সব পণ্য", icon: "🛒", href: "/products" },
  { name: "সব ক্যাটাগরি", icon: "📦", href: "/categories" },
];

export default function Navbar({ products = [] }: { products?: Product[] }) {
  const pathname = usePathname();
  const router = useRouter();
  const { data: session, isPending, isError } = useAuthSession();
  const signOut = useSignOutMutation();
  const [menuOpen, setMenuOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [signOutError, setSignOutError] = useState("");
  const [currentDate, setCurrentDate] = useState("");
  const user = session?.user;

  useEffect(() => {
    const formatter = new Intl.DateTimeFormat("bn-BD", {
      dateStyle: "long",
      timeZone: "Asia/Dhaka",
    });
    const updateDate = () => setCurrentDate(formatter.format(new Date()));

    updateDate();
    const intervalId = window.setInterval(updateDate, 60_000);
    return () => window.clearInterval(intervalId);
  }, []);

  async function handleSignOut() {
    setSignOutError("");

    try {
      await signOut.mutateAsync();
      router.replace("/");
      router.refresh();
    } catch {
      console.error("Could not sign out.");
      setSignOutError("সাইন আউট করা যায়নি। আবার চেষ্টা করুন।");
    }
  }

  const authButtons = (
    <>
      <Link
        href="/sign-in"
        className="rounded-lg border border-emerald-700 px-4 py-2 text-sm font-bold text-emerald-800 transition hover:bg-emerald-50"
      >
        সাইন ইন
      </Link>
      <Link
        href="/sign-up"
        className="rounded-lg bg-emerald-800 px-4 py-2 text-sm font-bold text-white transition hover:bg-emerald-900"
      >
        সাইন আপ
      </Link>
    </>
  );

  const profileMenu = (
    <div className="relative">
      <button
        type="button"
        onClick={() => setProfileOpen((previous) => !previous)}
        aria-expanded={profileOpen}
        className="flex items-center gap-2 rounded-lg border border-emerald-100 px-3 py-2 text-sm font-bold text-emerald-800 transition hover:bg-emerald-50"
      >
        <span aria-hidden="true">👤</span>
        <span className="max-w-28 truncate">{user?.name || "প্রোফাইল"}</span>
        <span className="text-xs" aria-hidden="true">▼</span>
      </button>
      {profileOpen && (
        <div className="absolute right-0 top-full z-50 mt-2 w-64 rounded-xl border border-gray-100 bg-white p-3 shadow-lg">
          <div className="border-b border-gray-100 px-3 py-3">
            <p className="truncate font-bold text-gray-800">
              {user?.name || "ব্যবহারকারী"}
            </p>
            <p className="mt-1 truncate text-xs text-gray-500">{user?.email}</p>
          </div>
          <Link
            href="/profile"
            onClick={() => setProfileOpen(false)}
            className="mt-2 block rounded-lg px-3 py-3 text-sm font-semibold text-gray-700 transition hover:bg-emerald-50 hover:text-emerald-800"
          >
            👤 আমার প্রোফাইল
          </Link>
          <button
            type="button"
            onClick={handleSignOut}
            disabled={signOut.isPending}
            className="mt-1 w-full rounded-lg px-3 py-3 text-left text-sm font-bold text-red-600 transition hover:bg-red-50 disabled:opacity-50"
          >
            {signOut.isPending ? "সাইন আউট হচ্ছে..." : "↪ সাইন আউট"}
          </button>
        </div>
      )}
    </div>
  );

  return (
    <header className="sticky top-0 z-50 border-b border-gray-100 bg-white shadow-sm">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 sm:px-6 lg:px-8">
        <Link href="/" className="shrink-0">
          <span className="block text-xl font-extrabold text-emerald-800 sm:text-2xl">
            🛒 বাজার দর
          </span>
          <span className="mt-1 block min-h-4 text-xs text-gray-500">
            {currentDate}
          </span>
          <span className="mt-1 block text-xs text-gray-500">
            বাংলাদেশের বাজারদর
          </span>
        </Link>
        <div className="hidden items-center gap-3 sm:flex">
          {!isPending && (isError ? authButtons : user ? profileMenu : authButtons)}
          {isError && (
            <span role="alert" className="text-sm text-red-700">
              অ্যাকাউন্ট সংযোগ করা যায়নি
            </span>
          )}
        </div>
        <button
          type="button"
          onClick={() => setMenuOpen((previous) => !previous)}
          aria-label={menuOpen ? "মেনু বন্ধ করুন" : "মেনু খুলুন"}
          aria-expanded={menuOpen}
          className="flex h-10 w-10 items-center justify-center rounded-lg border border-gray-200 text-xl text-gray-700 sm:hidden"
        >
          {menuOpen ? "✕" : "☰"}
        </button>
      </div>

      <nav aria-label="প্রধান নেভিগেশন" className="hidden border-t border-gray-100 sm:block">
        <div className="mx-auto flex max-w-7xl items-center gap-1 overflow-x-auto px-4 py-2 sm:px-6 lg:px-8">
          {navigation.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              aria-current={pathname === item.href ? "page" : undefined}
              className={`shrink-0 rounded-lg px-3 py-2 text-sm font-semibold transition ${
                pathname === item.href
                  ? "bg-emerald-800 text-white"
                  : "text-gray-600 hover:bg-emerald-50 hover:text-emerald-800"
              }`}
            >
              <span className="mr-1">{item.icon}</span>
              {item.name}
            </Link>
          ))}
        </div>
      </nav>

      {menuOpen && (
        <div className="border-t border-gray-100 bg-white px-4 py-4 sm:hidden">
          <nav aria-label="মোবাইল নেভিগেশন" className="grid grid-cols-2 gap-2">
            {navigation.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMenuOpen(false)}
                className="rounded-lg bg-gray-50 px-3 py-3 text-sm font-semibold text-gray-700 hover:bg-emerald-50"
              >
                {item.icon} {item.name}
              </Link>
            ))}
          </nav>
          <div className="mt-4">
            {!isPending &&
              (isError ? (
                <div className="space-y-2">
                  <div className="grid grid-cols-2 gap-2">{authButtons}</div>
                  <p role="alert" className="text-sm text-red-700">
                    অ্যাকাউন্ট সংযোগ করা যায়নি
                  </p>
                </div>
              ) : user ? (
                <div className="space-y-2">
                  <div className="rounded-lg bg-emerald-50 p-3">
                    <p className="font-bold text-emerald-900">
                      {user.name || "ব্যবহারকারী"}
                    </p>
                    <p className="mt-1 break-all text-xs text-gray-600">
                      {user.email}
                    </p>
                  </div>
                  <Link
                    href="/profile"
                    onClick={() => setMenuOpen(false)}
                    className="block rounded-lg border border-emerald-700 px-3 py-3 text-center text-sm font-bold text-emerald-800"
                  >
                    👤 আমার প্রোফাইল
                  </Link>
                  <button
                    type="button"
                    onClick={handleSignOut}
                    disabled={signOut.isPending}
                    className="w-full rounded-lg bg-red-50 px-3 py-3 text-sm font-bold text-red-600 disabled:opacity-50"
                  >
                    {signOut.isPending ? "সাইন আউট হচ্ছে..." : "সাইন আউট"}
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-2 gap-2">{authButtons}</div>
              ))}
          </div>
        </div>
      )}

      {signOutError && (
        <p role="alert" className="bg-red-50 px-4 py-2 text-center text-sm text-red-700">
          {signOutError}
        </p>
      )}

      <PriceTicker products={products} />
    </header>
  );
}
