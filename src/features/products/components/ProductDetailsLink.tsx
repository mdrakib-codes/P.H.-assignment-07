import Link from "next/link";
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
  return (
    <Link
      href={`/products/${encodeURIComponent(slug)}`}
      className={className}
      aria-label="পণ্যের বিস্তারিত দেখুন"
    >
      {children}
    </Link>
  );
}
