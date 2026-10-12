"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import PriceTicker from "@/components/PriceTicker";

const categories = [
  { name: "সব পণ্য", icon: "🛒", href: "/#সব-পণ্য" },
  { name: "চাল", icon: "🍚", href: "/category/chal" },
  { name: "ডাল", icon: "🫘", href: "/category/dal" },
  { name: "তেল", icon: "🫙", href: "/category/tel" },
  { name: "সবজি", icon: "🥬", href: "/category/sobji" },
  { name: "মাছ", icon: "🐟", href: "/category/mach" },
  { name: "মাংস", icon: "🍗", href: "/category/mangsho" },
  { name: "ডিম-দুধ", icon: "🥚", href: "/category/dim-dui" },
  { name: "মসলা", icon: "🌶️", href: "/category/mosla" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [date, setDate] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    setDate(
      new Intl.DateTimeFormat("bn-BD", {
        day: "numeric",
        month: "long",
        year: "numeric",
      }).format(new Date())
    );
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  return (
    <header className="sticky top-0 z-50 border-b border-gray-100 bg-white shadow-sm">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 sm:px-6 lg:px-8">
        <Link href="/" className="shrink-0">
          <span className="block text-xl font-extrabold text-emerald-800 sm:text-2xl">
            🛒 বাজার দর
          </span>

          <span className="mt-1 block text-xs text-gray-500">
            {date || "বাংলাদেশের বাজারদর"}
          </span>
        </Link>

        <div className="hidden items-center gap-3 sm:flex">
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

      <nav className="hidden border-t border-gray-100 sm:block">
        <div className="mx-auto flex max-w-7xl items-center gap-1 overflow-x-auto px-4 py-2 sm:px-6 lg:px-8">
          {categories.map((category) => {
            const categoryPath = category.href.split("?")[0];
            const isActive =
              category.href === "/#সব-পণ্য"
                ? false
                : pathname === categoryPath;

            return (
              <Link
                key={category.href}
                href={category.href}
                className={`shrink-0 rounded-lg px-3 py-2 text-sm font-semibold transition ${
                  isActive
                    ? "bg-emerald-800 text-white"
                    : "text-gray-600 hover:bg-emerald-50 hover:text-emerald-800"
                }`}
              >
                <span className="mr-1">{category.icon}</span>
                {category.name}
              </Link>
            );
          })}
        </div>
      </nav>

      {menuOpen && (
        <div className="border-t border-gray-100 bg-white px-4 py-4 sm:hidden">
          <nav className="grid grid-cols-2 gap-2">
            {categories.map((category) => (
              <Link
                key={category.href}
                href={category.href}
                className="rounded-lg bg-gray-50 px-3 py-3 text-sm font-semibold text-gray-700 hover:bg-emerald-50"
              >
                {category.icon} {category.name}
              </Link>
            ))}
          </nav>

          <div className="mt-4 grid grid-cols-2 gap-2">
            <Link
              href="/sign-in"
              className="rounded-lg border border-emerald-700 px-3 py-3 text-center text-sm font-bold text-emerald-800"
            >
              সাইন ইন
            </Link>

            <Link
              href="/sign-up"
              className="rounded-lg bg-emerald-800 px-3 py-3 text-center text-sm font-bold text-white"
            >
              সাইন আপ
            </Link>
          </div>
        </div>
      )}

      <PriceTicker />
    </header>
  );
}