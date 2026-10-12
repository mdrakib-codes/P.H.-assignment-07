
"use client";

import { useRouter } from "next/navigation";
import type { ReactNode } from "react";

type ProductDetailsLinkProps = {
  slug: string;
  children: ReactNode;
  className?: string;
};

export default function ProductDetailsLink({
  slug,
  children,
  className = "",
}: ProductDetailsLinkProps) {
  const router = useRouter();

  function handleClick() {
    const destination = `/product/${encodeURIComponent(slug)}`;

    let isAuthenticated = false;

    try {
      const user = window.localStorage.getItem("bazardor-user");
      isAuthenticated = user !== null;
    } catch {
      isAuthenticated = false;
    }

    if (!isAuthenticated) {
      router.push(
        `/sign-in?callbackUrl=${encodeURIComponent(destination)}`
      );
      return;
    }

    router.push(destination);
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      className={className}
      aria-label="পণ্যের বিস্তারিত দেখুন"
    >
      {children}
    </button>
  );
}

